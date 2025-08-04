import * as React from "react";
import { VGSCollectForm, type ICollectFormProps } from "@vgs/collect-js-react";

export interface VgsInputProps extends ICollectFormProps {
  type: "card_holder_name" | "card_number" | "card_exp_date" | "card_cvc";
  placeholder: string;
  autoFocus?: boolean;
  errorLabel?: string;
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
}) => {
  const errorColor = "#fd2a35";
  if (type === "card_holder_name")
    return (
      <>
        <TextField
          autoFocus={autoFocus}
          name="card_holder_name"
          validations={["required"]}
          placeholder={placeholder}
        />
        <ErrorLabel errorMessage={errorLabel} />
      </>
    );

  if (type === "card_number")
    return (
      <>
        <CardNumberField
          autoFocus={autoFocus}
          name="card_number"
          validations={["required", "validCardNumber"]}
          placeholder={placeholder}
          showCardIcon={true}
          errorColor={errorColor}
        />
        <ErrorLabel errorMessage={errorLabel} />
      </>
    );

  if (type === "card_exp_date")
    return (
      <section style={{ width: "100%" }}>
        <CardExpirationDateField
          name="card_exp_date"
          validations={["required", "validCardExpirationDate"]}
          placeholder={placeholder}
          yearLength={2}
          errorColor={errorColor}
          className="mt-0"
        />
        <ErrorLabel errorMessage={errorLabel} />
      </section>
    );

  if (type === "card_cvc")
    return (
      <section style={{ width: "100%" }}>
        <CardSecurityCodeField
          name="card_cvc"
          validations={["required", "validCardSecurityCode"]}
          placeholder={placeholder}
          hideValue
          errorColor={errorColor}
          className="mt-0"
        />
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
