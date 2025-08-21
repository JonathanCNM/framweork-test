import type { Meta, StoryObj } from "@storybook/react-vite";
import { LabelInput, type LabelInputProps } from "../components";
import "../styles/index.css";

const meta: Meta<LabelInputProps> = {
  title: "Components/LabelInput",
  component: LabelInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LabelInput>;

export const Gradient: Story = {
  render: (props, context) => (
    <LabelInput color={context.globals.gradient} {...props}>
      Gradient label for inputs
    </LabelInput>
  ),
};

export const GradientActive: Story = {
  render: (props, context) => (
    <LabelInput isActive color={context.globals.gradient} {...props}>
      Gradient label (active) for inputs
    </LabelInput>
  ),
};

export const Default: Story = {
  args: {
    children: "Label for inputs",
  },
};

export const SolidActive: Story = {
  args: {
    children: "Label (active) for inputs",
    isActive: true,
  },
};
