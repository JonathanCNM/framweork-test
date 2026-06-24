import {
  AuraLayout,
  BodyCopy,
  Button,
  Layout,
  PageTitle,
} from "../../components";
import { ErrorIcon } from "../../icons";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";

interface NotFoundErrorPageProps {
  theme: IViewConfig;
  onGoHome?: () => void;
}

export const NotFoundErrorPage = ({
  theme,
  onGoHome,
}: NotFoundErrorPageProps) => {
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
            <ErrorIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="404"
            highlightColor={title}
            secudnary="Page Not Found"
            secudnaryColor={subtitile}
          />

          <BodyCopy textColor={bodyCopy} className="mt-4">
            The page you are looking for doesn't exist or has been moved.
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
          onClick={onGoHome}
        >
          Go Home
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
};
