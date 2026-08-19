import {
  M2MConsentPage,
  M2MEsignPage,
  M2MLoadingPage,
  M2MTermsPage,
} from "../pages/m2m";
import type { DemoFlowProps } from "./types";

export const M2MFlow = ({ theme }: DemoFlowProps) => (
  <section className="demo-sliders">
    <section className="demo-slide">
      <M2MLoadingPage theme={theme} />
    </section>
    <section className="demo-slide">
      <M2MConsentPage theme={theme} />
    </section>
    <section className="demo-slide">
      <M2MEsignPage theme={theme} />
    </section>
    <section className="demo-slide">
      <M2MTermsPage theme={theme} />
    </section>
    <section className="demo-slide">
      <M2MTermsPage theme={theme} expandedId="privacy-policy" />
    </section>
    <section className="demo-slide">
      <M2MConsentPage theme={theme} accepted />
    </section>
  </section>
);
