import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CircularProgress,
  Loader,
  type CircularProgressProps,
} from "../components";
import "../styles/index.css";
import { getSplittedColors } from "../utils/utils";

const meta: Meta<CircularProgressProps> = {
  title: "Components/CircularProgress",
  component: CircularProgress,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CircularProgress>;

export const GradientDefault: Story = {
  render: (_, context) => {
    const finalColors = getSplittedColors(context.globals.gradient);
    return <CircularProgress colors={finalColors} />;
  },
};

export const GradientFull: Story = {
  render: (_, context) => {
    const finalColors = getSplittedColors(context.globals.gradient);
    return <CircularProgress variant="full" colors={finalColors} />;
  },
};

export const GadientWithChildren: Story = {
  render: (_, context) => {
    const finalColors = getSplittedColors(context.globals.gradient);
    return (
      <CircularProgress colors={finalColors}>
        <Loader strokeWidth={2} />
      </CircularProgress>
    );
  },
};

export const Default: Story = {
  args: {},
};

export const Full: Story = {
  args: {
    variant: "full",
  },
};

export const DefaultWithChildren: Story = {
  args: {
    children: <Loader strokeWidth={2} />,
  },
};
