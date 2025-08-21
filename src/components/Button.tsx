import { useMemo } from "react";
import { getSplittedColors } from "../utils/utils";
import { GradientText } from "./GradientText";
import { Loader } from "./Loader";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  variant?: "default" | "link" | "outline" | "cancel";
  loading?: boolean;
  background?: string;
  color?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "medium",
  className = "",
  loading = false,
  background = "#000",
  color = "#fff",
  children,
  ...props
}) => {
  const isDisabled = loading || props?.disabled;
  const classes = [
    `lola-button`,
    `lola-button--${variant}`,
    `lola-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const loaderColors = useMemo(() => getSplittedColors(color), [color]);

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={classes}
      style={
        {
          ...props.style,
          "--bg": background,
          "--link-bg": color,
        } as React.CSSProperties & { [key: string]: string }
      }
    >
      {loading && <Loader colors={loaderColors} strokeWidth={2} />}
      <GradientText textColor={color}>{children}</GradientText>
    </button>
  );
};
