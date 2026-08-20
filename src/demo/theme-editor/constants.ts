import { defaultFont } from "../../utils/constants";
import type {
  IColorForm,
  IFormFont,
  IStylesForm,
  ThemeEditorState,
  ThemeFieldConfig,
} from "./types";

export const FONT_STYLE_KEYS = [
  "h1",
  "highlight",
  "h2",
  "bodycopy",
  "secondaryCta",
  "footerText",
  "mainButtonText",
  "step",
] as const;

export const FONT_INPUT_KEYS = [
  "fontWeight",
  "min",
  "max",
  "lineHeight",
] as const;

export const COLOR_STRING_KEYS = [
  "primaryGradient",
  "secondaryGradient",
  "secondaryColor",
  "whiteColor",
  "inactiveColor",
  "inactived",
  "errorColor",
  "partnerHighlights",
  "gradientDeg",
  "primaryGradientPoint",
  "secundaryGradientPoint",
  "primaryMesh",
  "gradient",
  "errorViewBackground",
  "specialViewBackground",
  "cardPanelBackground",
  "cardBackground",
  "cardBackgroundSecundary",
  "foregroundLight",
  "foregroundDark",
  "titleColor",
  "screenIconPrimary",
  "screenIconSecondary",
  "screenIconPrimarySurface",
  "screenIconSecondarySurface",
  "screenIconPrimaryError",
  "screenIconSecondaryError",
  "screenIconBackground",
  "screenIconFill",
  "screenIconFillSurface",
  "screenIconFillError",
  "inputIconPrimary",
  "inputIconSecondary",
] as const;

export const COLOR_PADDING_KEYS = [
  "screenIconPadding",
  "screenIconPaddingSurface",
  "screenIconPaddingError",
] as const;

export const STYLE_STRING_KEYS = [
  "cardBorderRadius",
  "buttonBorderRadius",
  "inputBorderRadius",
  "cardBorderColor",
  "inputBorderColor",
  "activeBorderBoton",
  "tamañoBordeCard",
  "tamañoBordeInput",
  "buttonPadding",
  "inputPadding",
  "cardPadding",
  "iconContainerBackground",
] as const;

export const formFontInitialState: IFormFont = {
  h1: {
    fontWeight: "400",
    min: "1.75rem",
    max: "2rem",
    lineHeight: "1",
  },
  highlight: {
    fontWeight: "700",
    min: "1.75rem",
    max: "2rem",
    lineHeight: "0.95",
  },
  h2: {
    fontWeight: "600",
    min: "1.25rem",
    max: "1.5rem",
    lineHeight: "1",
  },
  bodycopy: {
    fontWeight: "500",
    min: "1rem",
    max: "1.25rem",
    lineHeight: "1.25rem",
  },
  secondaryCta: {
    fontWeight: "500",
    min: "0.74rem",
    max: "1rem",
    lineHeight: "1",
  },
  footerText: {
    fontWeight: "500",
    min: "0.85rem",
    max: "0.85rem",
    lineHeight: "1",
  },
  mainButtonText: {
    fontWeight: "600",
    min: "1.15rem",
    max: "1.25rem",
    lineHeight: "2rem",
  },
  step: {
    fontWeight: "600",
    min: "0.5rem",
    max: "0.875rem",
    lineHeight: "1",
  },
};

export const formColorList: ThemeFieldConfig[] = [
  { key: "primaryGradient", value: "#4BA84B", type: "color" },
  { key: "primaryGradientPoint", value: "23.26%", type: "text" },
  { key: "secondaryGradient", value: "#008433", type: "color" },
  { key: "secundaryGradientPoint", value: "111.43%", type: "text" },
  { key: "whiteColor", value: "#FFFFFF", type: "color" },
  { key: "inactiveColor", value: "#979797", type: "color" },
  { key: "errorColor", value: "#E81C1C", type: "color" },
  { key: "partnerHighlights", value: "#AAFF74", type: "color" },
  { key: "cardPanelBackground", value: "transparent", type: "text" },
  { key: "cardBackground", value: "#eeeef1", type: "text" },
  { key: "cardBackgroundSecundary", value: "#17171c", type: "text" },
  { key: "gradientDeg", value: "116.74deg", type: "text" },
  {
    key: "primaryMesh",
    value: "linear-gradient(116.74deg, #4BA84B 23.26%, #008433 111.43%)",
    type: "text",
  },
];

export const foregroundColorList: ThemeFieldConfig[] = [
  {
    key: "foregroundLight",
    value: "#17171c",
    type: "color",
    label: "light",
    description: "Default CSS --foreground en light (#17171c).",
  },
  {
    key: "foregroundDark",
    value: "#fafafa",
    type: "color",
    label: "dark",
    description: "Default CSS --foreground en dark (#fafafa).",
  },
];

export const titleColorList: ThemeFieldConfig[] = [
  {
    key: "titleColor",
    value: "linear-gradient(116.74deg, #4BA84B 23.26%, #008433 111.43%)",
    type: "text",
    label: "titleColor",
    description:
      "Sigue al primaryMesh hasta que lo edites. Después queda independiente.",
  },
];

export const screenIconColorList: ThemeFieldConfig[] = [
  { key: "screenIconPrimary", value: "#4BA84B", type: "color", label: "color 1" },
  { key: "screenIconSecondary", value: "#008433", type: "color", label: "color 2" },
  {
    key: "screenIconBackground",
    value: "#FFFFFF",
    type: "color",
    label: "fondo (ElevatedCircle)",
  },
  {
    key: "screenIconFill",
    value: "#FFFFFF",
    type: "color",
    label: "fondo icono",
  },
  {
    key: "screenIconPadding",
    value: "",
    type: "text",
    label: "padding icono",
  },
];

export const surfaceIconFillList: ThemeFieldConfig[] = [
  {
    key: "screenIconPrimarySurface",
    value: "#4BA84B",
    type: "color",
    label: "color 1",
  },
  {
    key: "screenIconSecondarySurface",
    value: "#008433",
    type: "color",
    label: "color 2",
  },
  {
    key: "screenIconFillSurface",
    value: "#FFFFFF",
    type: "color",
    label: "fondo icono",
  },
  {
    key: "screenIconPaddingSurface",
    value: "",
    type: "text",
    label: "padding icono",
  },
];

export const errorIconFillList: ThemeFieldConfig[] = [
  {
    key: "screenIconPrimaryError",
    value: "#252525",
    type: "color",
    label: "color 1",
  },
  {
    key: "screenIconSecondaryError",
    value: "#252525",
    type: "color",
    label: "color 2",
  },
  {
    key: "screenIconFillError",
    value: "#FFFFFF",
    type: "color",
    label: "fondo icono",
  },
  {
    key: "screenIconPaddingError",
    value: "",
    type: "text",
    label: "padding icono",
  },
];

export const inputIconColorList: ThemeFieldConfig[] = [
  { key: "inputIconPrimary", value: "#252525", type: "color", label: "color 1" },
  { key: "inputIconSecondary", value: "#252525", type: "color", label: "color 2" },
];

export const formColorInitialState: IColorForm = {
  primaryGradient: "#4BA84B",
  secondaryGradient: "#008433",
  secondaryColor: "#252525",
  whiteColor: "#FFFFFF",
  inactiveColor: "#979797",
  errorColor: "#E81C1C",
  partnerHighlights: "#AAFF74",
  gradientDeg: "116.74deg",
  primaryGradientPoint: "23.26%",
  secundaryGradientPoint: "111.43%",
  primaryMesh: "linear-gradient(116.74deg, #4BA84B 23.26%, #008433 111.43%)",
  specialViewPrimaryGradient: "#4BA84B",
  specialViewSecondaryGradient: "#008433",
  specialViewGradientDeg: "116.74deg",
  specialViewPrimaryGradientPoint: "23.26%",
  specialViewSecundaryGradientPoint: "111.43%",
  specialViewBackground:
    "linear-gradient(116.74deg, #4BA84B 23.26%, #008433 111.43%)",
  errorViewPrimaryGradient: "#1a1a1a",
  errorViewSecondaryGradient: "#2d2d2d",
  errorViewGradientDeg: "135deg",
  errorViewPrimaryGradientPoint: "0%",
  errorViewSecundaryGradientPoint: "100%",
  errorViewBackground: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
  cardPanelBackground: "transparent",
  cardBackground: "#eeeef1",
  cardBackgroundSecundary: "#17171c",
  foregroundLight: "#17171c",
  foregroundDark: "#fafafa",
  titleColor:
    "linear-gradient(116.74deg, #4BA84B 23.26%, #008433 111.43%)",
  screenIconPrimary: "#4BA84B",
  screenIconSecondary: "#008433",
  screenIconPrimarySurface: "#4BA84B",
  screenIconSecondarySurface: "#008433",
  screenIconPrimaryError: "#252525",
  screenIconSecondaryError: "#252525",
  screenIconBackground: "#FFFFFF",
  screenIconFill: "#FFFFFF",
  screenIconFillSurface: "#FFFFFF",
  screenIconFillError: "#FFFFFF",
  screenIconPadding: "",
  screenIconPaddingSurface: "",
  screenIconPaddingError: "",
  inputIconPrimary: "#252525",
  inputIconSecondary: "#252525",
};

export const specialViewGradientList: ThemeFieldConfig[] = [
  { key: "specialViewPrimaryGradient", value: "#4BA84B", type: "color" },
  { key: "specialViewPrimaryGradientPoint", value: "23.26%", type: "text" },
  { key: "specialViewSecondaryGradient", value: "#008433", type: "color" },
  { key: "specialViewSecundaryGradientPoint", value: "111.43%", type: "text" },
  { key: "specialViewGradientDeg", value: "116.74deg", type: "text" },
  {
    key: "specialViewBackground",
    value: "linear-gradient(116.74deg, #4BA84B 23.26%, #008433 111.43%)",
    type: "text",
  },
];

export const errorViewGradientList: ThemeFieldConfig[] = [
  { key: "errorViewPrimaryGradient", value: "#1a1a1a", type: "color" },
  { key: "errorViewPrimaryGradientPoint", value: "0%", type: "text" },
  { key: "errorViewSecondaryGradient", value: "#2d2d2d", type: "color" },
  { key: "errorViewSecundaryGradientPoint", value: "100%", type: "text" },
  { key: "errorViewGradientDeg", value: "135deg", type: "text" },
  {
    key: "errorViewBackground",
    value: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    type: "text",
  },
];

export const formStylesList: ThemeFieldConfig[] = [
  { key: "cardBorderRadius", value: "16px", type: "text" },
  { key: "buttonBorderRadius", value: "8px", type: "text" },
  { key: "inputBorderRadius", value: "8px", type: "text" },
  { key: "cardBorderColor", value: "#E4E4E4", type: "color" },
  { key: "inputBorderColor", value: "#E4E4E4", type: "color" },
  { key: "activeBorderBoton", value: "#1DAFA1", type: "color" },
  { key: "tamañoBordeCard", value: "1px", type: "text" },
  { key: "tamañoBordeInput", value: "1px", type: "text" },
  { key: "buttonPadding", value: "20px", type: "text" },
  { key: "inputPadding", value: "0.75rem", type: "text" },
  { key: "cardPadding", value: "1.5rem", type: "text" },
  {
    key: "buttonSize",
    value: "large",
    type: "select",
    options: ["small", "medium", "large"],
  },
  {
    key: "buttonShowIcon",
    value: "true",
    type: "checkbox",
    label: "buttonShowIcon",
    description: "¿Mostrar icono de continuar en los botones? (default: true)",
  },
  {
    key: "iconContainerBackground",
    value: "transparent",
    type: "text",
    label: "iconContainerBackground",
    description:
      "Background de contenedores de iconos (ElevatedCircle, etc.). No afecta el color del icono. Default: transparent (legacy).",
  },
];

export const formStylesInitialState: IStylesForm = {
  cardBorderRadius: "16px",
  buttonBorderRadius: "8px",
  inputBorderRadius: "8px",
  cardBorderColor: "#E4E4E4",
  inputBorderColor: "#E4E4E4",
  activeBorderBoton: "#1DAFA1",
  tamañoBordeCard: "1px",
  tamañoBordeInput: "1px",
  buttonPadding: "20px",
  inputPadding: "0.75rem",
  cardPadding: "1.5rem",
  buttonSize: "large",
  buttonShowIcon: true,
  iconContainerBackground: "transparent",
};

export const defaultThemeEditorState: ThemeEditorState = {
  inputFont: { ...defaultFont },
  formFont: formFontInitialState,
  formColors: formColorInitialState,
  formStyles: formStylesInitialState,
  lightness: "dark",
  useSystemTheme: false,
  specialViewLinked: true,
  titleLinked: true,
  screenIconLinked: true,
  inputIconLinked: true,
};

export const STORYBOOK_ORIGINS = [
  "http://localhost:6006",
  "http://localhost:5173",
  "https://lola-framweork-ui.vercel.app",
] as const;
