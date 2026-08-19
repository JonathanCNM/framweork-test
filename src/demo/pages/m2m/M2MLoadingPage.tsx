import { AuraLayout, BodyCopy, CircularProgress, Layout } from "../../../components";
import type { IViewConfig } from "../../../hooks/useTheme";
import { M2M_PATRIOT_NOTICE, M2M_SPONSOR } from "./content";

export const M2MLoadingPage = ({ theme }: { theme: IViewConfig }) => {
  const { title } = theme.whiteView;

  return (
    <AuraLayout colorConfig={theme.whiteView}>
      <Layout.Header>
        <BodyCopy className="m2m-loading__sponsor">{M2M_SPONSOR}</BodyCopy>
      </Layout.Header>
      <Layout.Content>
        <div className="m2m-loading__stage">
          <CircularProgress size={56} strokeWidth={3} colors={[title, title]} />
        </div>
      </Layout.Content>
      <Layout.Footer>
        <BodyCopy className="m2m-loading__notice">{M2M_PATRIOT_NOTICE}</BodyCopy>
      </Layout.Footer>
    </AuraLayout>
  );
};
