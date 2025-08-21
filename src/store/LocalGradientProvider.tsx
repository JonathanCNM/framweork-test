import { useState } from "react";
import { GradientContext } from ".";
import { backgroundGradient } from "../utils/constants";

export const LocalGradientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [localGradient, setLocalGradient] =
    useState<string>(backgroundGradient);

  return (
    <GradientContext.Provider
      value={{ gradient: localGradient, setGradient: setLocalGradient }}
    >
      {children}
    </GradientContext.Provider>
  );
};
