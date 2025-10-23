import { BodyCopy, Button, Layout, PageTitle } from "../../components";
import { UploadCloud, UploadIcon } from "../../icons";
import { getSplittedColors } from "../../utils/utils";
import { ElevatedCircle } from "../components/ElevatedCircle";
import { UploadLoading } from "../components/UploadLoading";
import type { DropzoneProps } from "./DropzoneDesktop";

export const DropzoneMobile: React.FC<DropzoneProps> = ({
  isLoading = false,
  theme,
}) => {
  const iconColors = getSplittedColors(theme?.primaryMesh ?? "#000");

  return (
    <Layout
      className={`${isLoading ? "layout-success" : ""}`}
      style={
        {
          "--bgc": theme?.primaryMesh,
          "--delay": "0s",
        } as React.CSSProperties & {
          [key: string]: string;
        }
      }
    >
      {!isLoading && (
        <Layout.Content>
          <div className="homepage-content elevated-circle-container">
            <ElevatedCircle>
              <UploadCloud colors={iconColors} />
            </ElevatedCircle>

            <PageTitle
              highlight="Got your ID"
              highlightColor={theme?.primaryMesh}
              secudnary="at hand?"
              secudnaryColor={theme?.primaryMesh}
            />

            <BodyCopy textColor={theme?.secondaryColor}>
              Tap to upload your Passport, State ID, Green Card, Driver’s
              License or Consular ID.
            </BodyCopy>
          </div>
        </Layout.Content>
      )}
      {isLoading && (
        <UploadLoading
          colors={iconColors}
          gradientViewText={theme?.partnerHighlights}
          footerTextColor={theme?.whiteColor}
        />
      )}
      {!isLoading && (
        <Layout.Footer>
          <Button
            showIcon
            type="button"
            size="large"
            background={theme?.primaryMesh}
            color={theme?.whiteColor}
            disabled={isLoading}
            icon={
              <span
                className="dropzone-btn"
                style={{ background: theme?.whiteColor }}
              >
                <UploadIcon colors={iconColors} size={18} />
              </span>
            }
          >
            Upload Picture
          </Button>
        </Layout.Footer>
      )}
    </Layout>
  );
};
