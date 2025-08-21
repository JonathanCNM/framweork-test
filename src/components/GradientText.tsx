import * as React from "react";

export type TextProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
  textColor?: string;
  background?: string;
} & React.ComponentPropsWithoutRef<T>;

export const GradientText = <T extends React.ElementType = "p">({
  as,
  children,
  textColor = "#000",
  background = "transparent",
  className = "",
  ...props
}: TextProps<T>) => {
  const Component = as || "p";

  const isGradient = textColor.includes("gradient");
  const clasess = ["lola-gradient-text", className].filter(Boolean).join(" ");
  const finalTextColor = isGradient
    ? `${textColor} text, ${background}`
    : `linear-gradient(90deg, ${textColor} 0%, ${textColor} 100%) text, ${background}`;

  return (
    <Component
      {...props}
      className={clasess}
      style={
        {
          ...props.style,
          "--textColor": finalTextColor,
          "--bg": background,
        } as React.CSSProperties & { [key: string]: string }
      }
    >
      {children}
    </Component>
  );
};
