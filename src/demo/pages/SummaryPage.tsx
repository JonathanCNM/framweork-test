import { Button, Layout, Navbar } from "../../components";
import { IconApp } from "../../icons";
import { SummaryInfo } from "../components/SummaryInfo";

export const SummaryPage = ({
  theme,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: Record<string, any> | null;
}) => {
  return (
    <Layout>
      <Layout.Header>
        <Navbar color={theme?.primaryMesh} title="Summary" align="center" />
      </Layout.Header>
      <Layout.Content>
        <SummaryInfo />
        <section className="summary-partner">
          <p className="summary-text text-gray mx-auto">Powered by</p>
          <IconApp size={32} />
        </section>
      </Layout.Content>
      <Layout.Footer>
        <section className="homepage-footer">
          <Button variant="cancel" size="small" color="#2587FF">
            Cancel
          </Button>
          <Button
            showIcon
            type="submit"
            size="large"
            color={theme?.whiteColor}
            background={theme?.primaryMesh}
          >
            Pay
          </Button>
        </section>
      </Layout.Footer>
    </Layout>
  );
};
