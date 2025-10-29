import { BodyCopy, Button, Layout, PageTitle } from "../../components";
import { FaceIcon } from "../../icons";
import { CustomStepper } from "../../components/CustomStepper";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import { steps } from "../../utils/constants";
import type { IViewConfig } from "../../hooks/useTheme";

const currentStep = 1;

export const StepPage = ({ theme }: { theme: IViewConfig }) => {
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
  } = theme.dataView;

  return (
    <Layout className="step" background={background}>
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

          <BodyCopy textColor={bodyCopy} className="mt-4">
            Use your Passport, Driver’s License, State ID, Green Card or
            Consular ID.
          </BodyCopy>
        </div>
        <section className="stepper-section">
          <CustomStepper
            steps={steps}
            currentStep={currentStep}
            color={textColorBtn}
            background={stepsColors}
            width={230}
          />
        </section>
      </Layout.Content>
      <Layout.Footer>
        <section className="homepage-footer">
          <p className="footer-text terms-text">
            <span>By continuing, you agree to our</span>
            <br />
            <span className="text-link">Terms & Conditions</span>
            <span> and </span>
            <span className="text-link">Privacy Policy</span>
          </p>
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
    </Layout>
  );
};
