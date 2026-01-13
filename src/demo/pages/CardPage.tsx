import { BodyCopy, Button, Layout, Navbar, VgsInput } from "../../components";
import { useKeyboardVisible } from "../../hooks";
import type { IViewConfig } from "../../hooks/useTheme";
import visaLogo from "../assets/visa_icon.png";
import mastercardLogo from "../assets/mastercard_icon.png";

export const CardPage = ({ theme }: { theme: IViewConfig }) => {
  const { isKeyboardOpen } = useKeyboardVisible();

  const {
    background,
    title,
    bodyCopy,
    backgroundBtn,
    textColorBtn,
    themeType,
    dropzoneColors,
    iconColors,
  } = theme.whiteView;

  const isDark = themeType === "dark";
  const auraColors = isDark ? dropzoneColors : iconColors;

  return (
    <Layout background={background} auraColors={auraColors}>
      <Layout.Header>
        <Navbar color={title} title="Add card" align="center" />
      </Layout.Header>
      <Layout.Content>
        <section
          style={{
            display: "flex",
            gap: "8px",
            flexDirection: "column",
          }}
        >
          <VgsInput
            type="card_holder_name"
            placeholder="Name on card"
            activeColor={background}
            color={bodyCopy}
            errorColor={bodyCopy}
          />
          <VgsInput
            type="card_number"
            placeholder="Card number"
            cardNumberFormPlaceholder={"XXXX XXXX XXXX XXXX"}
            activeColor={background}
            color={bodyCopy}
            errorColor={bodyCopy}
          />
          <article
            className="double-input"
            style={{ display: "flex", gap: "8px", flexBasis: "1 1" }}
          >
            <VgsInput
              type="card_exp_date"
              placeholder="MM / YY"
              activeColor={background}
              color={bodyCopy}
              errorColor={bodyCopy}
            />
            <VgsInput
              type="card_cvc"
              placeholder="CVV"
              activeColor={background}
              color={bodyCopy}
              errorColor={bodyCopy}
            />
          </article>
        </section>
      </Layout.Content>
      <Layout.Footer>
        <section className="homepage-footer">
          {!isKeyboardOpen && (
            <section className="footer-card">
              <section className="footer-card-images">
                <img src={mastercardLogo} alt="mastercard logo" />
                <img src={visaLogo} alt="visa logo" />
              </section>
              <BodyCopy className="footer-text">
                Only Visa, Mastercard accepted
              </BodyCopy>
            </section>
          )}
          <Button
            showIcon
            type="submit"
            size="large"
            color={textColorBtn}
            background={backgroundBtn}
          >
            Add card
          </Button>
        </section>
      </Layout.Footer>
    </Layout>
  );
};
