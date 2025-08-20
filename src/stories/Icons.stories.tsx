import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconsDemo } from "./demo/IconsDemo";
import "../index.css";

const meta: Meta = {
  title: "Icons",
  component: IconsDemo,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof IconsDemo>;

export const IconList: Story = {};
