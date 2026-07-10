/**
 * CSS Variables Management Hook
 * Handles injection and management of CSS custom properties
 */

import { useEffect } from 'react';
import type { ColorPalette, ViewColorConfig, StylesConfig } from '../types/theme.types';
import { CSS_VARIABLES } from '../types/theme.types';

/**
 * Default styles configuration
 */
const DEFAULT_STYLES: Required<StylesConfig> = {
  cardBorderRadius: '20px',
  buttonBorderRadius: '20px',
  inputBorderRadius: '10px',
  cardBorderColor: '#E4E4E4',
  inputBorderColor: '#E4E4E4',
  activeBorderBoton: '#1DAFA1',
  tamañoBordeCard: '1px',
  tamañoBordeInput: '1px',
  buttonSize: 'medium',
  buttonPadding: '1rem',
  inputPadding: '0.75rem',
  cardPadding: '1.5rem',
};

/**
 * Button size padding mapping
 */
const BUTTON_SIZE_PADDING: Record<'small' | 'medium' | 'large', string> = {
  small: '0.75rem',
  medium: '1rem',
  large: '1.5rem',
};

/**
 * Injects global color CSS variables into the document
 */
export function injectColorVariables(colors: ColorPalette): void {
  const root = document.documentElement;

  root.style.setProperty(CSS_VARIABLES.PRIMARY_GRADIENT, colors.primaryGradient);
  root.style.setProperty(CSS_VARIABLES.SECONDARY_GRADIENT, colors.secondaryGradient);
  root.style.setProperty(CSS_VARIABLES.SECONDARY_COLOR, colors.secondaryColor);
  root.style.setProperty(CSS_VARIABLES.WHITE_COLOR, colors.whiteColor);
  root.style.setProperty(CSS_VARIABLES.ERROR_COLOR, colors.errorColor);
  root.style.setProperty(CSS_VARIABLES.PARTNER_HIGHLIGHTS, colors.partnerHighlights);
  root.style.setProperty(CSS_VARIABLES.PRIMARY_MESH, colors.primaryMesh);
  
  if (colors.inactived) {
    root.style.setProperty(CSS_VARIABLES.INACTIVED, colors.inactived);
  }
  
  // Card panel background with transparent default
  root.style.setProperty(
    CSS_VARIABLES.CARD_PANEL_BACKGROUND, 
    colors.cardPanelBackground || 'transparent'
  );
  
  // Card backgrounds
  if (colors.cardBackground) {
    root.style.setProperty(CSS_VARIABLES.CARD_BACKGROUND, colors.cardBackground);
  }
  
  if (colors.cardBackgroundSecundary) {
    root.style.setProperty(CSS_VARIABLES.CARD_BACKGROUND_SECUNDARY, colors.cardBackgroundSecundary);
  }
}

/**
 * Injects view-specific CSS variables
 */
export function injectViewVariables(viewConfig: ViewColorConfig): void {
  const root = document.documentElement;

  root.style.setProperty(CSS_VARIABLES.VIEW_BACKGROUND, viewConfig.background);
  root.style.setProperty(CSS_VARIABLES.VIEW_TITLE, viewConfig.title);
  root.style.setProperty(CSS_VARIABLES.VIEW_SUBTITLE, viewConfig.subtitile);
  root.style.setProperty(CSS_VARIABLES.VIEW_BODY, viewConfig.bodyCopy);
  root.style.setProperty(CSS_VARIABLES.VIEW_FOOTER, viewConfig.footerColor);
  root.style.setProperty(CSS_VARIABLES.VIEW_BTN_BG, viewConfig.backgroundBtn);
  root.style.setProperty(CSS_VARIABLES.VIEW_BTN_TEXT, viewConfig.textColorBtn);
}

/**
 * Injects font family CSS variable
 */
export function injectFontVariable(fontFamily: string): void {
  const root = document.documentElement;
  root.style.setProperty(CSS_VARIABLES.FONT_FAMILY, fontFamily);
}

/**
 * Injects style configuration CSS variables
 */
export function injectStyleVariables(styles?: StylesConfig): void {
  const root = document.documentElement;
  const appliedStyles = { ...DEFAULT_STYLES, ...styles };

  root.style.setProperty(CSS_VARIABLES.CARD_BORDER_RADIUS, appliedStyles.cardBorderRadius);
  root.style.setProperty(CSS_VARIABLES.BUTTON_BORDER_RADIUS, appliedStyles.buttonBorderRadius);
  root.style.setProperty(CSS_VARIABLES.INPUT_BORDER_RADIUS, appliedStyles.inputBorderRadius);
  root.style.setProperty(CSS_VARIABLES.CARD_BORDER_COLOR, appliedStyles.cardBorderColor);
  root.style.setProperty(CSS_VARIABLES.INPUT_BORDER_COLOR, appliedStyles.inputBorderColor);
  root.style.setProperty(CSS_VARIABLES.ACTIVE_BORDER_BOTON, appliedStyles.activeBorderBoton);
  root.style.setProperty(CSS_VARIABLES.TAMAÑO_BORDE_CARD, appliedStyles.tamañoBordeCard);
  root.style.setProperty(CSS_VARIABLES.TAMAÑO_BORDE_INPUT, appliedStyles.tamañoBordeInput);
  
  // Button padding: use explicit buttonPadding if provided, otherwise derive from buttonSize
  const buttonPadding = styles?.buttonPadding || BUTTON_SIZE_PADDING[appliedStyles.buttonSize];
  root.style.setProperty(CSS_VARIABLES.BUTTON_PADDING, buttonPadding);
  
  // Input and card padding
  root.style.setProperty(CSS_VARIABLES.INPUT_PADDING, appliedStyles.inputPadding);
  root.style.setProperty(CSS_VARIABLES.CARD_PADDING, appliedStyles.cardPadding);
}

/**
 * Hook to manage CSS custom properties for colors
 */
export function useColorVariables(colors: ColorPalette) {
  useEffect(() => {
    injectColorVariables(colors);
  }, [colors]);

  return { injectColorVariables };
}

/**
 * Hook to manage CSS custom properties for a specific view
 */
export function useViewVariables(viewConfig: ViewColorConfig | null) {
  useEffect(() => {
    if (viewConfig) {
      injectViewVariables(viewConfig);
    }
  }, [viewConfig]);

  return { injectViewVariables };
}

/**
 * Hook to manage font family CSS variable
 */
export function useFontVariable(fontFamily: string) {
  useEffect(() => {
    injectFontVariable(fontFamily);
  }, [fontFamily]);

  return { injectFontVariable };
}

/**
 * Hook to manage style configuration CSS variables
 */
export function useStyleVariables(styles?: StylesConfig) {
  useEffect(() => {
    injectStyleVariables(styles);
  }, [styles]);

  return { injectStyleVariables };
}

/**
 * Combined hook for all CSS variables
 */
export function useCSSVariables(
  colors: ColorPalette,
  fontFamily: string,
  viewConfig?: ViewColorConfig | null,
  styles?: StylesConfig
) {
  useColorVariables(colors);
  useFontVariable(fontFamily);
  useStyleVariables(styles);
  
  useEffect(() => {
    if (viewConfig) {
      injectViewVariables(viewConfig);
    }
  }, [viewConfig]);

  return {
    injectColorVariables,
    injectViewVariables,
    injectFontVariable,
    injectStyleVariables,
  };
}
