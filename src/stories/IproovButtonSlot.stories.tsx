import type { Meta, StoryObj } from "@storybook/react-vite";
import { IproovButtonSlot, type IproovButtonSlotProps } from "../components";
import "../styles/index.css";

const meta: Meta<IproovButtonSlotProps> = {
  title: "Panels/IproovButtonSlot",
  component: IproovButtonSlot,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof IproovButtonSlot>;

export const Default: Story = {
  args: {
    children: "Footer text",
  },
};
