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
  footerTextColor: string;
  backgroundIcon: string;
  bodyCopy?: string;
  themeType?: string;
  useSystemTheme?: boolean;
}> = ({
  colors,
  title,
  footerTextColor,
  backgroundIcon,
  progressColors,
  bodyCopy,
  themeType,
  useSystemTheme,
}) => {
  return (
    <Layout.Content className="">
      <div className="upload-loading-container">
        <CircularProgress
          colors={progressColors}
          size={140}
          strokeWidth={6}
          className="upload-circular-progress"
        >
          <ElevatedCircle size={128} background={backgroundIcon}>
            <UploadCloud colors={colors} />
          </ElevatedCircle>
        </CircularProgress>
        <PageTitle
          highlight="Looking"
          highlightColor={title}
          secudnary="good!"
          secudnaryColor={title}
        />
        <RotatingText
          messages={loadingMessages}
          textColor={footerTextColor}
          bodyCopy={bodyCopy}
          themeType={themeType}
          useSystemTheme={useSystemTheme}
        />
      </div>
    </Layout.Content>
  );
};
UploadLoading.displayName = "UploadLoading";
