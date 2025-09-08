import { Layout } from "./Layout";

export interface IproovButtonSlotProps {
  children: React.ReactNode;
}

export const IproovButtonSlot: React.FC<IproovButtonSlotProps> = ({
  children,
}) => (
  <section className="lola-iproov-button-slot">
    <section className="wrapper">
      <Layout.Footer>{children}</Layout.Footer>
    </section>
  </section>
);
