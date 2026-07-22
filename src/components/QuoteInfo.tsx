import { type JSX, useEffect, useMemo, useRef, useState } from "react";
import { formatMoney } from "../utils/utils";
import "../styles/quote-info.css";

export interface QuoteInfoProps {
  label: string;
  amount?: string;
  icon?: JSX.Element;
  currency: string;
  mode?: "info" | "input";
  exchangeRate?: number;
  showQuouteInfoPopup?: () => void;
  onAmountChange?: (amount: string) => void;
  initialAmount?: string;
  translations: {
    rateText: string;
    estimatedRate: string;
  };
  WarningIcon?: React.ReactNode;
  background?: string;
  textColor?: string;
  alternativeTextColor?: string;
}

/**
 * QuoteInfo Component
 * Displays quote information with optional input mode for entering amounts
 *
 * @param label - Label text
 * @param amount - Display amount (for info mode)
 * @param currency - Currency code
 * @param mode - Display mode: "info" or "input" (default: "info")
 * @param exchangeRate - Exchange rate value
 * @param showQuouteInfoPopup - Callback to show additional info popup
 * @param onAmountChange - Callback when amount changes (input mode)
 * @param initialAmount - Initial amount value (input mode)
 * @param translations - Text translations
 * @param WarningIcon - Custom warning icon component
 * @param background - Custom background in component
 * @param textColor - Custom text color in component
 * @param alternativeTextColor - Custom alternative text color in component for not secundary info
 */
export const QuoteInfo: React.FC<QuoteInfoProps> = ({
  label,
  amount,
  currency,
  mode = "info",
  exchangeRate,
  onAmountChange,
  initialAmount = "",
  translations,
  WarningIcon,
  background = "var(--gradient-card)",
  textColor = "var(--foreground)",
  alternativeTextColor = "var(--muted-foreground)",
}) => {
  const [amountInput, setAmountInput] = useState<string>(initialAmount);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && mode === "input") {
      inputRef.current.focus();
      inputRef.current.selectionStart = 0;
      inputRef.current.selectionEnd = 0;
    }
  }, [mode]);

  const normalizeRawAmount = (value: string) => {
    const cleaned = value.replace(/[^\d.]/g, "");
    const dotIndex = cleaned.indexOf(".");
    const intPart = dotIndex === -1 ? cleaned : cleaned.substring(0, dotIndex);
    const decPart =
      dotIndex === -1
        ? ""
        : cleaned
            .substring(dotIndex + 1)
            .replace(/\./g, "")
            .slice(0, 2);
    const hasDot = dotIndex !== -1;

    return { intPart, decPart, hasDot };
  };

  const toRawString = ({
    intPart,
    decPart,
    hasDot,
  }: ReturnType<typeof normalizeRawAmount>) => {
    if (!intPart && !decPart && !hasDot) return "";
    const safeInt = intPart || (hasDot ? "0" : "");
    return hasDot ? `${safeInt}.${decPart}` : safeInt;
  };

  const formatWithGrouping = (raw: string) => {
    if (!raw) return "";
    const [intPart = "", decPart = ""] = raw.split(".");
    const groupedInt =
      intPart.length > 0 ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
    return raw.includes(".") ? `${groupedInt}.${decPart}` : groupedInt;
  };

  const getNormalizedFromDisplay = (value: string, caretPos: number) => {
    let raw = "";
    let rawCaret = 0;
    let hasDot = false;

    for (let i = 0; i < value.length; i += 1) {
      const ch = value[i];
      if (/\d/.test(ch)) {
        raw += ch;
        if (i < caretPos) rawCaret += 1;
      } else if (ch === "." && !hasDot) {
        hasDot = true;
        raw += ".";
        if (i < caretPos) rawCaret += 1;
      }
    }

    const normalized = normalizeRawAmount(raw);
    const normalizedRaw = toRawString(normalized);
    const clampedCaret = Math.min(rawCaret, normalizedRaw.length);

    return { normalizedRaw, clampedCaret };
  };

  const getDisplayCaretFromRaw = (displayValue: string, rawCaret: number) => {
    if (rawCaret <= 0) return 0;
    let count = 0;
    for (let i = 0; i < displayValue.length; i += 1) {
      const ch = displayValue[i];
      if (/\d/.test(ch) || ch === ".") {
        count += 1;
        if (count === rawCaret) return i + 1;
      }
    }
    return displayValue.length;
  };

  const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const { value } = event.currentTarget;
    const caretPos = input.selectionStart ?? 0;
    const { normalizedRaw, clampedCaret } = getNormalizedFromDisplay(
      value,
      caretPos
    );
    const normalizedParts = normalizeRawAmount(normalizedRaw);
    const limitedIntPart =
      normalizedParts.intPart.length > 5
        ? normalizedParts.intPart.slice(0, 5)
        : normalizedParts.intPart;
    const nextRaw = toRawString({
      ...normalizedParts,
      intPart: limitedIntPart,
    });
    const nextCaret = Math.min(clampedCaret, nextRaw.length);
    const formattedDisplay = formatWithGrouping(nextRaw);

    setAmountInput(nextRaw);
    if (onAmountChange) {
      onAmountChange(formatMoney(nextRaw) || "");
    }

    requestAnimationFrame(() => {
      if (!inputRef.current) return;
      const newCaret = getDisplayCaretFromRaw(formattedDisplay, nextCaret);
      inputRef.current.setSelectionRange(newCaret, newCaret);
    });
  };

  const inputWidth = useMemo(() => {
    const displayValue = formatWithGrouping(amountInput);
    if (!displayValue) return "4.5rem";
    if (displayValue.length >= 5) return `${displayValue.length}ch`;
    return `${(displayValue.length ?? 1) * 1.2}ch`;
  }, [amountInput]);

  const handleFocus = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleContainerClick = () => {
    if (mode === "input") handleFocus();
  };

  const inputValue = formatWithGrouping(amountInput);

  const rateText = translations.rateText
    .replace("{from}", "USD")
    .replace("{rate}", exchangeRate?.toString() || "0")
    .replace("{to}", currency);

  return (
    <section
      className={`quote-send ${mode}`}
      style={{ background }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <p className="quote-label" style={{ color: textColor }}>
        {label}
      </p>
      <section className="quote-send-content">
        <div className="quote-send-info">
          {mode === "info" && (
            <p className="highlight label-amount" style={{ color: textColor }}>
              {amount ?? "0.00"}
            </p>
          )}
          {mode === "input" && (
            <>
              <input
                type="tel"
                ref={inputRef}
                style={{
                  width: inputWidth,
                  fontSize: `1.75rem`,
                  color: textColor,
                }}
                id="amount-input"
                placeholder="0.00"
                className="amount-input"
                value={inputValue === "NaN" ? amountInput : inputValue}
                onChange={onChangeAmount}
              />
            </>
          )}
        </div>

        <p style={{ color: alternativeTextColor }}>{currency}</p>
      </section>
      {mode === "info" && (
        <section className="quote-info">
          {WarningIcon && WarningIcon}
          <section>
            <p className="footer-text" style={{ color: alternativeTextColor }}>
              {rateText}
            </p>
            <p className="footer-text" style={{ color: alternativeTextColor }}>
              {translations.estimatedRate}
            </p>
          </section>
        </section>
      )}
    </section>
  );
};
