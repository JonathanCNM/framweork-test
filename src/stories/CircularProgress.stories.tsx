import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CircularProgress,
  Loader,
  type CircularProgressProps,
} from "../components";
import "../styles/index.css";

const meta: Meta<CircularProgressProps> = {
  title: "Components/CircularProgress",
  component: CircularProgress,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CircularProgress>;

export const Gradient: Story = {
  args: {
    colors: ["red", "blue"],
  },
};

export const Loading: Story = {
  args: {
    variant: "loading",
  },
};

export const Full: Story = {
  args: {
    variant: "full",
  },
};

export const Children: Story = {
  args: {
    children: <Loader strokeWidth={2} />,
  },
};
