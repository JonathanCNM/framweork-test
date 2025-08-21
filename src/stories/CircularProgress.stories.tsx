import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CircularProgress,
  Loader,
  type CircularProgressProps,
} from "../components";
import "../styles/index.css";
import { getSplittedColors } from "../utils/utils";
import { backgroundGradient } from "../utils/constants";

const meta: Meta<CircularProgressProps> = {
  title: "Components/CircularProgress",
  component: CircularProgress,
  tags: ["autodocs"],
};

export default meta;

const finalTextColor = getSplittedColors(backgroundGradient);

type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
  args: {},
};

export const GradientDefault: Story = {
  args: {
    colors: finalTextColor,
  },
};

export const Full: Story = {
  args: {
    variant: "full",
  },
};

export const GradientFull: Story = {
  args: {
    variant: "full",
    colors: finalTextColor,
  },
};

export const DefaultWithChildren: Story = {
  args: {
    children: <Loader strokeWidth={2} />,
  },
};

export const GadientWithChildren: Story = {
  args: {
    colors: finalTextColor,
    children: <Loader strokeWidth={2} />,
  },
};
