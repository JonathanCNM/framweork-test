import React from "react";

export interface ISteps {
  label: string;
  index: number;
}

export interface CustomStepperProps {
  steps: ISteps[];
  currentStep?: number;
  background?: string;
  color?: string;
  width?: string | number;
  trackBackground?: string;
}

export const CustomStepper: React.FC<CustomStepperProps> = ({
  steps,
  currentStep = 0,
  background = "#000",
  color = "#fff",
  width = "100%",
  trackBackground,
}) => {
  if (!steps?.length) return <></>;
  if (!trackBackground) trackBackground = background;
  return (
    <section className="stepper-component" style={{ width }}>
      <section
        className="stepper-container"
        style={
          {
            "--bg": background,
            "--color": color,
            "--track-bg": trackBackground,
          } as React.CSSProperties & { [key: string]: string }
        }
      >
        {steps.map(({ label, index }) => (
          <React.Fragment key={index}>
            <section
              className={`step-info ${currentStep >= index ? "active" : ""}`}
            >
              <section className="step-index">{index}</section>
              <section className="step-label">{label}</section>
              <span
                className={`step-progress ${
                  currentStep > index ? "active" : ""
                }`}
              />
            </section>
          </React.Fragment>
        ))}
      </section>
    </section>
  );
};
