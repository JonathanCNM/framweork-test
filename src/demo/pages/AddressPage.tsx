import { Button, InputField, Layout, Navbar } from "../../components";
import type { IViewConfig } from "../../hooks/useTheme";
import { HomeAddressIcon } from "../../icons";
import mapDemo from "../assets/map-demo.png";

export const AddressPage = ({
  theme,
  isHomeAddress = false,
}: {
  theme: IViewConfig;
  isHomeAddress?: boolean;
}) => {
  const {
    background,
    title,
    bodyCopy,
    iconColors,
    backgroundBtn,
    textColorBtn,
    themeType,
    dropzoneColors,
  } = theme.whiteView;

  const isDark = themeType === "dark";
  const auraColors = isDark ? dropzoneColors : iconColors;

  const addressTitle = isHomeAddress ? "Home address" : "Billing address";
  return (
    <Layout background={background} auraColors={auraColors}>
      <Layout.Header>
        <Navbar title={addressTitle} color={title} align="center" />
      </Layout.Header>
      <Layout.Content>
        <div className="autocomplete-container">
          <section className="autocomplete-input">
            <InputField
              label={addressTitle}
              inputStyle={{ paddingLeft: "44px" }}
              activeColor={title}
              color={bodyCopy}
              value="Tamarac, Florida 33321, EE. UU."
              icon={<HomeAddressIcon colors={iconColors} size={18} />}
            />
          </section>

          <div className="autocomplete-aditional-fields">
            <InputField
              label="City"
              value="Tamarac"
              activeColor={title}
              color={bodyCopy}
            />

            <InputField
              type="number"
              maxLength={10}
              label="Zipcode"
              value="33321"
              activeColor={title}
              color={bodyCopy}
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
          color={textColorBtn}
          background={backgroundBtn}
        >
          Confirm address
        </Button>
      </Layout.Footer>
    </Layout>
  );
};
