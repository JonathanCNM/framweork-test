import { useState } from "react";
import { LabelInput } from "./LabelInput";

export interface InputFieldProps {
  label?: string;
  hint?: string;
  value?: string;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  maxLength?: number;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  noLabel?: boolean;
  isValid?: boolean;
  colors?: [string, string];
  selectedColor?: string;
  borderColor?: string;
  borderRadius?: string;
  errorColor?: [string, string];
  background?: string;
  placeholder?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange = () => {},
  type = "text",
  name,
  maxLength,
  noLabel = false,
  inputStyle = {},
  labelStyle = {},
  isValid = true,
  colors = ["#000", "#000"],
  borderColor = "#979797",
  borderRadius = "10",
  errorColor = ["#fd2a35", "#fd2a35"],
  background = "#fff",
  placeholder = "",
}) => {
  const [focused, setFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState(value ?? "");
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
    onChange(event);
  };

  const showLabel = focused || currentValue?.length > 0;

  const styles = {
    borderRadius: `${borderRadius}px`,
    "--color1": !isValid ? errorColor[0] : showLabel ? colors[0] : borderColor,
    "--color2": !isValid ? errorColor[1] : showLabel ? colors[1] : borderColor,
  };

  const labelColors: [string, string] = showLabel
    ? colors
    : [borderColor, borderColor];

  const finalPlaceHolder = noLabel ? placeholder : "";

  return (
    <div className="lola-input-field">
      {!noLabel && (
        <LabelInput
          isActive={showLabel}
          colors={labelColors}
          background={background}
          labelStyle={labelStyle}
        >
          {label}
        </LabelInput>
      )}

      <section style={styles} className="lola-input-field--container">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={finalPlaceHolder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          maxLength={maxLength}
          style={{ ...inputStyle }}
          className=""
        />
      </section>
    </div>
  );
};
