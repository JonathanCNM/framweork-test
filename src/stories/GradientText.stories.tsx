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
  render: (props, context) => (
    <GradientText textColor={context.globals.gradient} {...props}>
      Gradient Text
    </GradientText>
  ),
};

export const Default: Story = {
  args: {
    children: "Solid text",
  },
};
