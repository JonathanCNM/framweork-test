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

export const Default: Story = {
  args: {
    colors: ["red", "blue"],
    children: "Label for inputs",
  },
};

export const Active: Story = {
  args: {
    colors: ["red", "blue"],
    children: "Label (active) for inputs",
    isActive: true,
  },
};
