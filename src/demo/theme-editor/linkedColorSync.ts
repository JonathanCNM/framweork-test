import type { IColorForm } from "./types";

export const TITLE_COLOR_FIELD_KEYS = ["titleColor"] as const;

export const SCREEN_ICON_FIELD_KEYS = [
  "screenIconPrimary",
  "screenIconSecondary",
  "screenIconPrimarySurface",
  "screenIconSecondarySurface",
  "screenIconPrimaryError",
  "screenIconSecondaryError",
  "screenIconBackground",
  "screenIconFill",
  "screenIconFillSurface",
  "screenIconFillError",
] as const;

export const INPUT_ICON_FIELD_KEYS = [
  "inputIconPrimary",
  "inputIconSecondary",
] as const;

export const BANNER_HIGHLIGHT_FIELD_KEYS = [
  "bannerHighlightBackground",
  "bannerHighlightColor",
  "bannerHighlightIconPrimary",
  "bannerHighlightIconSecondary",
] as const;

export const isTitleColorField = (key: string): boolean =>
  (TITLE_COLOR_FIELD_KEYS as readonly string[]).includes(key);

export const isScreenIconField = (key: string): boolean =>
  (SCREEN_ICON_FIELD_KEYS as readonly string[]).includes(key);

export const isInputIconField = (key: string): boolean =>
  (INPUT_ICON_FIELD_KEYS as readonly string[]).includes(key);

export const isBannerHighlightField = (key: string): boolean =>
  (BANNER_HIGHLIGHT_FIELD_KEYS as readonly string[]).includes(key);

export const copyPrimaryToTitleColor = (colors: IColorForm): IColorForm => ({
  ...colors,
  titleColor: colors.primaryMesh,
});

export const copyPrimaryToScreenIcons = (colors: IColorForm): IColorForm => ({
  ...colors,
  screenIconPrimary: colors.primaryGradient,
  screenIconSecondary: colors.secondaryGradient,
  screenIconPrimarySurface: colors.primaryGradient,
  screenIconSecondarySurface: colors.secondaryGradient,
  screenIconPrimaryError: colors.secondaryColor,
  screenIconSecondaryError: colors.secondaryColor,
  screenIconFill: colors.whiteColor,
  screenIconFillSurface: colors.whiteColor,
  screenIconFillError: colors.whiteColor,
});

export const copySecondaryToInputIcons = (colors: IColorForm): IColorForm => ({
  ...colors,
  inputIconPrimary: colors.secondaryColor,
  inputIconSecondary: colors.secondaryColor,
});

export const copyPrimaryToBannerHighlight = (colors: IColorForm): IColorForm => ({
  ...colors,
  bannerHighlightBackground: colors.primaryMesh,
  bannerHighlightColor: "#FFFFFF",
  bannerHighlightIconPrimary: colors.primaryGradient,
  bannerHighlightIconSecondary: colors.secondaryGradient,
});

export const importedThemeHasTitleColor = (
  colors: Record<string, unknown>
): boolean => typeof colors.titleColor === "string";

export const importedThemeHasScreenIcons = (
  colors: Record<string, unknown>
): boolean =>
  typeof colors.screenIconPrimary === "string" ||
  typeof colors.screenIconPrimarySurface === "string" ||
  typeof colors.screenIconPrimaryError === "string" ||
  typeof colors.screenIconBackground === "string" ||
  typeof colors.screenIconFill === "string" ||
  typeof colors.screenIconFillSurface === "string" ||
  typeof colors.screenIconFillError === "string";

export const importedThemeHasInputIcons = (
  colors: Record<string, unknown>
): boolean => typeof colors.inputIconPrimary === "string";

export const importedThemeHasBannerHighlight = (
  colors: Record<string, unknown>
): boolean =>
  typeof colors.bannerHighlightBackground === "string" ||
  typeof colors.bannerHighlightColor === "string" ||
  typeof colors.bannerHighlightIconPrimary === "string" ||
  typeof colors.bannerHighlightIconSecondary === "string" ||
  Array.isArray(colors.bannerHighlightIconColors);
