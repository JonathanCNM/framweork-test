import type { CSSProperties, JSX } from "react";
import { BackArrow } from "../icons";
import "../styles/payout-info.css";

export interface PayoutInfoProps {
  title: string;
  subtitle: string;
  icon: JSX.Element;
  onChange?: () => void;
  iconColor?: string;
  fee?: string | JSX.Element;
  className?: string;
  style?: CSSProperties;
  background?: string;
  textColor?: string;
  alternativeTextColor?: string;
  showBackArrow?: boolean;
}

/**
 * PayoutInfo Component
 * Displays payout method information with icon, title, subtitle, and optional fee
 *
 * @param title - Main title text
 * @param subtitle - Subtitle text
 * @param icon - Icon element to display
 * @param onChange - Callback when item is clicked
 * @param color - Color for the arrow icon (default: "#252525")
 * @param fee - Fee text or element to display
 * @param className - Additional CSS classes
 * @param style - Additional inline styles
 * @param background - Background color for the icon container
 * @param textColor - Text color for the icon container
 * @param alternativeTextColor - Alternative text color for the icon container
 * @param BackArrow - Custom back arrow icon component
 */
export const PayoutInfo: React.FC<PayoutInfoProps> = ({
  title,
  subtitle,
  icon,
  onChange = () => {},
  iconColor = "#252525",
  fee,
  className = "",
  style,
  background = "var(--gradient-card)",
  textColor = "var(--foreground)",
  alternativeTextColor = "var(--muted-foreground)",
  showBackArrow = false,
}) => {
  return (
    <section
      className={`payout-container-content glass gradient-card ${className}`.trim()}
      onClick={onChange}
      style={{ ...style, background } as CSSProperties}
    >
      <section className="payout-container-info">
        <section className="payout-icon-container">{icon}</section>
        <p className="payout-text-info" style={{ color: textColor }}>
          {title}
          {subtitle && (
            <label style={{ color: alternativeTextColor }}>{subtitle}</label>
          )}
        </p>
      </section>
      {fee
        ? fee
        : showBackArrow && (
            <BackArrow
              className="right-icon"
              size={30}
              colors={[iconColor, iconColor]}
            />
          )}
    </section>
  );
};
