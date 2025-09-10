import * as React from "react";

export type TextProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
  textColor?: string;
  background?: string;
  isLeaving?: boolean;
  textAnimated?: boolean;
  textAnimatedDelay?: number;
} & React.ComponentPropsWithoutRef<T>;

export const GradientText = <T extends React.ElementType = "p">({
  as,
  children,
  textColor = "#000",
  background = "transparent",
  className = "",
  isLeaving = false,
  textAnimated = false,
  textAnimatedDelay = 0,
  ...props
}: TextProps<T>) => {
  const Component = as || "p";

  const isGradient = textColor.includes("gradient");
  const clasess = [
    "lola-gradient-text",
    "typing-text",
    textAnimated ? "typing-in" : "",
    isLeaving ? "typing-out" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
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
          "--delay": `${textAnimatedDelay}s`,
        } as React.CSSProperties & { [key: string]: string }
      }
    >
      {children}
    </Component>
  );
};
