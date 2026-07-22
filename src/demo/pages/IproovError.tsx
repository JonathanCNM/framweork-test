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

export const IproovError = ({ theme }: { theme: IViewConfig }) => {
  const {
    iconColors,
    backgroundIcon,
    title,
    subtitile,
    bodyCopy,
    backgroundBtn,
    textColorBtn,
  } = theme.errorView;

  return (
    <AuraLayout colorConfig={theme.errorView}>
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

          <GradientText as="p" className="lola-body-copy bodycopy mt-4" textColor={bodyCopy}>
            Remember use good lighting; <br /> no glasses or face coverings.
          </GradientText>
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
    </AuraLayout>
  );
};
