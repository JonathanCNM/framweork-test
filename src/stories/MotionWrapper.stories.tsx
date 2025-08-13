import type { Meta, StoryObj } from "@storybook/react-vite";
import { MotionWrapper, type MotionWrapperProps } from "../components";
import "../styles/index.css";

const meta: Meta<MotionWrapperProps> = {
  title: "Layout/MotionWrapper",
  component: MotionWrapper,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MotionWrapper>;

export const Default: Story = {
  args: {
    children: <>Content Page Here</>,
  },
};
