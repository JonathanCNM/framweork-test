import { FONT_STYLE_KEYS } from "./constants";
import type {
  ButtonSizeOption,
  FontInput,
  IColorForm,
  IFormFont,
  IStylesForm,
  ImportedTheme,
  ThemeEditorState,
} from "./types";

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
    }
  }

  const inactiveColor =
    (typeof importedInactive === "string" && importedInactive) ||
    (typeof legacyInactived === "string" && legacyInactived) ||
    current.inactiveColor;

  return {
    ...current,
    ...colorUpdates,
    inactiveColor,
  };
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
  }

  if (imported.styles) {
    next.formStyles = applyStyles(current.formStyles, imported.styles);
  }

  return next;
};
