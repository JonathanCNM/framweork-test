import { useState } from "react";
import {
  VGSCollectForm,
  type VGSCollectFocusEventData,
  type VGSCollectStateParams,
} from "@vgs/collect-js-react";
import { LabelInput } from "./LabelInput";

export interface VgsInputProps {
  type: "card_holder_name" | "card_number" | "card_exp_date" | "card_cvc";
  placeholder: string;
  cardNumberFormPlaceholder?: string;
  autoFocus?: boolean;
  errorLabel?: string;
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
}) => {
  const [isFocus, setIsFocus] = useState(autoFocus);
  const [isValid, setIsValid] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const errorColor = "#fd2a35";

  const onHanlderFocus = (info: VGSCollectFocusEventData<"focus" | "blur">) =>
    setIsFocus(info.type === "focus");

  const showLabel = isFocus || !isEmpty;

  const styles = {
    "--radius": `${borderRadius}px`,
    "--bg":
      !isValid && isFocus
        ? errorColor
        : isFocus
        ? activeColor
        : showLabel
        ? color
        : inactiveColor,
  };

  const labelColors =
    !isValid && isFocus
      ? errorColor
      : isFocus
      ? activeColor
      : showLabel
      ? color
      : inactiveColor;

  const onUpdate = (state: VGSCollectStateParams) => {
    const { isValid, isFocused, isEmpty } = state;
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
        <ErrorLabel errorMessage={errorLabel} />
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
            errorColor={errorColor}
            onFocus={onHanlderFocus}
            onBlur={onHanlderFocus}
            onUpdate={onUpdate}
          />
        </section>
        <ErrorLabel errorMessage={errorLabel} />
      </>
    );

  if (type === "card_exp_date")
    return (
      <section style={{ width: "100%" }}>
        <section
          className="lola-vgs--input secondary-cta"
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
            errorColor={errorColor}
            onFocus={onHanlderFocus}
            onBlur={onHanlderFocus}
            onUpdate={onUpdate}
          />
        </section>
        <ErrorLabel errorMessage={errorLabel} />
      </section>
    );

  if (type === "card_cvc")
    return (
      <section style={{ width: "100%" }}>
        <section
          className="lola-vgs--input secondary-cta"
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
            errorColor={errorColor}
            onFocus={onHanlderFocus}
            onBlur={onHanlderFocus}
            onUpdate={onUpdate}
          />
        </section>
        <ErrorLabel errorMessage={errorLabel} />
      </section>
    );
};

export const ErrorLabel = ({ errorMessage }: { errorMessage?: string }) => {
  return (
    <>
      {errorMessage && (
        <p className="-mt-2 mb-2 text-xs w-full text-left text-red-600">
          {errorMessage}
        </p>
      )}
    </>
  );
};
