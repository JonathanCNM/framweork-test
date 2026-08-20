import {
  AuraLayout,
  GradientText,
  Button,
  Layout,
  PageTitle,
} from "../../components";
import { IproovCameraErrorIcon } from "../../icons";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";

export const IproovCamera = ({ theme }: { theme: IViewConfig }) => {
  const {
    iconColors,
    backgroundIcon,
    title,
    bodyCopy,
    backgroundBtn,
    textColorBtn,
    buttonShowIcon,
    buttonSize,
  } = theme.errorView;

  return (
    <AuraLayout colorConfig={theme.errorView}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle background={backgroundIcon}>
            <IproovCameraErrorIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="Camera access"
            highlightColor={title}
            secudnary="needed"
            secudnaryColor={title}
          />

          <GradientText as="p" className="lola-body-copy bodycopy" textColor={bodyCopy}>
            Please allow access to your camera to continue.
          </GradientText>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <Button
          showIcon={buttonShowIcon}
          type="submit"
          size={buttonSize}
          background={backgroundBtn}
          color={textColorBtn}
        >
          Grant access
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
};
