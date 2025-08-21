import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navbar, type NavbarProps } from "../components";
import "../styles/index.css";
import { IconApp } from "../icons";
import { getSplittedColors } from "../utils/utils";

const meta: Meta<NavbarProps> = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const GradientWithCustomIcon: Story = {
  render: (props, context) => {
    const colors = getSplittedColors(context.globals.gradient);
    return (
      <Navbar
        color={context.globals.gradient}
        title="Navbar Gradient With Custom Icon"
        icon={<IconApp colors={colors} />}
        {...props}
      />
    );
  },
};

export const Gradient: Story = {
  render: (props, context) => (
    <Navbar
      color={context.globals.gradient}
      title="Navbar Title Gradient"
      {...props}
    />
  ),
};

export const GradientNoBackButtonIconLeft: Story = {
  render: (props, context) => (
    <Navbar
      color={context.globals.gradient}
      noBackButton
      title="Navbar No back button Gradient"
      {...props}
    />
  ),
};

export const GradientNoBackButtonIconCentered: Story = {
  render: (props, context) => (
    <Navbar
      align="center"
      color={context.globals.gradient}
      noBackButton
      title="Centered Navbar No back button Gradient"
      {...props}
    />
  ),
};

export const GradientNoBackButtonIconRight: Story = {
  render: (props, context) => (
    <Navbar
      align="right"
      color={context.globals.gradient}
      noBackButton
      title="Right Navbar No back button Gradient"
      {...props}
    />
  ),
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
