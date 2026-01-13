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
    themeType,
    dropzoneColors,
  } = theme.specialView;
  const isDark = themeType === "dark";
  const auraColors = isDark ? dropzoneColors : iconColors;

  return (
    <Layout background={background} auraColors={auraColors}>
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
