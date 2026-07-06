import { amountFormatter } from "../utils/utils";
import "../styles/transaction-item.css";

export interface TransactionItemProps {
  operationId: string;
  statusInfo: {
    icon: React.ReactNode;
    value: string;
    color: string;
  };
  amount: string;
  currency: string;
  date: string;
  onClick?: (operationId: string) => void;
  footerColor?: string;
  translations: {
    avatar: string;
    transfers: string;
    statusTranslations: Record<string, string>;
  };
  icons?: {
    SuccessIcon?: React.ComponentType<{
      size?: number;
      className?: string;
      colors?: string[];
    }>;
    CloseIcon?: React.ComponentType<{
      size?: number;
      className?: string;
      colors?: string[];
    }>;
    CheckCircleIcon?: React.ReactNode;
    ErrorCircleIcon?: React.ReactNode;
    MoreCircleIcon?: React.ReactNode;
    WarningCircleIcon?: React.ReactNode;
  };
  background?: string;
  textColor?: string;
  alternativeTextColor?: string;
}

/**
 * TransactionItem Component
 * Displays a single transaction item with status, amount, and date
 *
 * @param operationId - Unique transaction ID
 * @param statusInfo - Transaction status
 * @param amount - Transaction amount
 * @param currency - Currency code
 * @param date - Transaction date
 * @param onClick - Callback when item is clicked
 * @param footerColor - Color for icons
 * @param translations - Text translations
 * @param icons - Custom icon components
 * @param background - Custom background of wrapper
 * @param textColor - Custom text color
 * @param alternativeTextColor - Custom alternative text color
 */
export const TransactionItem: React.FC<TransactionItemProps> = ({
  operationId,
  statusInfo,
  amount,
  currency,
  date,
  onClick,
  translations,
  background = "var(--gradient-card)",
  textColor = "var(--foreground)",
  alternativeTextColor = "var(--muted-foreground)",
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(operationId);
    }
  };

  return (
    <section
      className="transactions-history-item"
      onClick={handleClick}
      style={{ cursor: onClick ? "pointer" : "default", background }}
    >
      <p className="transactions-avatar shadow-glow">{translations.avatar}</p>
      <section className="transactions-info">
        <section className="transaction-status-info">
          <p className="transaction-title" style={{ color: textColor }}>
            <b>{translations.transfers}</b>
          </p>
          <section className="transactions-status">
            <span
              className="span-status"
              style={{
                color: statusInfo.color,
              }}
            >
              {statusInfo.icon} {statusInfo.value}
            </span>
          </section>
        </section>
        <section className="amount-date-section">
          <p className="transaction-title tnum" style={{ color: textColor }}>
            <b>
              ${amountFormatter(parseFloat(amount), currency)} {currency}
            </b>
          </p>
          <p
            className="transactions-date tnum"
            style={{ color: alternativeTextColor }}
          >
            {date}
          </p>
        </section>
      </section>
    </section>
  );
};
