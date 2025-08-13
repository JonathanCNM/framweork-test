import type { Meta, StoryObj } from "@storybook/react-vite";
import { BlockScrollDemo } from "./demo/BlockScrollDemo";

const meta: Meta = {
  title: "Hooks/useBlockScroll",
  component: BlockScrollDemo,
};

export default meta;
type Story = StoryObj<typeof BlockScrollDemo>;

export const Default: Story = {};
