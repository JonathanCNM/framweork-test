import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuoteSection, type QuoteSectionProps, QuoteInfo } from "../components";
import "../styles/index.css";

const meta: Meta<QuoteSectionProps> = {
  title: "Components/QuoteSection",
  component: QuoteSection,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof QuoteSection>;

const translations = {
  rateText: "1 {from} = {rate} {to}",
  estimatedRate: "Estimated rate",
};

export const SingleQuote: Story = {
  args: {
    children: (
      <QuoteInfo
        label="You send"
        amount="1,000.00"
        currency="USD"
        mode="info"
        exchangeRate={18.5}
        translations={translations}
      />
    ),
  },
};

export const InputAndInfo: Story = {
  args: {
    children: (
      <>
        <QuoteInfo
          label="You send"
          currency="USD"
          mode="input"
          initialAmount="1000"
          translations={translations}
          onAmountChange={(amount) => console.log("Amount:", amount)}
        />
        <QuoteInfo
          label="They receive"
          amount="18,500.00"
          currency="MXN"
          mode="info"
          exchangeRate={18.5}
          translations={translations}
        />
      </>
    ),
  },
};

export const MultipleQuotes: Story = {
  args: {
    children: (
      <>
        <QuoteInfo
          label="You send"
          amount="1,000.00"
          currency="USD"
          mode="info"
          exchangeRate={18.5}
          translations={translations}
          background="#eff6ff"
          textColor="#1e40af"
        />
        <QuoteInfo
          label="Exchange rate"
          amount="18.50"
          currency="MXN"
          mode="info"
          translations={translations}
          background="#fef3c7"
          textColor="#92400e"
        />
        <QuoteInfo
          label="They receive"
          amount="18,500.00"
          currency="MXN"
          mode="info"
          exchangeRate={18.5}
          translations={translations}
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
        <QuoteInfo
          label="Amount"
          amount="500.00"
          currency="EUR"
          mode="info"
          translations={translations}
        />
        <QuoteInfo
          label="Converted"
          amount="550.00"
          currency="USD"
          mode="info"
          translations={translations}
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
