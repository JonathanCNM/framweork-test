import type { JSX } from "react";
import { GradientText } from "./GradientText";
import { RightIcon } from "../icons";

export interface PayoutInfoProps {
  title: string;
  subtitle: string;
  icon: JSX.Element;
  onChange?: () => void;
  background?: string;
  color?: string;
  fee?: string | JSX.Element;
  className?: string;
}

export const PayoutInfo: React.FC<PayoutInfoProps> = ({
  title,
  subtitle,
  icon,
  onChange = () => {},
  background = "#fff",
  color = "#252525",
  fee,
  className = "",
}) => {
  return (
    <section
      className={`payout-container-content ${className}`.trim()}
      onClick={onChange}
      style={
        {
          "--bgc": background,
        } as React.CSSProperties
      }
    >
      <section className="payout-container-info">
        <section className="payout-icon-container">{icon}</section>
        <GradientText textColor={color} className="payout-text-info">
          {title}
          <label>{subtitle}</label>
        </GradientText>
      </section>
      {fee ? fee : <RightIcon size={30} colors={[color, color]} />}
    </section>
  );
};
