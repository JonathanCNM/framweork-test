import type { Meta, StoryObj } from "@storybook/react-vite";
import { Title, type TitleProps } from "../components";
import "../styles/index.css";
import { backgroundGradient } from "../utils/constants";

const meta: Meta<TitleProps> = {
  title: "Components/Title",
  component: Title,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {
    title: "Title Solid",
  },
};

export const Gradient: Story = {
  args: {
    title: "Title Gradient",
    color: backgroundGradient,
  },
};

export const Centered: Story = {
  args: {
    title: "Title Gradient",
    color: backgroundGradient,
    align: "center",
  },
};

export const Right: Story = {
  args: {
    title: "Title Gradient",
    color: backgroundGradient,
    align: "right",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Title Solid",
    subTitle: "Subtitle Here",
    color: backgroundGradient,
  },
};
