import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader, type LoaderProps } from "../components";
import "../styles/index.css";
import { getSplittedColors } from "../utils/utils";
import { backgroundGradient } from "../utils/constants";

const meta: Meta<LoaderProps> = {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Loader>;

const finalTextColor = getSplittedColors(backgroundGradient);

export const Default: Story = {
  args: {},
};

export const SolidFull: Story = {
  args: {
    strokeWidth: 2,
    value: 100,
  },
};

export const Gradient: Story = {
  args: {
    colors: finalTextColor,
    strokeWidth: 2,
  },
};

export const GradientFull: Story = {
  args: {
    colors: finalTextColor,
    strokeWidth: 2,
    value: 100,
  },
};
