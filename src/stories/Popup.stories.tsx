import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popup, type PopupProps, Title } from "../components";
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
    CloseIcon: Close,
    children: (
      <div style={{ padding: "20px" }}>
        <Title size="lg" align="center">Popup Title</Title>
        <p style={{ textAlign: "center", marginTop: "16px" }}>
          This is the popup content. Click outside or the close button to dismiss.
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
        <Title size="lg" align="center">No Close Button</Title>
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
    CloseIcon: Close,
    children: (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
        <Title size="xl" align="center">Success!</Title>
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
          CloseIcon={Close}
        >
          <div style={{ padding: "20px" }}>
            <Title size="lg" align="center">Interactive Popup</Title>
            <p style={{ textAlign: "center", marginTop: "16px" }}>
              Click outside or the close button to dismiss.
            </p>
          </div>
        </Popup>
      </div>
    );
  },
};
