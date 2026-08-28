import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextLink, type TextLinkProps } from "../components";
import "../styles/index.css";

const meta: Meta<TextLinkProps<"a">> = {
  title: "Components/TextLink",
  component: TextLink,
  tags: ["autodocs"],
  argTypes: {
    textColor: { control: "text" },
    bold: { control: "boolean" },
    underline: { control: "boolean" },
  },
  args: {
    children: "Terms & Conditions",
    href: "#",
  },
};

export default meta;

type Story = StoryObj<typeof TextLink>;

export const ThemeDefault: Story = {
  name: "Theme default (#252525 / bold / no underline)",
};

export const Underlined: Story = {
  args: {
    underline: true,
  },
};

export const RegularWeight: Story = {
  args: {
    bold: false,
  },
};

export const Gradient: Story = {
  args: {
    textColor: "linear-gradient(116.74deg, #4BA84B 23.26%, #008433 111.43%)",
    underline: true,
  },
};

export const AsSpan: Story = {
  args: {
    as: "span",
    href: undefined,
  },
};
