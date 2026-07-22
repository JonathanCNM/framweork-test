import {
  AuraLayout,
  Button,
  GradientText,
  Layout,
  PageTitle,
} from '../../components';
import { WarningIcon } from '../../icons';
import { ElevatedCircle } from '../../components/ElevatedCircle';
import type { IViewConfig } from '../../hooks/useTheme';

/**
 * ErrorViewBackgroundDemo
 * 
 * Demonstrates the new errorViewBackground customization feature.
 * Shows how error views can have custom backgrounds (solid colors or gradients)
 * independent from other view types.
 * 
 * Usage:
 * import { ErrorViewBackgroundDemo } from './demo/pages/ErrorViewBackgroundDemo';
 * 
 * <ErrorViewBackgroundDemo theme={theme} background="#1a1a1a" />
 */

interface ErrorViewBackgroundDemoProps {
  theme: IViewConfig;
  title?: string;
  subtitle?: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  backgroundInfo?: string;
}

export const ErrorViewBackgroundDemo = ({
  theme,
  title = 'Custom Background',
  subtitle = 'Error View',
  message = 'This error view demonstrates the new errorViewBackground customization feature. You can now set custom backgrounds (solid colors or gradients) specifically for error views.',
  buttonText = 'Try Again',
  onButtonClick,
  backgroundInfo,
}: ErrorViewBackgroundDemoProps) => {
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

          <GradientText textColor={bodyCopy} className="mt-4">
            {message}
          </GradientText>

          {backgroundInfo && (
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '2rem',
                maxWidth: '500px',
              }}
            >
              <p
                style={{
                  color: bodyCopy,
                  fontSize: '0.875rem',
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                <strong>Background:</strong>
                <br />
                {backgroundInfo}
              </p>
            </div>
          )}
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
