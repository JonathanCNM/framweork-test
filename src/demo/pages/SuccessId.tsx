import { ElevatedCircle, Layout, PageTitle } from "../../components";
import type { IViewConfig } from "../../hooks";
import { SuccessIcon } from "../../icons";

export const SuccessId = ({ theme }: { theme: IViewConfig }) => {
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
            highlight="Success"
            highlightColor={title}
            secudnary="ID verified"
            secudnaryColor={subtitile}
          />
        </div>
      </Layout.Content>
    </Layout>
  );
};
