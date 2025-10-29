import {
  CircularProgress,
  CustomStepper,
  GradientText,
  Layout,
  PageTitle,
} from "../../components";
import { CardIcon } from "../../icons";
import { steps } from "../../utils/constants";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";

export const ValidatingPage = ({ theme }: { theme: IViewConfig }) => {
  const {
    background,
    iconColors,
    backgroundIcon,
    title,
    subtitile,
    stepsLabelColor,
    stepsColors,
    bodyCopy,
    footerColor,
  } = theme.specialView;

  return (
    <Layout background={background}>
      <Layout.Content>
        <div className="upload-loading-container">
          <CircularProgress
            colors={[title, title]}
            size={128}
            strokeWidth={6}
            className="upload-circular-progress"
          >
            <ElevatedCircle background={backgroundIcon}>
              <CardIcon colors={iconColors} />
            </ElevatedCircle>
          </CircularProgress>

          <PageTitle
            highlight="Validating"
            highlightColor={title}
            secudnary="information"
            secudnaryColor={subtitile}
          />

          <CustomStepper
            currentStep={3}
            steps={steps}
            color={stepsLabelColor}
            background={stepsColors}
            trackBackground={title}
            labelColor={bodyCopy}
            width={230}
          />
        </div>
      </Layout.Content>
      <Layout.Footer>
        <GradientText as="p" className="footer-text" textColor={footerColor}>
          This may take a moment
        </GradientText>
      </Layout.Footer>
    </Layout>
  );
};
