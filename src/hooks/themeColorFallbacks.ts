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
  screenIconPadding?: string | number;
  screenIconPaddingSurface?: string | number;
  screenIconPaddingError?: string | number;
  inputIconPrimary?: string;
  inputIconSecondary?: string;
  titleColor?: string;
};

/** Empty / invalid = unset (legacy icon size). `"0"` / `0` = fill the disc. */
export const toCssLength = (value: unknown): string | undefined => {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return `${value}px`;
  }
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (trimmed === "") return undefined;
  if (trimmed === "0") return "0px";
  if (/^\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}px`;
  if (/^\d+(\.\d+)?(px|rem|em|%)$/.test(trimmed)) return trimmed;
  return undefined;
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

export const resolveScreenIconPadding = (
  palette: PaletteLike,
  viewType: string
): string | undefined => {
  if (viewType === "errorView") {
    return toCssLength(palette.screenIconPaddingError);
  }
  if (viewType === "whiteView" || viewType === "dataView") {
    return toCssLength(palette.screenIconPaddingSurface);
  }
  return toCssLength(palette.screenIconPadding);
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
