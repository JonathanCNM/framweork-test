import { BodyCopy, Button, Layout, PageTitle } from "../../components";
import { IproovCameraErrorIcon } from "../../icons";
import { getSplittedColors } from "../../utils/utils";
import { ElevatedCircle } from "../../components/ElevatedCircle";

export const IproovError = ({
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
            highlight="Verification"
            highlightColor={theme?.partnerHighlights}
            secudnary="Failed"
            secudnaryColor={theme?.whiteColor}
          />

          <BodyCopy textColor={theme?.whiteColor} className="mt-4">
            Remember use good lighting; <br /> no glasses or face coverings.
          </BodyCopy>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <Button
          showIcon
          size="large"
          type="submit"
          background={theme?.whiteColor}
          color={theme?.primaryMesh}
        >
          Retry
        </Button>
      </Layout.Footer>
    </Layout>
  );
};
