import {
  AuraLayout,
  Button,
  GradientText,
  Layout,
  PageTitle,
} from '../../components';
import { SuccessIcon } from '../../icons';
import { ElevatedCircle } from '../../components/ElevatedCircle';
import type { IViewConfig } from '../../hooks/useTheme';

/**
 * SpecialViewBackgroundDemo
 *
 * Demonstrates the specialViewBackground customization feature.
 * Shows how special views can have custom backgrounds (solid colors or gradients)
 * independent from other view types.
 *
 * Usage:
 * import { SpecialViewBackgroundDemo } from './demo/pages/SpecialViewBackgroundDemo';
 *
 * <SpecialViewBackgroundDemo theme={theme} backgroundInfo="#0f766e" />
 */

interface SpecialViewBackgroundDemoProps {
  theme: IViewConfig;
  title?: string;
  subtitle?: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  backgroundInfo?: string;
}

export const SpecialViewBackgroundDemo = ({
  theme,
  title = 'Custom Background',
  subtitle = 'Special View',
  message = 'This special view demonstrates the specialViewBackground customization feature. You can now set custom backgrounds (solid colors or gradients) specifically for special views.',
  buttonText = 'Continue',
  onButtonClick,
  backgroundInfo,
}: SpecialViewBackgroundDemoProps) => {
  const {
    iconColors,
    backgroundIcon,
    title: titleColor,
    subtitile,
    bodyCopy,
    backgroundBtn,
    textColorBtn,
  } = theme.specialView;

  return (
    <AuraLayout colorConfig={theme.specialView}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle background={backgroundIcon}>
            <SuccessIcon colors={iconColors} />
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
