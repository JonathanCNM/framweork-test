/**
 * Legacy Theme Hook
 * @deprecated This hook is deprecated. Use useLolaTheme instead for a better experience.
 * 
 * Migration example:
 * ```tsx
 * // Old way
 * import { useTheme } from './hooks/useTheme';
 * const theme = useTheme(fontConfig);
 * 
 * // New way
 * import { useLolaTheme } from './hooks/useLolaTheme';
 * const theme = useLolaTheme(kapitalTheme); // Pass complete config
 * ```
 */

import { useEffect } from "react";
import { injectStyleVariables } from "./useCSSVariables";
import type { StylesConfig } from "../types/theme.types";
import {
  resolveInputIconColors,
  resolveScreenIconBackground,
  resolveScreenIconColors,
  resolveScreenIconFill,
  resolveScreenIconPadding,
  resolveTitleColor,
} from "./themeColorFallbacks";

/**
 * @deprecated Use FontStyleConfig from '../types/theme.types' instead
 */
export interface ThemeText {
  weight?: string | number;
  min?: string;
  max?: string;
  lineHeight?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * @deprecated Use LolaThemeConfig from '../types/theme.types' instead
 */
export interface IUseTheme {
  [className: string]: ThemeText;
}

/**
 * @deprecated Use ViewColorConfig from '../types/theme.types' instead
 */
export interface IViewColorConfig {
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
  /** Whether continue buttons should show the icon (default: true, legacy). */
  buttonShowIcon?: boolean;
  /** Button size for this view (default: 'large', legacy). */
  buttonSize?: "small" | "medium" | "large";
  /**
   * Background for icon containers (not icons). Default: 'transparent' (legacy).
   * Pass manually e.g. `background={view.iconContainerBackground}`.
   */
  iconContainerBackground?: string;
  /**
   * Colors for icons inside inputs. Falls back to `iconColors` when unset.
   */
  inputIconColors?: [string, string];
  /** Circular fill behind the icon glyph in ElevatedCircle. Unset = legacy (no inner disc). */
  iconFill?: string;
  /** Inner padding between the glyph and the fill disc. Unset = authored SVG size (legacy). */
  iconPadding?: string;
  /**
   * AuraLayout ::before / ::after stops. Always primaryMesh
   * (`primaryGradient` + `secondaryGradient`), never icon colors.
   */
  auraColors?: [string, string];
  /**
   * Banner highlight background. Falls back to `primaryMesh` when unset (legacy).
   */
  bannerHighlightBackground?: string;
  /**
   * Banner highlight text. Solid or gradient. Unset = `#FFFFFF`.
   * Use `GradientText`, not `style.color`.
   */
  bannerHighlightColor?: string;
  /**
   * Banner highlight icon colors. Falls back to primaryMesh stops when unset.
   */
  bannerHighlightIconColors?: [string, string];
  themeType?: string;
  useSystemTheme?: boolean;
  viewConfig:
    | "primaryMeshGradientView"
    | "specialView"
    | "dataView"
    | "whiteView"
    | "errorView";
}

/**
 * @deprecated Use ViewsConfig from '../types/theme.types' instead
 */
export interface IViewConfig {
  primaryMeshGradientView: IViewColorConfig;
  specialView: IViewColorConfig;
  dataView: IViewColorConfig;
  whiteView: IViewColorConfig;
  errorView: IViewColorConfig;
}

export const useTheme = (theme: IUseTheme) => {
  const onSetTheme = (theme: IUseTheme) => {
    const styleTagId = "global-theme-styles";
    let styleTag = document.getElementById(
      styleTagId
    ) as HTMLStyleElement | null;

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleTagId;
      document.head.appendChild(styleTag);
    }

    let dynamicFont = "2vw + 0.25rem";

    const css = Object.entries(theme)
      .map(([className, rules]) => {
        if (["h1", "highlight"].includes(className))
          dynamicFont = "2vw + 0.25rem";
        if (className === "h2") dynamicFont = "1.5vw + 0.25rem";
        if (["bodycopy", "secondaryCta", "mainButtonText"].includes(className))
          dynamicFont = "1.5vw + 0.25rem";
        if (className === "footerText") dynamicFont = "0.85rem";
        if (className === "step") dynamicFont = "0.75vw + 0.25rem";

        const fontSize =
          rules.min && rules.max
            ? `font-size: clamp(${rules.min}, ${dynamicFont}, ${rules.max});`
            : "";

        const otherRules = Object.entries(rules)
          .filter(([key]) => key !== "min" && key !== "max")
          .map(([key, val]) => `${camelToKebab(key)}: ${val};`)
          .join(" ");

        return `.${camelToKebab(className)} { ${fontSize} ${otherRules} }`;
      })
      .join("\n");

    styleTag.textContent = css;
  };

  useEffect(() => {
    onSetTheme(theme);
  }, [theme]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const downloadThemeTxt = (obj: any, filename: string = "theme.txt") => {
    const text = JSON.stringify(obj, null, 2);
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  /**
   * Generates color configurations for all views
   * @deprecated Use generateViewConfigs from useViewConfig hook instead
   * 
   * NOTE: This is the ORIGINAL implementation preserved for 100% backward compatibility.
   * For new code, use useLolaTheme or useViewConfig instead.
   */
  /**
   * @param theme - Color palette (legacy flat colors object)
   * @param styles - Optional styles config. When provided:
   *   - injects CSS variables (border radius, paddings, etc.)
   *   - exposes buttonShowIcon / buttonSize / iconContainerBackground on each view
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateColorsByView = (
    theme: Record<string, any> | null,
    styles?: StylesConfig | null
  ): IViewConfig | null => {
    if (!theme) return null;

    const bannerHighlightBackground =
      theme.bannerHighlightBackground ?? theme.primaryMesh;
    const bannerHighlightColor = theme.bannerHighlightColor ?? "#FFFFFF";
    const bannerHighlightIconColors: [string, string] = [
      theme.bannerHighlightIconPrimary ?? theme.primaryGradient,
      theme.bannerHighlightIconSecondary ?? theme.secondaryGradient,
    ];

    // Apply theme.styles CSS variables for legacy consumers (useLolaTheme does this automatically)
    if (styles) {
      injectStyleVariables(styles);
    }
    
    // ORIGINAL IMPLEMENTATION - DO NOT MODIFY (except additive optional fields)
    // This ensures existing projects work exactly as before
    let newTheme: IViewConfig | null = null;
    // Prefer value on colors object, then styles, then legacy defaults
    // Use nullish coalescing so explicit `false` / custom sizes are preserved
    const buttonShowIcon =
      theme?.buttonShowIcon ?? styles?.buttonShowIcon ?? true;
    const buttonSize =
      theme?.buttonSize ?? styles?.buttonSize ?? "large";
    // Global override from styles/theme; per-view mapping default is transparent (legacy)
    const iconContainerBackgroundOverride =
      theme?.iconContainerBackground ?? styles?.iconContainerBackground;
    
    if (theme?.lightness === "dark") {
      newTheme = {
        primaryMeshGradientView: {
          background: theme?.primaryMesh,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.whiteColor,
          iconContainerBackground: "transparent",
          title: theme?.partnerHighlights,
          subtitile: theme?.whiteColor,
          bodyCopy: theme?.whiteColor,
          footerColor: theme?.whiteColor,
          backgroundBtn: theme?.whiteColor,
          textColorBtn: theme?.primaryMesh,
          stepsColors: theme?.primaryMesh,
          stepsLabelColor: theme?.whiteColor,
          dropzoneColors: [theme?.primaryGradient, theme?.secondaryGradient],
          themeType: theme?.lightness,
          errorColor: theme?.errorColor,
          highlight: theme?.partnerHighlights,
          bannerHighlightBackground,
          bannerHighlightColor,
          bannerHighlightIconColors,
          useSystemTheme: theme?.useSystemTheme,
          viewConfig: "primaryMeshGradientView",
        },
        specialView: {
          background: theme?.specialViewBackground ?? theme?.primaryMesh,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.whiteColor,
          iconContainerBackground: "transparent",
          title: theme?.partnerHighlights,
          subtitile: theme?.whiteColor,
          bodyCopy: theme?.whiteColor,
          footerColor: theme?.whiteColor,
          backgroundBtn: theme?.whiteColor,
          textColorBtn: theme?.primaryMesh,
          stepsColors: theme?.primaryMesh,
          stepsLabelColor: theme?.whiteColor,
          dropzoneColors: [theme?.primaryGradient, theme?.secondaryGradient],
          themeType: theme?.lightness,
          errorColor: theme?.errorColor,
          highlight: theme?.partnerHighlights,
          bannerHighlightBackground,
          bannerHighlightColor,
          bannerHighlightIconColors,
          useSystemTheme: theme?.useSystemTheme,
          viewConfig: "specialView",
        },
        dataView: {
          background: theme?.whiteColor,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.whiteColor,
          iconContainerBackground: "transparent",
          title: theme?.primaryGradient,
          subtitile: theme?.primaryGradient,
          bodyCopy: theme?.secondaryColor,
          footerColor: theme?.secondaryColor,
          backgroundBtn: theme?.primaryMesh,
          textColorBtn: theme?.whiteColor,
          stepsColors: theme?.primaryMesh,
          stepsLabelColor: theme?.secondaryColor,
          dropzoneColors: [theme?.primaryGradient, theme?.secondaryGradient],
          themeType: theme?.lightness,
          errorColor: theme?.errorColor,
          highlight: theme?.partnerHighlights,
          bannerHighlightBackground,
          bannerHighlightColor,
          bannerHighlightIconColors,
          useSystemTheme: theme?.useSystemTheme,
          viewConfig: "dataView",
        },
        whiteView: {
          background: theme?.whiteColor,
          iconColors: [theme?.secondaryColor, theme?.secondaryColor],
          backgroundIcon: theme?.whiteColor,
          iconContainerBackground: "transparent",
          title: theme?.primaryMesh,
          subtitile: theme?.primaryMesh,
          bodyCopy: theme?.secondaryColor,
          footerColor: theme?.secondaryColor,
          backgroundBtn: theme?.primaryMesh,
          textColorBtn: theme?.whiteColor,
          stepsColors: theme?.primaryMesh,
          stepsLabelColor: theme?.secondaryColor,
          dropzoneColors: [theme?.primaryGradient, theme?.secondaryGradient],
          themeType: theme?.lightness,
          errorColor: theme?.errorColor,
          highlight: theme?.partnerHighlights,
          bannerHighlightBackground,
          bannerHighlightColor,
          bannerHighlightIconColors,
          useSystemTheme: theme?.useSystemTheme,
          viewConfig: "whiteView",
        },
        errorView: {
          background: theme?.errorViewBackground ?? theme?.secondaryColor,
          iconColors: [theme?.secondaryColor, theme?.secondaryColor],
          backgroundIcon: theme?.whiteColor,
          iconContainerBackground: "transparent",
          title: theme?.whiteColor,
          subtitile: theme?.whiteColor,
          bodyCopy: theme?.whiteColor,
          footerColor: theme?.whiteColor,
          backgroundBtn: theme?.whiteColor,
          textColorBtn: theme?.secondaryColor,
          stepsColors: theme?.primaryMesh,
          stepsLabelColor: theme?.whiteColor,
          dropzoneColors: [theme?.primaryGradient, theme?.secondaryGradient],
          themeType: theme?.lightness,
          errorColor: theme?.errorColor,
          highlight: theme?.partnerHighlights,
          bannerHighlightBackground,
          bannerHighlightColor,
          bannerHighlightIconColors,
          useSystemTheme: theme?.useSystemTheme,
          viewConfig: "errorView",
        },
      };
    } else {
      newTheme = {
        primaryMeshGradientView: {
          background: theme?.primaryMesh,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.secondaryColor,
          iconContainerBackground: "transparent",
          title: theme?.secondaryColor,
          subtitile: theme?.secondaryColor,
          bodyCopy: theme?.secondaryColor,
          footerColor: theme?.secondaryColor,
          backgroundBtn: theme?.secondaryColor,
          textColorBtn: theme?.whiteColor,
          stepsColors: theme?.secondaryColor,
          stepsLabelColor: theme?.whiteColor,
          dropzoneColors: [theme?.secondaryColor, theme?.secondaryColor],
          themeType: theme?.lightness,
          errorColor: theme?.errorColor,
          highlight: theme?.partnerHighlights,
          bannerHighlightBackground,
          bannerHighlightColor,
          bannerHighlightIconColors,
          useSystemTheme: theme?.useSystemTheme,
          viewConfig: "primaryMeshGradientView",
        },
        specialView: {
          background: theme?.specialViewBackground ?? theme?.primaryMesh,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.secondaryColor,
          iconContainerBackground: "transparent",
          title: theme?.secondaryColor,
          subtitile: theme?.secondaryColor,
          bodyCopy: theme?.secondaryColor,
          footerColor: theme?.secondaryColor,
          backgroundBtn: theme?.secondaryColor,
          textColorBtn: theme?.whiteColor,
          stepsColors: theme?.secondaryColor,
          stepsLabelColor: theme?.whiteColor,
          dropzoneColors: [theme?.secondaryColor, theme?.secondaryColor],
          themeType: theme?.lightness,
          errorColor: theme?.errorColor,
          highlight: theme?.partnerHighlights,
          bannerHighlightBackground,
          bannerHighlightColor,
          bannerHighlightIconColors,
          useSystemTheme: theme?.useSystemTheme,
          viewConfig: "specialView",
        },
        dataView: {
          background: theme?.primaryMesh,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.secondaryColor,
          iconContainerBackground: "transparent",
          title: theme?.secondaryColor,
          subtitile: theme?.secondaryColor,
          bodyCopy: theme?.secondaryColor,
          footerColor: theme?.secondaryColor,
          backgroundBtn: theme?.secondaryColor,
          textColorBtn: theme?.whiteColor,
          stepsColors: theme?.secondaryColor,
          stepsLabelColor: theme?.whiteColor,
          dropzoneColors: [theme?.secondaryColor, theme?.secondaryColor],
          themeType: theme?.lightness,
          errorColor: theme?.errorColor,
          highlight: theme?.partnerHighlights,
          bannerHighlightBackground,
          bannerHighlightColor,
          bannerHighlightIconColors,
          useSystemTheme: theme?.useSystemTheme,
          viewConfig: "dataView",
        },
        whiteView: {
          background: theme?.whiteColor,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.whiteColor,
          iconContainerBackground: "transparent",
          title: theme?.secondaryColor,
          subtitile: theme?.secondaryColor,
          bodyCopy: theme?.secondaryColor,
          footerColor: theme?.secondaryColor,
          backgroundBtn: theme?.primaryMesh,
          textColorBtn: theme?.secondaryColor,
          stepsColors: theme?.secondaryColor,
          stepsLabelColor: theme?.secondaryColor,
          dropzoneColors: [theme?.secondaryColor, theme?.secondaryColor],
          themeType: theme?.lightness,
          errorColor: theme?.errorColor,
          highlight: theme?.partnerHighlights,
          bannerHighlightBackground,
          bannerHighlightColor,
          bannerHighlightIconColors,
          useSystemTheme: theme?.useSystemTheme,
          viewConfig: "whiteView",
        },
        errorView: {
          background: theme?.errorViewBackground ?? theme?.secondaryColor,
          iconColors: [theme?.secondaryColor, theme?.secondaryColor],
          backgroundIcon: theme?.whiteColor,
          iconContainerBackground: "transparent",
          title: theme?.whiteColor,
          subtitile: theme?.whiteColor,
          bodyCopy: theme?.whiteColor,
          footerColor: theme?.whiteColor,
          backgroundBtn: theme?.whiteColor,
          textColorBtn: theme?.secondaryColor,
          stepsColors: theme?.secondaryColor,
          stepsLabelColor: theme?.secondaryColor,
          dropzoneColors: [theme?.secondaryColor, theme?.secondaryColor],
          themeType: theme?.lightness,
          errorColor: theme?.errorColor,
          highlight: theme?.partnerHighlights,
          bannerHighlightBackground,
          bannerHighlightColor,
          bannerHighlightIconColors,
          useSystemTheme: theme?.useSystemTheme,
          viewConfig: "errorView",
        },
      };
    }

    // Additive: expose button flags/size on every view; optional global iconContainerBackground override
    if (newTheme) {
      (Object.keys(newTheme) as (keyof IViewConfig)[]).forEach((viewKey) => {
        const view = newTheme![viewKey];
        const iconColors = resolveScreenIconColors(
          theme,
          viewKey,
          view.iconColors
        );
        const applyTitleColor =
          (viewKey === "whiteView" || viewKey === "dataView") &&
          theme?.lightness === "dark";
        newTheme![viewKey] = {
          ...view,
          iconColors,
          auraColors: [
            theme?.primaryGradient ?? view.dropzoneColors[0],
            theme?.secondaryGradient ?? view.dropzoneColors[1],
          ],
          iconFill: resolveScreenIconFill(theme, viewKey),
          iconPadding: resolveScreenIconPadding(theme, viewKey),
          backgroundIcon: resolveScreenIconBackground(theme, view.backgroundIcon),
          inputIconColors: resolveInputIconColors(theme, iconColors),
          ...(applyTitleColor
            ? {
                title: resolveTitleColor(theme, view.title),
                subtitile: resolveTitleColor(theme, view.subtitile),
                highlight: resolveTitleColor(theme, view.highlight ?? view.title),
              }
            : {}),
          buttonShowIcon,
          buttonSize,
          ...(iconContainerBackgroundOverride !== undefined
            ? { iconContainerBackground: iconContainerBackgroundOverride }
            : {}),
        };
      });
    }
    
    return newTheme;
  };

  return {
    onSetTheme,
    downloadThemeTxt,
    generateColorsByView,
  };
};

const camelToKebab = (str: string) =>
  str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
