import { useEffect, useState } from "react";

export type RotatingTextProps<T extends React.ElementType> = {
  as?: T;
  messages: string[];
  textColor?: string;
} & React.ComponentPropsWithoutRef<T>;

const RotatingText = <T extends React.ElementType = "p">({
  as,
  messages = [],
  className = "",
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

  return (
    <Component {...props} className={classes}>
      {messages[index]}
    </Component>
  );
};

export default RotatingText;
