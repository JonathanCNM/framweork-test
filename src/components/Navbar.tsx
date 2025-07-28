import { type ReactElement } from "react";
import { KeyboardBackspaceIcon } from "../assets/KeyboardBackspaceIcon";

export interface NavbarProps {
  title: string;
  backUrl?: string;
  icon?: ReactElement;
  disabled?: boolean;
  onIconClick?: () => void;
  onBackClick?: (link: string) => void;
  noBackButton?: boolean;
  className?: string;
  color?: "green" | "blue" | "purple" | "pink";
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  backUrl,
  icon,
  disabled = false,
  onIconClick = () => {},
  onBackClick = () => {},
  noBackButton = false,
  className = "",
  color = "green",
}) => {
  const backLink = backUrl ? backUrl : (-1 as unknown as string);
  const isDisabled = disabled ? "disabled" : "active";

  const classes = [`lola-navbar`, `lola-navbar--${color}`, className]
    .filter(Boolean)
    .join(" ");

  const iconClasses = [
    "lola-navbar--container--icon",
    `lola-navbar--container--icon--${color}`,
    `lola-navbar--container--icon--${isDisabled}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {!noBackButton ? (
        <KeyboardBackspaceIcon
          className="lola-navbar--back-icon"
          onClick={() => onBackClick(backLink)}
        />
      ) : (
        <span />
      )}

      <section onClick={onIconClick} className="lola-navbar--container">
        <h1 className="lola-navbar--container--title">{title}</h1>
        {icon && <section className={iconClasses}>{icon}</section>}
      </section>
    </div>
  );
};
