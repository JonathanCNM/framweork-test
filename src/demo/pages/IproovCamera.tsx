import { BodyCopy, Button, Layout, PageTitle } from "../../components";
import { IproovCameraErrorIcon } from "../../icons";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";

export const IproovCamera = ({ theme }: { theme: IViewConfig }) => {
  const {
    background,
    iconColors,
    backgroundIcon,
    title,
    subtitile,
    bodyCopy,
    backgroundBtn,
    textColorBtn,
    themeType,
    dropzoneColors,
  } = theme.errorView;

  const isDark = themeType === "dark";
  const auraColors = isDark ? dropzoneColors : iconColors;

  return (
    <Layout background={background} auraColors={auraColors}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle background={backgroundIcon}>
            <IproovCameraErrorIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="Camera access"
            highlightColor={title}
            secudnary="needed"
            secudnaryColor={subtitile}
          />

          <BodyCopy textColor={bodyCopy}>
            Please allow access to your camera to continue.
          </BodyCopy>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <Button
          showIcon
          type="submit"
          size="large"
          background={backgroundBtn}
          color={textColorBtn}
        >
          Grant access
        </Button>
      </Layout.Footer>
    </Layout>
  );
};
