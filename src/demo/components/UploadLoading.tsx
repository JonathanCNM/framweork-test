import {
  BodyCopy,
  CircularProgress,
  Layout,
  PageTitle,
} from "../../components";
import { UploadCloud } from "../../icons";
import { ElevatedCircle } from "./ElevatedCircle";

export const UploadLoading: React.FC<{
  colors: [string, string];
  gradientViewText: string;
  footerTextColor: string;
}> = ({ colors, gradientViewText, footerTextColor }) => {
  return (
    <Layout.Content className="upload-loading">
      <div className="upload-loading-container">
        <CircularProgress
          colors={[gradientViewText, gradientViewText]}
          size={128}
          strokeWidth={6}
          className="upload-circular-progress elevated-circle"
        >
          <ElevatedCircle>
            <UploadCloud colors={colors} />
          </ElevatedCircle>
        </CircularProgress>
        <PageTitle
          highlight="Looking"
          highlightColor={gradientViewText}
          secudnary="good!"
          secudnaryColor={footerTextColor}
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
