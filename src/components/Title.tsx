export interface TitleProps {
  title: string;
  subTitle?: string;
  size?: "sm" | "lg" | "xl";
  align?: "left" | "center" | "right";
  color?: "green" | "blue" | "purple" | "pink" | "black";
  variant?: "solid" | "gradient";
}

export const Title: React.FC<TitleProps> = ({
  title,
  subTitle,
  size = "lg",
  align = "left",
  color = "green",
  variant = "solid",
}) => {
  const classes = [
    `lola-title`,
    `lola-title--${variant}`,
    `lola-title--${color}`,
    `lola-title--${size}`,
    `lola-title--${align}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes}>
      <h2>{title}</h2>
      {subTitle && <p className="lola-title--subtitle">{subTitle}</p>}
    </section>
  );
};
