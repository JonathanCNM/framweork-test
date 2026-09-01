import { useState } from "react";
import {
  VGSCollectForm,
  type VGSCollectFocusEventData,
  type VGSCollectStateParams,
} from "@vgs/collect-js-react";
import { LabelInput } from "./LabelInput";
import { useKeyboardVisible, useVgsFieldCss } from "../hooks";
import { getInputThemeBorder } from "../utils/inputThemeBorder";
import { ErrorIcon } from "../icons";

export interface IVGSCardInfo {
  bin: string;
  cardType: string;
  last4: string;
}
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
  errorColor?: string;
  /**
   * Font family for the iframe field. Unset reads `--font` / `--lola-font-family`.
   */
  fontFamily?: string;
  /**
   * Stylesheet CDN used to inject `@font-face` into the VGS iframe.
   * Unset uses the theme `<link data-font>` loaded by `Page` / `useFonts`.
   */
  fontCdn?: string;
  onGetCardInfo?: (cardInfo: IVGSCardInfo) => void;
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
  errorColor = "#fd2a35",
  fontFamily,
  fontCdn,
  setErrorLabel = () => {},
  onGetCardInfo = () => {},
}) => {
  const [isFocus, setIsFocus] = useState(autoFocus);
  const [isValid, setIsValid] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const { handlerSetIsKeyboardOpen } = useKeyboardVisible();
  const isNumericField =
    type === "card_number" || type === "card_exp_date" || type === "card_cvc";
  const { css: fieldCss, ready: fieldCssReady } = useVgsFieldCss({
    color,
    inactiveColor,
    borderRadius,
    fontFamily,
    fontCdn,
    tabularNums: isNumericField,
  });
  const fieldKey = [
    fieldCss["@font-face"]?.src ?? fieldCss["font-family"],
    fieldCss.color,
  ].join("|");
  const fieldOrPlaceholder = (field: React.ReactNode) =>
    fieldCssReady ? (
      field
    ) : (
      <div className="vgs-collect-iframe-wr" aria-hidden />
    );

  const onHanlderFocus = (info: VGSCollectFocusEventData<"focus" | "blur">) => {
    setIsFocus(info.type === "focus");
    handlerSetIsKeyboardOpen(info.type === "focus");
  };

  const showLabel = isFocus || !isEmpty;

  const styles = {
    "--radius": `${borderRadius}px`,
    "--bg": getInputThemeBorder(
      isFocus,
      isValid || !errorLabel,
      errorColor
    ),
  };

  const labelColors = isFocus
    ? activeColor
    : !isValid && errorLabel
    ? errorColor
    : showLabel
    ? color
    : inactiveColor;

  const onUpdate = (state: VGSCollectStateParams) => {
    const { isValid, isFocused, isEmpty, name } = state;
    if (name === "card_number") {
      const { bin = "", cardType = "", last4 = "" } = state;
      onGetCardInfo({ bin, cardType, last4 });
    }
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
          {fieldOrPlaceholder(
            <TextField
              key={fieldKey}
              autoFocus={autoFocus}
              name="card_holder_name"
              validations={["required"]}
              placeholder=""
              css={fieldCss}
              onFocus={onHanlderFocus}
              onBlur={onHanlderFocus}
              onUpdate={onUpdate}
            />
          )}
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
          {fieldOrPlaceholder(
            <CardNumberField
              key={fieldKey}
              autoFocus={autoFocus}
              name="card_number"
              validations={["required", "validCardNumber"]}
              placeholder=""
              showCardIcon={true}
              css={fieldCss}
              onFocus={onHanlderFocus}
              onBlur={onHanlderFocus}
              onUpdate={onUpdate}
            />
          )}
        </section>
        <ErrorLabel errorMessage={errorLabel} color={errorColor} />
      </>
    );

  if (type === "card_exp_date")
    return (
      <section className="exp-cvc">
        <section
          className="lola-vgs--input secondary-cta"
          style={styles as React.CSSProperties & { [key: string]: string }}
        >
          <LabelInput color={labelColors} isActive={showLabel}>
            {placeholder}
          </LabelInput>
          {fieldOrPlaceholder(
            <CardExpirationDateField
              key={fieldKey}
              name="card_exp_date"
              autoFocus={autoFocus}
              validations={["required", "validCardExpirationDate"]}
              placeholder=""
              yearLength={2}
              css={fieldCss}
              onFocus={onHanlderFocus}
              onBlur={onHanlderFocus}
              onUpdate={onUpdate}
            />
          )}
        </section>
        <ErrorLabel errorMessage={errorLabel} color={errorColor} />
      </section>
    );

  if (type === "card_cvc")
    return (
      <section className="exp-cvc">
        <section
          className="lola-vgs--input secondary-cta"
          style={styles as React.CSSProperties & { [key: string]: string }}
        >
          <LabelInput color={labelColors} isActive={showLabel}>
            {placeholder}
          </LabelInput>
          {fieldOrPlaceholder(
            <CardSecurityCodeField
              key={fieldKey}
              name="card_cvc"
              autoFocus={autoFocus}
              validations={["required", "validCardSecurityCode"]}
              placeholder=""
              hideValue
              css={fieldCss}
              onFocus={onHanlderFocus}
              onBlur={onHanlderFocus}
              onUpdate={onUpdate}
            />
          )}
        </section>
        <ErrorLabel errorMessage={errorLabel} color={errorColor} />
      </section>
    );
};

export const ErrorLabel = ({
  errorMessage,
  color,
}: {
  errorMessage?: string;
  color: string;
}) => {
  return (
    <>
      {errorMessage && (
        <section
          className="error-label-container"
          style={
            { "--errorColor": color } as React.CSSProperties & {
              [key: string]: string;
            }
          }
        >
          <ErrorIcon size={16} colors={[color, color]} />
          <p className="error-label">{errorMessage}</p>
        </section>
      )}
    </>
  );
};
