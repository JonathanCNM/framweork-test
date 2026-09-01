import { useEffect, useState } from "react";
import {
  buildVgsInputCss,
  findThemeFontCdn,
  readThemeFontFamily,
  resolveCssColor,
  resolveVgsFontFace,
  type VgsCollectFieldCss,
} from "../utils/vgsThemeFont";

export interface UseVgsFieldCssProps {
  color: string;
  inactiveColor: string;
  borderRadius: string | number;
  fontFamily?: string;
  fontCdn?: string;
  tabularNums?: boolean;
}

export const useVgsFieldCss = ({
  color,
  inactiveColor,
  borderRadius,
  fontFamily,
  fontCdn,
  tabularNums = false,
}: UseVgsFieldCssProps): { css: VgsCollectFieldCss; ready: boolean } => {
  const themeFamily = fontFamily || readThemeFontFamily();
  const [css, setCss] = useState<VgsCollectFieldCss>(() =>
    buildVgsInputCss({
      fontFamily: themeFamily,
      color: resolveCssColor(color),
      placeholderColor: resolveCssColor(inactiveColor),
      borderRadius,
      tabularNums,
    })
  );
  const [ready, setReady] = useState(
    () => !(fontCdn || findThemeFontCdn(themeFamily))
  );

  useEffect(() => {
    const family = fontFamily || readThemeFontFamily();
    const cdn = fontCdn || findThemeFontCdn(family);
    let cancelled = false;

    void resolveVgsFontFace(family, cdn).then((font) => {
      if (cancelled) return;
      setCss(
        buildVgsInputCss({
          fontFamily: font.family,
          fontSrc: font.src,
          color: resolveCssColor(color),
          placeholderColor: resolveCssColor(inactiveColor),
          borderRadius,
          tabularNums,
        })
      );
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [
    borderRadius,
    color,
    fontCdn,
    fontFamily,
    inactiveColor,
    tabularNums,
    themeFamily,
  ]);

  return { css, ready };
};
