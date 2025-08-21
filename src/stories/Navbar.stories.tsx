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

export const Gradient: Story = {
  render: (_, context) => (
    <Navbar color={context.globals.gradient} title="Navbar Title Gradient" />
  ),
};

export const GradientNoBackButtonIconLeft: Story = {
  render: (_, context) => (
    <Navbar
      color={context.globals.gradient}
      noBackButton
      title="Navbar No back button Gradient"
    />
  ),
};

export const GradientNoBackButtonIconCentered: Story = {
  render: (_, context) => (
    <Navbar
      align="center"
      color={context.globals.gradient}
      noBackButton
      title="Centered Navbar No back button Gradient"
    />
  ),
};

export const GradientNoBackButtonIconRight: Story = {
  args: {
    title: "Navbar Title Gradient",
    color: backgroundGradient,
    align: "right",
    noBackButton: true,
  },
  render: (_, context) => (
    <Navbar
      align="right"
      color={context.globals.gradient}
      noBackButton
      title="Right Navbar No back button Gradient"
    />
  ),
};

export const GradientWithCustomIcon: Story = {
  render: (_, context) => {
    const colors = getSplittedColors(context.globals.gradient);
    return (
      <Navbar
        color={context.globals.gradient}
        title="Navbar Gradient With Custom Icon"
        icon={<IconApp colors={colors} />}
      />
    );
  },
};

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
