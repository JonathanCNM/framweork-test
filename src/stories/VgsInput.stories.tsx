import type { Meta, StoryObj } from "@storybook/react-vite";
import { VgsInput, type VgsInputProps } from "../components";
import "../styles/index.css";
import { backgroundGradient } from "../utils/constants";

const meta: Meta<VgsInputProps> = {
  title: "VGS/VgsInput",
  component: VgsInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof VgsInput>;

export const Cardholder: Story = {
  args: {
    type: "card_holder_name",
    placeholder: "Cardholder name",
  },
};

export const Cardnumber: Story = {
  args: {
    type: "card_number",
    placeholder: "Card number",
  },
};

export const ExpirationDate: Story = {
  args: {
    type: "card_exp_date",
    placeholder: "due date",
  },
};

export const Cvc: Story = {
  args: {
    type: "card_cvc",
    placeholder: "Security code",
  },
};

export const GradientCardholder: Story = {
  args: {
    type: "card_holder_name",
    placeholder: "Cardholder name",
    color: backgroundGradient,
  },
};

export const GradientCardnumber: Story = {
  args: {
    type: "card_number",
    placeholder: "Card number",
    color: backgroundGradient,
  },
};

export const GradientExpirationDate: Story = {
  args: {
    type: "card_exp_date",
    placeholder: "due date",
    color: backgroundGradient,
  },
};

export const GradientCvc: Story = {
  args: {
    type: "card_cvc",
    placeholder: "Security code",
    color: backgroundGradient,
  },
};
