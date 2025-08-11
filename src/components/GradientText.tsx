import * as React from "react";

export type TextProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
  colors?: [string, string];
} & React.ComponentPropsWithoutRef<T>;

export const GradientText = <T extends React.ElementType = "p">({
  as,
  children,
  colors = ["#000", "#000"],
  ...props
}: TextProps<T>) => {
  const Component = as || "p";

  return (
    <Component
      className="lola-gradient-text"
      {...props}
      style={
        {
          ...props.style,
          "--color1": colors[0],
          "--color2": colors[1],
        } as React.CSSProperties & { [key: string]: string }
      }
    >
      {children}
    </Component>
  );
};
