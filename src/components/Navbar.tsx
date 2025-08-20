import { type ReactElement } from "react";
import { KeyboardBackspaceIcon } from "../assets/KeyboardBackspaceIcon";
import { GradientText } from "./GradientText";

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  backUrl?: string;
  icon?: ReactElement;
  disabled?: boolean;
  onIconClick?: () => void;
  onBackClick?: (link: string) => void;
  noBackButton?: boolean;
  className?: string;
  colors?: [string, string];
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
  colors = ["#000", "#000"],
  ...props
}) => {
  const backLink = backUrl ? backUrl : (-1 as unknown as string);
  const isDisabled = disabled ? "disabled" : "active";

  const classes = [`lola-navbar`, className].filter(Boolean).join(" ");

  const iconClasses = [
    "lola-navbar--container--icon",
    `lola-navbar--container--icon--${isDisabled}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {!noBackButton ? (
        <KeyboardBackspaceIcon
          colors={colors}
          className="lola-navbar--back-icon"
          onClick={() => onBackClick(backLink)}
        />
      ) : (
        <span />
      )}

      <section onClick={onIconClick} className="lola-navbar--container">
        <GradientText colors={colors}>{title}</GradientText>
        {icon && <section className={iconClasses}>{icon}</section>}
      </section>
    </div>
  );
};
