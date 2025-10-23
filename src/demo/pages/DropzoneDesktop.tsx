import { BodyCopy, Button, Layout, PageTitle } from "../../components";
import { UploadCloud, UploadIcon } from "../../icons";
import { getSplittedColors } from "../../utils/utils";
import { ElevatedCircle } from "../components/ElevatedCircle";
import { UploadLoading } from "../components/UploadLoading";

export interface DropzoneProps {
  isLoading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: Record<string, any> | null;
}

export const DropzoneDesktop: React.FC<DropzoneProps> = ({
  isLoading = false,
  theme,
}) => {
  const iconColors = getSplittedColors(theme?.primaryMesh ?? "#000");

  return (
    <Layout
      className={`dropzone ${isLoading ? "layout-success" : ""}`}
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
        <div className="desktop-dropzone">
          <section className="desktop-dropzone-section">
            <PageTitle
              highlight={
                <p>
                  This ain't a club, but
                  <br />I need to see your ID
                </p>
              }
              highlightColor={theme?.primaryMesh}
            />
          </section>

          <div
            className="desktop-dropzone-input"
            style={{ borderColor: iconColors[0] }}
          >
            <div className="desktop-dropzone-input-area">
              <div className="elevated-circle-container">
                <ElevatedCircle>
                  <UploadCloud colors={iconColors} />
                </ElevatedCircle>
              </div>
              <section className="desktop-dropzone-input-disclaimer">
                <BodyCopy textColor={theme?.secondaryColor}>
                  Tap to upload your Passport, State ID, Green Card, Driver’s
                  License or Consular ID.
                </BodyCopy>
              </section>
            </div>
          </div>
        </div>
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
