import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popup, type PopupProps, BodyCopy } from "../components";
import { Close } from "../icons";
import { useState } from "react";
import "../styles/index.css";

const meta: Meta<PopupProps> = {
  title: "Components/Popup",
  component: Popup,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Popup>;

export const Default: Story = {
  args: {
    visible: true,
    onClose: () => console.log("Popup closed"),
    CloseIcon: (
      <Close className="" onClick={() => {}} colors={["#000", "#000"]} />
    ),
    children: (
      <div style={{ padding: "20px" }}>
        <BodyCopy as="h2" style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "600", margin: 0 }}>
          Popup Title
        </BodyCopy>
        <p style={{ textAlign: "center", marginTop: "16px" }}>
          This is the popup content. Click outside or the close button to
          dismiss.
        </p>
      </div>
    ),
  },
};

export const WithoutCloseButton: Story = {
  args: {
    visible: true,
    onClose: () => console.log("Popup closed"),
    showCloseBtn: false,
    children: (
      <div style={{ padding: "20px" }}>
        <BodyCopy as="h2" style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "600", margin: 0 }}>
          No Close Button
        </BodyCopy>
        <p style={{ textAlign: "center", marginTop: "16px" }}>
          Click outside to close this popup.
        </p>
      </div>
    ),
  },
};

export const CustomContent: Story = {
  args: {
    visible: true,
    onClose: () => console.log("Popup closed"),
    CloseIcon: (
      <Close className="" onClick={() => {}} colors={["#000", "#000"]} />
    ),
    children: (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
        <BodyCopy as="h2" style={{ fontSize: "2rem", fontWeight: "700", margin: 0 }}>
          Success!
        </BodyCopy>
        <p style={{ marginTop: "16px", color: "#6b7280" }}>
          Your transaction has been completed successfully.
        </p>
        <button
          style={{
            marginTop: "24px",
            padding: "12px 24px",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => alert("Button clicked!")}
        >
          Continue
        </button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <div>
        <button onClick={() => setVisible(true)}>Open Popup</button>
        <Popup
          visible={visible}
          onClose={() => setVisible(false)}
          CloseIcon={
            <Close className="" onClick={() => {}} colors={["#000", "#000"]} />
          }
        >
          <div style={{ padding: "20px" }}>
            <BodyCopy as="h2" style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "600", margin: 0 }}>
              Interactive Popup
            </BodyCopy>
            <p style={{ textAlign: "center", marginTop: "16px" }}>
              Click outside or the close button to dismiss.
            </p>
          </div>
        </Popup>
      </div>
    );
  },
};
