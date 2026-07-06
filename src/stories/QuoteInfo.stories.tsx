import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuoteInfo, type QuoteInfoProps } from "../components";
import { WarningIcon } from "../icons";
import "../styles/index.css";

const meta: Meta<QuoteInfoProps> = {
  title: "Components/QuoteInfo",
  component: QuoteInfo,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof QuoteInfo>;

const translations = {
  rateText: "1 {from} = {rate} {to}",
  estimatedRate: "Estimated rate",
};

export const InfoMode: Story = {
  args: {
    label: "You send",
    amount: "1,250.50",
    currency: "USD",
    mode: "info",
    exchangeRate: 18.5,
    translations,
  },
};

export const InputMode: Story = {
  args: {
    label: "Enter amount",
    currency: "USD",
    mode: "input",
    initialAmount: "100",
    translations,
    onAmountChange: (amount) => console.log("Amount changed:", amount),
  },
};

export const WithExchangeRate: Story = {
  args: {
    label: "They receive",
    amount: "23,134.25",
    currency: "MXN",
    mode: "info",
    exchangeRate: 18.5,
    translations,
  },
};

export const WithWarningIcon: Story = {
  args: {
    label: "You send",
    amount: "500.00",
    currency: "USD",
    mode: "info",
    exchangeRate: 18.5,
    translations,
    WarningIcon: <WarningIcon size={20} colors={["#f59e0b", "#f59e0b"]} />,
  },
};

export const CustomColors: Story = {
  args: {
    label: "You send",
    amount: "1,000.00",
    currency: "USD",
    mode: "info",
    exchangeRate: 18.5,
    translations,
    background: "#f0f9ff",
    textColor: "#1e40af",
    alternativeTextColor: "#60a5fa",
  },
};
