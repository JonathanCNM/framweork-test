import { memo } from "react";
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
    const { themeType, dropzoneColors, iconColors, background } = colorConfig;
    const isDark = themeType === "dark";
    const auraColors = isDark ? dropzoneColors : iconColors;

    return (
      <MotionWrapper>
        <Layout
          background={background}
          auraColors={auraColors}
          className={className}
        >
          {children}
        </Layout>
      </MotionWrapper>
    );
  }
);
