/**
 * CSS Variables Management Hook
 * Handles injection and management of CSS custom properties
 */

import { useEffect } from 'react';
import type { ColorPalette, ViewColorConfig } from '../types/theme.types';
import { CSS_VARIABLES } from '../types/theme.types';

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
 * Combined hook for all CSS variables
 */
export function useCSSVariables(
  colors: ColorPalette,
  fontFamily: string,
  viewConfig?: ViewColorConfig | null
) {
  useColorVariables(colors);
  useFontVariable(fontFamily);
  
  useEffect(() => {
    if (viewConfig) {
      injectViewVariables(viewConfig);
    }
  }, [viewConfig]);

  return {
    injectColorVariables,
    injectViewVariables,
    injectFontVariable,
  };
}
