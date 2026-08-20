export const DEFAULT_FOREGROUND_LIGHT = "#17171c";
export const DEFAULT_FOREGROUND_DARK = "#fafafa";

type PaletteLike = {
  screenIconPrimary?: string;
  screenIconSecondary?: string;
  screenIconPrimarySurface?: string;
  screenIconSecondarySurface?: string;
  screenIconPrimaryError?: string;
  screenIconSecondaryError?: string;
  screenIconBackground?: string;
  screenIconFill?: string;
  screenIconFillSurface?: string;
  screenIconFillError?: string;
  inputIconPrimary?: string;
  inputIconSecondary?: string;
  titleColor?: string;
};

export const resolveScreenIconColors = (
  palette: PaletteLike,
  viewType: string,
  fallback: [string, string]
): [string, string] => {
  if (viewType === "errorView") {
    if (typeof palette.screenIconPrimaryError !== "string") return fallback;
    return [
      palette.screenIconPrimaryError,
      palette.screenIconSecondaryError ?? palette.screenIconPrimaryError,
    ];
  }
  if (viewType === "whiteView" || viewType === "dataView") {
    if (typeof palette.screenIconPrimarySurface !== "string") return fallback;
    return [
      palette.screenIconPrimarySurface,
      palette.screenIconSecondarySurface ?? palette.screenIconPrimarySurface,
    ];
  }
  if (typeof palette.screenIconPrimary !== "string") return fallback;
  return [
    palette.screenIconPrimary,
    palette.screenIconSecondary ?? palette.screenIconPrimary,
  ];
};

export const resolveScreenIconBackground = (
  palette: PaletteLike,
  fallback: string
): string =>
  typeof palette.screenIconBackground === "string"
    ? palette.screenIconBackground
    : fallback;

export const resolveScreenIconFill = (
  palette: PaletteLike,
  viewType: string
): string | undefined => {
  if (viewType === "errorView") {
    return typeof palette.screenIconFillError === "string"
      ? palette.screenIconFillError
      : undefined;
  }
  if (viewType === "whiteView" || viewType === "dataView") {
    return typeof palette.screenIconFillSurface === "string"
      ? palette.screenIconFillSurface
      : undefined;
  }
  return typeof palette.screenIconFill === "string"
    ? palette.screenIconFill
    : undefined;
};

export const resolveInputIconColors = (
  palette: PaletteLike,
  fallback: [string, string]
): [string, string] => {
  if (typeof palette.inputIconPrimary !== "string") return fallback;
  return [
    palette.inputIconPrimary,
    palette.inputIconSecondary ?? palette.inputIconPrimary,
  ];
};

export const resolveTitleColor = (
  palette: PaletteLike,
  fallback: string
): string =>
  typeof palette.titleColor === "string" ? palette.titleColor : fallback;
