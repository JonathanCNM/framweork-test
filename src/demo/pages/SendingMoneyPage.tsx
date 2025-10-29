import { useEffect, useState } from "react";
import {
  CircularProgress,
  GradientText,
  Layout,
  PageTitle,
} from "../../components";
import { LolaLogo, WhatsAppIcon } from "../../icons";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";

export interface SendingMoneyPageProps {
  theme: IViewConfig;
}

export const SendingMoneyPage: React.FC<SendingMoneyPageProps> = ({
  theme,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    background,
    iconColors,
    backgroundIcon,
    title,
    subtitile,
    bodyCopy,
    textColorBtn,
  } = theme.specialView;

  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      setIsLoading(false);
    })();
  }, []);

  const finalBackground = isLoading ? textColorBtn : background;

  const finalIconColor: [string, string] = isLoading
    ? iconColors
    : [title, title];

  const finalFooterColor = bodyCopy;

  const variant = isLoading ? "loading" : "full";
  const icon = isLoading ? (
    <LolaLogo colors={iconColors} />
  ) : (
    <WhatsAppIcon size={60} />
  );

  const copy = isLoading ? (
    <PageTitle
      highlight="Sending your"
      highlightColor={title}
      secudnary="money now"
      secudnaryColor={title}
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
    <Layout
      background={finalBackground}
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
            colors={finalIconColor}
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
        <GradientText
          textColor={finalFooterColor}
          as="p"
          className="footer-text"
        >
          This may take a moment
        </GradientText>
      </Layout.Footer>
    </Layout>
  );
};
