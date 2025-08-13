import type { Meta, StoryObj } from "@storybook/react-vite";
import { VgsFormWrapper } from "../components";
import type { ICollectFormProps } from "@vgs/collect-js-react";
import "../styles/index.css";

const meta: Meta<ICollectFormProps> = {
  title: "VGS/VgsFormWrapper",
  component: VgsFormWrapper,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof VgsFormWrapper>;

export const Default: Story = {
  args: {
    children: <>VGS form here</>,
  },
};
