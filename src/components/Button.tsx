import { GradientText } from "./GradientText";
import { Loader } from "./Loader";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  variant?: "default" | "link" | "outline" | "cancel";
  loading?: boolean;
  background?: [string, string];
  colors?: [string, string];
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "medium",
  className = "",
  loading = false,
  background = ["#000", "#000"],
  colors = ["#fff", "#fff"],
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

  return (
    <button
      disabled={isDisabled}
      className={classes}
      style={
        {
          ...props.style,
          "--bgcolor1": background[0],
          "--bgcolor2": background[1],
          "--color1": colors[0],
          "--color2": colors[1],
        } as React.CSSProperties & { [key: string]: string }
      }
      {...props}
    >
      {loading && <Loader colors={colors} strokeWidth={2} />}
      <GradientText colors={colors}>{children}</GradientText>
    </button>
  );
};
