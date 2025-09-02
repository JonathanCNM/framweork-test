import { useState } from "react";
import { LabelInput } from "./LabelInput";

export interface InputFieldProps {
  label?: string;
  value?: string;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  maxLength?: number;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  noLabel?: boolean;
  isValid?: boolean;
  borderRadius?: string;
  color?: string;
  inactiveColor?: string;
  activeColor?: string;
  errorColor?: string;
  labelBackground?: string;
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
  borderRadius = "10",
  color = "#222",
  inactiveColor = "#979797",
  activeColor = "#000",
  errorColor = "#fd2a35",
  labelBackground = "#fff",
  placeholder = "",
}) => {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(event);
  };

  const showLabel = focused || inputValue.length > 0;

  const styles = {
    borderRadius: `${borderRadius}px`,
    "--bg": !isValid
      ? errorColor
      : focused
      ? activeColor
      : showLabel
      ? color
      : inactiveColor,
  };

  const labelColors = !isValid
    ? errorColor
    : focused
    ? activeColor
    : showLabel
    ? color
    : inactiveColor;

  const finalPlaceHolder = noLabel ? placeholder : "";

  return (
    <div className="lola-input-field">
      {!noLabel && (
        <LabelInput
          isActive={showLabel}
          color={labelColors}
          background={labelBackground}
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
