import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader, type LoaderProps } from "../components";
import "../styles/index.css";

const meta: Meta<LoaderProps> = {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Solid: Story = {
  args: {
    strokeWidth: 2,
  },
};

export const Gradient: Story = {
  args: {
    colors: ["red", "blue"],
    strokeWidth: 2,
  },
};

export const GradientFull: Story = {
  args: {
    colors: ["red", "blue"],
    strokeWidth: 2,
    value: 100,
  },
};
export const SolidFull: Story = {
  args: {
    strokeWidth: 2,
    value: 100,
  },
};
