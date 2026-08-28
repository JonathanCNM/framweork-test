import * as React from "react";
import {
  isGradientColor,
  toLinkFill,
} from "../hooks/themeColorFallbacks";

export type TextLinkProps<T extends React.ElementType = "a"> = {
  as?: T;
  children: React.ReactNode;
  /**
   * Override theme `linkColor`. Solid hex or CSS gradient.
   * Omit to use `--lola-link-color`.
   */
  textColor?: string;
  /** Override theme `linkBold`. */
  bold?: boolean;
  /** Override theme `linkUnderline`. */
  underline?: boolean;
} & React.ComponentPropsWithoutRef<T>;

export const TextLink = <T extends React.ElementType = "a">({
  as,
  children,
  className = "",
  textColor,
  bold,
  underline,
  ...props
}: TextLinkProps<T>) => {
  const Component = as || "a";
  const localGradient = textColor ? isGradientColor(textColor) : undefined;
  const classes = [
    "lola-link",
    "text-link",
    localGradient === true ? "lola-link--gradient" : "",
    localGradient === false ? "lola-link--solid" : "",
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
          ...(textColor
            ? {
                "--lola-link-color": textColor,
                "--lola-link-fill": toLinkFill(textColor),
              }
            : {}),
          ...(bold !== undefined
            ? { "--lola-link-font-weight": bold ? "700" : "400" }
            : {}),
          ...(underline !== undefined
            ? { "--lola-link-text-decoration": underline ? "underline" : "none" }
            : {}),
        } as React.CSSProperties & { [key: string]: string }
      }
    >
      {children}
    </Component>
  );
};
