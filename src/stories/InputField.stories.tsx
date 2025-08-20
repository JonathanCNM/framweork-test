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

export const Default: Story = {
  args: {
    name: "test",
    colors: ["red", "blue"],
    label: "Label for test",
  },
};

export const Active: Story = {
  args: {
    colors: ["red", "blue"],
    label: "Label (active) for inputs",
    value: "test",
    name: "active",
  },
};

export const Solid: Story = {
  args: {
    label: "Label (active) for inputs",
    name: "solid",
  },
};

export const NoLabeled: Story = {
  args: {
    colors: ["red", "blue"],
    noLabel: true,
    name: "No labeled input",
    placeholder: "No labeled input",
  },
};
