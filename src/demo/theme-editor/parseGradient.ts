export interface ParsedLinearGradient {
  deg: string;
  primary: string;
  secondary: string;
  primaryPoint: string;
  secondaryPoint: string;
}

const LINEAR_GRADIENT_PATTERN =
  /^linear-gradient\(\s*([^,]+),\s*([#][0-9A-Fa-f]{3,8})\s+([^,]+),\s*([#][0-9A-Fa-f]{3,8})\s+([^)]+)\)$/;

export const parseLinearGradient = (
  value: string
): ParsedLinearGradient | null => {
  const match = value.trim().match(LINEAR_GRADIENT_PATTERN);
  if (!match) return null;
  return {
    deg: match[1].trim(),
    primary: match[2].trim(),
    secondary: match[4].trim(),
    primaryPoint: match[3].trim(),
    secondaryPoint: match[5].trim(),
  };
};
