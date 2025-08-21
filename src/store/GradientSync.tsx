import { useEffect } from "react";
import { useGradient } from "./useGradient";

export const GradientSync = ({
  gradient,
  children,
}: {
  gradient: string;
  children: React.ReactNode;
}) => {
  const { setGradient } = useGradient();

  useEffect(() => {
    setGradient(gradient);
  }, [gradient, setGradient]);

  return <>{children}</>;
};
