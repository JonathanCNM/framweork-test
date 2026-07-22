import type { CSSProperties } from "react";
import "../styles/transfer-panel-section.css";

export interface TransferPanelSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const TransferPanelSection: React.FC<TransferPanelSectionProps> = ({
  children,
  className = "",
  style = {},
}) => {
  const cn = ["transfer-panel-container", className].filter(Boolean).join(" ");

  return (
    <section className={cn} style={style}>
      {children}
    </section>
  );
};
