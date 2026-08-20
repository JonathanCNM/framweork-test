import { useEffect, useState } from "react";

export type RotatingTextProps<T extends React.ElementType> = {
  as?: T;
  messages: string[];
  textColor?: string;
  /** Used when `lightness` is dark and system theme is on. */
  bodyCopy?: string;
  themeType?: string;
  useSystemTheme?: boolean;
} & React.ComponentPropsWithoutRef<T>;

const RotatingText = <T extends React.ElementType = "p">({
  as,
  messages = [],
  className = "",
  textColor,
  bodyCopy,
  themeType,
  useSystemTheme = false,
  style,
  ...props
}: RotatingTextProps<T>) => {
  const Component = as || "p";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [messages.length]);

  const classes = ["animate-fade", "lola-body-copy", "bodycopy", className]
    .filter(Boolean)
    .join(" ");

  const resolvedColor =
    useSystemTheme && themeType === "dark"
      ? bodyCopy ?? "var(--foreground)"
      : textColor;

  return (
    <Component
      {...props}
      className={classes}
      style={{
        ...style,
        ...(resolvedColor ? { color: resolvedColor } : {}),
      }}
    >
      {messages[index]}
    </Component>
  );
};

export default RotatingText;
