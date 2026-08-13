import "./styles/index.css";
import "./index.css";
import { useEffect } from "react";
import { CircularProgress, MotionWrapper, Page } from "./components";
import { HomePage } from "./demo/pages/HomePage";
import { IproovCamera } from "./demo/pages/IproovCamera";
import { DropzoneMobile } from "./demo/pages/DropzoneMobile";
import { SuccessId } from "./demo/pages/SuccessId";
import { IproovError } from "./demo/pages/IproovError";
import { IproovSuccessSlot } from "./demo/pages/IproovSuccessSlot";
import { AddressPage } from "./demo/pages/AddressPage";
import { CardPage } from "./demo/pages/CardPage";
import { ValidatingPage } from "./demo/pages/ValidatingPage";
import AddedCardPage from "./demo/pages/AddedCardPage";
import { SummaryPage } from "./demo/pages/SummaryPage";
import { SendingMoneyPage } from "./demo/pages/SendingMoneyPage";
import {
  STORYBOOK_ORIGINS,
  ThemeEditorSidebar,
  useThemeEditor,
} from "./demo/theme-editor";

const App = () => {
  const editor = useThemeEditor();
  const { generatedViews, state, importThemeFromUnknown } = editor;

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!(STORYBOOK_ORIGINS as readonly string[]).includes(event.origin)) {
        return;
      }
      if (event.data?.type === "storybook-config") {
        importThemeFromUnknown(event.data.payload);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [importThemeFromUnknown]);

  if (!generatedViews) return <CircularProgress />;

  return (
    <div className="app-playground">
      <div className="app-playground__preview">
        <Page font={state.inputFont}>
          <MotionWrapper className="app-playground__motion">
            <section className="demo-sliders">
              <section className="demo-slide">
                <HomePage theme={generatedViews} />
              </section>
              <section className="demo-slide">
                <DropzoneMobile theme={generatedViews} />
              </section>
              <section className="demo-slide">
                <DropzoneMobile theme={generatedViews} isLoading />
              </section>
              <section className="demo-slide">
                <SuccessId theme={generatedViews} />
              </section>
              <section className="demo-slide">
                <IproovCamera theme={generatedViews} />
              </section>
              <section className="demo-slide">
                <IproovError theme={generatedViews} />
              </section>
              <section className="demo-slide">
                <IproovSuccessSlot theme={generatedViews} />
              </section>
              <section className="demo-slide">
                <CardPage theme={generatedViews} />
              </section>
              <section className="demo-slide">
                <AddressPage theme={generatedViews} />
              </section>
              <section className="demo-slide">
                <ValidatingPage theme={generatedViews} />
              </section>
              <section className="demo-slide">
                <AddedCardPage theme={generatedViews} />
              </section>
              <section className="demo-slide">
                <SummaryPage theme={generatedViews} />
              </section>
              <section className="demo-slide">
                <SendingMoneyPage theme={generatedViews} isLoading />
              </section>
              <section className="demo-slide">
                <SendingMoneyPage theme={generatedViews} />
              </section>
            </section>
          </MotionWrapper>
        </Page>
      </div>
      <ThemeEditorSidebar editor={editor} />
    </div>
  );
};

export default App;
