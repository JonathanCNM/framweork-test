export interface LabelInputProps {
  isActive?: boolean;
  color?: string;
  background?: string;
  labelStyle?: React.CSSProperties;
  children: React.ReactNode;
}

export const LabelInput: React.FC<LabelInputProps> = ({
  isActive = false,
  color = "#252525",
  background = "#fff",
  labelStyle = {},
  children,
}) => {
  const topStyle = !isActive ? "50%" : "0";
  const fontSize = !isActive ? "16px" : "12px";

  return (
    <label
      style={
        {
          ...labelStyle,
          "--size": fontSize,
          "--top": topStyle,
          color,
          background,
        } as React.CSSProperties & { [key: string]: string }
      }
      className="lola--label-input"
    >
      {children}
    </label>
  );
};
