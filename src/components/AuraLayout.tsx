import { memo, useEffect, type CSSProperties } from "react";
import type { IViewColorConfig } from "../hooks";
import { MotionWrapper } from "./MotionWrapper";
import { Layout } from "./Layout";

export interface AuraLayoutProps {
  children: React.ReactNode;
  colorConfig: IViewColorConfig;
  className?: string;
}

export const AuraLayout: React.FC<AuraLayoutProps> = memo(
  ({ children, colorConfig, className = "" }) => {
    const {
      themeType,
      dropzoneColors,
      background,
      useSystemTheme,
      viewConfig,
      auraColors: meshAuraColors,
      iconFill,
    } = colorConfig;
    const isDark = themeType === "dark";
    const auraColors = meshAuraColors ?? dropzoneColors;
    const isSystemSurface = ["whiteView", "dataView"].includes(viewConfig);

    const systemThemeClassName =
      useSystemTheme && isDark && isSystemSurface
        ? "white-view-background"
        : "";

    useEffect(() => {
      const root = document.documentElement;
      const followSystem = Boolean(useSystemTheme && isDark);

      if (!followSystem) {
        root.classList.remove("dark");
        root.classList.add("light");
        return;
      }

      const syncHtmlScheme = () => {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        root.classList.toggle("dark", prefersDark);
        root.classList.toggle("light", !prefersDark);
      };

      syncHtmlScheme();
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", syncHtmlScheme);
      return () => media.removeEventListener("change", syncHtmlScheme);
    }, [useSystemTheme, isDark]);

    const classes = [systemThemeClassName, className, isDark ? "dark" : "light"]
      .filter(Boolean)
      .join(" ");

    return (
      <MotionWrapper>
        <Layout
          background={background}
          auraColors={auraColors}
          className={classes}
          style={
            {
              "--lola-screen-icon-fill": iconFill ?? "transparent",
            } as CSSProperties
          }
        >
          {children}
        </Layout>
      </MotionWrapper>
    );
  }
);
