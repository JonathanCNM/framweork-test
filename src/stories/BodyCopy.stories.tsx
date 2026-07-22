import type { Meta, StoryObj } from "@storybook/react-vite";
import { BodyCopy, GradientText, type BodyCopyProps } from "../components";
import "../styles/index.css";

const meta: Meta<BodyCopyProps<"p">> = {
  title: "Components/BodyCopy",
  component: BodyCopy,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof BodyCopy>;

export const Gradient: Story = {
  render: (props, context) => (
    <GradientText as="p" className="lola-body-copy" textColor={context.globals.gradient} {...props}>
      Gradient Text
    </GradientText>
  ),
};

export const Default: Story = {
  args: {
    children: "Solid text",
  },
};
