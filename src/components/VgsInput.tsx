import { useState, useCallback } from "react";
import { VGSCollectForm } from "@vgs/collect-js-react";
import { LabelInput } from "./LabelInput";

export interface VgsInputProps {
  type: "card_holder_name" | "card_number" | "card_exp_date" | "card_cvc";
  placeholder: string;
  autoFocus?: boolean;
  errorLabel?: string;
  colors?: [string, string];
  isActive?: boolean;
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
  errorLabel = "",
  colors = ["#000", "#000"],
  isActive = false,
}) => {
  const [isFocus, setIsFocus] = useState(isActive);
  const errorColor = "#fd2a35";
  const onHanlderFocus = useCallback(() => setIsFocus(true), []);

  if (type === "card_holder_name")
    return (
      <>
        <section className="lola-vgs--input">
          <LabelInput colors={colors} isActive={isFocus}>
            {placeholder}
          </LabelInput>
          <TextField
            autoFocus={autoFocus}
            name="card_holder_name"
            validations={["required"]}
            placeholder=""
            onFocus={onHanlderFocus}
          />
        </section>
        <ErrorLabel errorMessage={errorLabel} />
      </>
    );

  if (type === "card_number")
    return (
      <>
        <section className="lola-vgs--input">
          <LabelInput colors={colors} isActive={isFocus}>
            {placeholder}
          </LabelInput>
          <CardNumberField
            autoFocus={autoFocus}
            name="card_number"
            validations={["required", "validCardNumber"]}
            placeholder=""
            onFocus={onHanlderFocus}
            showCardIcon={true}
            errorColor={errorColor}
          />
        </section>
        <ErrorLabel errorMessage={errorLabel} />
      </>
    );

  if (type === "card_exp_date")
    return (
      <section style={{ width: "100%" }}>
        <section className="lola-vgs--input">
          <LabelInput colors={colors} isActive={isFocus}>
            {placeholder}
          </LabelInput>
          <CardExpirationDateField
            name="card_exp_date"
            autoFocus={autoFocus}
            validations={["required", "validCardExpirationDate"]}
            placeholder=""
            yearLength={2}
            onFocus={onHanlderFocus}
            errorColor={errorColor}
          />
        </section>
        <ErrorLabel errorMessage={errorLabel} />
      </section>
    );

  if (type === "card_cvc")
    return (
      <section style={{ width: "100%" }}>
        <section className="lola-vgs--input">
          <LabelInput colors={colors} isActive={isFocus}>
            {placeholder}
          </LabelInput>
          <CardSecurityCodeField
            name="card_cvc"
            autoFocus={autoFocus}
            validations={["required", "validCardSecurityCode"]}
            placeholder=""
            hideValue
            onFocus={onHanlderFocus}
            errorColor={errorColor}
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
