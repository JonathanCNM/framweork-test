/**
 * Lola Framework UI Hooks
 * Centralized exports for all hooks
 */

// ============================================
// THEME HOOKS (New System)
// ============================================

// Main theme hook (recommended)
export { useLolaTheme, useLolaView } from './useLolaTheme';
export type { UseLolaThemeReturn } from './useLolaTheme';

// Individual specialized hooks
export { useFonts } from './useFonts';
export type { UseFontsProps } from './useFonts';

export { useViewConfig, generateViewConfigs } from './useViewConfig';

export {
  useCSSVariables,
  useColorVariables,
  useViewVariables,
  useFontVariable,
  injectColorVariables,
  injectViewVariables,
  injectFontVariable,
  injectStyleVariables,
  getResolvedStyles,
  subscribeResolvedStyles,
} from './useCSSVariables';

// Legacy theme hooks (deprecated but maintained for backward compatibility)
export { useTheme } from './useTheme';
export type {
  IUseTheme,
  IViewColorConfig,
  IViewConfig,
  ThemeText,
} from './useTheme';

// ============================================
// UTILITY HOOKS
// ============================================

// Keyboard and input management
export { useKeyboardVisible } from './useKeyboardVisible';

// Local storage utilities
export { setLocalStorage, listenLocalStorage, storageEventTarget } from './useLocalStorage';

// Scroll management
export { useBlockScroll } from './useBlockScroll';

// Browser behavior
export { usePreventReload } from './usePreventReload';

// VGS Collect integration
export { useVgsCollectLoader } from './useVgsCollectLoader';
export type { UseVgsCollectLoaderProps } from './useVgsCollectLoader';

// ============================================
// TYPE EXPORTS
// ============================================

export type {
  LolaThemeConfig,
  ColorPalette,
  FontConfig,
  FontStyleConfig,
  ViewColorConfig,
  ViewsConfig,
  ViewType,
  ThemeLightness,
} from '../types/theme.types';

export { CSS_VARIABLES } from '../types/theme.types';
