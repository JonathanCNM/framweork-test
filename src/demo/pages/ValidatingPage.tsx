import {
  CircularProgress,
  GradientText,
  Layout,
  PageTitle,
} from "../../components";
import { CardIcon } from "../../icons";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";
import RotatingText from "../../components/RotatingText";

const loadingMessages = [
  "Card info received.",
  "Validating binary payload.",
  "Executing Quality Control.",
  "Mitigating image artifacts.",
  "Identifying document type.",
  "Regional segmentation initiated.",
  "Initiating OCR process.",
  "Extracting core data.",
  "Decoding MRZ codes.",
  "Mapping required metadata.",
  "Cross-validating primary data.",
  "Verifying PAN syntax.",
  "Applying L.U.H.N. algorithm.",
  "Analyzing security patterns.",
  "Checking regulatory compliance.",
  "Masking sensitive PII.",
  "Serializing data package.",
  "E2EE encryption active.",
  "TLS connection established.",
  "Transferring encrypted package.",
  "Backend receipt confirmed.",
  "Awaiting host validation.",
  "Decoding secure response.",
  "Verifying integrity hash.",
  "Evaluating response code.",
  "Generating transaction log.",
  "Releasing system resources.",
  "Local processing complete.",
  "Notifying final status.",
  "Verification successful.",
];

export const ValidatingPage = ({ theme }: { theme: IViewConfig }) => {
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
              <CardIcon colors={iconColors} />
            </ElevatedCircle>
          </CircularProgress>

          <PageTitle
            highlight="Validating"
            highlightColor={title}
            secudnary="card info"
            secudnaryColor={subtitile}
          />

          <RotatingText textColor={footerColor} messages={loadingMessages} />
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
