import type { Meta, StoryObj } from "@storybook/react-vite";
import { GradientText, type TextProps } from "../components";
import "../styles/index.css";

const meta: Meta<TextProps<"p">> = {
  title: "Components/GradientText",
  component: GradientText,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof GradientText>;

export const Gradient: Story = {
  args: {
    colors: ["red", "blue"],
    children: "Gradient Text",
  },
};

export const Solid: Story = {
  args: {
    colors: ["#000", "#000"],
    children: "Solid text",
  },
};
