import type { Meta, StoryObj } from "@storybook/react-vite";
import { Layout, type LayoutProps } from "../components";
import "../styles/index.css";
import { backgroundGradient } from "../utils/constants";

const meta: Meta<LayoutProps> = {
  title: "Layout/Layout",
  component: Layout,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Layout.Header>
          <p>Layout.Header</p>
        </Layout.Header>
        <Layout.Content>
          <p>Layout.Content</p>
        </Layout.Content>
        <Layout.Footer>
          <p>Layout.Footer</p>
        </Layout.Footer>
      </>
    ),
  },
};

export const Gradient: Story = {
  args: {
    background: backgroundGradient,
    children: (
      <>
        <Layout.Header>
          <p>Layout.Header</p>
        </Layout.Header>
        <Layout.Content>
          <p>Layout.Content</p>
        </Layout.Content>
        <Layout.Footer>
          <p>Layout.Footer</p>
        </Layout.Footer>
      </>
    ),
  },
};
