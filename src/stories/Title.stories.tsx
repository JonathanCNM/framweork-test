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

export const Gradient: Story = {
  render: (props, context) => (
    <Title title="Title Gradient" color={context.globals.gradient} {...props} />
  ),
};

export const Centered: Story = {
  render: (props, context) => (
    <Title
      title="Centered Title Gradient"
      align="center"
      color={context.globals.gradient}
      {...props}
    />
  ),
};

export const Right: Story = {
  render: (props, context) => (
    <Title
      title="Right Title Gradient"
      align="right"
      color={context.globals.gradient}
      {...props}
    />
  ),
};

export const WithSubtitle: Story = {
  args: {
    title: "Gradient Title",
    subTitle: "Subtitle Here",
    color: backgroundGradient,
  },
};

export const Default: Story = {
  args: {
    title: "Title Solid",
  },
};
