import type { Meta, StoryObj } from "@storybook/react-vite";
import { Title, type TitleProps } from "../components";
import "../styles/index.css";

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
    colors: ["red", "blue"],
  },
};

export const Centered: Story = {
  args: {
    title: "Title Gradient",
    colors: ["red", "blue"],
    align: "center",
  },
};

export const Right: Story = {
  args: {
    title: "Title Gradient",
    colors: ["red", "blue"],
    align: "right",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Title Solid",
    subTitle: "Subtitle Here",
    colors: ["red", "blue"],
  },
};
