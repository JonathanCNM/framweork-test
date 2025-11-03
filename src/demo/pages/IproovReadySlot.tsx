import {
  BodyCopy,
  Button,
  CustomStepper,
  Layout,
  PageTitle,
} from "../../components";
import { CameraGradient } from "../../icons";
import { steps } from "../../utils/constants";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";

export const IproovReadySlot = ({
  theme,
  isLightTheme = false,
}: {
  theme: IViewConfig;
  isLightTheme?: boolean;
}) => {
  const {
    background,
    iconColors,
    backgroundIcon,
    title,
    subtitile,
    bodyCopy,
    backgroundBtn,
    textColorBtn,
    stepsColors,
    stepsLabelColor,
  } = theme.specialView;

  const customStepperTrackInactiveBg = isLightTheme ? textColorBtn : undefined;
  const customStepperIndexInactiveBg = isLightTheme ? backgroundBtn : undefined;

  return (
    <Layout background={background} className="step">
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle background={backgroundIcon}>
            <CameraGradient colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="Say"
            highlightColor={title}
            secudnary="Cheese!"
            secudnaryColor={subtitile}
          />

          <BodyCopy textColor={bodyCopy} className="mt-4">
            Remove glasses, face coverings, and ensure you have good lighting.
          </BodyCopy>
        </div>
        <section className="stepper-section">
          <CustomStepper
            currentStep={2}
            steps={steps}
            color={stepsLabelColor}
            background={stepsColors}
            trackBackground={title}
            labelColor={bodyCopy}
            width={230}
            trackInactiveBackground={customStepperTrackInactiveBg}
            indexkInactiveBackground={customStepperIndexInactiveBg}
            indexkInactiveColor={customStepperTrackInactiveBg}
          />
        </section>
      </Layout.Content>
      <Layout.Footer>
        <Button
          showIcon
          type="submit"
          size="large"
          background={backgroundBtn}
          color={textColorBtn}
        >
          Take selfie
        </Button>
      </Layout.Footer>
    </Layout>
  );
};
