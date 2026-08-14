import { HomePage } from "../pages/HomePage";
import { IproovCamera } from "../pages/IproovCamera";
import { LivenessPage } from "../pages/LivenessPage";
import { DropzoneMobile } from "../pages/DropzoneMobile";
import { SuccessId } from "../pages/SuccessId";
import { IproovError } from "../pages/IproovError";
import { IproovSuccessSlot } from "../pages/IproovSuccessSlot";
import { AddressPage } from "../pages/AddressPage";
import { CardPage } from "../pages/CardPage";
import { ValidatingPage } from "../pages/ValidatingPage";
import AddedCardPage from "../pages/AddedCardPage";
import { SummaryPage } from "../pages/SummaryPage";
import { SendingMoneyPage } from "../pages/SendingMoneyPage";
import type { DemoFlowProps } from "./types";

export const RemesasFlow = ({ theme }: DemoFlowProps) => (
  <section className="demo-sliders">
    <section className="demo-slide">
      <HomePage theme={theme} />
    </section>
    <section className="demo-slide">
      <DropzoneMobile theme={theme} />
    </section>
    <section className="demo-slide">
      <DropzoneMobile theme={theme} isLoading />
    </section>
    <section className="demo-slide">
      <SuccessId theme={theme} />
    </section>
    <section className="demo-slide">
      <IproovCamera theme={theme} />
    </section>
    <section className="demo-slide">
      <LivenessPage theme={theme} />
    </section>
    <section className="demo-slide">
      <IproovError theme={theme} />
    </section>
    <section className="demo-slide">
      <IproovSuccessSlot theme={theme} />
    </section>
    <section className="demo-slide">
      <CardPage theme={theme} />
    </section>
    <section className="demo-slide">
      <AddressPage theme={theme} />
    </section>
    <section className="demo-slide">
      <ValidatingPage theme={theme} />
    </section>
    <section className="demo-slide">
      <AddedCardPage theme={theme} />
    </section>
    <section className="demo-slide">
      <SummaryPage theme={theme} />
    </section>
    <section className="demo-slide">
      <SendingMoneyPage theme={theme} isLoading />
    </section>
    <section className="demo-slide">
      <SendingMoneyPage theme={theme} />
    </section>
  </section>
);
