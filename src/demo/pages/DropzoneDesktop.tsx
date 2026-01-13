import { BodyCopy, Button, Layout, PageTitle } from "../../components";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import { UploadCloud, UploadIcon } from "../../icons";
import type { IViewConfig } from "../../hooks/useTheme";
import { UploadLoading } from "../components/UploadLoading";

export interface DropzoneProps {
  isLoading?: boolean;
  theme: IViewConfig;
}

export const DropzoneDesktop: React.FC<DropzoneProps> = ({
  isLoading = false,
  theme,
}) => {
  const {
    background,
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
    <Layout
      background={background}
      className={`dropzone ${isLoading ? "layout-success" : ""}`}
      style={
        {
          "--bgc": background,
          "--delay": "0s",
        } as React.CSSProperties & {
          [key: string]: string;
        }
      }
    >
      <Layout.Content>
        <section className="homepage-content">
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
                  highlightColor={title}
                />
              </section>

              <div
                className="desktop-dropzone-input"
                style={{ borderColor: dropzoneColors[0] }}
              >
                <div className="desktop-dropzone-input-area">
                  <div className="elevated-circle-container">
                    <ElevatedCircle background={backgroundIcon}>
                      <UploadCloud colors={iconColors} />
                    </ElevatedCircle>
                  </div>
                  <section className="desktop-dropzone-input-disclaimer">
                    <BodyCopy textColor={bodyCopy}>
                      Tap to upload your Passport, State ID, Green Card,
                      Driver’s License or Consular ID.
                    </BodyCopy>
                  </section>
                </div>
              </div>
            </div>
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
        </section>
      </Layout.Content>
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
    </Layout>
  );
};
