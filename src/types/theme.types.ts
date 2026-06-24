/**
 * Type definitions for Lola Framework UI Theme System
 * Centralized theme configuration types
 */

export type ThemeLightness = 'light' | 'dark';

export type ViewType = 
  | 'primaryMeshGradientView'
  | 'specialView'
  | 'dataView'
  | 'whiteView'
  | 'errorView';

export interface FontStyleConfig {
  fontWeight: string | number;
  min: string;
  max: string;
  lineHeight: string | number;
  dynamicFormula?: string;
}

export interface FontConfig {
  family: string;
  cdn: string;
  styles: {
    h1: FontStyleConfig;
    highlight: FontStyleConfig;
    h2: FontStyleConfig;
    bodycopy: FontStyleConfig;
    secondaryCta: FontStyleConfig;
    footerText: FontStyleConfig;
    mainButtonText: FontStyleConfig;
    step: FontStyleConfig;
    [key: string]: FontStyleConfig;
  };
}

export interface ColorPalette {
  primaryGradient: string;
  secondaryGradient: string;
  secondaryColor: string;
  whiteColor: string;
  errorColor: string;
  partnerHighlights: string;
  primaryMesh: string;
  lightness: ThemeLightness;
  useSystemTheme?: boolean;
  inactived?: string;
  gradient?: string;
  gradientDeg?: string;
  primaryGradientPoint?: string;
  secundaryGradientPoint?: string;
}

export interface ViewColorConfig {
  background: string;
  iconColors: [string, string];
  backgroundIcon: string;
  title: string;
  subtitile: string;
  errorColor?: string;
  highlight?: string;
  bodyCopy: string;
  footerColor: string;
  backgroundBtn: string;
  textColorBtn: string;
  stepsColors: string;
  dropzoneColors: [string, string];
  stepsLabelColor: string;
  themeType?: ThemeLightness;
  useSystemTheme?: boolean;
  viewConfig: ViewType;
}

export interface ViewsConfig {
  primaryMeshGradientView: ViewColorConfig;
  specialView: ViewColorConfig;
  dataView: ViewColorConfig;
  whiteView: ViewColorConfig;
  errorView: ViewColorConfig;
}

/**
 * Main theme configuration interface
 * This is the primary structure that should be passed to useLolaTheme
 */
export interface LolaThemeConfig {
  font: {
    h1?: FontStyleConfig;
    highlight?: FontStyleConfig;
    h2?: FontStyleConfig;
    bodycopy?: FontStyleConfig;
    secondaryCta?: FontStyleConfig;
    footerText?: FontStyleConfig;
    mainButtonText?: FontStyleConfig;
    step?: FontStyleConfig;
    [key: string]: FontStyleConfig | string | undefined;
    fontfamily: string;
    fontcdn: string;
  };
  colors: ColorPalette;
  views?: Partial<ViewsConfig>;
}

/**
 * CSS Variable names used throughout the system
 */
export const CSS_VARIABLES = {
  // Colors
  PRIMARY_GRADIENT: '--lola-color-primary-gradient',
  SECONDARY_GRADIENT: '--lola-color-secondary-gradient',
  SECONDARY_COLOR: '--lola-color-secondary',
  WHITE_COLOR: '--lola-color-white',
  ERROR_COLOR: '--lola-color-error',
  PARTNER_HIGHLIGHTS: '--lola-color-highlights',
  PRIMARY_MESH: '--lola-color-primary-mesh',
  INACTIVED: '--lola-color-inactived',
  
  // Font
  FONT_FAMILY: '--lola-font-family',
  
  // View specific (dynamically generated)
  VIEW_BACKGROUND: '--lola-view-background',
  VIEW_TITLE: '--lola-view-title',
  VIEW_SUBTITLE: '--lola-view-subtitle',
  VIEW_BODY: '--lola-view-body-copy',
  VIEW_FOOTER: '--lola-view-footer',
  VIEW_BTN_BG: '--lola-view-btn-background',
  VIEW_BTN_TEXT: '--lola-view-btn-text',
} as const;

/**
 * Legacy interface for backward compatibility
 * @deprecated Use LolaThemeConfig instead
 */
export interface LegacyThemeText {
  weight?: string | number;
  min?: string;
  max?: string;
  lineHeight?: string | number;
  [key: string]: any;
}

/**
 * Legacy interface for backward compatibility
 * @deprecated Use LolaThemeConfig instead
 */
export interface LegacyUseTheme {
  [className: string]: LegacyThemeText;
}
