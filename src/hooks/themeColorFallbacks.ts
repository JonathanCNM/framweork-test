export const DEFAULT_FOREGROUND_LIGHT = "#17171c";
export const DEFAULT_FOREGROUND_DARK = "#fafafa";
export const DEFAULT_LINK_COLOR = "#252525";

export const isGradientColor = (value: string): boolean =>
  value.includes("gradient");

export const firstCssColorStop = (value: string): string =>
  value.match(/#(?:[0-9a-fA-F]{3,8})\b/)?.[0] ?? DEFAULT_LINK_COLOR;

export const toLinkFill = (color: string): string =>
  isGradientColor(color)
    ? `${color} text, transparent`
    : `linear-gradient(90deg, ${color} 0%, ${color} 100%) text, transparent`;

export const resolveLinkColor = (palette: { linkColor?: string }): string =>
  typeof palette.linkColor === "string" && palette.linkColor.trim() !== ""
    ? palette.linkColor
    : DEFAULT_LINK_COLOR;

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
  primaryMesh?: string;
  primaryGradient?: string;
  secondaryGradient?: string;
  colors?: PaletteLike;
};

/**
 * Accepts a flat `colors` object or a full theme `{ colors, font, styles }`.
 */
export const flattenThemePalette = (
  theme: Record<string, unknown> | PaletteLike | null | undefined
): PaletteLike => {
  if (!theme) return {};
  const nested = theme.colors;
  const fromNested =
    nested && typeof nested === "object" && !Array.isArray(nested)
      ? (nested as PaletteLike)
      : {};
  const rest = { ...theme };
  delete rest.colors;
  return { ...fromNested, ...rest };
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
