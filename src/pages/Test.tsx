import { useState } from "react";
import {
  Button,
  Layout,
  MotionWrapper,
  Navbar,
  Page,
  VgsFormWrapper,
  VgsInput,
} from "../components";
import type { IVGSCardInfo } from "../components/VgsInput";

const vgsVaultId = "tntegvj3mmf";
const vgsEnvironment = "sandbox";
const vgsRouteId = "8232b546-af5d-47ba-9b39-01dbbfc24bc3";

export const gradient =
  "linear-gradient(116.74deg, #4BA84B 23.26%, #008433 111.43%)";

export type IVGSFields = {
  card_holder_name?: string;
  card_number?: string;
  card_exp_date?: string;
  card_cvc?: string;
};

const Test = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<IVGSFields>({
    card_holder_name: "",
    card_number: "",
    card_exp_date: "",
    card_cvc: "",
  });

  const handleFormSubmitSuccess = (status: unknown, data: unknown) => {
    setIsLoading(true);
    if (status === 200 && data) {
      setErrorMessage({
        card_holder_name: "",
        card_number: "",
        card_exp_date: "",
        card_cvc: "",
      });
      console.log({
        data,
        status,
      });
    }
    setIsLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onHandlerError = (error: any) => {
    const messages: IVGSFields = {};
    Object.keys(error).forEach((errorField: string) => {
      const message = error[errorField]?.errorMessages;
      messages[errorField as keyof IVGSFields] = message.join(",\n");
    });
    setErrorMessage(messages);
  };

  const getDataInfo = (dataInfo: IVGSCardInfo) => {
    console.log("dataInfo", dataInfo);
  };

  return (
    <Page>
      <MotionWrapper>
        <Layout background="#fff"
        auraColors={["#4BA84B", "#008433"]}
        >
          <Layout.Header>
            <Navbar title="Hello from VGS Page" />
          </Layout.Header>
          <Layout.Content className="vgs">
            <VgsFormWrapper
              vaultId={vgsVaultId}
              environment={vgsEnvironment}
              routeId={vgsRouteId}
              action="/post"
              submitParameters={{}}
              onSubmitCallback={handleFormSubmitSuccess}
              onErrorCallback={onHandlerError}
            >
              <section
                style={{
                  display: "flex",
                  gap: "8px",
                  flexDirection: "column",
                }}
              >
                <VgsInput
                  type="card_holder_name"
                  placeholder="Propietario"
                  color={gradient}
                  errorLabel={errorMessage.card_holder_name}
                />
                <VgsInput
                  type="card_number"
                  placeholder="Número de tarjeta"
                  cardNumberFormPlaceholder="XXXX XXXX XXXX XXXX"
                  color={gradient}
                  errorLabel={errorMessage.card_number}
                  onGetCardInfo={getDataInfo}
                />
                <article
                  className="double-input"
                  style={{ display: "flex", gap: "8px", flexBasis: "1 1" }}
                >
                  <VgsInput
                    type="card_exp_date"
                    placeholder="MM / YY"
                    color={gradient}
                    errorLabel={errorMessage.card_exp_date}
                  />
                  <VgsInput
                    type="card_cvc"
                    placeholder="CVV"
                    color={gradient}
                    errorLabel={errorMessage.card_cvc}
                  />
                </article>
              </section>
              <Layout.Footer>
                <section
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Button type="submit" loading={isLoading}>
                    Submit
                  </Button>
                </section>
              </Layout.Footer>
            </VgsFormWrapper>
          </Layout.Content>
        </Layout>
      </MotionWrapper>
    </Page>
  );
};

export default Test;
