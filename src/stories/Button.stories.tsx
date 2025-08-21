import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, type ButtonProps } from "../components";
import "../styles/index.css";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const GradientDefault: Story = {
  render: (_, context) => (
    <Button background={context.globals.gradient} color="#fff">
      Default Gradient Button
    </Button>
  ),
};

export const GradientLink: Story = {
  render: (_, context) => (
    <Button variant="link" color={context.globals.gradient}>
      Link Gradient Button
    </Button>
  ),
};

export const GradientOutline: Story = {
  render: (_, context) => (
    <Button
      variant="outline"
      background={context.globals.gradient}
      color={context.globals.gradient}
    >
      Outline Gradient Button
    </Button>
  ),
};

export const GradienCancel: Story = {
  render: (_, context) => (
    <Button
      variant="cancel"
      background={context.globals.gradient}
      color={context.globals.gradient}
    >
      Cancel Gradient Button
    </Button>
  ),
};

export const Default: Story = {
  args: {
    children: "Default Button",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
    color: "blue",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
    color: "#000",
  },
};

export const Cancel: Story = {
  args: {
    children: "Cancel Button",
    variant: "cancel",
    color: "#000",
  },
};
