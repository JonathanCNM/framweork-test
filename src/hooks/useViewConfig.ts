/**
 * View Configuration System
 * Declarative mapping for view color configurations
 * Replaces the 200+ lines of repetitive code in generateColorsByView
 */

import type {
  ColorPalette,
  StylesConfig,
  ViewsConfig,
  ViewType,
} from '../types/theme.types';
import {
  flattenThemePalette,
  resolveInputIconColors,
  resolveScreenIconBackground,
  resolveScreenIconColors,
  resolveScreenIconFill,
  resolveScreenIconPadding,
  resolveTitleColor,
} from './themeColorFallbacks';

/**
 * Color mapping definition for a single view
 * Keys are ViewColorConfig properties, values are keys from ColorPalette
 */
type ColorMapping = {
  background: keyof ColorPalette | string;
  iconColors: [keyof ColorPalette | string, keyof ColorPalette | string];
  backgroundIcon: keyof ColorPalette | string;
  /**
   * Icon *container* background (not icon SVG colors).
   * Use `'transparent'` (legacy) or a ColorPalette key / CSS color string.
   */
  iconContainerBackground: keyof ColorPalette | string;
  title: keyof ColorPalette | string;
  subtitile: keyof ColorPalette | string;
  bodyCopy: keyof ColorPalette | string;
  footerColor: keyof ColorPalette | string;
  backgroundBtn: keyof ColorPalette | string;
  textColorBtn: keyof ColorPalette | string;
  stepsColors: keyof ColorPalette | string;
  stepsLabelColor: keyof ColorPalette | string;
  dropzoneColors: [keyof ColorPalette | string, keyof ColorPalette | string];
  highlight?: keyof ColorPalette | string;
};

/**
 * Declarative view color mappings
 * Maps each view type to its color configuration for light and dark themes
 */
const VIEW_COLOR_MAPPINGS: Record<ViewType, { light: ColorMapping; dark: ColorMapping }> = {
  primaryMeshGradientView: {
    light: {
      background: 'primaryMesh',
      iconColors: ['primaryGradient', 'secondaryGradient'],
      backgroundIcon: 'secondaryColor',
      iconContainerBackground: 'transparent',
      title: 'secondaryColor',
      subtitile: 'secondaryColor',
      bodyCopy: 'secondaryColor',
      footerColor: 'secondaryColor',
      backgroundBtn: 'secondaryColor',
      textColorBtn: 'whiteColor',
      stepsColors: 'secondaryColor',
      stepsLabelColor: 'whiteColor',
      dropzoneColors: ['secondaryColor', 'secondaryColor'],
      highlight: 'partnerHighlights',
    },
    dark: {
      background: 'primaryMesh',
      iconColors: ['primaryGradient', 'secondaryGradient'],
      backgroundIcon: 'whiteColor',
      iconContainerBackground: 'transparent',
      title: 'partnerHighlights',
      subtitile: 'whiteColor',
      bodyCopy: 'whiteColor',
      footerColor: 'whiteColor',
      backgroundBtn: 'whiteColor',
      textColorBtn: 'primaryMesh',
      stepsColors: 'primaryMesh',
      stepsLabelColor: 'whiteColor',
      dropzoneColors: ['primaryGradient', 'secondaryGradient'],
      highlight: 'partnerHighlights',
    },
  },
  specialView: {
    light: {
      background: 'specialViewBackground',
      iconColors: ['primaryGradient', 'secondaryGradient'],
      backgroundIcon: 'secondaryColor',
      iconContainerBackground: 'transparent',
      title: 'secondaryColor',
      subtitile: 'secondaryColor',
      bodyCopy: 'secondaryColor',
      footerColor: 'secondaryColor',
      backgroundBtn: 'secondaryColor',
      textColorBtn: 'whiteColor',
      stepsColors: 'secondaryColor',
      stepsLabelColor: 'whiteColor',
      dropzoneColors: ['secondaryColor', 'secondaryColor'],
      highlight: 'partnerHighlights',
    },
    dark: {
      background: 'specialViewBackground',
      iconColors: ['primaryGradient', 'secondaryGradient'],
      backgroundIcon: 'whiteColor',
      iconContainerBackground: 'transparent',
      title: 'partnerHighlights',
      subtitile: 'whiteColor',
      bodyCopy: 'whiteColor',
      footerColor: 'whiteColor',
      backgroundBtn: 'whiteColor',
      textColorBtn: 'primaryMesh',
      stepsColors: 'primaryMesh',
      stepsLabelColor: 'whiteColor',
      dropzoneColors: ['primaryGradient', 'secondaryGradient'],
      highlight: 'partnerHighlights',
    },
  },
  dataView: {
    light: {
      background: 'primaryMesh',
      iconColors: ['primaryGradient', 'secondaryGradient'],
      backgroundIcon: 'secondaryColor',
      iconContainerBackground: 'transparent',
      title: 'secondaryColor',
      subtitile: 'secondaryColor',
      bodyCopy: 'secondaryColor',
      footerColor: 'secondaryColor',
      backgroundBtn: 'secondaryColor',
      textColorBtn: 'whiteColor',
      stepsColors: 'secondaryColor',
      stepsLabelColor: 'whiteColor',
      dropzoneColors: ['secondaryColor', 'secondaryColor'],
      highlight: 'partnerHighlights',
    },
    dark: {
      background: 'whiteColor',
      iconColors: ['primaryGradient', 'secondaryGradient'],
      backgroundIcon: 'whiteColor',
      iconContainerBackground: 'transparent',
      title: 'primaryGradient',
      subtitile: 'primaryGradient',
      bodyCopy: 'secondaryColor',
      footerColor: 'secondaryColor',
      backgroundBtn: 'primaryMesh',
      textColorBtn: 'whiteColor',
      stepsColors: 'primaryMesh',
      stepsLabelColor: 'secondaryColor',
      dropzoneColors: ['primaryGradient', 'secondaryGradient'],
      highlight: 'partnerHighlights',
    },
  },
  whiteView: {
    light: {
      background: 'whiteColor',
      iconColors: ['primaryGradient', 'secondaryGradient'],
      backgroundIcon: 'whiteColor',
      iconContainerBackground: 'transparent',
      title: 'secondaryColor',
      subtitile: 'secondaryColor',
      bodyCopy: 'secondaryColor',
      footerColor: 'secondaryColor',
      backgroundBtn: 'primaryMesh',
      textColorBtn: 'secondaryColor',
      stepsColors: 'secondaryColor',
      stepsLabelColor: 'secondaryColor',
      dropzoneColors: ['secondaryColor', 'secondaryColor'],
      highlight: 'partnerHighlights',
    },
    dark: {
      background: 'whiteColor',
      iconColors: ['secondaryColor', 'secondaryColor'],
      backgroundIcon: 'whiteColor',
      iconContainerBackground: 'transparent',
      title: 'titleColor',
      subtitile: 'titleColor',
      bodyCopy: 'secondaryColor',
      footerColor: 'secondaryColor',
      backgroundBtn: 'primaryMesh',
      textColorBtn: 'whiteColor',
      stepsColors: 'primaryMesh',
      stepsLabelColor: 'secondaryColor',
      dropzoneColors: ['primaryGradient', 'secondaryGradient'],
      highlight: 'partnerHighlights',
    },
  },
  errorView: {
    light: {
      background: 'errorViewBackground',
      iconColors: ['secondaryColor', 'secondaryColor'],
      backgroundIcon: 'whiteColor',
      iconContainerBackground: 'transparent',
      title: 'whiteColor',
      subtitile: 'whiteColor',
      bodyCopy: 'whiteColor',
      footerColor: 'whiteColor',
      backgroundBtn: 'whiteColor',
      textColorBtn: 'secondaryColor',
      stepsColors: 'secondaryColor',
      stepsLabelColor: 'secondaryColor',
      dropzoneColors: ['secondaryColor', 'secondaryColor'],
      highlight: 'partnerHighlights',
    },
    dark: {
      background: 'errorViewBackground',
      iconColors: ['secondaryColor', 'secondaryColor'],
      backgroundIcon: 'whiteColor',
      iconContainerBackground: 'transparent',
      title: 'whiteColor',
      subtitile: 'whiteColor',
      bodyCopy: 'whiteColor',
      footerColor: 'whiteColor',
      backgroundBtn: 'whiteColor',
      textColorBtn: 'secondaryColor',
      stepsColors: 'primaryMesh',
      stepsLabelColor: 'whiteColor',
      dropzoneColors: ['primaryGradient', 'secondaryGradient'],
      highlight: 'partnerHighlights',
    },
  },
};

/**
 * Resolves a color key to its actual value from the palette
 * Includes backward compatibility fallbacks for new optional fields
 */
function resolveColor(key: keyof ColorPalette | string, palette: ColorPalette): string {
  // Literal CSS values (e.g. legacy iconContainerBackground default)
  if (key === 'transparent') {
    return 'transparent';
  }

  // Special handling for errorViewBackground: fallback to secondaryColor if not provided
  if (key === 'errorViewBackground' && !palette.errorViewBackground) {
    return palette.secondaryColor;
  }

  // Special handling for specialViewBackground: fallback to primaryMesh if not provided
  if (key === 'specialViewBackground' && !palette.specialViewBackground) {
    return palette.primaryMesh;
  }

  // White-view titles follow primaryMesh until titleColor is set
  if (key === 'titleColor' && !palette.titleColor) {
    return palette.primaryMesh;
  }
  
  if (key in palette) {
    const value = palette[key as keyof ColorPalette];
    // Return the value if it's a string, otherwise return the key itself
    return typeof value === 'string' ? value : key;
  }
  return key;
}

/**
 * Resolves icon container background for a view.
 * `styles.iconContainerBackground` is a global override when set;
 * otherwise uses the per-view mapping (default `'transparent'` for legacy).
 */
function resolveIconContainerBackground(
  mappingValue: keyof ColorPalette | string,
  colorPalette: ColorPalette,
  styles?: StylesConfig
): string {
  if (styles?.iconContainerBackground !== undefined) {
    return styles.iconContainerBackground;
  }
  return resolveColor(mappingValue, colorPalette);
}

/**
 * Generates view configurations from color palette using declarative mappings
 * Replaces the old 200+ line generateColorsByView function
 */
export function generateViewConfigs(
  colorPalette: ColorPalette,
  styles?: StylesConfig
): ViewsConfig {
  colorPalette = flattenThemePalette(
    colorPalette as unknown as Record<string, unknown>
  ) as ColorPalette;
  const bannerHighlightBackground =
    colorPalette.bannerHighlightBackground ?? colorPalette.primaryMesh;
  const bannerHighlightColor =
    colorPalette.bannerHighlightColor ?? "#FFFFFF";
  const bannerHighlightIconColors: [string, string] = [
    colorPalette.bannerHighlightIconPrimary ?? colorPalette.primaryGradient,
    colorPalette.bannerHighlightIconSecondary ?? colorPalette.secondaryGradient,
  ];
  const lightness = colorPalette.lightness || 'light';
  const useSystemTheme = colorPalette.useSystemTheme || false;
  // Legacy defaults for props exposed on each view (opt-in for consumers)
  const buttonShowIcon = styles?.buttonShowIcon ?? true;
  const buttonSize = styles?.buttonSize ?? 'large';
  const views: ViewsConfig = {} as ViewsConfig;

  // Iterate through each view type and generate its config
  (Object.keys(VIEW_COLOR_MAPPINGS) as ViewType[]).forEach((viewType) => {
    const mapping = VIEW_COLOR_MAPPINGS[viewType][lightness];
    const iconContainerBackground = resolveIconContainerBackground(
      mapping.iconContainerBackground,
      colorPalette,
      styles
    );
    
    // Special handling for whiteView and dataView when useSystemTheme is active
    const shouldUseSystemColors =
      useSystemTheme &&
      lightness === "dark" &&
      (viewType === "whiteView" || viewType === "dataView");
    
    if (shouldUseSystemColors) {
      // Use CSS variables for system theme support
      views[viewType] = {
        background: 'var(--background)',
        iconColors: [
          resolveColor(mapping.iconColors[0], colorPalette),
          resolveColor(mapping.iconColors[1], colorPalette),
        ],
        backgroundIcon: 'var(--card)',
        title: 'var(--foreground)',
        subtitile: 'var(--foreground)',
        bodyCopy: 'var(--foreground)',
        footerColor: 'var(--muted-foreground)',
        backgroundBtn: resolveColor(mapping.backgroundBtn, colorPalette),
        textColorBtn: resolveColor(mapping.textColorBtn, colorPalette),
        stepsColors: 'var(--primary)',
        stepsLabelColor: 'var(--muted-foreground)',
        dropzoneColors: [
          resolveColor(mapping.dropzoneColors[0], colorPalette),
          resolveColor(mapping.dropzoneColors[1], colorPalette),
        ],
        buttonShowIcon,
        buttonSize,
        iconContainerBackground,
        themeType: lightness,
        errorColor: colorPalette.errorColor,
        highlight: mapping.highlight ? resolveColor(mapping.highlight, colorPalette) : undefined,
        bannerHighlightBackground,
        bannerHighlightColor,
        bannerHighlightIconColors,
        useSystemTheme: true,
        viewConfig: viewType,
      };
    } else {
      // Standard color resolution for non-system views
      views[viewType] = {
        background: resolveColor(mapping.background, colorPalette),
        iconColors: [
          resolveColor(mapping.iconColors[0], colorPalette),
          resolveColor(mapping.iconColors[1], colorPalette),
        ],
        backgroundIcon: resolveColor(mapping.backgroundIcon, colorPalette),
        title: resolveColor(mapping.title, colorPalette),
        subtitile: resolveColor(mapping.subtitile, colorPalette),
        bodyCopy: resolveColor(mapping.bodyCopy, colorPalette),
        footerColor: resolveColor(mapping.footerColor, colorPalette),
        backgroundBtn: resolveColor(mapping.backgroundBtn, colorPalette),
        textColorBtn: resolveColor(mapping.textColorBtn, colorPalette),
        stepsColors: resolveColor(mapping.stepsColors, colorPalette),
        stepsLabelColor: resolveColor(mapping.stepsLabelColor, colorPalette),
        dropzoneColors: [
          resolveColor(mapping.dropzoneColors[0], colorPalette),
          resolveColor(mapping.dropzoneColors[1], colorPalette),
        ],
        buttonShowIcon,
        buttonSize,
        iconContainerBackground,
        themeType: lightness,
        errorColor: colorPalette.errorColor,
        highlight: mapping.highlight ? resolveColor(mapping.highlight, colorPalette) : undefined,
        bannerHighlightBackground,
        bannerHighlightColor,
        bannerHighlightIconColors,
        useSystemTheme: colorPalette.useSystemTheme,
        viewConfig: viewType,
      };
    }

    const view = views[viewType];
    const iconColors = resolveScreenIconColors(
      colorPalette,
      viewType,
      view.iconColors
    );
    const applyTitleColor =
      (viewType === "whiteView" || viewType === "dataView") &&
      lightness === "dark" &&
      !shouldUseSystemColors;
    views[viewType] = {
      ...view,
      iconColors,
      auraColors: [
        colorPalette.primaryGradient,
        colorPalette.secondaryGradient,
      ],
      iconFill: resolveScreenIconFill(colorPalette, viewType),
      iconPadding: resolveScreenIconPadding(colorPalette, viewType),
      backgroundIcon: resolveScreenIconBackground(
        colorPalette,
        view.backgroundIcon
      ),
      inputIconColors: resolveInputIconColors(colorPalette, iconColors),
      ...(applyTitleColor
        ? {
            title: resolveTitleColor(colorPalette, view.title),
            subtitile: resolveTitleColor(colorPalette, view.subtitile),
            highlight: resolveTitleColor(
              colorPalette,
              view.highlight ?? view.title
            ),
          }
        : {}),
      ...(viewType === "whiteView" && colorPalette.whiteViewHighlight
        ? { highlight: colorPalette.whiteViewHighlight }
        : {}),
    };
  });

  return views;
}

/**
 * Hook to generate and manage view configurations
 */
export function useViewConfig(
  colorPalette: ColorPalette,
  customViews?: Partial<ViewsConfig>,
  styles?: StylesConfig
) {
  const generatedViews = generateViewConfigs(colorPalette, styles);

  // Per-view merge so a 0.3.1 `views` object does not drop new optional keys
  const views: ViewsConfig = customViews
    ? (Object.keys(generatedViews) as ViewType[]).reduce((next, viewType) => {
        next[viewType] = customViews[viewType]
          ? { ...generatedViews[viewType], ...customViews[viewType] }
          : generatedViews[viewType];
        return next;
      }, {} as ViewsConfig)
    : generatedViews;

  return { views, generateViewConfigs };
}
