import { GradientText } from "./GradientText";

export interface LabelInputProps {
  isActive?: boolean;
  colors?: [string, string];
  background?: string;
  labelStyle?: React.CSSProperties;
  children: React.ReactNode;
}

export const LabelInput: React.FC<LabelInputProps> = ({
  isActive = false,
  colors = ["#000", "#000"],
  background = "#fff",
  labelStyle = {},
  children,
}) => {
  const topStyle = !isActive ? "50%" : "0";
  const fontSize = !isActive ? "16px" : "12px";

  return (
    <GradientText
      as="label"
      colors={colors}
      style={
        {
          ...labelStyle,
          "--size": fontSize,
          "--top": topStyle,
        } as React.CSSProperties & { [key: string]: string }
      }
      background={background}
      className="lola--label-input"
    >
      {children}
    </GradientText>
  );
};
