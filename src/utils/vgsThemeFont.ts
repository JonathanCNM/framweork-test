export type VgsFontFace = {
  "font-family": string;
  "font-style"?: string;
  "font-weight"?: string | number;
  "font-display"?: string;
  src: string;
};

export type VgsCollectFieldCss = {
  "font-family": string;
  "font-size": string;
  "font-weight": number;
  color: string;
  "box-sizing": string;
  "border-radius": string;
  "font-variant-numeric"?: string;
  "font-feature-settings"?: string;
  "&::placeholder": { color: string };
  "@font-face"?: VgsFontFace;
};

type ResolvedFontFace = { family: string; src?: string };

const FONT_FETCH_TIMEOUT_MS = 4000;

const GENERIC_FAMILIES = new Set([
  "sans-serif",
  "serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-sans-serif",
  "ui-serif",
  "ui-monospace",
  "emoji",
  "math",
  "fangsong",
]);

const fontFaceCache = new Map<string, Promise<ResolvedFontFace>>();

const firstFamilyName = (value: string): string =>
  value.split(",")[0]?.replace(/['"]/g, "").trim() ?? "";

const isBrowser = (): boolean => typeof document !== "undefined";

const cssVar = (element: Element, name: string): string =>
  getComputedStyle(element).getPropertyValue(name).trim();

type ParsedFontFace = {
  src: string;
  weight: string;
  unicodeRange: string;
};

export const parseFontFacesFromCss = (css: string): ParsedFontFace[] =>
  css
    .split(/@font-face\s*/i)
    .slice(1)
    .map((block) => ({
      src:
        block.match(/src:\s*url\((?:['"])?([^'")\s]+)(?:['"])?\)/)?.[1] ?? "",
      weight: block.match(/font-weight:\s*([^;]+)/)?.[1]?.trim() ?? "",
      unicodeRange: block.match(/unicode-range:\s*([^;]+)/)?.[1] ?? "",
    }))
    .filter((face) => face.src.length > 0);

export const pickFontFace = (
  faces: ParsedFontFace[]
): ParsedFontFace | undefined => {
  const latin = faces.filter(
    (face) => !face.unicodeRange || /U\+0000/i.test(face.unicodeRange)
  );
  const pool = latin.length > 0 ? latin : faces;
  return (
    pool.find((face) => face.weight === "400") ??
    pool.find((face) => face.weight === "500") ??
    pool.find((face) => /\b400\b|\b500\b/.test(face.weight)) ??
    pool[0]
  );
};

export const pickFontSrc = (faces: ParsedFontFace[]): string | undefined =>
  pickFontFace(faces)?.src;

export const buildGoogleFontsCssUrl = (fontFamily: string): string => {
  const family = encodeURIComponent(fontFamily.trim()).replace(/%20/g, "+");
  return `https://fonts.googleapis.com/css2?family=${family}:wght@400&display=swap`;
};

export const toStaticGoogleFontsUrl = (
  cdn: string,
  fontFamily: string
): string => {
  if (!cdn.includes("fonts.googleapis.com")) return cdn;
  return buildGoogleFontsCssUrl(fontFamily);
};

export const readThemeFontFamily = (): string => {
  if (!isBrowser()) return "sans-serif";

  const page = document.querySelector(".page");
  const fromPage = page ? firstFamilyName(cssVar(page, "--font")) : "";
  const fromRoot = firstFamilyName(
    cssVar(document.documentElement, "--lola-font-family")
  );
  return fromPage || fromRoot || "sans-serif";
};

export const findThemeFontCdn = (fontFamily: string): string | undefined => {
  if (!isBrowser()) return undefined;

  const page = document.querySelector(".page");
  const fromPage = page ? cssVar(page, "--lola-font-cdn") : "";
  if (fromPage) return fromPage;

  const fromRoot = cssVar(document.documentElement, "--lola-font-cdn");
  if (fromRoot) return fromRoot;

  const byData = document.querySelector<HTMLLinkElement>(
    `link[data-font="${fontFamily}"]`
  );
  if (byData?.href) return byData.href;

  const google = document.querySelector<HTMLLinkElement>(
    'link[href*="fonts.googleapis.com"]'
  );
  if (google?.href) return google.href;

  if (fontFamily && !GENERIC_FAMILIES.has(fontFamily.toLowerCase())) {
    return buildGoogleFontsCssUrl(fontFamily);
  }

  return undefined;
};

export const resolveCssColor = (value: string): string => {
  if (!isBrowser() || !value.includes("var(")) return value;
  const probe = document.createElement("span");
  probe.style.color = value;
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved || value;
};

const withTimeout = <T>(promise: Promise<T>, fallback: T): Promise<T> =>
  new Promise((resolve) => {
    const timer = globalThis.setTimeout(
      () => resolve(fallback),
      FONT_FETCH_TIMEOUT_MS
    );
    promise
      .then((value) => {
        globalThis.clearTimeout(timer);
        resolve(value);
      })
      .catch(() => {
        globalThis.clearTimeout(timer);
        resolve(fallback);
      });
  });

const bytesToBase64 = (bytes: Uint8Array): string => {
  let binary = "";
  const chunk = 0x8000;
  for (let index = 0; index < bytes.length; index += chunk) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
  }
  return btoa(binary);
};

const embedWoff2 = async (fontUrl: string): Promise<string | undefined> => {
  const response = await fetch(fontUrl);
  if (!response.ok) return undefined;
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length === 0) return undefined;
  return `url(data:font/woff2;base64,${bytesToBase64(bytes)}) format("woff2")`;
};

export const resolveVgsFontFace = (
  fontFamily: string,
  cdn?: string
): Promise<ResolvedFontFace> => {
  if (!cdn) return Promise.resolve({ family: fontFamily });

  const stylesheet = toStaticGoogleFontsUrl(cdn, fontFamily);
  const cacheKey = `${fontFamily}::${stylesheet}`;
  const cached = fontFaceCache.get(cacheKey);
  if (cached) return withTimeout(cached, { family: fontFamily });

  const request = fetch(stylesheet)
    .then((response) => (response.ok ? response.text() : ""))
    .then(async (css) => {
      const fileUrl = pickFontSrc(parseFontFacesFromCss(css));
      if (!fileUrl) return { family: fontFamily };
      const embedded = await embedWoff2(fileUrl).catch(() => undefined);
      return {
        family: fontFamily,
        src: embedded ?? `url(${fileUrl}) format("woff2")`,
      };
    })
    .catch(() => ({ family: fontFamily }));

  fontFaceCache.set(cacheKey, request);
  return withTimeout(request, { family: fontFamily });
};

const toBorderRadius = (borderRadius: string | number): string => {
  const value = String(borderRadius).trim();
  return /px|rem|em|%/.test(value) ? value : `${value}px`;
};

export const buildVgsInputCss = ({
  fontFamily,
  fontSrc,
  color,
  placeholderColor,
  borderRadius,
  tabularNums = false,
}: {
  fontFamily: string;
  fontSrc?: string;
  fontWeight?: string;
  color: string;
  placeholderColor: string;
  borderRadius: string | number;
  tabularNums?: boolean;
}): VgsCollectFieldCss => {
  const css: VgsCollectFieldCss = {
    "font-family": `"${fontFamily}", sans-serif`,
    "font-size": "16px",
    "font-weight": 400,
    color,
    "box-sizing": "border-box",
    "border-radius": `${toBorderRadius(borderRadius)} !important`,
    "&::placeholder": { color: placeholderColor },
    ...(tabularNums && {
      "font-variant-numeric": "tabular-nums",
      "font-feature-settings": '"tnum" 1',
    }),
  };

  if (fontSrc) {
    css["@font-face"] = {
      "font-family": fontFamily,
      "font-style": "normal",
      "font-weight": "400",
      "font-display": "swap",
      src: fontSrc.startsWith("url(")
        ? fontSrc
        : `url(${fontSrc}) format("woff2")`,
    };
  }

  return css;
};
