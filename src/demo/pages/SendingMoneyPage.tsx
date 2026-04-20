import {
  AuraLayout,
  BodyCopy,
  CircularProgress,
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
  const { backgroundIcon, title, subtitile, iconColors } = theme.specialView;

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

  return (
    <AuraLayout colorConfig={theme.specialView} className="layout-success">
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
        <BodyCopy style={{ color: subtitile }} className="footer-text">
          This may take a moment
        </BodyCopy>
      </Layout.Footer>
    </AuraLayout>
  );
};
