import {
  COLOR_PADDING_KEYS,
  COLOR_STRING_KEYS,
  FONT_INPUT_KEYS,
  FONT_STYLE_KEYS,
  STYLE_STRING_KEYS,
} from "./constants";
import type { ImportedTheme, ThemeValidationResult } from "./types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isStringOrNumber = (value: unknown): value is string | number =>
  typeof value === "string" || typeof value === "number";

const isFontStyle = (value: unknown): boolean => {
  if (!isRecord(value)) return false;
  return FONT_INPUT_KEYS.every((key) => {
    if (key === "min" || key === "max") return typeof value[key] === "string";
    return isStringOrNumber(value[key]);
  });
};

const validateFont = (font: unknown): string | null => {
  if (!isRecord(font)) return "La propiedad font debe ser un objeto";

  if (font.fontfamily !== undefined && typeof font.fontfamily !== "string") {
    return "font.fontfamily debe ser un string";
  }
  if (font.fontcdn !== undefined && typeof font.fontcdn !== "string") {
    return "font.fontcdn debe ser un string";
  }

  for (const key of FONT_STYLE_KEYS) {
    if (font[key] === undefined) continue;
    if (!isFontStyle(font[key])) {
      return `font.${key} debe incluir fontWeight, min, max y lineHeight`;
    }
  }

  for (const [key, value] of Object.entries(font)) {
    if (key === "fontfamily" || key === "fontcdn") continue;
    if (FONT_STYLE_KEYS.includes(key as (typeof FONT_STYLE_KEYS)[number])) {
      continue;
    }
    if (value !== undefined && !isFontStyle(value) && typeof value !== "string") {
      return `font.${key} tiene un tipo inválido`;
    }
  }

  return null;
};

const validateColors = (colors: unknown): string | null => {
  if (!isRecord(colors)) return "La propiedad colors debe ser un objeto";

  if (
    colors.lightness !== undefined &&
    colors.lightness !== "light" &&
    colors.lightness !== "dark"
  ) {
    return 'colors.lightness debe ser "light" o "dark"';
  }

  if (
    colors.useSystemTheme !== undefined &&
    typeof colors.useSystemTheme !== "boolean"
  ) {
    return "colors.useSystemTheme debe ser un boolean";
  }

  for (const key of COLOR_STRING_KEYS) {
    if (colors[key] === undefined) continue;
    if (typeof colors[key] !== "string") {
      return `colors.${key} debe ser un string`;
    }
  }

  for (const key of COLOR_PADDING_KEYS) {
    if (colors[key] === undefined) continue;
    if (typeof colors[key] !== "string" && typeof colors[key] !== "number") {
      return `colors.${key} debe ser un string o un número`;
    }
  }

  return null;
};

const validateStyles = (styles: unknown): string | null => {
  if (!isRecord(styles)) return "La propiedad styles debe ser un objeto";

  if (
    styles.buttonSize !== undefined &&
    styles.buttonSize !== "small" &&
    styles.buttonSize !== "medium" &&
    styles.buttonSize !== "large"
  ) {
    return 'styles.buttonSize debe ser "small", "medium" o "large"';
  }

  if (
    styles.buttonShowIcon !== undefined &&
    typeof styles.buttonShowIcon !== "boolean"
  ) {
    return "styles.buttonShowIcon debe ser un boolean";
  }

  if (styles.linkBold !== undefined && typeof styles.linkBold !== "boolean") {
    return "styles.linkBold debe ser un boolean";
  }

  if (
    styles.linkUnderline !== undefined &&
    typeof styles.linkUnderline !== "boolean"
  ) {
    return "styles.linkUnderline debe ser un boolean";
  }

  for (const key of STYLE_STRING_KEYS) {
    if (styles[key] === undefined) continue;
    if (typeof styles[key] !== "string") {
      return `styles.${key} debe ser un string`;
    }
  }

  return null;
};

export const validateImportedTheme = (value: unknown): ThemeValidationResult => {
  if (!isRecord(value)) {
    return { ok: false, error: "El tema debe ser un objeto JSON" };
  }

  const hasFont = value.font !== undefined;
  const hasColors = value.colors !== undefined;
  const hasStyles = value.styles !== undefined;

  if (!hasFont && !hasColors && !hasStyles) {
    return {
      ok: false,
      error:
        "El JSON debe contener al menos una de las propiedades: font, colors o styles",
    };
  }

  if (hasFont) {
    const fontError = validateFont(value.font);
    if (fontError) return { ok: false, error: fontError };
  }

  if (hasColors) {
    const colorsError = validateColors(value.colors);
    if (colorsError) return { ok: false, error: colorsError };
  }

  if (hasStyles) {
    const stylesError = validateStyles(value.styles);
    if (stylesError) return { ok: false, error: stylesError };
  }

  const theme: ImportedTheme = {};
  if (hasFont && isRecord(value.font)) theme.font = value.font;
  if (hasColors && isRecord(value.colors)) theme.colors = value.colors;
  if (hasStyles && isRecord(value.styles)) theme.styles = value.styles;

  return { ok: true, theme };
};

export const parseThemeJson = (raw: string): ThemeValidationResult => {
  try {
    return validateImportedTheme(JSON.parse(raw));
  } catch {
    return { ok: false, error: "JSON inválido. Verifica el formato del archivo." };
  }
};
