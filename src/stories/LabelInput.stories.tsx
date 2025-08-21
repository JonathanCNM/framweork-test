import type { Meta, StoryObj } from "@storybook/react-vite";
import { LabelInput, type LabelInputProps } from "../components";
import "../styles/index.css";
import { backgroundGradient } from "../utils/constants";

const meta: Meta<LabelInputProps> = {
  title: "Components/LabelInput",
  component: LabelInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LabelInput>;

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

export const Gradient: Story = {
  args: {
    color: backgroundGradient,
    children: "Gradient label for inputs",
  },
};

export const GradientActive: Story = {
  args: {
    color: backgroundGradient,
    children: "Gradient label (active) for inputs",
    isActive: true,
  },
};
