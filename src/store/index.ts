import { createContext } from "react";

export interface GrdientThemeProps {
  gradient: string;
  setGradient: (gradient: string) => void;
}

export const GradientContext = createContext<GrdientThemeProps | null>(null);
