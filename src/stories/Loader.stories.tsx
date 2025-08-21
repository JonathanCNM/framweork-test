import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader, type LoaderProps } from "../components";
import "../styles/index.css";
import { getSplittedColors } from "../utils/utils";

const meta: Meta<LoaderProps> = {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Gradient: Story = {
  render: (props, context) => {
    const finalColors = getSplittedColors(context.globals.gradient);
    return <Loader colors={finalColors} {...props} />;
  },
};

export const GradientFull: Story = {
  render: (props, context) => {
    const finalColors = getSplittedColors(context.globals.gradient);
    return <Loader value={100} colors={finalColors} {...props} />;
  },
};

export const Default: Story = {
  args: {},
};

export const SolidFull: Story = {
  args: {
    value: 100,
  },
};
