import type { Meta, StoryObj } from "@storybook/react-vite";
import { TransactionItem, type TransactionItemProps } from "../components";
import { SuccessIcon, ErrorIcon, WarningIcon } from "../icons";
import "../styles/index.css";

const meta: Meta<TransactionItemProps> = {
  title: "Components/TransactionItem",
  component: TransactionItem,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TransactionItem>;

const translations = {
  avatar: "JD",
  transfers: "Transfer",
  statusTranslations: {
    completed: "Completed",
    pending: "Pending",
    failed: "Failed",
  },
};

export const Completed: Story = {
  args: {
    operationId: "TXN001",
    statusInfo: {
      icon: <SuccessIcon size={16} colors={["#10b981", "#10b981"]} />,
      value: "Completed",
      color: "#10b981",
    },
    amount: "1250.50",
    currency: "USD",
    date: "Jan 15, 2026",
    translations,
    onClick: (id) => console.log("Clicked transaction:", id),
  },
};

export const Pending: Story = {
  args: {
    operationId: "TXN002",
    statusInfo: {
      icon: <WarningIcon size={16} colors={["#f59e0b", "#f59e0b"]} />,
      value: "Pending",
      color: "#f59e0b",
    },
    amount: "500.00",
    currency: "USD",
    date: "Jan 14, 2026",
    translations,
  },
};

export const Failed: Story = {
  args: {
    operationId: "TXN003",
    statusInfo: {
      icon: <ErrorIcon size={16} colors={["#ef4444", "#ef4444"]} />,
      value: "Failed",
      color: "#ef4444",
    },
    amount: "750.25",
    currency: "USD",
    date: "Jan 13, 2026",
    translations,
  },
};

export const CustomBackground: Story = {
  args: {
    operationId: "TXN004",
    statusInfo: {
      icon: <SuccessIcon size={16} colors={["#10b981", "#10b981"]} />,
      value: "Completed",
      color: "#10b981",
    },
    amount: "2500.00",
    currency: "EUR",
    date: "Jan 12, 2026",
    translations,
    background: "#f0f9ff",
    textColor: "#1e40af",
    alternativeTextColor: "#60a5fa",
  },
};

export const LargeAmount: Story = {
  args: {
    operationId: "TXN005",
    statusInfo: {
      icon: <SuccessIcon size={16} colors={["#10b981", "#10b981"]} />,
      value: "Completed",
      color: "#10b981",
    },
    amount: "15789.99",
    currency: "USD",
    date: "Jan 11, 2026",
    translations,
  },
};

export const WithoutClick: Story = {
  args: {
    operationId: "TXN006",
    statusInfo: {
      icon: <SuccessIcon size={16} colors={["#10b981", "#10b981"]} />,
      value: "Completed",
      color: "#10b981",
    },
    amount: "325.50",
    currency: "GBP",
    date: "Jan 10, 2026",
    translations,
    onClick: undefined,
  },
};
