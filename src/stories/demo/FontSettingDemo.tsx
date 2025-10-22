import {
  BodyCopy,
  Button,
  InputField,
  Layout,
  Navbar,
  Page,
  PageTitle,
  Select,
  Title,
} from "../../components";
import { IconApp, SuccessIcon } from "../../icons";
import { useGradient } from "../../store/useGradient";
import { getSplittedColors } from "../../utils/utils";
import { useState } from "react";
import { useFonts, type UseFontsProps } from "../../hooks";
import { defaultFont, registeredFonts } from "../../utils/constants";
import "../../index.css";
import { useTheme } from "../../hooks/useTheme";

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
    lineHeight: "1.25rem",
  },
  step: {
    fontWeight: "600",
    min: "0.5rem",
    max: "0.875rem",
    lineHeight: "1",
  },
};



export const FontSettingDemo = () => {
  const [inputFont, setInputFont] = useState(defaultFont);
  const [selectedFont, setSelectedFont] = useState(registeredFonts[0]);
  const [fontTop, setFontTop] = useState(0);
  const { gradient } = useGradient();
  const colors = getSplittedColors(gradient);
  const [formFont, setFormFont] = useState<IFormFont>(formFontInitialState);
  const { downloadThemeTxt } = useTheme(formFont);
  const { fontStyle, onChangeFont } = useFonts(inputFont);

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

  const onSelectFont = (fontSelected: string, index: number) => {
    const font = registeredFonts.find((rFont) => rFont.name === fontSelected);
    if (font) {
      setSelectedFont(font);
      setFontTop(index);

      onChangeFont(font);
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

  const onDownloadTheme = () => {
    downloadThemeTxt({
      ...formFont,
      fontfamily: inputFont.name,
      fontcdn: inputFont.cdn,
      gradient,
    });
  };

  const onViewDemo = () => {
    const theme = {
      ...formFont,
      fontfamily: inputFont.name,
      fontcdn: inputFont.cdn,
      gradient,
    };
    const child = window.open("http://localhost:5176/demo", "_blank");

    const sendMessage = () => {
      if (!child) return;
      child.postMessage(
        {
          type: "storybook-config",
          payload: theme,
        },
        "http://localhost:5176/demo"
      );
    };

    const interval = setInterval(() => {
      if (child && !child.closed) {
        sendMessage();
        clearInterval(interval);
      }
    }, 500);
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
                top={fontTop}
                items={registeredFonts.map((font) => ({
                  label: font.name,
                  code: font.name,
                }))}
                selectedBackground={gradient}
                selectedItem={selectedFont.name}
                onClick={onSelectFont}
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
            <section className="font-form">
              <Title title="Formulario de colores" />

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
            </section>
          </Layout.Footer>
        </Layout>
      </section>
    </Page>
  );
};
