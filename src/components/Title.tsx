import { GradientText } from "./GradientText";

export interface TitleProps {
  title?: string;
  subTitle?: string;
  size?: "sm" | "lg" | "xl";
  align?: "left" | "center" | "right";
  color?: string;
  isLeaving?: boolean;
  textAnimated?: boolean;
  textAnimatedDelay?: number;
}

export const Title: React.FC<TitleProps> = ({
  title = "",
  subTitle,
  size = "lg",
  align = "left",
  color = "#000",
  isLeaving = false,
  textAnimated = false,
  textAnimatedDelay = 0,
}) => {
  const classes = [`lola-title`, `lola-title--${size}`, `lola-title--${align}`]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes}>
      <GradientText
        as="h2"
        className="h2"
        textColor={color}
        isLeaving={isLeaving}
        textAnimated={textAnimated}
        textAnimatedDelay={textAnimatedDelay}
      >
        {title}
      </GradientText>
      {subTitle && <p className="lola-title--subtitle">{subTitle}</p>}
    </section>
  );
};
