import { useEffect, useState } from "react";
import { CircularProgress, MotionWrapper, Page } from "../components";
import { useTheme } from "../hooks/useTheme";
import { injectStyleVariables } from "../hooks/useCSSVariables";
import { HomePage } from "../demo/pages/HomePage";
import { DropzoneMobile } from "../demo/pages/DropzoneMobile";
import { IproovSuccessSlot } from "../demo/pages/IproovSuccessSlot";
import { IproovCamera } from "../demo/pages/IproovCamera";
import { IproovError } from "../demo/pages/IproovError";
import { AddressPage } from "../demo/pages/AddressPage";
import { CardPage } from "../demo/pages/CardPage";
import { ValidatingPage } from "../demo/pages/ValidatingPage";
import { SummaryPage } from "../demo/pages/SummaryPage";
import { SendingMoneyPage } from "../demo/pages/SendingMoneyPage";
import { SuccessId } from "../demo/pages/SuccessId";
import AddedCardPage from "../demo/pages/AddedCardPage";
import "../index.css";

export const Demo = () => {
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

  useEffect(() => {
    if (theme?.styles) {
      injectStyleVariables(theme.styles);
    } else {
      injectStyleVariables();
    }
  }, [theme]);

  if (isLoading) return <CircularProgress />;

  const newTheme = generateColorsByView(theme?.colors, theme?.styles);
  if (!newTheme) return <CircularProgress />;

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
            <DropzoneMobile theme={newTheme} />
          </section>
          <section className="demo-slide">
            <DropzoneMobile theme={newTheme} isLoading />
          </section>
          <section className="demo-slide">
            <SuccessId theme={newTheme} />
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
          <section className="demo-slide">
            <SendingMoneyPage theme={newTheme} isLoading />
          </section>
          <section className="demo-slide">
            <SendingMoneyPage theme={newTheme} />
          </section>
        </section>
      </MotionWrapper>
    </Page>
  );
};
