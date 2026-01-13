import {
  CircularProgress,
  GradientText,
  Layout,
  PageTitle,
} from "../../components";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";
import { LolaLogo, SuccessIcon } from "../../icons";

export interface SendingMoneyPageProps {
  theme: IViewConfig;
  isLoading?: boolean;
}

export const SendingMoneyPage: React.FC<SendingMoneyPageProps> = ({
  theme,
  isLoading = false,
}) => {
  const {
    background,
    backgroundIcon,
    title,
    subtitile,
    bodyCopy,
    iconColors,
    themeType,
    dropzoneColors,
  } = theme.specialView;

  const variant = isLoading ? "loading" : "full";
  const icon = isLoading ? (
    <LolaLogo colors={iconColors} size={80} />
  ) : (
    <SuccessIcon colors={iconColors} size={80} />
  );

  const copy = isLoading ? (
    <PageTitle
      highlight="Sending your"
      highlightColor={title}
      secudnary="money now"
      secudnaryColor={subtitile}
    />
  ) : (
    <PageTitle
      highlight="Going back"
      highlightColor={title}
      secudnary="to WhatsApp"
      secudnaryColor={subtitile}
    />
  );

  const isDark = themeType === "dark";
  const auraColors = isDark ? dropzoneColors : iconColors;

  return (
    <Layout
      background={background}
      auraColors={auraColors}
      className="layout-success"
      style={
        {
          "--bgc": background,
          "--delay": "4s",
        } as React.CSSProperties & {
          [key: string]: string;
        }
      }
    >
      <Layout.Content>
        <div className="upload-loading-container">
          <CircularProgress
            variant={variant}
            colors={[title, title]}
            size={128}
            strokeWidth={6}
            className="upload-circular-progress"
          >
            <ElevatedCircle background={backgroundIcon}>{icon}</ElevatedCircle>
          </CircularProgress>

          {copy}
        </div>
      </Layout.Content>
      <Layout.Footer>
        <GradientText textColor={bodyCopy} as="p" className="footer-text">
          This may take a moment
        </GradientText>
      </Layout.Footer>
    </Layout>
  );
};
