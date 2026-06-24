import {
  AuraLayout,
  BodyCopy,
  Button,
  Layout,
  PageTitle,
} from "../../components";
import { WarningIcon } from "../../icons";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";

interface NetworkErrorPageProps {
  theme: IViewConfig;
  onRetry?: () => void;
}

export const NetworkErrorPage = ({
  theme,
  onRetry,
}: NetworkErrorPageProps) => {
  const {
    iconColors,
    backgroundIcon,
    title,
    subtitile,
    bodyCopy,
    backgroundBtn,
    textColorBtn,
  } = theme.errorView;

  return (
    <AuraLayout colorConfig={theme.errorView}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle background={backgroundIcon}>
            <WarningIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="Connection"
            highlightColor={title}
            secudnary="Lost"
            secudnaryColor={subtitile}
          />

          <BodyCopy textColor={bodyCopy} className="mt-4">
            Unable to connect to the server. <br />
            Please check your internet connection and try again.
          </BodyCopy>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <Button
          showIcon
          size="large"
          type="submit"
          background={backgroundBtn}
          color={textColorBtn}
          onClick={onRetry}
        >
          Retry Connection
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
};
