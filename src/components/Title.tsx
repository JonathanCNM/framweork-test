import { GradientText } from "./GradientText";

export interface TitleProps {
  title: string;
  subTitle?: string;
  size?: "sm" | "lg" | "xl";
  align?: "left" | "center" | "right";
  colors?: [string, string];
}

export const Title: React.FC<TitleProps> = ({
  title,
  subTitle,
  size = "lg",
  align = "left",
  colors = ["#000", "#000"],
}) => {
  const classes = [`lola-title`, `lola-title--${size}`, `lola-title--${align}`]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes}>
      <GradientText as="h2" colors={colors}>
        {title}
      </GradientText>
      {subTitle && <p className="lola-title--subtitle">{subTitle}</p>}
    </section>
  );
};
