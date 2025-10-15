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

export const FontSettingDemo = () => {
  const [inputFont, setInputFont] = useState(defaultFont);
  const [selectedFont, setSelectedFont] = useState(registeredFonts[0]);
  const [fontTop, setFontTop] = useState(0);
  const { gradient } = useGradient();
  const colors = getSplittedColors(gradient);

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
        <Layout>
          <Layout.Header>
            <Navbar align="center" title="Font form" noBackButton />
          </Layout.Header>
          <Layout.Content>
            <section>Form here</section>
          </Layout.Content>
          <Layout.Footer>
            <Button background={gradient} color="#fff" size="large">
              Aplicar
            </Button>
          </Layout.Footer>
        </Layout>
      </section>
    </Page>
  );
};
