import "./styles/index.css";
import "./index.css";
import { useEffect, useState } from "react";
import { useTheme, type IViewConfig } from "./hooks";
import { CircularProgress, MotionWrapper, Page } from "./components";
import { HomePage } from "./demo/pages/HomePage";
import { StepPage } from "./demo/pages/StepPage";
import { IproovCamera } from "./demo/pages/IproovCamera";
import { DropzoneDesktop } from "./demo/pages/DropzoneDesktop";
import { DropzoneMobile } from "./demo/pages/DropzoneMobile";
import { SuccessId } from "./demo/pages/SuccessId";
import { IproovReadySlot } from "./demo/pages/IproovReadySlot";
import { IproovError } from "./demo/pages/IproovError";
import { IproovSuccessSlot } from "./demo/pages/IproovSuccessSlot";
import { AddressPage } from "./demo/pages/AddressPage";
import { LastStepsPage } from "./demo/pages/LastStepsPage";
import { CardPage } from "./demo/pages/CardPage";
import { ValidatingPage } from "./demo/pages/ValidatingPage";
import AddedCardPage from "./demo/pages/AddedCardPage";
import { SummaryPage } from "./demo/pages/SummaryPage";
import { SendingMoneyPage } from "./demo/pages/SendingMoneyPage";

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [theme, setTheme] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const themeFormatted = {
    ...theme?.font,
    ...theme?.colors,
  };
  const { generateColorsByView } = useTheme(themeFormatted || {});

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (
        ![
          "http://localhost:6006",
          "https://lola-framweork-ui.vercel.app",
        ].includes(event.origin)
      )
        return;
      if (event.data?.type === "storybook-config") {
        setTheme(event.data.payload);
        setIsLoading(false);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  if (isLoading) return <CircularProgress />;
  const newTheme: IViewConfig = generateColorsByView(theme?.colors);

  return (
    <Page
      font={{
        name: themeFormatted?.fontfamily ?? "",
        cdn: themeFormatted?.fontcdn ?? "",
      }}
    >
      <MotionWrapper>
        <section className="demo-sliders">
          <section className="demo-slide">
            <HomePage theme={newTheme} />
          </section>
          <section className="demo-slide">
            <StepPage theme={newTheme} />
          </section>
          <section className="demo-slide">
            <IproovCamera theme={newTheme} />
          </section>
          <section className="demo-slide">
            <DropzoneDesktop theme={newTheme} />
          </section>
          <section className="demo-slide">
            <DropzoneMobile theme={newTheme} />
          </section>
          <section className="demo-slide">
            <DropzoneMobile theme={newTheme} isLoading />
          </section>
          <section className="demo-slide">
            <SuccessId theme={newTheme} />
          </section>
          <section className="demo-slide">
            <IproovReadySlot theme={newTheme} />
          </section>
          <section className="demo-slide">
            <IproovCamera theme={newTheme} />
          </section>
          <section className="demo-slide">
            <IproovError theme={newTheme} />
          </section>
          <section className="demo-slide">
            <IproovSuccessSlot theme={newTheme} />
          </section>
          <section className="demo-slide">
            <AddressPage theme={newTheme} isHomeAddress />
          </section>
          <section className="demo-slide">
            <LastStepsPage theme={newTheme} />
          </section>
          <section className="demo-slide">
            <CardPage theme={newTheme} />
          </section>
          <section className="demo-slide">
            <AddressPage theme={newTheme} />
          </section>
          <section className="demo-slide">
            <ValidatingPage theme={newTheme} />
          </section>
          <section className="demo-slide">
            <AddedCardPage theme={newTheme} />
          </section>
          <section className="demo-slide">
            <SummaryPage theme={newTheme} />
          </section>
          <section className="demo-slide"></section>
          <SendingMoneyPage theme={newTheme} isLoading />
          <section className="demo-slide">
            <SendingMoneyPage theme={newTheme} />
          </section>
        </section>
      </MotionWrapper>
    </Page>
  );
};

export default App;
