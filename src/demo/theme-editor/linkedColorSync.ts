import type { IColorForm } from "./types";

export const TITLE_COLOR_FIELD_KEYS = ["titleColor"] as const;

export const SCREEN_ICON_FIELD_KEYS = [
  "screenIconPrimary",
  "screenIconSecondary",
  "screenIconBackground",
  "screenIconFill",
] as const;

export const INPUT_ICON_FIELD_KEYS = [
  "inputIconPrimary",
  "inputIconSecondary",
] as const;

export const isTitleColorField = (key: string): boolean =>
  (TITLE_COLOR_FIELD_KEYS as readonly string[]).includes(key);

export const isScreenIconField = (key: string): boolean =>
  (SCREEN_ICON_FIELD_KEYS as readonly string[]).includes(key);

export const isInputIconField = (key: string): boolean =>
  (INPUT_ICON_FIELD_KEYS as readonly string[]).includes(key);

export const copyPrimaryToTitleColor = (colors: IColorForm): IColorForm => ({
  ...colors,
  titleColor: colors.primaryMesh,
});

export const copyPrimaryToScreenIcons = (colors: IColorForm): IColorForm => ({
  ...colors,
  screenIconPrimary: colors.primaryGradient,
  screenIconSecondary: colors.secondaryGradient,
  screenIconFill: colors.whiteColor,
});

export const copySecondaryToInputIcons = (colors: IColorForm): IColorForm => ({
  ...colors,
  inputIconPrimary: colors.secondaryColor,
  inputIconSecondary: colors.secondaryColor,
});

export const importedThemeHasTitleColor = (
  colors: Record<string, unknown>
): boolean => typeof colors.titleColor === "string";

export const importedThemeHasScreenIcons = (
  colors: Record<string, unknown>
): boolean =>
  typeof colors.screenIconPrimary === "string" ||
  typeof colors.screenIconBackground === "string" ||
  typeof colors.screenIconFill === "string";

export const importedThemeHasInputIcons = (
  colors: Record<string, unknown>
): boolean => typeof colors.inputIconPrimary === "string";
