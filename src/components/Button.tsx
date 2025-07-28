import { Loader } from "./Loader";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "green" | "blue" | "purple" | "pink";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  variant?: "default" | "gradient" | "link" | "outline" | "cancel";
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  color = "green",
  size = "medium",
  className = "",
  loading = false,
  children,
  ...props
}) => {
  const isDisabled = loading || props?.disabled;
  const classes = [
    `lola-button`,
    `lola-button--${variant}`,
    `lola-button--${color}`,
    `lola-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button disabled={isDisabled} className={classes} {...props}>
      {loading && <Loader />}
      {children ?? "button"}
    </button>
  );
};
