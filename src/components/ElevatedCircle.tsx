import type { CSSProperties, ReactNode } from "react";

export type ElevatedCircleShadowVariant = "normal" | "inset" | "none";

export interface ElevatedCircleProps {
  background?: string;
  children: ReactNode;
  /**
   * Circle diameter. Numbers are treated as pixels.
   * @default 128 — legacy size (128px × 128px)
   */
  size?: number | string;
  /**
   * Box-shadow style.
   * - `"normal"` (legacy): `inset 0 0 5px rgba(0, 0, 0, 0.5)`
   * - `"inset"`: `inset 2px 2px 6px rgba(0, 0, 0, 0.25)`
   * - `"none"`: no box-shadow
   * @default "normal"
   */
  shadowVariant?: ElevatedCircleShadowVariant;
}

const resolveSize = (size: number | string): string =>
  typeof size === "number" ? `${size}px` : size;

export const ElevatedCircle: React.FC<ElevatedCircleProps> = ({
  background = "#fff",
  children,
  size = 128,
  shadowVariant = "normal",
}) => {
  const style = {
    background,
    "--elevated-circle-size": resolveSize(size),
  } as CSSProperties;

  const className = [
    "elevated-circle",
    `elevated-circle--shadow-${shadowVariant}`,
  ].join(" ");

  return (
    <div className={className} style={style}>
      <div className="elevated-circle-section">{children}</div>
    </div>
  );
};
