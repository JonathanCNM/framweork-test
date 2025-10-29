import { Button, Layout, Navbar } from "../../components";
import { IconApp } from "../../icons";
import type { IViewConfig } from "../../hooks/useTheme";
import { SummaryInfo } from "../components/SummaryInfo";

export const SummaryPage = ({ theme }: { theme: IViewConfig }) => {
  const { background, title, backgroundBtn, textColorBtn } = theme.whiteView;

  return (
    <Layout background={background}>
      <Layout.Header>
        <Navbar color={title} title="Summary" align="center" />
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
            background={backgroundBtn}
            color={textColorBtn}
          >
            Pay
          </Button>
        </section>
      </Layout.Footer>
    </Layout>
  );
};
