// Export all components and utilities
export * from "./components";
export * from "./hooks";
export * from "./styles";
export * from "./icons";

// Export components
export * from "./components/AuraLayout";
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
export * from "./components/Page";
export * from "./components/PageTitle";
export * from "./components/Select";
export * from "./components/Title";
export * from "./components/VgsFormWrapper";
export * from "./components/VgsInput";

// Export types
export type { AuraLayoutProps } from "./components/AuraLayout";
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
export type { PageProps } from "./components/Page";
export type { PageTitleProps } from "./components/PageTitle";
export type { SelectProps, ISelectItem } from "./components/Select";
export type { TitleProps } from "./components/Title";
export type { VgsInputProps } from "./components/VgsInput";

export type { UseVgsCollectLoaderProps } from "./hooks/useVgsCollectLoader";
export type { UseFontsProps } from "./hooks/useFonts";
export type {
  ThemeText,
  IUseTheme,
  IViewColorConfig,
  IViewConfig,
} from "./hooks/useTheme";

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
