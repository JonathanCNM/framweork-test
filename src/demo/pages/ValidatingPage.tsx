import {
  CircularProgress,
  CustomStepper,
  GradientText,
  Layout,
  PageTitle,
} from "../../components";
import { CardIcon } from "../../icons";
import { steps } from "../../utils/constants";
import { getSplittedColors } from "../../utils/utils";
import { ElevatedCircle } from "../components/ElevatedCircle";

export const ValidatingPage = ({
  theme,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: Record<string, any> | null;
}) => {
  const iconColors = getSplittedColors(theme?.primaryMesh ?? "#000");

  return (
    <Layout>
      <Layout.Content>
        <div className="upload-loading-container">
          <CircularProgress
            colors={iconColors}
            size={128}
            strokeWidth={6}
            className="upload-circular-progress elevated-circle"
          >
            <ElevatedCircle>
              <CardIcon colors={iconColors} />
            </ElevatedCircle>
          </CircularProgress>

          <PageTitle
            highlight="Validating"
            highlightColor={theme?.primaryMesh}
            secudnary="information"
            secudnaryColor={theme?.primaryMesh}
          />

          <CustomStepper
            steps={steps}
            currentStep={3}
            color={theme?.whiteColor}
            background={theme?.primaryMesh}
            width={230}
          />
        </div>
      </Layout.Content>
      <Layout.Footer>
        <GradientText as="p" className="footer-text">
          This may take a moment
        </GradientText>
      </Layout.Footer>
    </Layout>
  );
};
