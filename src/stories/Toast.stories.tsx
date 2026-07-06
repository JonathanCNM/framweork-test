import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast, type ToastProps } from "../components";
import { useState } from "react";
import "../styles/index.css";

const meta: Meta<ToastProps> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    visible: true,
    message: "Transaction completed successfully",
    type: "success",
    duration: 5000,
  },
};

export const Error: Story = {
  args: {
    visible: true,
    message: "Failed to process payment",
    type: "error",
    duration: 5000,
  },
};

export const Info: Story = {
  args: {
    visible: true,
    message: "Exchange rate updated",
    type: "info",
    duration: 5000,
  },
};

export const WithTitle: Story = {
  args: {
    visible: true,
    title: "Success!",
    message: "Your transfer has been sent",
    type: "success",
    duration: 5000,
  },
};

export const WithButton: Story = {
  args: {
    visible: true,
    message: "New features available",
    buttonText: "View",
    onButtonClick: () => alert("Button clicked!"),
    type: "info",
    duration: 5000,
  },
};

export const NoIcon: Story = {
  args: {
    visible: true,
    message: "This is a message without an icon",
    showIcon: false,
    type: "info",
    duration: 5000,
  },
};

export const Interactive: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    
    return (
      <div>
        <button onClick={() => setVisible(true)}>Show Toast</button>
        <Toast
          visible={visible}
          message="This toast will auto-dismiss"
          type="success"
          duration={3000}
          onClose={() => setVisible(false)}
        />
      </div>
    );
  },
};
