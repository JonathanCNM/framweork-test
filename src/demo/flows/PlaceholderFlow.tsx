import type { DemoFlowProps } from "./types";

export const PlaceholderFlow = ({ slug = "send" }: DemoFlowProps) => (
  <section className="demo-sliders">
    <section className="demo-slide demo-flow-placeholder">
      <p className="demo-flow-placeholder__title">Flujo {slug}</p>
      <p className="demo-flow-placeholder__copy">
        Esta ruta ya está lista. Agrega las pantallas de este flujo cuando
        quieras.
      </p>
    </section>
  </section>
);
