import {
  CustomStepper,
  ElevatedCircle,
  Layout,
  PageTitle,
} from "../../components";
import type { IViewConfig } from "../../hooks";
import { CardIcon } from "../../icons";
import { steps } from "../../utils/constants";

export const LastStepsPage = ({ theme }: { theme: IViewConfig }) => {
  const {
    background,
    iconColors,
    backgroundIcon,
    title,
    subtitile,
    bodyCopy,
    stepsLabelColor,
    stepsColors,
  } = theme.specialView;
  return (
    <Layout background={background}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle background={backgroundIcon}>
            <CardIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="Last Step"
            highlightColor={title}
            secudnary="Add card info"
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
    </Layout>
  );
};
