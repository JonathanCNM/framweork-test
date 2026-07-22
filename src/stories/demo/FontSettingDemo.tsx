import {
  AuraLayout,
  BodyCopy,
  Button,
  InputField,
  Layout,
  Navbar,
  Page,
  PageTitle,
  SearchSelect,
  Select,
  Title,
  type SelectItem,
} from "../../components";
import { IconApp, SuccessIcon } from "../../icons";
import { useGradient } from "../../store/useGradient";
import { generateGradient, getSplittedColors } from "../../utils/utils";
import { useEffect, useState } from "react";
import { useFonts, type UseFontsProps } from "../../hooks";
import { defaultFont, registeredFonts } from "../../utils/constants";
import { useTheme } from "../../hooks/useTheme";
import { injectStyleVariables, injectColorVariables } from "../../hooks/useCSSVariables";
import "../../index.css";

interface FontInput {
  fontWeight: string;
  min: string;
  max: string;
  lineHeight: string;
}
interface IFormFont {
  h1: FontInput;
  highlight: FontInput;
  h2: FontInput;
  bodycopy: FontInput;
  secondaryCta: FontInput;
  footerText: FontInput;
  mainButtonText: FontInput;
  step: FontInput;
  [key: string]: FontInput;
}

const formFontInitialState: IFormFont = {
  h1: {
    fontWeight: "400",
    min: "1.75rem",
    max: "2rem",
    lineHeight: "1",
  },
  highlight: {
    fontWeight: "700",
    min: "1.75rem",
    max: "2rem",
    lineHeight: "0.95",
  },
  h2: {
    fontWeight: "600",
    min: "1.25rem",
    max: "1.5rem",
    lineHeight: "1",
  },
  bodycopy: {
    fontWeight: "500",
    min: "1rem",
    max: "1.25rem",
    lineHeight: "1.25rem",
  },
  secondaryCta: {
    fontWeight: "500",
    min: "0.74rem",
    max: "1rem",
    lineHeight: "1",
  },
  footerText: {
    fontWeight: "500",
    min: "0.85rem",
    max: "0.85rem",
    lineHeight: "1",
  },
  mainButtonText: {
    fontWeight: "600",
    min: "1.15rem",
    max: "1.25rem",
    lineHeight: "2rem",
  },
  step: {
    fontWeight: "600",
    min: "0.5rem",
    max: "0.875rem",
    lineHeight: "1",
  },
};

interface IColorForm {
  primaryGradient: string;
  secondaryGradient: string;
  secondaryColor: string;
  whiteColor: string;
  inactived: string;
  errorColor: string;
  partnerHighlights: string;
  gradientDeg: string;
  primaryGradientPoint: string;
  secundaryGradientPoint: string;
  primaryMesh: string;
  errorViewBackground?: string;
  specialViewBackground?: string;
  cardPanelBackground?: string;
  cardBackground?: string;
  cardBackgroundSecundary?: string;
}

interface IStylesForm {
  cardBorderRadius: string;
  buttonBorderRadius: string;
  inputBorderRadius: string;
  cardBorderColor: string;
  inputBorderColor: string;
  activeBorderBoton: string;
  tamañoBordeCard: string;
  tamañoBordeInput: string;
  buttonPadding: string;
  inputPadding: string;
  cardPadding: string;
  buttonSize: "small" | "medium" | "large";
}

const formColorList = [
  {
    key: "primaryGradient",
    value: "#4BA84B",
    type: "color",
  },
  {
    key: "primaryGradientPoint",
    value: "23.26%",
    type: "text",
  },
  {
    key: "secondaryGradient",
    value: "#008433",
    type: "color",
  },
  {
    key: "secundaryGradientPoint",
    value: "111.43%",
    type: "text",
  },
  {
    key: "secondaryColor",
    value: "#252525",
    type: "color",
  },
  {
    key: "whiteColor",
    value: "#FFFFFF",
    type: "color",
  },
  {
    key: "inactived",
    value: "#979797",
    type: "color",
  },
  {
    key: "errorColor",
    value: "#E81C1C",
    type: "color",
  },
  {
    key: "partnerHighlights",
    value: "#AAFF74",
    type: "color",
  },
  {
    key: "errorViewBackground",
    value: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    type: "text",
  },
  {
    key: "specialViewBackground",
    value: "linear-gradient(116.74deg, #4BA84B 23.26%, #008433 111.43%)",
    type: "text",
  },
  {
    key: "cardPanelBackground",
    value: "transparent",
    type: "text",
  },
  {
    key: "cardBackground",
    value: "#eeeef1",
    type: "text",
  },
  {
    key: "cardBackgroundSecundary",
    value: "#17171c",
    type: "text",
  },
  {
    key: "gradientDeg",
    value: "116.74deg",
    type: "text",
  },
  {
    key: "primaryMesh",
    value: "linear-gradient(116.74deg, #4BA84B 23.26%, #008433 111.43%)",
    type: "text",
  },
];

const formColorInitialState: IColorForm = {
  primaryGradient: "#4BA84B",
  secondaryGradient: "#008433",
  secondaryColor: "#252525",
  whiteColor: "#FFFFFF",
  inactived: "#979797",
  errorColor: "#E81C1C",
  partnerHighlights: "#AAFF74",
  gradientDeg: "116.74deg",
  primaryGradientPoint: "23.26%",
  secundaryGradientPoint: "111.43%",
  primaryMesh: "linear-gradient(116.74deg, #4BA84B 23.26%, #008433 111.43%)",
  errorViewBackground: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
  specialViewBackground: "linear-gradient(116.74deg, #4BA84B 23.26%, #008433 111.43%)",
  cardPanelBackground: "transparent",
  cardBackground: "#eeeef1",
  cardBackgroundSecundary: "#17171c",
};

const formStylesList = [
  {
    key: "cardBorderRadius",
    value: "16px",
    type: "text",
  },
  {
    key: "buttonBorderRadius",
    value: "8px",
    type: "text",
  },
  {
    key: "inputBorderRadius",
    value: "8px",
    type: "text",
  },
  {
    key: "cardBorderColor",
    value: "#E4E4E4",
    type: "color",
  },
  {
    key: "inputBorderColor",
    value: "#E4E4E4",
    type: "color",
  },
  {
    key: "activeBorderBoton",
    value: "#1DAFA1",
    type: "color",
  },
  {
    key: "tamañoBordeCard",
    value: "1px",
    type: "text",
  },
  {
    key: "tamañoBordeInput",
    value: "1px",
    type: "text",
  },
  {
    key: "buttonPadding",
    value: "1rem",
    type: "text",
  },
  {
    key: "inputPadding",
    value: "0.75rem",
    type: "text",
  },
  {
    key: "cardPadding",
    value: "1.5rem",
    type: "text",
  },
  {
    key: "buttonSize",
    value: "medium",
    type: "select",
    options: ["small", "medium", "large"],
  },
];

const formStylesInitialState: IStylesForm = {
  cardBorderRadius: "16px",
  buttonBorderRadius: "8px",
  inputBorderRadius: "8px",
  cardBorderColor: "#E4E4E4",
  inputBorderColor: "#E4E4E4",
  activeBorderBoton: "#1DAFA1",
  tamañoBordeCard: "1px",
  tamañoBordeInput: "1px",
  buttonPadding: "1rem",
  inputPadding: "0.75rem",
  cardPadding: "1.5rem",
  buttonSize: "medium",
};

const localhost = "http://localhost:5176";
const vercelhost = "https://lola-framweork-ui-demo.vercel.app";

export const FontSettingDemo = () => {
  const [inputFont, setInputFont] = useState(defaultFont);
  const [selectedFont, setSelectedFont] = useState(registeredFonts[0]);
  const { gradient, setGradient } = useGradient();
  const [formFont, setFormFont] = useState<IFormFont>(formFontInitialState);
  const [formColors, setFormColors] = useState<IColorForm>(
    formColorInitialState
  );
  const [formStyles, setFormStyles] = useState<IStylesForm>(
    formStylesInitialState
  );
  const [themeLightnessPreferences, setThemeLightnessPreferences] =
    useState("dark");
  const [useThemeSystem, setUsethemeSystem] = useState(false);
  const { downloadThemeTxt, generateColorsByView } = useTheme(formFont);
  const { fontStyle, onChangeFont } = useFonts(inputFont);
  const [copied, setCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [jsonError, setJsonError] = useState("");

  const onChangeIput = (event?: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.currentTarget) {
      setInputFont({ name: "", cdn: "" });
      return false;
    }

    const { name, value } = event.currentTarget;
    setInputFont({
      ...inputFont,
      [name]: value,
    });
  };

  const onSetFont = () => {
    const { name, cdn } = inputFont;
    if (cdn && name) {
      const UseFontsProps: UseFontsProps = {
        name,
        cdn,
      };

      onChangeFont(UseFontsProps);
    }
  };

  const onSelectFont = (fontSelected: unknown) => {
    const font = registeredFonts.find((rFont) => rFont.name === fontSelected);
    if (font) {
      setSelectedFont(font);
      onChangeFont(font);
      setInputFont(font);
    }
  };

  const onHandlerFontForm = (event?: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return false;
    const { name, value } = event.currentTarget;
    const [fontKey, field] = name.split("-");
    setFormFont({
      ...formFont,
      [fontKey]: {
        ...formFont[fontKey as keyof IFormFont],
        [field]: value,
      },
    });
  };

  const onHandlerFormColors = (event?: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return false;
    const { name, value } = event.currentTarget;
    setFormColors({
      ...formColors,
      [name]: value,
    });
  };

  const onHandlerFormStyles = (event?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!event) return false;
    const { name, value } = event.currentTarget;
    setFormStyles({
      ...formStyles,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormColors({
      ...formColors,
      primaryMesh: generateGradient(
        [formColors.primaryGradient, formColors.secondaryGradient],
        formColors.gradientDeg,
        formColors.primaryGradientPoint,
        formColors.secundaryGradientPoint
      ),
    });
    setGradient(
      generateGradient(
        [formColors.primaryGradient, formColors.secondaryGradient],
        formColors.gradientDeg,
        formColors.primaryGradientPoint,
        formColors.secundaryGradientPoint
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formColors.primaryGradient,
    formColors.secondaryGradient,
    formColors.gradientDeg,
    formColors.primaryGradientPoint,
    formColors.secundaryGradientPoint,
  ]);

  useEffect(() => {
    setFormColors({
      ...formColors,
      primaryMesh: gradient,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradient]);

  useEffect(() => {
    setGradient(formColors.primaryMesh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formColors.primaryMesh]);

  // Inject style CSS variables
  useEffect(() => {
    injectStyleVariables(formStyles);
  }, [formStyles]);

  // Inject color CSS variables
  useEffect(() => {
    injectColorVariables({
      ...formColors,
      lightness: themeLightnessPreferences as "light" | "dark",
      useSystemTheme: useThemeSystem,
    });
  }, [formColors, themeLightnessPreferences, useThemeSystem]);

  const onDownloadTheme = () => {
    downloadThemeTxt({
      font: {
        ...formFont,
        fontfamily: inputFont.name,
        fontcdn: inputFont.cdn,
      },
      colors: {
        ...formColors,
        gradient,
        lightness: themeLightnessPreferences,
        useSystemTheme: useThemeSystem,
      },
      styles: formStyles,
    });
  };

  const onViewDemo = () => {
    const theme = {
      font: {
        ...formFont,
        fontfamily: inputFont.name,
        fontcdn: inputFont.cdn,
      },
      colors: {
        ...formColors,
        gradient,
        lightness: themeLightnessPreferences,
        useSystemTheme: useThemeSystem,
      },
      styles: formStyles,
    };
    const location = window.location.hostname;
    const host = location.includes("localhost") ? localhost : vercelhost;
    const child = window.open(host, "_blank");

    const sendMessage = () => {
      if (!child) return;
      child.postMessage(
        {
          type: "storybook-config",
          payload: theme,
        },
        host
      );
    };

    const interval = setInterval(() => {
      if (child && !child.closed) {
        sendMessage();
        clearInterval(interval);
      }
    }, 500);
  };

  const onCopyTheme = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify({
          font: {
            ...formFont,
            fontfamily: inputFont.name,
            fontcdn: inputFont.cdn,
          },
          colors: {
            ...formColors,
            gradient,
            lightness: themeLightnessPreferences,
            useSystemTheme: useThemeSystem,
          },
          styles: formStyles,
        })
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al momento de copiar el theme", err);
    }
  };

  const onApplyJsonTheme = () => {
    try {
      setJsonError("");
      const parsedTheme = JSON.parse(jsonInput);
      
      // Validate that at least one main property exists (legacy support)
      if (!parsedTheme.font && !parsedTheme.colors && !parsedTheme.styles) {
        setJsonError("El JSON debe contener al menos una de las propiedades: font, colors o styles");
        return;
      }

      // Apply font configuration (if exists)
      if (parsedTheme.font) {
        const { fontfamily, fontcdn, ...fontConfig } = parsedTheme.font;
        
        // Update font family and CDN if provided
        if (fontfamily && fontcdn) {
          setInputFont({ name: fontfamily, cdn: fontcdn });
          onChangeFont({ name: fontfamily, cdn: fontcdn });
        }
        
        // Merge with existing font config (legacy support - only update provided properties)
        setFormFont((prev) => ({
          ...prev,
          ...Object.keys(fontConfig).reduce((acc, key) => {
            if (fontConfig[key]) {
              acc[key] = fontConfig[key];
            }
            return acc;
          }, {} as Partial<IFormFont>)
        }));
      }

      // Apply colors configuration (if exists)
      if (parsedTheme.colors) {
        const { lightness, useSystemTheme: systemTheme, gradient: themeGradient, ...colors } = parsedTheme.colors;
        
        // Merge with existing colors (legacy support)
        setFormColors((prev) => ({
          ...prev,
          ...colors
        }));
        
        if (lightness) setThemeLightnessPreferences(lightness);
        if (typeof systemTheme === "boolean") setUsethemeSystem(systemTheme);
        if (themeGradient) setGradient(themeGradient);
      }

      // Apply styles configuration (if exists - legacy themes might not have this)
      if (parsedTheme.styles) {
        setFormStyles((prev) => ({
          ...prev,
          ...parsedTheme.styles
        }));
      }

      setJsonInput("");
      const appliedSections = [
        parsedTheme.font && "font",
        parsedTheme.colors && "colors", 
        parsedTheme.styles && "styles"
      ].filter(Boolean).join(", ");
      
      alert(`Tema aplicado correctamente (${appliedSections})`);
    } catch (err) {
      setJsonError("JSON inválido. Por favor verifica el formato.");
      console.error("Error al parsear el JSON:", err);
    }
  };

  const colors = getSplittedColors(gradient);
  const themeLightnessPreferencesItems: SelectItem[] = [
    { label: "light", code: "light" },
    { label: "dark", code: "dark" },
  ];

  const onSelectThemeLightnessPreferencesItems = (
    themeLightnessPreferencesSelected: unknown
  ) => {
    const themeLightnessPreferences =
      themeLightnessPreferencesSelected as SelectItem;
    setThemeLightnessPreferences(themeLightnessPreferences.code as string);
  };

  const colorConfig = generateColorsByView({
    ...formColors,
    lightness: themeLightnessPreferences as "light" | "dark",
    useSystemTheme: useThemeSystem,
  })!;

  return (
    <Page font={fontStyle}>
      <section className="font-demo">
        <AuraLayout
          colorConfig={colorConfig.whiteView}
          className="scrollable preview"
        >
          <Layout.Header>
            <Navbar
              align="center"
              color={gradient}
              title="Nabvar test (H2)"
              icon={<IconApp colors={colors} />}
            />
          </Layout.Header>
          <Layout.Content>
            <PageTitle
              highlight="Highlight Text (H1 Hl)"
              highlightColor={gradient}
              secudnary="Secundary text (H1)"
            />
            <section className="font-demo-container">
              <BodyCopy>This is a body copy text (BC)</BodyCopy>

              <Title
                align="center"
                color={gradient}
                title="Personaliza las Fonts"
              />

              <Select
                items={registeredFonts.map((font) => ({
                  label: font.name,
                  code: font.name,
                }))}
                selectedBackground={gradient}
                selectedItem={selectedFont.name}
                onChange={onSelectFont}
              />

              <section className="font-demo-api">
                <InputField
                  name="name"
                  label="Font name"
                  value={inputFont.name}
                  onChange={onChangeIput}
                />
                <InputField
                  name="cdn"
                  label="Font CDN"
                  value={inputFont.cdn}
                  onChange={onChangeIput}
                />
                <SuccessIcon size={56} colors={colors} onClick={onSetFont} />
              </section>
            </section>
          </Layout.Content>
          <Layout.Footer>
            <section className="font-demo-footer">
              <p style={{ textAlign: "center" }} className="footer-text">
                This is a footer text
              </p>
              <Button variant="cancel" color={gradient}>
                Secundary button
              </Button>
              <Button showIcon color="#fff" size="large" background={gradient}>
                Button sampler
              </Button>
            </section>
          </Layout.Footer>
        </AuraLayout>

        <AuraLayout
          colorConfig={colorConfig.whiteView}
          className="lola-form scrollable"
        >
          <Layout.Header>
            <Navbar
              align="center"
              title="Configuración del tema"
              noBackButton
              color={gradient}
            />
          </Layout.Header>
          <Layout.Content>
            <section className="color-form">
              <Title title="Formulario de colores" subTitle="En Hexadecimal" />
              <section 
                className="color-form-container"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  marginTop: "1rem"
                }}
              >
                {formColorList.map(({ key, type }) => (
                  <InputField
                    key={key}
                    type={type}
                    label={key}
                    name={key}
                    value={formColors[key as keyof IColorForm]}
                    onChange={onHandlerFormColors}
                  />
                ))}
                <SearchSelect
                  items={themeLightnessPreferencesItems}
                  value={themeLightnessPreferences}
                  onChange={onSelectThemeLightnessPreferencesItems}
                  searchable={false}
                />
                <section
                  className="checkbox-input"
                  style={{ gridColumn: "span 3" }}
                >
                  <input
                    id="useThemeSystem"
                    type="checkbox"
                    checked={useThemeSystem}
                    onChange={() => setUsethemeSystem((prev) => !prev)}
                  />
                  <label htmlFor="useThemeSystem">
                    Se va a usar el tema del sistema
                  </label>
                </section>
              </section>
            </section>
            <section className="json-import-section">
              <Title title="Importar tema desde JSON" subTitle="Compatible con temas legacy (solo actualiza las propiedades que vengan)" />
              <section 
                className="json-import-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginTop: "1rem"
                }}
              >
                <textarea
                  placeholder='Pega aquí tu JSON del tema... Compatible con temas legacy. Ejemplo: {"font": {...}, "colors": {...}} o completo con "styles"'
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "150px",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: `1px solid ${jsonError ? "#E81C1C" : "#E4E4E4"}`,
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                    resize: "vertical",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)"
                  }}
                />
                {jsonError && (
                  <p style={{ color: "#E81C1C", fontSize: "0.875rem", margin: 0 }}>
                    {jsonError}
                  </p>
                )}
                <Button
                  size="small"
                  color="#fff"
                  background={gradient}
                  onClick={onApplyJsonTheme}
                  disabled={!jsonInput.trim()}
                >
                  Aplicar tema desde JSON
                </Button>
              </section>
            </section>
            <section className="styles-form">
              <Title title="Estilos Personalizados" subTitle="Border radius, colores y tamaños" />
              <section 
                className="color-form-container"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  marginTop: "1rem"
                }}
              >
                {formStylesList.map(({ key, type, options }) => {
                  if (type === "select" && options) {
                    return (
                      <SearchSelect
                        key={key}
                        items={options.map((opt) => ({
                          label: opt,
                          code: opt,
                        }))}
                        value={formStyles[key as keyof IStylesForm] as string}
                        onChange={(selected) => {
                          const item = selected as SelectItem;
                          onHandlerFormStyles({
                            currentTarget: {
                              name: key,
                              value: item.code,
                            },
                          } as React.ChangeEvent<HTMLInputElement>);
                        }}
                        placeholder={key}
                        searchable={false}
                      />
                    );
                  }
                  return (
                    <InputField
                      key={key}
                      type={type}
                      label={key}
                      name={key}
                      value={formStyles[key as keyof IStylesForm]}
                      onChange={onHandlerFormStyles}
                    />
                  );
                })}
              </section>
            </section>
            <section className="font-form">
              <Title title="Formulario de la fuente" />
              {Object.keys(formFontInitialState).map((font) => (
                <section key={font} className="font-form-container">
                  <label>{font.toLocaleUpperCase()}</label>
                  <section className="font-form-inputs">
                    {Object.keys(
                      formFontInitialState[font as keyof IFormFont]
                    ).map((field) => (
                      <InputField
                        key={`${font}-${field}`}
                        label={field}
                        name={`${font}-${field}`}
                        value={
                          formFont[font as keyof IFormFont][
                            field as keyof FontInput
                          ]
                        }
                        onChange={onHandlerFontForm}
                      />
                    ))}
                  </section>
                </section>
              ))}
            </section>
          </Layout.Content>
          <Layout.Footer>
            <section className="font-demo-footer-btns">
              <Button
                size="small"
                color="#fff"
                background={gradient}
                onClick={onViewDemo}
              >
                Ver Demo
              </Button>
              <Button
                size="small"
                variant="outline"
                color={gradient}
                background={gradient}
                onClick={onDownloadTheme}
              >
                Descargar
              </Button>
              <Button
                size="small"
                variant={copied ? "default" : "outline"}
                color={copied ? "#fff" : gradient}
                background={gradient}
                onClick={onCopyTheme}
              >
                {copied ? "Tema copiado" : "Copiar tema"}
              </Button>
            </section>
          </Layout.Footer>
        </AuraLayout>
      </section>
    </Page>
  );
};
