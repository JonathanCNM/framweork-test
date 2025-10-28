import { useEffect, useState } from "react";
import {
  CircularProgress,
  GradientText,
  Layout,
  PageTitle,
} from "../../components";
import { LolaLogo, WhatsAppIcon } from "../../icons";
import { getSplittedColors } from "../../utils/utils";
import { ElevatedCircle } from "../../components/ElevatedCircle";

export interface SendingMoneyPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: Record<string, any> | null;
}

export const SendingMoneyPage: React.FC<SendingMoneyPageProps> = ({
  theme,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const iconColors = getSplittedColors(theme?.primaryMesh ?? "#000");

  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      setIsLoading(false);
    })();
  }, []);

  const finalIconColor: [string, string] = isLoading
    ? iconColors
    : [theme?.partnerHighlights, theme?.partnerHighlights];

  const finalFooterColor = isLoading
    ? theme?.secondaryColor
    : theme?.whiteColor;

  const variant = isLoading ? "loading" : "full";
  const icon = isLoading ? (
    <LolaLogo colors={iconColors} />
  ) : (
    <WhatsAppIcon size={60} />
  );

  const copy = isLoading ? (
    <PageTitle
      highlight="Sending your"
      highlightColor={theme?.primaryMesh}
      secudnary="money now"
      secudnaryColor={theme?.primaryMesh}
    />
  ) : (
    <PageTitle
      highlight="Going back"
      highlightColor={theme?.partnerHighlights}
      secudnary="to WhatsApp"
      secudnaryColor={theme?.whiteColor}
    />
  );

  return (
    <Layout
      className="layout-success"
      style={
        {
          "--bgc": theme?.primaryMesh,
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
            <ElevatedCircle>{icon}</ElevatedCircle>
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
