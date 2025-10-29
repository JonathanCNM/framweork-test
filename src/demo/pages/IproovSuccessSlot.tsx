import {
  CircularProgress,
  GradientText,
  Layout,
  PageTitle,
} from "../../components";
import { FaceIcon } from "../../icons";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";

export const IproovSuccessSlot = ({ theme }: { theme: IViewConfig }) => {
  const {
    background,
    iconColors,
    backgroundIcon,
    title,
    subtitile,
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
              <FaceIcon colors={iconColors} />
            </ElevatedCircle>
          </CircularProgress>

          <PageTitle
            highlight="I’m verifying"
            highlightColor={title}
            secudnary="your information"
            secudnaryColor={subtitile}
          />
        </div>
      </Layout.Content>
      <Layout.Footer>
        <GradientText as="p" textColor={footerColor} className="footer-text">
          This may take a moment
        </GradientText>
      </Layout.Footer>
    </Layout>
  );
};
