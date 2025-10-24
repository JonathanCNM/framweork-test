import {
  BodyCopy,
  Button,
  CustomStepper,
  Layout,
  PageTitle,
} from "../../components";
import { CameraGradient } from "../../icons";
import { steps } from "../../utils/constants";
import { getSplittedColors } from "../../utils/utils";
import { ElevatedCircle } from "../components/ElevatedCircle";

export const IproovReadySlot = ({
  theme,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: Record<string, any> | null;
}) => {
  const iconColors = getSplittedColors(theme?.primaryMesh ?? "#000");

  return (
    <Layout background={theme?.primaryMesh} className="step">
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle>
            <CameraGradient colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="Say"
            highlightColor={theme?.partnerHighlights}
            secudnary="Cheese!"
            secudnaryColor={theme?.whiteColor}
          />

          <BodyCopy textColor={theme?.whiteColor} className="mt-4">
            Remove glasses, face coverings, and ensure you have good lighting.
          </BodyCopy>
        </div>
        <section className="stepper-section">
          <CustomStepper
            currentStep={2}
            steps={steps}
            color={theme?.whiteColor}
            background={theme?.primaryMesh}
            trackBackground={theme?.partnerHighlights}
            labelColor={theme?.whiteColor}
            width={230}
          />
        </section>
      </Layout.Content>
      <Layout.Footer>
        <Button
          showIcon
          type="submit"
          size="large"
          background={theme?.whiteColor}
          color={theme?.primaryMesh}
        >
          Take selfie
        </Button>
      </Layout.Footer>
    </Layout>
  );
};
