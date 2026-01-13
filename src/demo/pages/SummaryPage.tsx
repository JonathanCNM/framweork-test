import { Button, Layout, Navbar } from "../../components";
import { IconApp } from "../../icons";
import type { IViewConfig } from "../../hooks/useTheme";
import { SummaryInfo } from "../components/SummaryInfo";

export const SummaryPage = ({ theme }: { theme: IViewConfig }) => {
  const {
    background,
    title,
    backgroundBtn,
    textColorBtn,
    themeType,
    dropzoneColors,
    iconColors,
  } = theme.whiteView;
  const isDark = themeType === "dark";
  const auraColors = isDark ? dropzoneColors : iconColors;

  return (
    <Layout background={background} auraColors={auraColors}>
      <Layout.Header>
        <Navbar color={title} title="Confirmation" align="center" />
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
