import { Button, Layout, Navbar, VgsInput } from "../../components";
import { useKeyboardVisible } from "../../hooks";
import type { IViewConfig } from "../../hooks/useTheme";

export const CardPage = ({ theme }: { theme: IViewConfig }) => {
  const { isKeyboardOpen } = useKeyboardVisible();

  const { background, title, bodyCopy, backgroundBtn, textColorBtn } =
    theme.whiteView;

  return (
    <Layout background={background}>
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
            <p className="text-xs text-text-base-color mb-3">
              Visa, Mastercard & American Express
            </p>
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
