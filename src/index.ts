// Export all components and utilities
export * from "./components";
export * from "./hooks";
export * from "./styles";
export * from "./icons";

// Export components
export * from "./components/AuraLayout";
export * from "./components/BodyCopy";
export * from "./components/Button";
export * from "./components/CircularProgress";
export * from "./components/CustomStepper";
export * from "./components/ElevatedCircle";
export * from "./components/GradientText";
export * from "./components/SearchSelect";
export * from "./components/InputField";
export * from "./components/LabelInput";
export * from "./components/Layout";
export * from "./components/Loader";
export * from "./components/MotionWrapper";
export * from "./components/Navbar";
export * from "./components/PayoutInfo";
export * from "./components/Page";
export * from "./components/PageTitle";
export * from "./components/Select";
export * from "./components/Title";
export * from "./components/VgsFormWrapper";
export * from "./components/VgsInput";

// Export types
export type { AuraLayoutProps } from "./components/AuraLayout";
export type { BodyCopyProps } from "./components/BodyCopy";
export type { ButtonProps } from "./components/Button";
export type { CircularProgressProps } from "./components/CircularProgress";
export type { ISteps, CustomStepperProps } from "./components/CustomStepper";
export type { ElevatedCircleProps } from "./components/ElevatedCircle";
export type { TextProps } from "./components/GradientText";
export type { SearchSelectProps, SelectItem } from "./components/SearchSelect";
export type { InputFieldProps } from "./components/InputField";
export type { LabelInputProps } from "./components/LabelInput";
export type {
  LayoutProps,
  LayoutHeaderProps,
  LayoutContentProps,
  LayoutFooterProps,
} from "./components/Layout";
export type { LoaderProps } from "./components/Loader";
export type { MotionWrapperProps } from "./components/MotionWrapper";
export type { NavbarProps } from "./components/Navbar";
export type { PayoutInfoProps } from "./components/PayoutInfo";
export type { PageProps } from "./components/Page";
export type { PageTitleProps } from "./components/PageTitle";
export type { SelectProps, ISelectItem } from "./components/Select";
export type { TitleProps } from "./components/Title";
export type { VgsInputProps } from "./components/VgsInput";

export * from "./components/QuoteInfo";
export * from "./components/ExchangeFeeInfo";
export * from "./components/QuoteSection";
export * from "./components/Toast";
export * from "./components/Popup";
export * from "./components/RainbowWrapper";
export * from "./components/TransactionItem";
export * from "./components/TransferPanel";
export * from "./components/TransferPanelSection";

export type { QuoteInfoProps } from "./components/QuoteInfo";
export type { ExchangeFeeInfoProps } from "./components/ExchangeFeeInfo";
export type { QuoteSectionProps } from "./components/QuoteSection";
export type { ToastProps } from "./components/Toast";
export type { PopupProps } from "./components/Popup";
export type { RainbowWrapperProps } from "./components/RainbowWrapper";
export type { TransactionItemProps } from "./components/TransactionItem";
export type { TransferPanelProps } from "./components/TransferPanel";
export type { TransferPanelSectionProps } from "./components/TransferPanelSection";

export type { UseVgsCollectLoaderProps } from "./hooks/useVgsCollectLoader";
export type { UseFontsProps } from "./hooks/useFonts";
export type {
  ThemeText,
  IUseTheme,
  IViewColorConfig,
  IViewConfig,
} from "./hooks/useTheme";

// Export new theme system types
export type {
  LolaThemeConfig,
  ColorPalette,
  FontStyleConfig,
  ViewsConfig,
  ViewColorConfig,
  ViewType,
  ThemeLightness,
  FontConfig,
} from "./types/theme.types";

// Export Hooks
export * from "./hooks/useBlockScroll";
export * from "./hooks/useTheme";
export * from "./hooks/useKeyboardVisible";
export * from "./hooks/usePreventReload";
export * from "./hooks/useVgsCollectLoader";
export * from "./hooks/useFonts";
export * from "./hooks/useLocalStorage";

// Export Icons
export * from "./icons/icons";

// Main CSS import
import "./styles/index.css";
