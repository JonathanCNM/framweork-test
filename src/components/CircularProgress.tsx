import * as React from "react";
import { Loader } from "./Loader";

export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  children?: React.ReactNode;
  variant?: "full" | "loading";
  colors?: [string, string];
  strokeWidth?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 154,
  colors = ["#000", "#000"],
  children,
  variant = "loading",
  strokeWidth = 4,
  ...props
}) => {
  const value = variant === "full" ? 100 : undefined;
  const classes = ["lola-cirular-progress", props.className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section {...props} className={classes}>
      <Loader
        size={size}
        value={value}
        colors={colors}
        strokeWidth={strokeWidth}
      />
      {children && (
        <section className="lola-cirular-progress--element">{children}</section>
      )}
    </section>
  );
};
