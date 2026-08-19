import { AuraLayout, BodyCopy, Layout, Navbar } from "../../../components";
import { LeftChevron } from "../../../icons";
import type { IViewConfig } from "../../../hooks/useTheme";
import {
  M2M_PRIVACY_COMPANY,
  M2M_PRIVACY_PARAGRAPHS,
  M2M_PRIVACY_TITLE,
  M2M_PRIVACY_UPDATED,
  M2M_TERMS_ITEMS,
  type M2MTermsItemId,
} from "./content";

export const M2MTermsPage = ({
  theme,
  expandedId,
}: {
  theme: IViewConfig;
  expandedId?: M2MTermsItemId;
}) => {
  const { title } = theme.whiteView;

  return (
    <AuraLayout colorConfig={theme.whiteView}>
      <Layout.Header>
        <Navbar title="Terms & conditions" color={title} align="center" />
      </Layout.Header>
      <Layout.Content isOverflowauto>
        <div className="m2m-terms">
          {M2M_TERMS_ITEMS.map((item) => {
            const expanded = item.id === expandedId;
            return (
              <section
                key={item.id}
                className={`m2m-terms__item${expanded ? " m2m-terms__item--open" : ""}`}
              >
                <div className="m2m-terms__row">
                  <BodyCopy as="span" className="m2m-terms__label">
                    {item.label}
                  </BodyCopy>
                  <LeftChevron
                    size={16}
                    colors={[title, title]}
                    className={`m2m-terms__chevron${expanded ? " m2m-terms__chevron--open" : ""}`}
                  />
                </div>
                {expanded && item.id === "privacy-policy" && (
                  <article className="m2m-legal m2m-legal--nested">
                    <BodyCopy as="h2" className="m2m-legal__heading">
                      {M2M_PRIVACY_TITLE}
                    </BodyCopy>
                    <BodyCopy className="m2m-legal__body">
                      {M2M_PRIVACY_COMPANY}
                    </BodyCopy>
                    <BodyCopy className="m2m-legal__meta">
                      {M2M_PRIVACY_UPDATED}
                    </BodyCopy>
                    {M2M_PRIVACY_PARAGRAPHS.map((paragraph) => (
                      <BodyCopy key={paragraph} className="m2m-legal__body">
                        {paragraph}
                      </BodyCopy>
                    ))}
                  </article>
                )}
              </section>
            );
          })}
        </div>
      </Layout.Content>
    </AuraLayout>
  );
};
