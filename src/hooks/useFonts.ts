import { useEffect, useState } from "react";

export interface UseFontsProps {
  name: string;
  cdn: string;
}

export const useFonts = (font: UseFontsProps) => {
  const [fontStyle, setFontStyle] = useState<UseFontsProps>(font);

  const onChangeFont = (font: UseFontsProps) => {
    // if (!document.querySelector(`link[data-font='myFont']`)) {
      // if (!document.querySelector(`link[data-font='${fontStyle.name}']`)) {
      console.log('font', font)
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = font.cdn;
      link.setAttribute("data-font", font.name);
      document.head.appendChild(link);
      setFontStyle(font);
    // }
  };

  useEffect(() => {
    onChangeFont(fontStyle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontStyle]);

  console.log("fontStyle", fontStyle);

  return { fontStyle, onChangeFont };
};
