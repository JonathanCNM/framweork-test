import * as React from "react";

export type BodyCopyProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode | string;
  textColor?: string;
  background?: string;
  isLeaving?: boolean;
  textAnimated?: boolean;
  textAnimatedDelay?: number;
} & React.ComponentPropsWithoutRef<T>;

export const BodyCopy = <T extends React.ElementType = "p">({
  as,
  className = "",
  isLeaving = false,
  textAnimated = false,
  textAnimatedDelay = 0,
  children,
  ...props
}: BodyCopyProps<T>) => {
  const Component = as || "p";
  const classes = [
    "lola-body-copy",
    "bodycopy",
    textAnimated ? "typing-text" : "",
    textAnimated ? "typing-in" : "",
    isLeaving ? "typing-out" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      {...props}
      className={classes}
      style={
        {
          ...props.style,
          "--delay": `${textAnimatedDelay}s`,
        } as React.CSSProperties & { [key: string]: string }
      }
    >
      {children}
    </Component>
  );
};
