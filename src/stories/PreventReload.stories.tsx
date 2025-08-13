import type { Meta, StoryObj } from "@storybook/react-vite";
import { PreventReloadDemo } from "./demo/PreventReloadDemo";

const meta: Meta = {
  title: "Hooks/usePreventReload",
  component: PreventReloadDemo,
};

export default meta;
type Story = StoryObj<typeof PreventReloadDemo>;

export const Default: Story = {};
