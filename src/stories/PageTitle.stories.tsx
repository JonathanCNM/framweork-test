import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageTitle, type PageTitleProps } from "../components";
import "../styles/index.css";

const meta: Meta<PageTitleProps> = {
  title: "Components/PageTitle",
  component: PageTitle,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PageTitle>;

export const Gradient: Story = {
  render: (_, context) => {
    return (
      <PageTitle
        highlight="Gradient highlighted"
        highlightColor={context.globals.gradient}
        secudnary="Text secundary"
      />
    );
  },
};

export const Default: Story = {
  args: {
    highlight: "Text highlighted",
    secudnary: "Text secundary",
  },
};
