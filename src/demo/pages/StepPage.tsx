import { BodyCopy, Button, Layout, PageTitle } from "../../components";
import { FaceIcon } from "../../icons";
import { getSplittedColors } from "../../utils/utils";
import { CustomStepper } from "../../components/CustomStepper";
import { ElevatedCircle } from "../components/ElevatedCircle";
import { steps } from "../../utils/constants";

const currentStep = 1;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StepPage = ({ theme }: { theme: Record<string, any> | null }) => {
  const iconColors = getSplittedColors(theme?.primaryMesh ?? "#000");

  return (
    <Layout className="step">
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle>
            <FaceIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="We're making"
            highlightColor={theme?.primaryMesh}
            secudnary="sure it's you"
            secudnaryColor={theme?.primaryMesh}
          />

          <BodyCopy textColor={theme?.secondaryColor} className="mt-4">
            Use your Passport, Driver’s License, State ID, Green Card or
            Consular ID.
          </BodyCopy>
        </div>
        <section className="stepper-section">
          <CustomStepper
            steps={steps}
            currentStep={currentStep}
            color={theme?.whiteColor}
            background={theme?.primaryMesh}
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
            color={theme?.whiteColor}
            background={theme?.primaryMesh}
          >
            Continue
          </Button>
        </section>
      </Layout.Footer>
    </Layout>
  );
};
