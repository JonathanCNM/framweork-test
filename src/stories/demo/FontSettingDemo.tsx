import { useRef } from "react";
import {
  AuraLayout,
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
import { ThemeEditorForm, useThemeEditor } from "../../demo/theme-editor";
import { IconApp, SuccessIcon } from "../../icons";
import { getSplittedColors } from "../../utils/utils";
import { registeredFonts } from "../../utils/constants";
import "../../index.css";

const localhost = "http://localhost:5176";
const vercelhost = "https://lola-framweork-ui-demo.vercel.app";

export const FontSettingDemo = () => {
  const editor = useThemeEditor();
  const { state, generatedViews, exportedTheme, copied, feedback } = editor;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const gradient = state.formColors.primaryMesh;
  const colors = getSplittedColors(gradient);
  const colorConfig = generatedViews;

  const onSelectFont = (fontSelected: unknown) => {
    if (typeof fontSelected === "string") {
      editor.onSelectRegisteredFont(fontSelected);
    }
  };

  const onSetFont = () => {
    const { name, cdn } = state.inputFont;
    if (name && cdn) {
      editor.onSelectRegisteredFont(name);
    }
  };

  const onViewDemo = () => {
    const location = window.location.hostname;
    const host = location.includes("localhost") ? localhost : vercelhost;
    const child = window.open(host, "_blank");

    const sendMessage = () => {
      if (!child) return;
      child.postMessage(
        {
          type: "storybook-config",
          payload: exportedTheme,
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

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      void editor.onUploadThemeFile(file);
    }
    event.currentTarget.value = "";
  };

  if (!colorConfig) return null;

  return (
    <Page font={state.inputFont}>
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
                selectedItem={state.inputFont.name}
                onChange={onSelectFont}
              />

              <section className="font-demo-api">
                <InputField
                  name="name"
                  label="Font name"
                  value={state.inputFont.name}
                  onChange={(event) => {
                    if (event) editor.onChangeFontMeta(event);
                  }}
                />
                <InputField
                  name="cdn"
                  label="Font CDN"
                  value={state.inputFont.cdn}
                  onChange={(event) => {
                    if (event) editor.onChangeFontMeta(event);
                  }}
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
              <Button
                showIcon={state.formStyles.buttonShowIcon}
                color="#fff"
                size={state.formStyles.buttonSize}
                background={gradient}
              >
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
            <div className="theme-editor-form--wide">
              <ThemeEditorForm editor={editor} />
            </div>
          </Layout.Content>
          <Layout.Footer>
            {feedback ? (
              <p
                className={`theme-sidebar__feedback theme-sidebar__feedback--${feedback.type}`}
                role="status"
              >
                {feedback.message}
              </p>
            ) : null}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              hidden
              onChange={onFileChange}
            />
            <section className="font-demo-footer-btns">
              <Button
                size="small"
                color="#fff"
                background={gradient}
                onClick={() => fileInputRef.current?.click()}
              >
                Subir tema
              </Button>
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
                onClick={editor.onDownloadTheme}
              >
                Descargar
              </Button>
              <Button
                size="small"
                variant={copied ? "default" : "outline"}
                color={copied ? "#fff" : gradient}
                background={gradient}
                onClick={() => void editor.onCopyTheme()}
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
