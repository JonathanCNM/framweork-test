import type { Meta, StoryObj } from "@storybook/react-vite";
import { PayoutInfo, type PayoutInfoProps } from "../components";
import { CardIcon, BankIcon, CashIcon, WalletIcon } from "../icons";
import "../styles/index.css";

const meta: Meta<PayoutInfoProps> = {
  title: "Components/PayoutInfo",
  component: PayoutInfo,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PayoutInfo>;

export const Default: Story = {
  args: {
    title: "Credit Card",
    subtitle: "Visa •••• 4242",
    icon: <CardIcon colors={["#3ee0cf", "#3ee0cf"]} size={24} />,
    onChange: () => console.log("PayoutInfo clicked"),
  },
};

export const WithGradient: Story = {
  render: (props, context) => (
    <PayoutInfo
      title="Credit Card"
      subtitle="Visa •••• 4242"
      icon={<CardIcon colors={context.globals.gradient} size={24} />}
      color={context.globals.gradient}
      onChange={() => console.log("PayoutInfo clicked")}
      {...props}
    />
  ),
};

export const BankAccount: Story = {
  args: {
    title: "Bank Account",
    subtitle: "Chase •••• 9876",
    icon: <BankIcon colors={["#667eea", "#667eea"]} size={24} />,
    background: "#f5f5f5",
    color: "#252525",
  },
};

export const CashPayout: Story = {
  args: {
    title: "Cash Payout",
    subtitle: "Available at 500+ locations",
    icon: <CashIcon colors={["#10b981", "#10b981"]} size={24} />,
    background: "#ecfdf5",
    color: "#065f46",
  },
};

export const DigitalWallet: Story = {
  args: {
    title: "Digital Wallet",
    subtitle: "wallet@email.com",
    icon: <WalletIcon colors={["#f59e0b", "#f59e0b"]} size={24} />,
    background: "#fffbeb",
    color: "#78350f",
  },
};

export const WithFee: Story = {
  args: {
    title: "International Transfer",
    subtitle: "SWIFT •••• ABC123",
    icon: <BankIcon colors={["#3ee0cf", "#3ee0cf"]} size={24} />,
    fee: <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Fee: $5.00</span>,
  },
};

export const CustomBackground: Story = {
  render: (props, context) => (
    <PayoutInfo
      title="Premium Card"
      subtitle="Gold •••• 1234"
      icon={<CardIcon colors={["#fbbf24", "#f59e0b"]} size={24} />}
      background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      color="#ffffff"
      onChange={() => console.log("Premium card selected")}
      {...props}
    />
  ),
};
