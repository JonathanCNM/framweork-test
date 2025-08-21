import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField, type InputFieldProps } from "../components";
import "../styles/index.css";
import { backgroundGradient } from "../utils/constants";

const meta: Meta<InputFieldProps> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    name: "test",
    label: "Default input",
  },
};

export const DefaultActive: Story = {
  args: {
    label: "Input (active)",
    value: "test",
    name: "active",
  },
};

export const DefaultNoLabeled: Story = {
  args: {
    placeholder: "Input not labeled",
    noLabel: true,
    name: "active",
  },
};

export const Gradient: Story = {
  args: {
    name: "test",
    label: "Gradient input",
    color: backgroundGradient,
  },
};

export const GradientActive: Story = {
  args: {
    label: "Gradient input (active)",
    value: "test",
    name: "active",
    color: backgroundGradient,
  },
};

export const GradientNoLabeled: Story = {
  args: {
    placeholder: "Gradient input not labeled",
    noLabel: true,
    name: "active",
    color: backgroundGradient,
  },
};
