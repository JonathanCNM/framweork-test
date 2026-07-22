import type { JSX } from "react";
import "../styles/transfer-panel.css";

export interface TransferPanelProps {
  amount: string;
  currency: string;
  footerText: string;
  icon?: JSX.Element;
  background?: string;
  textColor?: string;
  alternativeTextColor?: string;
}

/**
 * TransferPanel Component
 * Displays a transfer amount with currency and footer text
 *
 * @param amount - Amount to display
 * @param currency - Currency code
 * @param footerText - Text to display in footer
 * @param icon - Optional icon to display with footer text
 * @param background - Custom background of wrapper
 * @param textColor - Custom text color
 * @param alternativeTextColor - Custom alternative text color
 */
export const TransferPanel: React.FC<TransferPanelProps> = ({
  amount,
  currency,
  footerText,
  icon,
  background = "var(--gradient-card)",
  textColor = "var(--foreground)",
  alternativeTextColor = "var(--muted-foreground)",
}) => {
  return (
    <section className="transfer-panel" style={{ background }}>
      <p className="transfer-footer" style={{ color: textColor }}>
        {icon && icon}
        {footerText}
      </p>
      <h1
        className="amount-text tnum element-right amount-column right-align"
        style={{ color: textColor }}
      >
        {amount}
        <label style={{ color: alternativeTextColor }}>{currency}</label>
      </h1>
    </section>
  );
};
