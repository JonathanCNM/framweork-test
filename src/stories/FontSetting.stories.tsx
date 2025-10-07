import type { Meta, StoryObj } from "@storybook/react-vite";
import { FontSettingDemo } from "./demo/FontSettingDemo";
import "../index.css";

const meta: Meta = {
  title: "Demo",
  component: FontSettingDemo,
  parameters: {
    layout: "fullscreen",
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof FontSettingDemo>;

export const FontDemo: Story = {};
