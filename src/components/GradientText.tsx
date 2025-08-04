import * as React from "react";

export type TextProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
  color?: "green" | "blue" | "purple" | "pink";
} & React.ComponentPropsWithoutRef<T>;

export const GradientText = <T extends React.ElementType = "p">({
  as,
  children,
  color = "green",
  ...props
}: TextProps<T>) => {
  const Component = as || "p";
  const gradientClassname = `lola-${color}--gradient`;

  return (
    <Component className={`lola-gradient-text ${gradientClassname}`} {...props}>
      {children}
    </Component>
  );
};
