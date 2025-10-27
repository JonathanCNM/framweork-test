import { Button, Layout, Navbar, VgsInput } from "../../components";
import { useKeyboardVisible } from "../../hooks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CardPage = ({ theme }: { theme: Record<string, any> | null }) => {
  const { isKeyboardOpen } = useKeyboardVisible();

  return (
    <Layout>
      <Layout.Header>
        <Navbar color={theme?.primaryMesh} title="Add card" align="center" />
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
            activeColor={theme?.primaryMesh}
            color={theme?.secondaryColor}
            errorColor={theme?.secondaryColor}
          />
          <VgsInput
            type="card_number"
            placeholder="Card number"
            cardNumberFormPlaceholder={"XXXX XXXX XXXX XXXX"}
            activeColor={theme?.primaryMesh}
            color={theme?.secondaryColor}
            errorColor={theme?.secondaryColor}
          />
          <article
            className="double-input"
            style={{ display: "flex", gap: "8px", flexBasis: "1 1" }}
          >
            <VgsInput
              type="card_exp_date"
              placeholder="MM / YY"
              activeColor={theme?.primaryMesh}
              color={theme?.secondaryColor}
              errorColor={theme?.secondaryColor}
            />
            <VgsInput
              type="card_cvc"
              placeholder="CVV"
              activeColor={theme?.primaryMesh}
              color={theme?.secondaryColor}
              errorColor={theme?.secondaryColor}
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
            color={theme?.whiteColor}
            background={theme?.primaryMesh}
          >
            Add card
          </Button>
        </section>
      </Layout.Footer>
    </Layout>
  );
};
