import {
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
  const [themeLightnessPreferences, setThemeLightnessPreferences] =
    useState("dark");
  const { downloadThemeTxt } = useTheme(formFont);
  const { fontStyle, onChangeFont } = useFonts(inputFont);
  const [copied, setCopied] = useState(false);

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
      },
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
      },
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
          },
        })
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al momento de copiar el theme", err);
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

  return (
    <Page font={fontStyle}>
      <section className="font-demo">
        <Layout>
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
        </Layout>

        <Layout className="lola-form">
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
              <section className="color-form-container">
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
                />
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
        </Layout>
      </section>
    </Page>
  );
};
