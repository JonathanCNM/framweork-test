export interface FontInput {
  fontWeight: string;
  min: string;
  max: string;
  lineHeight: string;
}

export interface IFormFont {
  h1: FontInput;
  highlight: FontInput;
  h2: FontInput;
  bodycopy: FontInput;
  secondaryCta: FontInput;
  footerText: FontInput;
  mainButtonText: FontInput;
  step: FontInput;
  [key: string]: FontInput;
}

export interface ExportedFont {
  fontfamily: string;
  fontcdn: string;
  h1: FontInput;
  highlight: FontInput;
  h2: FontInput;
  bodycopy: FontInput;
  secondaryCta: FontInput;
  footerText: FontInput;
  mainButtonText: FontInput;
  step: FontInput;
}

export interface IColorForm {
  primaryGradient: string;
  secondaryGradient: string;
  secondaryColor: string;
  whiteColor: string;
  /** Preferred name; also exported as `inactived` for legacy theme consumers. */
  inactiveColor: string;
  errorColor: string;
  partnerHighlights: string;
  gradientDeg: string;
  primaryGradientPoint: string;
  secundaryGradientPoint: string;
  primaryMesh: string;
  errorViewBackground?: string;
  errorViewPrimaryGradient?: string;
  errorViewSecondaryGradient?: string;
  errorViewGradientDeg?: string;
  errorViewPrimaryGradientPoint?: string;
  errorViewSecundaryGradientPoint?: string;
  specialViewBackground?: string;
  specialViewPrimaryGradient?: string;
  specialViewSecondaryGradient?: string;
  specialViewGradientDeg?: string;
  specialViewPrimaryGradientPoint?: string;
  specialViewSecundaryGradientPoint?: string;
  cardPanelBackground?: string;
  cardBackground?: string;
  cardBackgroundSecundary?: string;
}

export type ButtonSizeOption = "small" | "medium" | "large";

export interface IStylesForm {
  cardBorderRadius: string;
  buttonBorderRadius: string;
  inputBorderRadius: string;
  cardBorderColor: string;
  inputBorderColor: string;
  activeBorderBoton: string;
  tamañoBordeCard: string;
  tamañoBordeInput: string;
  buttonPadding: string;
  inputPadding: string;
  cardPadding: string;
  buttonSize: ButtonSizeOption;
  buttonShowIcon: boolean;
  /** Background for icon containers (not icons). Default transparent (legacy). */
  iconContainerBackground: string;
}

export type ThemeFieldType = "color" | "text" | "select" | "checkbox";

export interface ThemeFieldConfig {
  key: string;
  value: string;
  type: ThemeFieldType;
  options?: string[];
  label?: string;
  description?: string;
}

export interface ThemeEditorState {
  inputFont: { name: string; cdn: string };
  formFont: IFormFont;
  formColors: IColorForm;
  formStyles: IStylesForm;
  lightness: "light" | "dark";
  useSystemTheme: boolean;
  /** Special view follows primaryMesh until the user edits special view fields. */
  specialViewLinked: boolean;
}

export interface ImportedTheme {
  font?: Record<string, unknown>;
  colors?: Record<string, unknown>;
  styles?: Record<string, unknown>;
}

export interface ExportedTheme {
  font: ExportedFont;
  colors: Omit<
    IColorForm,
    | "specialViewPrimaryGradient"
    | "specialViewSecondaryGradient"
    | "specialViewGradientDeg"
    | "specialViewPrimaryGradientPoint"
    | "specialViewSecundaryGradientPoint"
    | "errorViewPrimaryGradient"
    | "errorViewSecondaryGradient"
    | "errorViewGradientDeg"
    | "errorViewPrimaryGradientPoint"
    | "errorViewSecundaryGradientPoint"
  > & {
    inactived: string;
    gradient: string;
    lightness: "light" | "dark";
    useSystemTheme: boolean;
  };
  styles: IStylesForm;
}

export type ThemeValidationResult =
  | { ok: true; theme: ImportedTheme }
  | { ok: false; error: string };

export type ThemeFeedback =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;
