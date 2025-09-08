import * as React from "react";
import { GradientText } from "./GradientText";

export type BodyCopyProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode | string;
  textColor?: string;
  background?: string;
} & React.ComponentPropsWithoutRef<T>;

export const BodyCopy = <T extends React.ElementType = "p">({
  as,
  textColor = "#222",
  children,
  ...props
}: BodyCopyProps<T>) => {
  const Component = as || "p";
  const classes = ["lola-body-copy", "body-copy", props.className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <GradientText
      {...props}
      as={Component}
      textColor={textColor}
      className={classes}
    >
      {children}
    </GradientText>
  );
};
