import {
  CircularProgress,
  GradientText,
  Layout,
  PageTitle,
} from "../../components";
import { FaceIcon } from "../../icons";
import { getSplittedColors } from "../../utils/utils";
import { ElevatedCircle } from "../components/ElevatedCircle";

export const IproovSuccessSlot = ({
  theme,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: Record<string, any> | null;
}) => {
  const iconColors = getSplittedColors(theme?.primaryMesh ?? "#000");

  return (
    <Layout background={theme?.primaryMesh}>
      <Layout.Content>
        <div className="upload-loading-container">
          <CircularProgress
            colors={[theme?.partnerHighlights, theme?.partnerHighlights]}
            size={128}
            strokeWidth={6}
            className="upload-circular-progress elevated-circle"
          >
            <ElevatedCircle>
              <FaceIcon colors={iconColors} />
            </ElevatedCircle>
          </CircularProgress>

          <PageTitle
            highlight="I’m verifying"
            highlightColor={theme?.partnerHighlights}
            secudnary="your information"
            secudnaryColor={theme?.whiteColor}
          />
        </div>
      </Layout.Content>
      <Layout.Footer>
        <GradientText
          as="p"
          textColor={theme?.whiteColor}
          className="footer-text"
        >
          This may take a moment
        </GradientText>
      </Layout.Footer>
    </Layout>
  );
};
