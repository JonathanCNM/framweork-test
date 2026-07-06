import type { Meta, StoryObj } from "@storybook/react-vite";
import { TransferPanel, type TransferPanelProps } from "../components";
import { CashIcon } from "../icons";
import "../styles/index.css";

const meta: Meta<TransferPanelProps> = {
  title: "Components/TransferPanel",
  component: TransferPanel,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TransferPanel>;

export const Default: Story = {
  args: {
    amount: "1,250.50",
    currency: "USD",
    footerText: "Total Amount",
  },
};

export const WithIcon: Story = {
  args: {
    amount: "500.00",
    currency: "EUR",
    footerText: "Cash Amount",
    icon: <CashIcon size={16} colors={["#10b981", "#10b981"]} />,
  },
};

export const LargeAmount: Story = {
  args: {
    amount: "25,000.00",
    currency: "USD",
    footerText: "Transfer Total",
  },
};

export const CustomColors: Story = {
  args: {
    amount: "750.25",
    currency: "GBP",
    footerText: "Amount Due",
    background: "#eff6ff",
    textColor: "#1e40af",
    alternativeTextColor: "#60a5fa",
  },
};

export const SmallAmount: Story = {
  args: {
    amount: "5.99",
    currency: "USD",
    footerText: "Fee",
  },
};

export const DifferentCurrency: Story = {
  args: {
    amount: "18,500.00",
    currency: "MXN",
    footerText: "You Receive",
    icon: <CashIcon size={16} colors={["#f59e0b", "#f59e0b"]} />,
  },
};
