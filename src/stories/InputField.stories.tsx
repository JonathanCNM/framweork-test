import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField, type InputFieldProps } from "../components";
import "../styles/index.css";

const meta: Meta<InputFieldProps> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Gradient: Story = {
  render: (props, context) => (
    <InputField
      name="test"
      label="Gradient input"
      color="#222222"
      activeColor={context.globals.gradient}
      {...props}
    />
  ),
};

export const GradientNoLabeled: Story = {
  render: (props, context) => (
    <InputField
      name="test"
      noLabel
      placeholder="Gradient input not labeled"
      color="#222222"
      activeColor={context.globals.gradient}
      {...props}
    />
  ),
};

export const Default: Story = {
  args: {
    name: "test",
    label: "Default input",
  },
};

export const DefaultNoLabeled: Story = {
  args: {
    placeholder: "Input not labeled",
    noLabel: true,
    name: "active",
  },
};
