import type { Meta, StoryObj } from "@storybook/react-vite";
import { VgsInput, type VgsInputProps } from "../components";
import "../styles/index.css";

const meta: Meta<VgsInputProps> = {
  title: "VGS/VgsInput",
  component: VgsInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof VgsInput>;

export const GradientCardholder: Story = {
  render: (_, context) => (
    <VgsInput
      type="card_holder_name"
      placeholder="Cardholder name"
      activeColor={context.globals.gradient}
    />
  ),
};

export const GradientCardnumber: Story = {
  render: (_, context) => (
    <VgsInput
      type="card_number"
      placeholder="Card number"
      activeColor={context.globals.gradient}
    />
  ),
};

export const GradientExpirationDate: Story = {
  render: (_, context) => (
    <VgsInput
      type="card_exp_date"
      placeholder="Due date"
      activeColor={context.globals.gradient}
    />
  ),
};

export const GradientCvc: Story = {
  render: (_, context) => (
    <VgsInput
      type="card_cvc"
      placeholder="CVV"
      activeColor={context.globals.gradient}
    />
  ),
};

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
