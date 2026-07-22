import type { CSSProperties } from "react";
import "../styles/quote-section.css";

export interface QuoteSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  children,
  className = "",
  style = {},
}) => {
  const cn = ["estimated-quote-section", className].filter(Boolean).join(" ");

  return (
    <section className={cn} style={style}>
      <section className="quote-container">{children}</section>
    </section>
  );
};
