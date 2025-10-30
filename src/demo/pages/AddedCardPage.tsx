import { ElevatedCircle, Layout, PageTitle } from "../../components";
import type { IViewConfig } from "../../hooks";
import { SuccessIcon } from "../../icons";

export const AddedCardPage = ({ theme }: { theme: IViewConfig }) => {
  const { background, iconColors, backgroundIcon, title, subtitile } =
    theme.specialView;

  return (
    <Layout background={background}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle background={backgroundIcon}>
            <SuccessIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="Your card"
            highlightColor={title}
            secudnary="was added"
            secudnaryColor={subtitile}
          />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default AddedCardPage;
