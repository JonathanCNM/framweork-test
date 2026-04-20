import {
  AuraLayout,
  CircularProgress,
  GradientText,
  Layout,
  PageTitle,
} from "../../components";
import { FaceIcon } from "../../icons";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";
import RotatingText from "../../components/RotatingText";

const loadingMessages = [
  "Validating uploaded ID",
  "Matching selfie to ID photo",
  "Checking ID authenticity",
  "Cross-referencing databases",
  "Running fraud checks",
  "Confirming contact details",
  "Validating government ID number",
  "Scanning documents for clarity",
  "Reviewing uploaded images",
  "Comparing faces for match",
  "Checking watchlists and sanctions",
  "Confirming address details",
  "Confirming phone number",
  "Encrypting your session data",
  "Ensuring account security",
  "Reviewing verification results",
  "Preparing your verification summary",
  "Finalizing identity verification",
  "Verification complete — securing access",
];

export const IproovSuccessSlot = ({ theme }: { theme: IViewConfig }) => {
  const { iconColors, backgroundIcon, title, subtitile, footerColor } =
    theme.specialView;

  return (
    <AuraLayout colorConfig={theme.specialView}>
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
          <RotatingText
            messages={loadingMessages}
            style={{ color: subtitile }}
          />
        </div>
      </Layout.Content>
      <Layout.Footer>
        <GradientText as="p" textColor={footerColor} className="footer-text">
          This may take a moment
        </GradientText>
      </Layout.Footer>
    </AuraLayout>
  );
};
