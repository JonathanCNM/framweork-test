/**
 * View Configuration System
 * Declarative mapping for view color configurations
 * Replaces the 200+ lines of repetitive code in generateColorsByView
 */

import type { ColorPalette, ViewsConfig, ViewType } from '../types/theme.types';

/**
 * Color mapping definition for a single view
 * Keys are ViewColorConfig properties, values are keys from ColorPalette
 */
type ColorMapping = {
  background: keyof ColorPalette | string;
  iconColors: [keyof ColorPalette | string, keyof ColorPalette | string];
  backgroundIcon: keyof ColorPalette | string;
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
      title: 'primaryMesh',
      subtitile: 'primaryMesh',
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
  // Special handling for errorViewBackground: fallback to secondaryColor if not provided
  if (key === 'errorViewBackground' && !palette.errorViewBackground) {
    return palette.secondaryColor;
  }

  // Special handling for specialViewBackground: fallback to primaryMesh if not provided
  if (key === 'specialViewBackground' && !palette.specialViewBackground) {
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
 * Generates view configurations from color palette using declarative mappings
 * Replaces the old 200+ line generateColorsByView function
 */
export function generateViewConfigs(colorPalette: ColorPalette): ViewsConfig {
  const lightness = colorPalette.lightness || 'light';
  const useSystemTheme = colorPalette.useSystemTheme || false;
  const views: ViewsConfig = {} as ViewsConfig;

  // Iterate through each view type and generate its config
  (Object.keys(VIEW_COLOR_MAPPINGS) as ViewType[]).forEach((viewType) => {
    const mapping = VIEW_COLOR_MAPPINGS[viewType][lightness];
    
    // Special handling for whiteView and dataView when useSystemTheme is active
    const shouldUseSystemColors = useSystemTheme && (viewType === 'whiteView' || viewType === 'dataView');
    
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
        themeType: lightness,
        errorColor: colorPalette.errorColor,
        highlight: mapping.highlight ? resolveColor(mapping.highlight, colorPalette) : undefined,
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
        themeType: lightness,
        errorColor: colorPalette.errorColor,
        highlight: mapping.highlight ? resolveColor(mapping.highlight, colorPalette) : undefined,
        useSystemTheme: colorPalette.useSystemTheme,
        viewConfig: viewType,
      };
    }
  });

  return views;
}

/**
 * Hook to generate and manage view configurations
 */
export function useViewConfig(colorPalette: ColorPalette, customViews?: Partial<ViewsConfig>) {
  const generatedViews = generateViewConfigs(colorPalette);
  
  // Merge custom view overrides if provided
  const views: ViewsConfig = customViews
    ? { ...generatedViews, ...customViews }
    : generatedViews;

  return { views, generateViewConfigs };
}
