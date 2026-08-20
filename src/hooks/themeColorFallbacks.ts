export const DEFAULT_FOREGROUND_LIGHT = "#17171c";
export const DEFAULT_FOREGROUND_DARK = "#fafafa";

type PaletteLike = {
  screenIconPrimary?: string;
  screenIconSecondary?: string;
  screenIconBackground?: string;
  screenIconFill?: string;
  inputIconPrimary?: string;
  inputIconSecondary?: string;
  titleColor?: string;
};

export const resolveScreenIconColors = (
  palette: PaletteLike,
  fallback: [string, string]
): [string, string] => {
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
  fallback: string
): string =>
  typeof palette.screenIconFill === "string"
    ? palette.screenIconFill
    : fallback;

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
