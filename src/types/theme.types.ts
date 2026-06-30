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
  errorViewBackground?: string;
  cardPanelBackground?: string;
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
 * Button size options for consistent sizing across the application
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Custom styles configuration for components
 * Allows customization of border radius, colors, and sizes
 */
export interface StylesConfig {
  // Border radius
  cardBorderRadius?: string;
  buttonBorderRadius?: string;
  inputBorderRadius?: string;
  
  // Border colors
  cardBorderColor?: string;
  inputBorderColor?: string;
  activeBorderBoton?: string;
  
  // Border width (tamaño del borde)
  tamañoBordeCard?: string;
  tamañoBordeInput?: string;
  
  // Component sizes
  buttonSize?: ButtonSize;
  
  // Component padding
  buttonPadding?: string;
  inputPadding?: string;
  cardPadding?: string;
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
  styles?: StylesConfig;
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
  CARD_PANEL_BACKGROUND: '--lola-color-card-panel-background',
  
  // Font
  FONT_FAMILY: '--lola-font-family',
  
  // Styles
  CARD_BORDER_RADIUS: '--lola-style-card-border-radius',
  BUTTON_BORDER_RADIUS: '--lola-style-button-border-radius',
  INPUT_BORDER_RADIUS: '--lola-style-input-border-radius',
  CARD_BORDER_COLOR: '--lola-style-card-border-color',
  INPUT_BORDER_COLOR: '--lola-style-input-border-color',
  ACTIVE_BORDER_BOTON: '--lola-style-active-border-boton',
  TAMAÑO_BORDE_CARD: '--lola-style-tamaño-borde-card',
  TAMAÑO_BORDE_INPUT: '--lola-style-tamaño-borde-input',
  BUTTON_SIZE: '--lola-style-button-size',
  BUTTON_PADDING: '--lola-style-button-padding',
  INPUT_PADDING: '--lola-style-input-padding',
  CARD_PADDING: '--lola-style-card-padding',
  
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
