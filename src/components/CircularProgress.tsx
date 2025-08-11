import * as React from "react";
import { Loader } from "./Loader";

export interface CircularProgressProps {
  size?: number;
  children?: React.ReactNode;
  variant?: "full" | "loading";
  colors?: [string, string];
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 154,
  colors = ["#000", "#000"],
  children,
  variant = "loading",
}) => {
  const value = variant === "full" ? 100 : undefined;

  return (
    <section className="lola-cirular-progress">
      <Loader size={size} value={value} colors={colors} />
      {children && (
        <section className="lola-cirular-progress--element">{children}</section>
      )}
    </section>
  );
};
