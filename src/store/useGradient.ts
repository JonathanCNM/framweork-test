import { useContext } from "react";
import { GradientContext } from ".";

export const useGradient = () => {
  const ctx = useContext(GradientContext);
  if (!ctx) throw new Error("useGradient must be used inside GradientProvider");
  return ctx;
};
