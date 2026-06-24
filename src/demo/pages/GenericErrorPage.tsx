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

interface GenericErrorPageProps {
  theme: IViewConfig;
  title?: string;
  subtitle?: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const GenericErrorPage = ({
  theme,
  title = "Something went",
  subtitle = "wrong",
  message = "We encountered an unexpected error. Please try again or contact support if the problem persists.",
  buttonText = "Try Again",
  onButtonClick,
}: GenericErrorPageProps) => {
  const {
    iconColors,
    backgroundIcon,
    title: titleColor,
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
            highlight={title}
            highlightColor={titleColor}
            secudnary={subtitle}
            secudnaryColor={subtitile}
          />

          <BodyCopy textColor={bodyCopy} className="mt-4">
            {message}
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
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
};
