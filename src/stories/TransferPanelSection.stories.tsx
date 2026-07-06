import type { Meta, StoryObj } from "@storybook/react-vite";
import { TransferPanelSection, type TransferPanelSectionProps, TransferPanel } from "../components";
import "../styles/index.css";

const meta: Meta<TransferPanelSectionProps> = {
  title: "Components/TransferPanelSection",
  component: TransferPanelSection,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TransferPanelSection>;

export const SinglePanel: Story = {
  args: {
    children: (
      <TransferPanel
        amount="1,250.50"
        currency="USD"
        footerText="You Send"
      />
    ),
  },
};

export const TwoPanels: Story = {
  args: {
    children: (
      <>
        <TransferPanel
          amount="1,000.00"
          currency="USD"
          footerText="You Send"
          background="#eff6ff"
          textColor="#1e40af"
        />
        <TransferPanel
          amount="18,500.00"
          currency="MXN"
          footerText="They Receive"
          background="#f0fdf4"
          textColor="#166534"
        />
      </>
    ),
  },
};

export const ThreePanels: Story = {
  args: {
    children: (
      <>
        <TransferPanel
          amount="1,000.00"
          currency="USD"
          footerText="Send"
          background="#eff6ff"
          textColor="#1e40af"
        />
        <TransferPanel
          amount="5.00"
          currency="USD"
          footerText="Fee"
          background="#fef3c7"
          textColor="#92400e"
        />
        <TransferPanel
          amount="18,500.00"
          currency="MXN"
          footerText="Receive"
          background="#f0fdf4"
          textColor="#166534"
        />
      </>
    ),
  },
};

export const CustomStyling: Story = {
  args: {
    children: (
      <>
        <TransferPanel
          amount="2,500.00"
          currency="EUR"
          footerText="Amount"
        />
        <TransferPanel
          amount="2,750.00"
          currency="USD"
          footerText="Total"
        />
      </>
    ),
    style: {
      padding: "20px",
      background: "#f9fafb",
      borderRadius: "16px",
    },
  },
};
