import { COLOR_PADDING_KEYS, FONT_STYLE_KEYS } from "./constants";
import { parseLinearGradient } from "./parseGradient";
import {
  copyPrimaryToSpecialView,
  importedThemeHasSpecialView,
  isSpecialViewInSyncWithPrimary,
} from "./specialViewSync";
import {
  copyPrimaryToScreenIcons,
  copyPrimaryToTitleColor,
  copySecondaryToInputIcons,
  importedThemeHasInputIcons,
  importedThemeHasScreenIcons,
  importedThemeHasTitleColor,
} from "./linkedColorSync";
import type {
  ButtonSizeOption,
  FontInput,
  IColorForm,
  IFormFont,
  IStylesForm,
  ImportedTheme,
  ThemeEditorState,
} from "./types";

const SPECIAL_VIEW_BUILDER_KEYS = [
  "specialViewPrimaryGradient",
  "specialViewSecondaryGradient",
  "specialViewGradientDeg",
  "specialViewPrimaryGradientPoint",
  "specialViewSecundaryGradientPoint",
] as const;

const ERROR_VIEW_BUILDER_KEYS = [
  "errorViewPrimaryGradient",
  "errorViewSecondaryGradient",
  "errorViewGradientDeg",
  "errorViewPrimaryGradientPoint",
  "errorViewSecundaryGradientPoint",
] as const;

const hasAnyStringKey = (
  source: Record<string, unknown>,
  keys: readonly string[]
) => keys.some((key) => typeof source[key] === "string");

const hydrateViewGradient = (
  colors: IColorForm,
  imported: Record<string, unknown>,
  backgroundKey: "specialViewBackground" | "errorViewBackground",
  builderKeys: readonly string[],
  mapped: {
    primary: keyof IColorForm;
    secondary: keyof IColorForm;
    deg: keyof IColorForm;
    primaryPoint: keyof IColorForm;
    secondaryPoint: keyof IColorForm;
  }
): IColorForm => {
  if (hasAnyStringKey(imported, builderKeys)) return colors;
  const background = imported[backgroundKey];
  if (typeof background !== "string") return colors;
  const parsed = parseLinearGradient(background);
  if (!parsed) return colors;
  return {
    ...colors,
    [mapped.primary]: parsed.primary,
    [mapped.secondary]: parsed.secondary,
    [mapped.deg]: parsed.deg,
    [mapped.primaryPoint]: parsed.primaryPoint,
    [mapped.secondaryPoint]: parsed.secondaryPoint,
  };
};

const toFontInput = (value: Record<string, unknown>): FontInput => ({
  fontWeight: String(value.fontWeight ?? ""),
  min: String(value.min ?? ""),
  max: String(value.max ?? ""),
  lineHeight: String(value.lineHeight ?? ""),
});

const applyFont = (
  current: IFormFont,
  imported: Record<string, unknown>
): IFormFont => {
  const updates: Record<string, FontInput> = {};

  for (const [key, value] of Object.entries(imported)) {
    if (key === "fontfamily" || key === "fontcdn") continue;
    if (typeof value !== "object" || value === null) continue;
    updates[key] = toFontInput(value as Record<string, unknown>);
  }

  const next: IFormFont = { ...current, ...updates };
  for (const key of FONT_STYLE_KEYS) {
    if (!next[key]) next[key] = current[key];
  }
  return next;
};

const applyColors = (
  current: IColorForm,
  imported: Record<string, unknown>
): IColorForm => {
  const {
    inactived: legacyInactived,
    inactiveColor: importedInactive,
    lightness: _lightness,
    useSystemTheme: _useSystemTheme,
    gradient: _gradient,
    ...restColors
  } = imported;

  const colorUpdates: Partial<IColorForm> = {};
  for (const [key, value] of Object.entries(restColors)) {
    if (typeof value === "string") {
      colorUpdates[key as keyof IColorForm] = value;
      continue;
    }
    if (
      (COLOR_PADDING_KEYS as readonly string[]).includes(key) &&
      typeof value === "number" &&
      Number.isFinite(value)
    ) {
      colorUpdates[key as keyof IColorForm] = `${value}px`;
    }
  }

  const inactiveColor =
    (typeof importedInactive === "string" && importedInactive) ||
    (typeof legacyInactived === "string" && legacyInactived) ||
    current.inactiveColor;

  const merged: IColorForm = {
    ...current,
    ...colorUpdates,
    inactiveColor,
  };

  return hydrateViewGradient(
    hydrateViewGradient(merged, imported, "specialViewBackground", SPECIAL_VIEW_BUILDER_KEYS, {
      primary: "specialViewPrimaryGradient",
      secondary: "specialViewSecondaryGradient",
      deg: "specialViewGradientDeg",
      primaryPoint: "specialViewPrimaryGradientPoint",
      secondaryPoint: "specialViewSecundaryGradientPoint",
    }),
    imported,
    "errorViewBackground",
    ERROR_VIEW_BUILDER_KEYS,
    {
      primary: "errorViewPrimaryGradient",
      secondary: "errorViewSecondaryGradient",
      deg: "errorViewGradientDeg",
      primaryPoint: "errorViewPrimaryGradientPoint",
      secondaryPoint: "errorViewSecundaryGradientPoint",
    }
  );
};

const applyStyles = (
  current: IStylesForm,
  imported: Record<string, unknown>
): IStylesForm => {
  const next: IStylesForm = { ...current };

  for (const [key, value] of Object.entries(imported)) {
    if (key === "buttonShowIcon" && typeof value === "boolean") {
      next.buttonShowIcon = value;
      continue;
    }
    if (
      key === "buttonSize" &&
      (value === "small" || value === "medium" || value === "large")
    ) {
      next.buttonSize = value as ButtonSizeOption;
      continue;
    }
    if (typeof value === "string" && key in next) {
      (next as unknown as Record<string, string | boolean>)[key] = value;
    }
  }

  return next;
};

export const getAppliedSections = (imported: ImportedTheme): string =>
  [
    imported.font && "font",
    imported.colors && "colors",
    imported.styles && "styles",
  ]
    .filter(Boolean)
    .join(", ");

export const applyImportedTheme = (
  current: ThemeEditorState,
  imported: ImportedTheme
): ThemeEditorState => {
  const next: ThemeEditorState = { ...current };

  if (imported.font) {
    const fontfamily = imported.font.fontfamily;
    const fontcdn = imported.font.fontcdn;
    if (typeof fontfamily === "string" && typeof fontcdn === "string") {
      next.inputFont = { name: fontfamily, cdn: fontcdn };
    }
    next.formFont = applyFont(current.formFont, imported.font);
  }

  if (imported.colors) {
    next.formColors = applyColors(current.formColors, imported.colors);
    if (
      imported.colors.lightness === "light" ||
      imported.colors.lightness === "dark"
    ) {
      next.lightness = imported.colors.lightness;
    }
    if (typeof imported.colors.useSystemTheme === "boolean") {
      next.useSystemTheme = imported.colors.useSystemTheme;
    }
    if (importedThemeHasSpecialView(imported.colors)) {
      next.specialViewLinked = isSpecialViewInSyncWithPrimary(next.formColors);
    } else {
      next.formColors = copyPrimaryToSpecialView(next.formColors);
      next.specialViewLinked = true;
    }

    if (importedThemeHasTitleColor(imported.colors)) {
      next.titleLinked = next.formColors.titleColor === next.formColors.primaryMesh;
    } else {
      next.formColors = copyPrimaryToTitleColor(next.formColors);
      next.titleLinked = true;
    }

    if (importedThemeHasScreenIcons(imported.colors)) {
      next.screenIconLinked = false;
    } else {
      next.formColors = copyPrimaryToScreenIcons(next.formColors);
      next.screenIconLinked = true;
    }

    if (importedThemeHasInputIcons(imported.colors)) {
      next.inputIconLinked = false;
    } else {
      next.formColors = copySecondaryToInputIcons(next.formColors);
      next.inputIconLinked = true;
    }
  }

  if (imported.styles) {
    next.formStyles = applyStyles(current.formStyles, imported.styles);
  }

  return next;
};
