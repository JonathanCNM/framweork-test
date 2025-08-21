import type { Meta, StoryObj } from "@storybook/react-vite";
import { GradientText, type TextProps } from "../components";
import "../styles/index.css";
import { backgroundGradient } from "../utils/constants";

const meta: Meta<TextProps<"p">> = {
  title: "Components/GradientText",
  component: GradientText,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof GradientText>;

export const Default: Story = {
  args: {
    children: "Solid text",
  },
};

export const Gradient: Story = {
  args: {
    textColor: backgroundGradient,
    children: "Gradient Text",
  },
};
