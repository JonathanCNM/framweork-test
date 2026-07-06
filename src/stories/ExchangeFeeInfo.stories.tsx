import type { Meta, StoryObj } from "@storybook/react-vite";
import { ExchangeFeeInfo, type ExchangeFeeInfoProps } from "../components";
import { ExchangeIcon } from "../icons";
import "../styles/index.css";

const meta: Meta<ExchangeFeeInfoProps> = {
  title: "Components/ExchangeFeeInfo",
  component: ExchangeFeeInfo,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ExchangeFeeInfo>;

const translations = {
  rateText: "1 {from} = {rate} {to}",
};

export const Default: Story = {
  args: {
    fee: "18.50",
    currency: "MXN",
    translations,
  },
};

export const WithIcon: Story = {
  args: {
    fee: "18.50",
    currency: "MXN",
    translations,
    ExchangeIcon: <ExchangeIcon size={16} colors={["#10b981", "#10b981"]} />,
  },
};

export const CustomColors: Story = {
  args: {
    fee: "0.85",
    currency: "EUR",
    translations,
    chipBackground: "#eff6ff",
    textColor: "#1e40af",
    ExchangeIcon: <ExchangeIcon size={16} colors={["#3b82f6", "#3b82f6"]} />,
  },
};

export const HighRate: Story = {
  args: {
    fee: "156.23",
    currency: "JPY",
    translations,
    chipBackground: "#fef3c7",
    textColor: "#92400e",
  },
};
