import { CSS_VARIABLES } from "../types/theme.types";

export const getInputThemeBorder = (
  focused: boolean,
  isValid: boolean,
  errorColor: string
): string => {
  if (!isValid) return errorColor;
  if (focused) {
    return `var(${CSS_VARIABLES.ACTIVE_BORDER_BOTON}, var(${CSS_VARIABLES.INPUT_BORDER_COLOR}, #1DAFA1))`;
  }
  return `var(${CSS_VARIABLES.INPUT_BORDER_COLOR}, #979797)`;
};
