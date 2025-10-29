import {
  BodyCopy,
  CircularProgress,
  Layout,
  PageTitle,
} from "../../components";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import { UploadCloud } from "../../icons";

export const UploadLoading: React.FC<{
  colors: [string, string];
  progressColors: [string, string];
  title: string;
  subtitle: string;
  footerTextColor: string;
  backgroundIcon: string;
}> = ({ colors, title, footerTextColor, backgroundIcon, subtitle, progressColors }) => {
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
        <BodyCopy textColor={footerTextColor} className="mt-4">
          We're validating your document, please wait a moment. Please don't
          close this window.
        </BodyCopy>
      </div>
    </Layout.Content>
  );
};
UploadLoading.displayName = "UploadLoading";
