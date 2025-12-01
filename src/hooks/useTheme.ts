import { useEffect } from "react";

export interface ThemeText {
  weight?: string | number;
  min?: string;
  max?: string;
  lineHeight?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IUseTheme {
  [className: string]: ThemeText;
}

export interface IViewColorConfig {
  background: string;
  iconColors: [string, string];
  backgroundIcon: string;
  title: string;
  subtitile: string;
  bodyCopy: string;
  footerColor: string;
  backgroundBtn: string;
  textColorBtn: string;
  stepsColors: string;
  dropzoneColors: [string, string];
  stepsLabelColor: string;
  themeType?: string;
}

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateColorsByView = (theme: Record<string, any> | null) => {
    let newTheme: IViewConfig | null = null;
    if (theme?.lightness === "dark") {
      newTheme = {
        primaryMeshGradientView: {
          background: theme?.primaryMesh,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.whiteColor,
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
        },
        specialView: {
          background: theme?.primaryMesh,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.whiteColor,
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
        },
        dataView: {
          background: theme?.whiteColor,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.whiteColor,
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
        },
        whiteView: {
          background: theme?.whiteColor,
          iconColors: [theme?.secondaryColor, theme?.secondaryColor],
          backgroundIcon: theme?.whiteColor,
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
        },
        errorView: {
          background: theme?.secondaryColor,
          iconColors: [theme?.secondaryColor, theme?.secondaryColor],
          backgroundIcon: theme?.whiteColor,
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
        },
      };
    } else {
      newTheme = {
        primaryMeshGradientView: {
          background: theme?.primaryMesh,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.secondaryColor,
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
        },
        specialView: {
          background: theme?.primaryMesh,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.secondaryColor,
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
        },
        dataView: {
          background: theme?.primaryMesh,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.secondaryColor,
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
        },
        whiteView: {
          background: theme?.whiteColor,
          iconColors: [theme?.primaryGradient, theme?.secondaryGradient],
          backgroundIcon: theme?.whiteColor,
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
        },
        errorView: {
          background: theme?.secondaryColor,
          iconColors: [theme?.secondaryColor, theme?.secondaryColor],
          backgroundIcon: theme?.whiteColor,
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
        },
      };
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
