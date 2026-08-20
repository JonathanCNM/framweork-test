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
  /** @deprecated Prefer `inactiveColor`. Kept for legacy theme configs. */
  inactived?: string;
  /** Color for inactive/disabled UI (e.g. disabled button background). Falls back to `inactived`. */
  inactiveColor?: string;
  gradient?: string;
  gradientDeg?: string;
  primaryGradientPoint?: string;
  secundaryGradientPoint?: string;
  errorViewBackground?: string;
  /** Background for special views (solid color or gradient). Falls back to primaryMesh if unset. */
  specialViewBackground?: string;
  cardPanelBackground?: string;
  cardBackground?: string;
  cardBackgroundSecundary?: string;
  /**
   * Text color for light system theme (`--foreground` light).
   * Defaults to CSS `#17171c` when unset (legacy).
   */
  foregroundLight?: string;
  /**
   * Text color for dark system theme (`--foreground` dark).
   * Defaults to CSS `#fafafa` when unset (legacy).
   */
  foregroundDark?: string;
  /**
   * White-view title color. Follows `primaryMesh` until set explicitly.
   */
  titleColor?: string;
  /** First stop of ElevatedCircle / screen icons. Unset = per-view mapping (legacy). */
  screenIconPrimary?: string;
  /** Second stop of ElevatedCircle / screen icons. Unset = per-view mapping (legacy). */
  screenIconSecondary?: string;
  /** Screen icon color 1 for `whiteView` and `dataView`. */
  screenIconPrimarySurface?: string;
  /** Screen icon color 2 for `whiteView` and `dataView`. */
  screenIconSecondarySurface?: string;
  /** Screen icon color 1 for `errorView`. */
  screenIconPrimaryError?: string;
  /** Screen icon color 2 for `errorView`. */
  screenIconSecondaryError?: string;
  /** ElevatedCircle fill. Unset = per-view `backgroundIcon` (legacy). */
  screenIconBackground?: string;
  /**
   * Circular fill behind the screen icon glyph (inside ElevatedCircle).
   * Applies to `primaryMeshGradientView` and `specialView`.
   * Unset = no inner disc (legacy ElevatedCircle).
   */
  screenIconFill?: string;
  /**
   * Icon glyph fill for `whiteView` and `dataView`.
   * Unset = no inner disc (legacy ElevatedCircle).
   */
  screenIconFillSurface?: string;
  /**
   * Icon glyph fill for `errorView`.
   * Unset = no inner disc (legacy ElevatedCircle).
   */
  screenIconFillError?: string;
  /**
   * Inner padding between the glyph and its fill disc in
   * `primaryMeshGradientView` / `specialView`. Unset = authored SVG size (legacy).
   */
  screenIconPadding?: string | number;
  /**
   * Inner icon padding for `whiteView` and `dataView`.
   * Unset = authored SVG size (legacy).
   */
  screenIconPaddingSurface?: string | number;
  /**
   * Inner icon padding for `errorView`. Unset = authored SVG size (legacy).
   */
  screenIconPaddingError?: string | number;
  /** First stop of input icons. Unset = view `iconColors` (legacy). */
  inputIconPrimary?: string;
  /** Second stop of input icons. Unset = view `iconColors` (legacy). */
  inputIconSecondary?: string;
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
  /**
   * Whether continue buttons should show the icon in this view.
   * Comes from styles.buttonShowIcon (default: true for legacy).
   * Pass manually to Button: `showIcon={theme.specialView.buttonShowIcon}`.
   */
  buttonShowIcon?: boolean;
  /**
   * Button size for this view.
   * Comes from styles.buttonSize (default: 'large' for legacy).
   * Pass manually to Button: `size={theme.specialView.buttonSize}`.
   */
  buttonSize?: ButtonSize;
  /**
   * Background for icon containers in this view (not icon SVG colors).
   * Mapped per view type (default: `'transparent'` for legacy).
   * Global override via `styles.iconContainerBackground` when set.
   * Pass manually e.g. to ElevatedCircle: `background={theme.specialView.iconContainerBackground}`.
   */
  iconContainerBackground?: string;
  /**
   * Colors for icons inside inputs. Falls back to `iconColors` when the theme
   * does not set `inputIconPrimary` (legacy).
   */
  inputIconColors?: [string, string];
  /** Circular fill behind the icon glyph in ElevatedCircle. Unset = legacy (no inner disc). */
  iconFill?: string;
  /**
   * Inner padding between the glyph and the fill disc. Unset = authored SVG size (legacy).
   */
  iconPadding?: string;
  /**
   * AuraLayout pseudo-element colors. Always the primaryMesh stops, independent
   * of screen icon colors.
   */
  auraColors?: [string, string];
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
  
  /**
   * Exposed on each view as `buttonSize` for consumers to pass to Button
   * via `size={view.buttonSize}` when desired.
   * If unset, falls back to `'large'` (legacy). Button itself does not read this.
   */
  buttonSize?: ButtonSize;

  /**
   * Exposed on each view as `buttonShowIcon` for consumers to pass to Button
   * via `showIcon={view.buttonShowIcon}` when desired.
   * If unset, falls back to `true` (legacy). Button itself does not read this.
   */
  buttonShowIcon?: boolean;

  /**
   * Global override for icon *container* backgrounds (e.g. ElevatedCircle), not icons.
   * When set, applied to every view's `iconContainerBackground`.
   * When unset, each view uses its mapping default (`'transparent'` — legacy).
   * Pass manually: `background={view.iconContainerBackground}`. Does not auto-apply.
   */
  iconContainerBackground?: string;
  
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
  CARD_BACKGROUND: '--lola-color-card-background',
  CARD_BACKGROUND_SECUNDARY: '--lola-color-card-background-secundary',
  FOREGROUND_LIGHT: '--lola-foreground-light',
  FOREGROUND_DARK: '--lola-foreground-dark',
  SCREEN_ICON_FILL: '--lola-screen-icon-fill',
  SCREEN_ICON_PADDING: '--lola-screen-icon-padding',
  
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
  ICON_CONTAINER_BACKGROUND: '--lola-style-icon-container-background',
  
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Legacy interface for backward compatibility
 * @deprecated Use LolaThemeConfig instead
 */
export interface LegacyUseTheme {
  [className: string]: LegacyThemeText;
}
