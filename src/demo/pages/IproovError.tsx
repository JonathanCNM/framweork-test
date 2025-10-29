import { BodyCopy, Button, Layout, PageTitle } from "../../components";
import { IproovCameraErrorIcon } from "../../icons";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";

export const IproovError = ({ theme }: { theme: IViewConfig }) => {
  const {
    background,
    iconColors,
    backgroundIcon,
    title,
    subtitile,
    bodyCopy,
    backgroundBtn,
    textColorBtn,
  } = theme.errorView;

  return (
    <Layout background={background}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle background={backgroundIcon}>
            <IproovCameraErrorIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="Verification"
            highlightColor={title}
            secudnary="Failed"
            secudnaryColor={subtitile}
          />

          <BodyCopy textColor={bodyCopy} className="mt-4">
            Remember use good lighting; <br /> no glasses or face coverings.
          </BodyCopy>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <Button
          showIcon
          size="large"
          type="submit"
          background={backgroundBtn}
          color={textColorBtn}
        >
          Retry
        </Button>
      </Layout.Footer>
    </Layout>
  );
};
