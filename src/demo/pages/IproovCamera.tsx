import { BodyCopy, Button, Layout, PageTitle } from "../../components";
import { IproovCameraErrorIcon } from "../../icons";
import { getSplittedColors } from "../../utils/utils";
import { ElevatedCircle } from "../../components/ElevatedCircle";

export const IproovCamera = ({
  theme,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: Record<string, any> | null;
}) => {
  const iconColors = getSplittedColors(theme?.primaryMesh ?? "#000");

  return (
    <Layout background={theme?.primaryMesh}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle>
            <IproovCameraErrorIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="Camera access"
            highlightColor={theme?.partnerHighlights}
            secudnary="needed"
            secudnaryColor={theme?.whiteColor}
          />

          <BodyCopy textColor={theme?.whiteColor}>
            Please allow access to your camera to continue.
          </BodyCopy>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <Button
          showIcon
          type="submit"
          size="large"
          background={theme?.whiteColor}
          color={theme?.primaryMesh}
        >
          Grant access
        </Button>
      </Layout.Footer>
    </Layout>
  );
};
