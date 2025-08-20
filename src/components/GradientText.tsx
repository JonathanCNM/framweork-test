import * as React from "react";

export type TextProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
  colors?: [string, string];
  background?: string;
  style?: React.CSSProperties;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

export const GradientText = <T extends React.ElementType = "p">({
  as,
  children,
  colors = ["#000", "#000"],
  background = "transparent",
  style = {},
  className = "",
  ...props
}: TextProps<T>) => {
  const Component = as || "p";

  const clasess = ["lola-gradient-text", className].filter(Boolean).join(" ");

  return (
    <Component
      className={clasess}
      {...props}
      style={
        {
          ...style,
          "--color1": colors[0],
          "--color2": colors[1],
          "--bg": background,
        } as React.CSSProperties & { [key: string]: string }
      }
    >
      {children}
    </Component>
  );
};
