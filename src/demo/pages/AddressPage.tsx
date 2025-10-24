import { Button, InputField, Layout, Navbar } from "../../components";
import { getSplittedColors } from "../../utils/utils";
import { HomeAddressIcon } from "../../icons";
import mapDemo from "../assets/map-demo.png";

export const AddressPage = ({
  theme,
  isHomeAddress = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: Record<string, any> | null;
  isHomeAddress?: boolean;
}) => {
  const iconColors = getSplittedColors(theme?.primaryMesh ?? "#000");

  const addressTitle = isHomeAddress ? "Home address" : "Billing address";
  return (
    <Layout>
      <Layout.Header>
        <Navbar
          title={addressTitle}
          color={theme?.primaryMesh}
          align="center"
        />
      </Layout.Header>
      <Layout.Content>
        <div className="autocomplete-container">
          <section className="autocomplete-input">
            <InputField
              label={addressTitle}
              inputStyle={{ paddingLeft: "44px" }}
              activeColor={theme?.primaryMesh}
              color={theme?.secondaryColor}
              value="Tamarac, Florida 33321, EE. UU."
              icon={<HomeAddressIcon colors={iconColors} size={18} />}
            />
          </section>

          <div className="autocomplete-aditional-fields">
            <InputField
              label="City"
              value="Tamarac"
              activeColor={theme?.primaryMesh}
              color={theme?.secondaryColor}
            />

            <InputField
              type="number"
              maxLength={10}
              label="Zipcode"
              value="33321"
              activeColor={theme?.primaryMesh}
              color={theme?.secondaryColor}
            />
          </div>

          <div className="map-container">
            <img src={mapDemo} alt="map-demo" />
          </div>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <Button
          showIcon
          type="submit"
          size="large"
          color={theme?.whiteColor}
          background={theme?.primaryMesh}
        >
          Confirm address
        </Button>
      </Layout.Footer>
    </Layout>
  );
};
