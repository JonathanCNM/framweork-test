import { useMemo, type CSSProperties } from "react";
import "../styles/rainbow-wrapper.css";

export interface RainbowWrapperProps {
  error?: string;
  children: React.ReactNode;
  isActive?: boolean;
  backgroundBtn?: string;
  isStatic?: boolean;
  customRainbowColors?: string[];
  borderStroke?: number;
}

/**
 * RainbowWrapper Component
 * Wraps input elements with a special border effect based on active state
 *
 * @param error - Error message (triggers shake animation)
 * @param children - Content to wrap
 * @param isActive - Whether the wrapper should show active state
 * @param backgroundBtn - Background color for the special border effect
 * @param isStatic - Defines wheter it the wrapper is static or is moving
 * @param customRainbowColors - Defines custom colors for rainbow
 * @param borderStroke - Defines border stroke
 */
export const RainbowWrapper: React.FC<RainbowWrapperProps> = ({
  error,
  children,
  isActive = false,
  backgroundBtn = "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
  isStatic = true,
  customRainbowColors = [],
  borderStroke = 1,
}) => {
  const rainbow = useMemo(
    () => ({
      "--bgr": backgroundBtn,
    }),
    [backgroundBtn]
  );

  const modeClass = isStatic ? "static" : "moving";

  const rainbowMoving = useMemo(() => {
    return {
      "--rainbow-bg": `linear-gradient(90deg,
    ${customRainbowColors.join(",")}
    )`,
    };
  }, [customRainbowColors]);

  const finalRainbow = isStatic ? rainbow : rainbowMoving;

  return (
    <span
      className={`span-input ${
        isActive ? `border-special default ${modeClass}` : ""
      } ${error ? "shake" : ""}`.trim()}
      style={
        {
          ...finalRainbow,
          ...{ "--rainbow-border": `${borderStroke}px` },
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
};
