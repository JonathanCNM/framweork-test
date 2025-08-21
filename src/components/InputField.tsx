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
  color?: string;
  borderColor?: string;
  borderRadius?: string;
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
  color = "#000",
  borderColor = "#979797",
  borderRadius = "10",
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

  const isInputEmpty = inputValue.length === 0 && focused;
  const showLabel = focused || inputValue.length > 0;

  const styles = {
    borderRadius: `${borderRadius}px`,
    "--bg": isInputEmpty ? errorColor : isValid ? color : errorColor,
  };

  const labelColors = isInputEmpty
    ? errorColor
    : showLabel
    ? color
    : borderColor;

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
