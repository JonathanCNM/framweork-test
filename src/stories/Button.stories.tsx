import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, type ButtonProps } from "../components";
import "../styles/index.css";
import { backgroundGradient } from "../utils/constants";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Default Button",
  },
};

export const GradientDefault: Story = {
  args: {
    children: "Default Gradient Button",
    background: backgroundGradient,
    color: "#fff",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
    color: "blue",
  },
};

export const GradientLink: Story = {
  args: {
    children: "Link Gradient Button",
    variant: "link",
    color: backgroundGradient,
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
    color: "#000",
  },
};

export const GradientOutline: Story = {
  args: {
    children: "Outline Gradient Button",
    variant: "outline",
    background: backgroundGradient,
    color: backgroundGradient,
  },
};

export const Cancel: Story = {
  args: {
    children: "Cancel Button",
    variant: "cancel",
    color: "#000",
  },
};

export const GradienCancel: Story = {
  args: {
    children: "Cancel Gradient Button",
    variant: "cancel",
    background: backgroundGradient,
    color: backgroundGradient,
  },
};
