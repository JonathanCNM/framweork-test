import type { CSSProperties, ReactNode } from "react";

export type ElevatedCircleShadowVariant = "normal" | "inset" | "none";

export interface ElevatedCircleProps {
  background?: string;
  /**
   * Circular fill behind the icon glyph. Uses theme `--lola-screen-icon-fill`
   * when set; otherwise the inner disc is transparent (legacy look).
   */
  iconBackground?: string;
  /**
   * Inner padding between the glyph and the fill disc. Numbers are pixels.
   * Unset = authored SVG size (legacy).
   */
  iconPadding?: number | string;
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

const resolvePadding = (padding: number | string): string =>
  typeof padding === "number" ? `${padding}px` : padding;

export const ElevatedCircle: React.FC<ElevatedCircleProps> = ({
  background = "#fff",
  iconBackground,
  iconPadding,
  children,
  size = 128,
  shadowVariant = "normal",
}) => {
  const hasIconPadding = iconPadding !== undefined && iconPadding !== "";
  const style = {
    background,
    "--elevated-circle-size": resolveSize(size),
    ...(hasIconPadding
      ? { "--lola-screen-icon-padding": resolvePadding(iconPadding) }
      : {}),
    minHeight: resolveSize(size),
    minWidth: resolveSize(size),
  } as CSSProperties;

  const iconStyle = iconBackground
    ? ({ background: iconBackground } as CSSProperties)
    : undefined;

  const className = [
    "elevated-circle",
    `elevated-circle--shadow-${shadowVariant}`,
    hasIconPadding ? "elevated-circle--icon-padded" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} style={style}>
      <div className="elevated-circle-section" style={iconStyle}>
        {children}
      </div>
    </div>
  );
};
