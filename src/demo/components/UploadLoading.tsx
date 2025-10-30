import { CircularProgress, Layout, PageTitle } from "../../components";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import RotatingText from "../../components/RotatingText";
import { UploadCloud } from "../../icons";

const loadingMessages = [
  "Loading photo…",
  "Checking image quality…",
  "Detecting document type…",
  "Aligning & cropping…",
  "Reducing glare & blur…",
  "Reading text (OCR)…",
  "Reading MRZ / barcodes…",
  "Extracting key fields…",
  "Validating names & dates…",
];

export const UploadLoading: React.FC<{
  colors: [string, string];
  progressColors: [string, string];
  title: string;
  subtitle: string;
  footerTextColor: string;
  backgroundIcon: string;
}> = ({
  colors,
  title,
  footerTextColor,
  backgroundIcon,
  subtitle,
  progressColors,
}) => {
  return (
    <Layout.Content className="upload-loading">
      <div className="upload-loading-container">
        <CircularProgress
          colors={progressColors}
          size={128}
          strokeWidth={6}
          className="upload-circular-progress"
        >
          <ElevatedCircle background={backgroundIcon}>
            <UploadCloud colors={colors} />
          </ElevatedCircle>
        </CircularProgress>
        <PageTitle
          highlight="Looking"
          highlightColor={title}
          secudnary="good!"
          secudnaryColor={subtitle}
        />
        <RotatingText messages={loadingMessages} textColor={footerTextColor} />
      </div>
    </Layout.Content>
  );
};
UploadLoading.displayName = "UploadLoading";
