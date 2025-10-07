import type { Meta, StoryObj } from "@storybook/react-vite";
import { Layout, Page, type PageProps } from "../components";
import "../styles/index.css";

const meta: Meta<PageProps> = {
  title: "Layout/Page",
  component: Page,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Gradient: Story = {
  render: (props, context) => (
    <Page>
      <Layout background={context.globals.gradient} {...props}>
        <Layout.Header>
          <p>Layout.Header</p>
        </Layout.Header>
        <Layout.Content>
          <p>Layout.Content</p>
        </Layout.Content>
        <Layout.Footer>
          <p>Layout.Footer</p>
        </Layout.Footer>
      </Layout>
    </Page>
  ),
};

export const Default: Story = {
  args: {
    children: (
      <Page>
        <Layout>
          <Layout.Header>
            <p>Layout.Header</p>
          </Layout.Header>
          <Layout.Content>
            <p>Layout.Content</p>
          </Layout.Content>
          <Layout.Footer>
            <p>Layout.Footer</p>
          </Layout.Footer>
        </Layout>
      </Page>
    ),
  },
};
