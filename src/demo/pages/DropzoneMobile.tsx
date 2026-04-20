import {
  AuraLayout,
  BodyCopy,
  Button,
  Layout,
  PageTitle,
} from "../../components";
import { UploadCloud, UploadIcon } from "../../icons";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import { UploadLoading } from "../components/UploadLoading";
import type { DropzoneProps } from "./DropzoneDesktop";

export const DropzoneMobile: React.FC<DropzoneProps> = ({
  isLoading = false,
  theme,
}) => {
  const {
    iconColors,
    backgroundIcon,
    footerColor,
    title,
    subtitile,
    bodyCopy,
    backgroundBtn,
    textColorBtn,
    dropzoneColors,
  } = theme.dataView;

  return (
    <AuraLayout
      colorConfig={theme.dataView}
      className={`${isLoading ? "layout-success" : ""}`}
    >
      {!isLoading && (
        <Layout.Content>
          <div className="homepage-content elevated-circle-container">
            <ElevatedCircle background={backgroundIcon}>
              <UploadCloud colors={iconColors} />
            </ElevatedCircle>

            <PageTitle
              highlight="Got your ID"
              highlightColor={title}
              secudnary="at hand?"
              secudnaryColor={subtitile}
            />

            <BodyCopy textColor={bodyCopy}>
              Tap to upload your Passport, State ID, Green Card, Driver’s
              License or Consular ID.
            </BodyCopy>
          </div>
        </Layout.Content>
      )}
      {isLoading && (
        <UploadLoading
          colors={iconColors}
          progressColors={dropzoneColors}
          backgroundIcon={backgroundIcon}
          title={title}
          subtitle={subtitile}
          footerTextColor={footerColor}
        />
      )}
      {!isLoading && (
        <Layout.Footer>
          <Button
            showIcon
            type="button"
            size="large"
            background={backgroundBtn}
            color={textColorBtn}
            disabled={isLoading}
            icon={
              <span
                className="dropzone-btn"
                style={{ background: textColorBtn }}
              >
                <UploadIcon colors={dropzoneColors} size={18} />
              </span>
            }
          >
            Upload Picture
          </Button>
        </Layout.Footer>
      )}
    </AuraLayout>
  );
};
