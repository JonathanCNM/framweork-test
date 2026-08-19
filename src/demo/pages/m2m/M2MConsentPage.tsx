import { AuraLayout, BodyCopy, Button, ElevatedCircle, Layout } from "../../../components";
import { RightIcon } from "../../../icons";
import type { IViewConfig } from "../../../hooks/useTheme";
import { M2MConsentCheckbox } from "./M2MConsentCheckbox";
import { M2M_CONSENT_SUBTITLE, M2M_CONSENT_TITLE } from "./content";

export const M2MConsentPage = ({
  theme,
  accepted = false,
}: {
  theme: IViewConfig;
  accepted?: boolean;
}) => {
  const { title, backgroundIcon, backgroundBtn, textColorBtn, buttonSize } =
    theme.whiteView;

  return (
    <AuraLayout colorConfig={theme.whiteView}>
      <Layout.Content>
        <div className="m2m-consent">
          <div className="m2m-consent__hero">
            <ElevatedCircle
              background={backgroundIcon}
              size={72}
              shadowVariant="none"
            >
              <RightIcon
                size={28}
                colors={[title, title]}
                className="m2m-consent__arrow"
              />
            </ElevatedCircle>
            <BodyCopy as="h1" className="m2m-consent__title">
              {M2M_CONSENT_TITLE}
            </BodyCopy>
            <BodyCopy className="m2m-consent__subtitle">
              {M2M_CONSENT_SUBTITLE}
            </BodyCopy>
          </div>

          <div className="m2m-consent__legal">
            <M2MConsentCheckbox checked={accepted} accent={backgroundBtn}>
              I acknowledge that I have read and agree to the terms of the{" "}
              <span className="m2m-link">E-sign Consent</span>
            </M2MConsentCheckbox>
            <M2MConsentCheckbox checked={accepted} accent={backgroundBtn}>
              I acknowledge that I have read and agree to the terms of the
              disclosure contained with the{" "}
              <span className="m2m-link">Terms & Conditions</span> which
              includes the End User Agreement, Privacy Policy, Privacy Notice,
              Cross River Bank Privacy Notice.
            </M2MConsentCheckbox>
          </div>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <Button
          type="button"
          size={buttonSize}
          showIcon={false}
          background={backgroundBtn}
          color={textColorBtn}
          disabled={!accepted}
        >
          Continue
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
};
