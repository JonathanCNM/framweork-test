import type { CSSProperties } from "react";
import "../styles/exchange-fee-info.css";

export interface ExchangeFeeInfoProps {
  fee: string;
  currency: string;
  chipBackground?: string;
  textColor?: string;
  translations: { rateText: string };
  ExchangeIcon?: React.ReactNode;
  className?: React.ReactNode;
  style?: CSSProperties;
}

/**
 * ExchangeFeeInfo Component
 * Displays exchange rate information in a chips-style container
 *
 * @param fee - Exchange fee/rate value
 * @param currency - Target currency code
 * @param chipBackground - Background color for the chips
 * @param textColor - Text color for the chips
 * @param translations - Translation text (expects rateText with {from}, {rate}, {to} placeholders)
 * @param ExchangeIcon - Custom exchange icon (can be svg, img, or any React element)
 * @param className - Custom className to main container
 * @param style - Custom style to main container
 */
export const ExchangeFeeInfo: React.FC<ExchangeFeeInfoProps> = ({
  fee,
  currency,
  chipBackground = "var(--gradient-glass)",
  textColor = "var(--foreground)",
  translations,
  ExchangeIcon,
  className = "",
  style = {},
}) => {
  const rateText = translations.rateText
    .replace("{from}", "USD")
    .replace("{rate}", fee)
    .replace("{to}", currency);

  const cn = ["exchange-chips-container", className].filter(Boolean).join(" ");
  const cs = {
    "--bgc": chipBackground,
    "--colorc": textColor,
    ...style,
  };

  return (
    <section className={cn} style={cs as React.CSSProperties}>
      <p className="exchange-icon">i</p>
      <p className="exchange-info">{rateText}</p>
      <section className="exchange-icon">{ExchangeIcon}</section>
    </section>
  );
};
