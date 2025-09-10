import { type ReactElement } from "react";
import { BackArrow } from "../icons";
import { getSplittedColors } from "../utils/utils";
import { Title } from "./Title";

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  backUrl?: string;
  icon?: ReactElement;
  disabled?: boolean;
  onIconClick?: () => void;
  onBackClick?: (link: string) => void;
  noBackButton?: boolean;
  color?: string;
  backIconColors?: [string, string];
  align?: "left" | "center" | "right";
  isLeaving?: boolean;
  textAnimated?: boolean;
  textAnimatedDelay?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  title = "",
  backUrl,
  icon,
  disabled = false,
  onIconClick = () => {},
  onBackClick = () => {},
  noBackButton = false,
  className = "",
  color = "#000",
  backIconColors,
  align = "left",
  isLeaving = false,
  textAnimated = false,
  textAnimatedDelay = 0,
  ...props
}) => {
  const backLink = backUrl ? backUrl : (-1 as unknown as string);
  const isDisabled = disabled ? "disabled" : "active";

  const classes = ["lola-navbar", `lola-navbar-${align}`, className]
    .filter(Boolean)
    .join(" ");

  const iconClasses = [
    "lola-navbar--container--icon",
    `lola-navbar--container--icon--${isDisabled}`,
  ]
    .filter(Boolean)
    .join(" ");

  const finalColors = backIconColors
    ? backIconColors
    : getSplittedColors(color);

  return (
    <div className={classes} {...props}>
      {!noBackButton ? (
        <BackArrow
          size={26}
          colors={finalColors}
          className="lola-navbar--back-icon"
          onClick={() => onBackClick(backLink)}
        />
      ) : (
        <span />
      )}

      <section onClick={onIconClick} className="lola-navbar--container">
        <Title
          color={color}
          title={title}
          align={align}
          isLeaving={isLeaving}
          textAnimated={textAnimated}
          textAnimatedDelay={textAnimatedDelay}
        />
        {icon && <section className={iconClasses}>{icon}</section>}
      </section>
    </div>
  );
};
