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
  return { onSetTheme, downloadThemeTxt };
};

const camelToKebab = (str: string) =>
  str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
