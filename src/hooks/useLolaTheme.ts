/**
 * Main Lola Framework Theme Hook
 * Unified hook that orchestrates fonts, colors, and view configurations
 * 
 * @example
 * ```tsx
 * import { useLolaTheme } from '@/hooks/useLolaTheme';
 * import { kapitalTheme } from '@/utils/constants';
 * 
 * function App() {
 *   const theme = useLolaTheme(kapitalTheme);
 *   
 *   // Access view configurations
 *   const primaryView = theme.views.primaryMeshGradientView;
 *   
 *   // Or use CSS variables in your components
 *   <div style={{ color: 'var(--lola-color-primary-gradient)' }}>
 *     Hello World
 *   </div>
 * }
 * ```
 */

import { useEffect, useMemo, useState } from 'react';
import type { LolaThemeConfig, ViewsConfig, FontStyleConfig, ColorPalette } from '../types/theme.types';
import { useFonts } from './useFonts';
import { useViewConfig } from './useViewConfig';
import { useCSSVariables } from './useCSSVariables';

/**
 * Transforms the legacy kapitalTheme format to FontStyleConfig objects
 */
function transformFontStyles(fontConfig: LolaThemeConfig['font']): Record<string, FontStyleConfig> {
  const styles: Record<string, FontStyleConfig> = {};
  
  Object.entries(fontConfig).forEach(([key, value]) => {
    // Skip the font metadata properties
    if (key === 'fontfamily' || key === 'fontcdn') return;
    
    if (typeof value === 'object' && value !== null) {
      styles[key] = {
        fontWeight: value.fontWeight || '400',
        min: value.min || '1rem',
        max: value.max || '1rem',
        lineHeight: value.lineHeight || 'normal',
        dynamicFormula: value.dynamicFormula,
      };
    }
  });
  
  return styles;
}

/**
 * Default dynamic font formulas based on text type
 */
const DEFAULT_DYNAMIC_FORMULAS: Record<string, string> = {
  h1: '2vw + 0.25rem',
  highlight: '2vw + 0.25rem',
  h2: '1.5vw + 0.25rem',
  bodycopy: '1.5vw + 0.25rem',
  secondaryCta: '1.5vw + 0.25rem',
  mainButtonText: '1.5vw + 0.25rem',
  footerText: '0.85rem',
  step: '0.75vw + 0.25rem',
};

/**
 * Generates CSS for text styles
 */
function generateTextStylesCSS(fontStyles: Record<string, FontStyleConfig>, fontFamily: string): string {
  const camelToKebab = (str: string) => str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
  
  return Object.entries(fontStyles)
    .map(([className, config]) => {
      const dynamicFormula = config.dynamicFormula || DEFAULT_DYNAMIC_FORMULAS[className] || '1rem';
      
      const fontSize = config.min && config.max
        ? `font-size: clamp(${config.min}, ${dynamicFormula}, ${config.max});`
        : '';
      
      const fontWeight = `font-weight: ${config.fontWeight};`;
      const lineHeight = `line-height: ${config.lineHeight};`;
      const fontFamilyCSS = `font-family: ${fontFamily}, sans-serif;`;
      
      return `.${camelToKebab(className)} { ${fontSize} ${fontWeight} ${lineHeight} ${fontFamilyCSS} }`;
    })
    .join('\n');
}

/**
 * Injects text styles into the document
 */
function injectTextStyles(fontStyles: Record<string, FontStyleConfig>, fontFamily: string): void {
  const styleTagId = 'lola-text-styles';
  let styleTag = document.getElementById(styleTagId) as HTMLStyleElement | null;

  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = styleTagId;
    document.head.appendChild(styleTag);
  }

  const css = generateTextStylesCSS(fontStyles, fontFamily);
  styleTag.textContent = css;
}

export interface UseLolaThemeReturn {
  /** View configurations for all view types */
  views: ViewsConfig;
  /** Color palette */
  colors: ColorPalette;
  /** Font family name */
  fontFamily: string;
  /** Font styles configuration */
  fontStyles: Record<string, FontStyleConfig>;
  /** Change font dynamically */
  changeFont: (name: string, cdn: string) => void;
  /** Generate view configs from custom colors */
  generateViewConfigs: (colors: ColorPalette) => ViewsConfig;
  /** Download theme configuration as JSON */
  downloadThemeConfig: (filename?: string) => void;
}

/**
 * Main Lola Framework Theme Hook
 * 
 * @param config - Complete theme configuration (supports kapitalTheme format)
 * @returns Theme utilities and configurations
 */
export function useLolaTheme(config: LolaThemeConfig): UseLolaThemeReturn {
  // Extract font configuration
  const fontFamily = config.font.fontfamily || 'sans-serif';
  const fontCdn = config.font.fontcdn || '';
  
  // Transform font styles
  const fontStyles = useMemo(() => transformFontStyles(config.font), [config.font]);
  
  // Initialize font loading
  const { onChangeFont } = useFonts({ name: fontFamily, cdn: fontCdn });
  
  // Generate view configurations
  const { views, generateViewConfigs } = useViewConfig(config.colors, config.views);
  
  // Inject CSS variables
  useCSSVariables(config.colors, fontFamily);
  
  // Inject text styles
  useEffect(() => {
    injectTextStyles(fontStyles, fontFamily);
  }, [fontStyles, fontFamily]);
  
  // Handle font changes
  const changeFont = (name: string, cdn: string) => {
    onChangeFont({ name, cdn });
  };
  
  // Download theme configuration utility
  const downloadThemeConfig = (filename: string = 'lola-theme-config.json') => {
    const themeData = {
      font: config.font,
      colors: config.colors,
      views,
    };
    
    const text = JSON.stringify(themeData, null, 2);
    const blob = new Blob([text], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };
  
  return {
    views,
    colors: config.colors,
    fontFamily,
    fontStyles,
    changeFont,
    generateViewConfigs,
    downloadThemeConfig,
  };
}

/**
 * Hook for accessing a specific view configuration
 * 
 * @example
 * ```tsx
 * const theme = useLolaTheme(kapitalTheme);
 * const primaryView = useLolaView(theme, 'primaryMeshGradientView');
 * ```
 */
export function useLolaView(theme: UseLolaThemeReturn, viewType: keyof ViewsConfig) {
  const [currentView, setCurrentView] = useState(theme.views[viewType]);
  
  useEffect(() => {
    setCurrentView(theme.views[viewType]);
  }, [theme.views, viewType]);
  
  return currentView;
}
