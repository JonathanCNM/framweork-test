import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navbar, type NavbarProps } from "../components";
import "../styles/index.css";
import { backgroundGradient } from "../utils/constants";
import { IconApp } from "../icons";
import { getSplittedColors } from "../utils/utils";

const meta: Meta<NavbarProps> = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Navbar>;

const finalColors = getSplittedColors(backgroundGradient);

export const Default: Story = {
  args: {
    title: "Navbar Title",
  },
};

export const Centered: Story = {
  args: {
    title: "Navbar Title",
    align: "center",
  },
};

export const Right: Story = {
  args: {
    title: "Navbar Title",
    align: "right",
  },
};

export const Gradient: Story = {
  args: {
    title: "Navbar Title Gradient",
    color: backgroundGradient,
  },
};

export const GradientNoIconLeft: Story = {
  args: {
    title: "Navbar Title Gradient",
    color: backgroundGradient,
    noBackButton: true,
  },
};

export const GradientNoIconCentered: Story = {
  args: {
    title: "Navbar Title Gradient",
    color: backgroundGradient,
    align: "center",
    noBackButton: true,
  },
};

export const GradientNoIconRight: Story = {
  args: {
    title: "Navbar Title Gradient",
    color: backgroundGradient,
    align: "right",
    noBackButton: true,
  },
};

export const GradientWithCustomIcon: Story = {
  args: {
    title: "Navbar Title Gradient",
    color: backgroundGradient,
    icon: <IconApp colors={finalColors} />,
  },
};
