import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navbar, type NavbarProps } from "../components";
import "../styles/index.css";

const meta: Meta<NavbarProps> = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    title: "Navbar Title",
  },
};

export const Gradient: Story = {
  args: {
    title: "Navbar Title Gradient",
    colors: ["red", "blue"],
  },
};
