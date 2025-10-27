import visaLogo from "../assets/visa_icon.png";
import mastercardLogo from "../assets/mastercard_icon.png";
import discoverLogo from "../assets/discover_icon.png";
import amexLogo from "../assets/amex_icon.svg";

const creditCardTypes = {
  VISA: {
    name: "VISA",
    icon: (
      <img
        src={visaLogo}
        alt="VISA icon"
        className="add-card-slot-img"
        style={{
          background: "#f8f7f7",
          width: "64px",
          padding: "8px",
        }}
      />
    ),
  },
  MASTERCARD: {
    name: "MASTERCARD",
    icon: (
      <img
        src={mastercardLogo}
        alt="MASTERCARD icon"
        className="add-card-slot-img"
        style={{
          background: "#252525",
          width: "48px",
          paddingInline: "8px",
          paddingBlock: "16px",
        }}
      />
    ),
  },
  DISCOVER: {
    name: "DISCOVER",
    icon: (
      <img
        src={discoverLogo}
        alt="DISCOVER icon"
        className="add-card-slot-img"
        style={{
          background: "orange",
          width: "28px",
        }}
      />
    ),
  },
  AMEX: {
    name: "AMERICAN_EXPRESS",
    icon: (
      <img
        src={amexLogo}
        alt="AMERICAN_EXPRESS icon"
        className="add-card-slot-img"
        style={{
          background: "#176fcf",
          width: "28px",
        }}
      />
    ),
  },
};

export const AddCardSlot = () => {
  return (
    <section className="add-card-slot">
      <section className="add-card-slot-info">
        {creditCardTypes.VISA.icon}
        <p className="summary-text">Ending *1111</p>
      </section>

      <button className="summary-text add-card-slot-btn">Change</button>
    </section>
  );
};
