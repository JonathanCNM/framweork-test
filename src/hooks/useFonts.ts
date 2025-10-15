import { useEffect, useState } from "react";

export interface UseFontsProps {
  name: string;
  cdn: string;
}

export const useFonts = (font: UseFontsProps) => {
  const [fontStyle, setFontStyle] = useState<UseFontsProps>(font);

  const onChangeFont = (font: UseFontsProps) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = font.cdn;
    link.setAttribute("data-font", font.name);
    document.head.appendChild(link);
    setFontStyle(font);
  };

  useEffect(() => {
    onChangeFont(fontStyle);
  }, [fontStyle]);

  return { fontStyle, onChangeFont };
};
