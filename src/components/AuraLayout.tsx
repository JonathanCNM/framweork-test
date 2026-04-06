import { memo, useEffect } from "react";
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
      iconColors,
      background,
      useSystemTheme,
      viewConfig,
    } = colorConfig;
    const isDark = themeType === "dark";
    const auraColors = isDark ? dropzoneColors : iconColors;

    const systemThemeClassName = useSystemTheme
      ? ["whiteView", "dataView"].includes(viewConfig)
        ? "white-view-background"
        : ""
      : "";

    useEffect(() => {
      if (!useSystemTheme) document.documentElement.classList.add("light");
    }, [useSystemTheme]);

    const classes = [systemThemeClassName, className].filter(Boolean).join(" ");

    return (
      <MotionWrapper>
        <Layout
          background={background}
          auraColors={auraColors}
          className={classes}
        >
          {children}
        </Layout>
      </MotionWrapper>
    );
  }
);
