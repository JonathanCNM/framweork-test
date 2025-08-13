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

export const Default: Story = {
  args: {
    background: ["red", "blue"],
    colors: ["#fff", "#fff"],
    children: "Default Button",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
    colors: ["blue", "blue"],
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
    colors: ["red", "blue"],
  },
};

export const Cancel: Story = {
  args: {
    children: "Cancel Button",
    variant: "cancel",
    colors: ["red", "blue"],
  },
};
