import { AuraLayout, BodyCopy, Layout, Navbar } from "../../../components";
import type { IViewConfig } from "../../../hooks/useTheme";
import {
  M2M_ESIGN_IMPORTANT,
  M2M_ESIGN_PARAGRAPHS,
  M2M_ESIGN_SECTION,
  M2M_ESIGN_TITLE,
  M2M_ESIGN_UPDATED,
} from "./content";

export const M2MEsignPage = ({ theme }: { theme: IViewConfig }) => {
  const { title } = theme.whiteView;

  return (
    <AuraLayout colorConfig={theme.whiteView}>
      <Layout.Header>
        <Navbar title="E-Sign Consent" color={title} align="center" />
      </Layout.Header>
      <Layout.Content isOverflowauto>
        <article className="m2m-legal">
          <BodyCopy as="h2" className="m2m-legal__heading">
            {M2M_ESIGN_TITLE}
          </BodyCopy>
          <BodyCopy as="h3" className="m2m-legal__heading">
            {M2M_ESIGN_IMPORTANT}
          </BodyCopy>
          <BodyCopy className="m2m-legal__meta">{M2M_ESIGN_UPDATED}</BodyCopy>
          <BodyCopy as="h3" className="m2m-legal__heading">
            {M2M_ESIGN_SECTION}
          </BodyCopy>
          {M2M_ESIGN_PARAGRAPHS.map((paragraph) => (
            <BodyCopy key={paragraph} className="m2m-legal__body">
              {paragraph}
            </BodyCopy>
          ))}
        </article>
      </Layout.Content>
    </AuraLayout>
  );
};
