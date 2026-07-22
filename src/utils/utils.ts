export const getSplittedColors = (color: string): [string, string] => {
  let finalColors: [string, string] = [color, color];
  if (color.includes("gradient")) {
    const colorstemp = color.split(",");
    const startColor = colorstemp[1].split(" ")[1];
    const endColor = colorstemp[2].split(" ")[1];
    finalColors = [startColor, endColor];
  }
  return finalColors;
};

export const generateGradient = (
  colors: [string, string],
  gradientDeg: string = "90deg",
  primaryGradientPoint?: string,
  secondaryGradientPoint?: string
) => {
  if (colors.length !== 2) return "";
  if (!primaryGradientPoint) primaryGradientPoint = "0%";
  if (!secondaryGradientPoint) secondaryGradientPoint = "100%";
  return `linear-gradient(${gradientDeg}, ${colors[0]} ${primaryGradientPoint}, ${colors[1]} ${secondaryGradientPoint})`;
};

export type amountFormatterProps = (
  amount: number,
  numberFormatOptions?: {
    country?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
) => string;

export const formatNumber = (value: number, currency: string) =>
  new Intl.NumberFormat("en", {
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

/**
 * Format money value to always have 2 decimal places
 * @param value - The value to format
 * @returns Formatted money string (e.g., "123.45")
 */
export const formatMoney = (value: string): string => {
  if (!value || value === ".00") return "";
  value = value.replace(/[^\d.]/g, "");
  const [intPart, decPart = ""] = value.split(".");
  const decimals = (decPart + "00").slice(0, 2);
  return `${intPart || "0"}.${decimals}`;
};

export type AmountFormatterOptions = {
  country?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

/**
 * Format amount with locale-specific number formatting
 * @param amount - The numeric amount to format
 * @param currency - Currency code (e.g., "USD")
 * @param options - Formatting options
 * @returns Formatted amount string
 */
export const amountFormatter = (
  amount: number,
  currency = "USD",
  {
    country = "en-US",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  }: AmountFormatterOptions = {}
): string =>
  new Intl.NumberFormat(country, {
    style: "decimal",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
