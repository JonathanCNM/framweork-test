import { useMemo } from "react";
import { getSplittedColors } from "../utils/utils";
import { GradientText } from "./GradientText";
import { Loader } from "./Loader";
import { RightRoundedIcon } from "../icons";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  variant?: "default" | "link" | "outline" | "cancel";
  loading?: boolean;
  background?: string;
  color?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
  isLeaving?: boolean;
  textAnimated?: boolean;
  textAnimatedDelay?: number;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "medium",
  className = "",
  loading = false,
  background = "#000",
  color = "#fff",
  showIcon = false,
  icon,
  isLeaving = false,
  textAnimated = false,
  textAnimatedDelay = 0,
  children,
  ...props
}) => {
  const isDisabled = loading || props?.disabled;
  const btnAlign = showIcon ? "icon" : "centered";
  const classes = [
    `lola-button`,
    `lola-button--${btnAlign}`,
    `lola-button--${variant}`,
    `lola-button--${size}`,
    "button-text",
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
      <span className="lola-button-text">
        {loading && <Loader colors={loaderColors} strokeWidth={2} />}
        <GradientText
          textColor={color}
          isLeaving={isLeaving}
          textAnimated={textAnimated}
          textAnimatedDelay={textAnimatedDelay}
        >
          {children}
        </GradientText>
      </span>
      {showIcon && (
        <>{icon ? icon : <RightRoundedIcon colors={loaderColors} />}</>
      )}
    </button>
  );
};
