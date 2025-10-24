import { useEffect, useState } from "react";
import { CircularProgress, MotionWrapper, Page } from "../components";
import { useTheme } from "../hooks/useTheme";
import { HomePage } from "../demo/pages/HomePage";
import "../index.css";
import { StepPage } from "../demo/pages/StepPage";
import { DropzoneDesktop } from "../demo/pages/DropzoneDesktop";
import { DropzoneMobile } from "../demo/pages/DropzoneMobile";
import { IproovReadySlot } from "../demo/pages/IproovReadySlot";
import { IproovSuccessSlot } from "../demo/pages/IproovSuccessSlot";
import { IproovCamera } from "../demo/pages/IproovCamera";
import { IproovError } from "../demo/pages/IproovError";
import { AddressPage } from "../demo/pages/AddressPage";

export const Demo = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [theme, setTheme] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useTheme(theme || {});

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:6006") return;
      if (event.data?.type === "storybook-config") {
        setTheme(event.data.payload);
        setIsLoading(false);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  if (isLoading) return <CircularProgress />;

  return (
    <Page font={{ name: theme?.fontfamily ?? "", cdn: theme?.fontcdn ?? "" }}>
      <MotionWrapper>
        <section className="demo-sliders">
          <section className="demo-slide">
            <HomePage theme={theme} />
          </section>
          <section className="demo-slide">
            <StepPage theme={theme} />
          </section>
          <section className="demo-slide">
            <DropzoneDesktop theme={theme} />
          </section>
          <section className="demo-slide">
            <DropzoneMobile theme={theme} />
          </section>
          <section className="demo-slide">
            <DropzoneMobile theme={theme} isLoading />
          </section>
          <section className="demo-slide">
            <IproovReadySlot theme={theme} />
          </section>
          <section className="demo-slide">
            <IproovCamera theme={theme} />
          </section>
          <section className="demo-slide">
            <IproovError theme={theme} />
          </section>
          <section className="demo-slide">
            <IproovSuccessSlot theme={theme} />
          </section>
          <section className="demo-slide">
            <AddressPage theme={theme} isHomeAddress />
          </section>
        </section>
      </MotionWrapper>
    </Page>
  );
};
