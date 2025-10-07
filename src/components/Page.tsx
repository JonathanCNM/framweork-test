import { useEffect } from "react";
import { useFonts, type UseFontsProps } from "../hooks";
import { defaultFont } from "../utils/constants";

export interface PageProps {
  font?: UseFontsProps;
  children: React.ReactNode | string | number;
}

export const Page: React.FC<PageProps> = ({ children, font = defaultFont }) => {
  const { fontStyle, onChangeFont } = useFonts(font);

  useEffect(() => {
    onChangeFont(font);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [font]);

  return (
    <main
      className="page"
      style={
        { "--font": fontStyle.name } as React.CSSProperties & {
          [key: string]: string;
        }
      }
    >
      {children}
    </main>
  );
};
