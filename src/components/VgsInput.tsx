import { useState } from "react";
import {
  VGSCollectForm,
  type VGSCollectFocusEventData,
  type VGSCollectStateParams,
} from "@vgs/collect-js-react";
import { LabelInput } from "./LabelInput";
import { useKeyboardVisible } from "../hooks";
import { ErrorIcon } from "../icons";

export interface VgsInputProps {
  type: "card_holder_name" | "card_number" | "card_exp_date" | "card_cvc";
  placeholder: string;
  cardNumberFormPlaceholder?: string;
  autoFocus?: boolean;
  errorLabel?: string;
  setErrorLabel?: (label?: string) => void;
  borderRadius?: string;
  color?: string;
  inactiveColor?: string;
  activeColor?: string;
}

const {
  TextField,
  CardNumberField,
  CardExpirationDateField,
  CardSecurityCodeField,
} = VGSCollectForm;

const errorColor = "#fd2a35";

export const VgsInput: React.FC<VgsInputProps> = ({
  type,
  autoFocus = false,
  placeholder,
  cardNumberFormPlaceholder,
  errorLabel = "",
  color = "#222",
  borderRadius = 10,
  inactiveColor = "#979797",
  activeColor = "#000",
  setErrorLabel = () => {},
}) => {
  const [isFocus, setIsFocus] = useState(autoFocus);
  const [isValid, setIsValid] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const { handlerSetIsKeyboardOpen } = useKeyboardVisible();

  const onHanlderFocus = (info: VGSCollectFocusEventData<"focus" | "blur">) => {
    setIsFocus(info.type === "focus");
    handlerSetIsKeyboardOpen(info.type === "focus");
  };

  const showLabel = isFocus || !isEmpty;

  const styles = {
    "--radius": `${borderRadius}px`,
    "--bg": isFocus
      ? activeColor
      : !isValid && errorLabel
      ? errorColor
      : showLabel
      ? color
      : inactiveColor,
  };

  const labelColors = isFocus
    ? activeColor
    : !isValid && errorLabel
    ? errorColor
    : showLabel
    ? color
    : inactiveColor;

  const onUpdate = (state: VGSCollectStateParams) => {
    const { isValid, isFocused, isEmpty } = state;
    if (isValid || isFocused) setErrorLabel("");
    setIsFocus(isFocused);
    setIsValid(isValid);
    setIsEmpty(isEmpty);
  };

  if (type === "card_holder_name")
    return (
      <>
        <section
          className="lola-vgs--input secondary-cta"
          style={styles as React.CSSProperties & { [key: string]: string }}
        >
          <LabelInput color={labelColors} isActive={showLabel}>
            {placeholder}
          </LabelInput>
          <TextField
            autoFocus={autoFocus}
            name="card_holder_name"
            validations={["required"]}
            placeholder=""
            css={{ borderRadius: `${borderRadius}px !important` }}
            onFocus={onHanlderFocus}
            onBlur={onHanlderFocus}
            onUpdate={onUpdate}
          />
        </section>
        <ErrorLabel errorMessage={errorLabel} color={errorColor} />
      </>
    );

  if (type === "card_number")
    return (
      <>
        <section
          className="lola-vgs--input secondary-cta"
          style={styles as React.CSSProperties & { [key: string]: string }}
        >
          <LabelInput color={labelColors} isActive={showLabel}>
            {showLabel ? placeholder : cardNumberFormPlaceholder}
          </LabelInput>
          <CardNumberField
            autoFocus={autoFocus}
            name="card_number"
            validations={["required", "validCardNumber"]}
            placeholder=""
            showCardIcon={true}
            onFocus={onHanlderFocus}
            onBlur={onHanlderFocus}
            onUpdate={onUpdate}
          />
        </section>
        <ErrorLabel errorMessage={errorLabel} color={errorColor} />
      </>
    );

  if (type === "card_exp_date")
    return (
      <section style={{ width: "100%" }}>
        <section
          className="lola-vgs--input secondary-cta exp-cvc"
          style={styles as React.CSSProperties & { [key: string]: string }}
        >
          <LabelInput color={labelColors} isActive={showLabel}>
            {placeholder}
          </LabelInput>
          <CardExpirationDateField
            name="card_exp_date"
            autoFocus={autoFocus}
            validations={["required", "validCardExpirationDate"]}
            placeholder=""
            yearLength={2}
            onFocus={onHanlderFocus}
            onBlur={onHanlderFocus}
            onUpdate={onUpdate}
          />
        </section>
        <ErrorLabel errorMessage={errorLabel} color={errorColor} />
      </section>
    );

  if (type === "card_cvc")
    return (
      <section style={{ width: "100%" }}>
        <section
          className="lola-vgs--input secondary-cta exp-cvc"
          style={styles as React.CSSProperties & { [key: string]: string }}
        >
          <LabelInput color={labelColors} isActive={showLabel}>
            {placeholder}
          </LabelInput>
          <CardSecurityCodeField
            name="card_cvc"
            autoFocus={autoFocus}
            validations={["required", "validCardSecurityCode"]}
            placeholder=""
            hideValue
            onFocus={onHanlderFocus}
            onBlur={onHanlderFocus}
            onUpdate={onUpdate}
          />
        </section>
        <ErrorLabel errorMessage={errorLabel} color={errorColor} />
      </section>
    );
};

export const ErrorLabel = ({
  errorMessage,
  color = errorColor,
}: {
  errorMessage?: string;
  color?: string;
}) => {
  return (
    <>
      {errorMessage && (
        <p
          className="error-label"
          style={
            { "--errorColor": color } as React.CSSProperties & {
              [key: string]: string;
            }
          }
        >
          <ErrorIcon size={16} colors={[color, color]} />
          {errorMessage}
        </p>
      )}
    </>
  );
};
