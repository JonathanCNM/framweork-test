import { BodyCopy } from "../../components";
import { AddCardSlot } from "./AddCardSlot";

const fields = [
  {
    label: "Amount to send",
    value: "USD 100.00",
  },
  {
    label: "Est. exchange rate",
    value: "MXN 0.95",
  },
  {
    label: "Fee",
    value: "$ 2.50",
  },
  {
    label: "John Receives",
    value: "MXN 95.00",
  },
  {
    label: "Delivery option",
    value: "Bank deposit",
  },
  {
    label: "Full name",
    value: "John Doe",
  },
  {
    label: "Phone number",
    value: "+1234567890",
  },
  {
    label: "Destination",
    value: "Mexico",
  },
  {
    label: "Bank",
    value: "Banco Sarasa",
  },
  {
    label: "Account number",
    value: "123456789",
  },
  {
    label: "Send",
    value: "Ruben Gonzalez",
  },
  {
    label: "Address",
    value: "1002 Lavender Cir",
  },

  {
    label: "Total payment",
    value: "USD 102.50",
    isStrong: true,
  },
];

export const SummaryInfo = () => {
  return (
    <div className="summary-info">
      <div className="summary-info-container">
        <div className="summary-info-fields">
          {fields
            .filter((field) => field.value)
            .map((field) => (
              <div key={field.label} className="field-row-key">
                <BodyCopy
                  className={`summary-text ${field.isStrong ? "strong" : ""}`}
                >
                  {field.label}:
                </BodyCopy>

                <BodyCopy
                  className={`field-row-description summary-text ${
                    field.isStrong ? "strong" : "muted-foreground"
                  }`}
                >
                  {field.value}
                </BodyCopy>
              </div>
            ))}
        </div>
      </div>
      <AddCardSlot />
    </div>
  );
};
