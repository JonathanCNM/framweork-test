import {
  AuraLayout,
  BodyCopy,
  Button,
  Layout,
  PageTitle,
} from "../../components";
import { FaceIcon } from "../../icons";
import { CustomStepper } from "../../components/CustomStepper";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import { steps } from "../../utils/constants";
import type { IViewConfig } from "../../hooks/useTheme";

const currentStep = 1;

export const StepPage = ({
  theme,
  isLightTheme = false,
}: {
  theme: IViewConfig;
  isLightTheme?: boolean;
}) => {
  const {
    iconColors,
    backgroundIcon,
    title,
    subtitile,
    bodyCopy,
    backgroundBtn,
    textColorBtn,
    stepsColors,
  } = theme.dataView;

  const themeType = isLightTheme ? "light" : "dark";
  const customStepperTrackInactiveBg = isLightTheme ? textColorBtn : undefined;
  const customStepperIndexInactiveBg = isLightTheme ? backgroundBtn : undefined;

  return (
    <AuraLayout colorConfig={theme.dataView}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle background={backgroundIcon}>
            <FaceIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="We're making"
            highlightColor={title}
            secudnary="sure it's you"
            secudnaryColor={subtitile}
          />

          <BodyCopy className="mt-4">
            Use your Passport, Driver’s License, State ID, Green Card or
            Consular ID.
          </BodyCopy>
        <section className="stepper-section">
          <CustomStepper
            steps={steps}
            currentStep={currentStep}
            color={textColorBtn}
            background={stepsColors}
            width={230}
            trackInactiveBackground={customStepperTrackInactiveBg}
            indexkInactiveBackground={customStepperIndexInactiveBg}
            indexkInactiveColor={customStepperTrackInactiveBg}
          />
        </section>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <section className="homepage-footer">
          <section
            className={`footer-link ${themeType}`}
            style={
              { "--color": bodyCopy } as React.CSSProperties & {
                [key: string]: string;
              }
            }
          >
            <BodyCopy className="terms-text footer-text">
              <span>By continuing, you agree to our</span>
              <br />
              <span className="text-link">Terms & Conditions</span>
              <span> and </span>
              <span className="text-link">Privacy Policy</span>
            </BodyCopy>
          </section>
          <p className="footer-text terms-text"></p>
          <Button
            showIcon
            size="large"
            type="submit"
            className="leading-6"
            color={textColorBtn}
            background={backgroundBtn}
          >
            Continue
          </Button>
        </section>
      </Layout.Footer>
    </AuraLayout>
  );
};
