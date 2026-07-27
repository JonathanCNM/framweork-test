import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Layout, type LayoutProps } from "../components";
import "../styles/index.css";

const meta: Meta<LayoutProps> = {
  title: "Layout/Layout",
  component: Layout,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Gradient: Story = {
  render: (props, context) => (
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
  ),
};

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

/** Multiple sibling nodes inside each slot (no single-wrapper required). */
export const MultipleChildrenPerSlot: Story = {
  render: (props, context) => (
    <Layout background={context.globals.gradient} {...props}>
      <Layout.Header>
        <p>Title</p>
        <span>Subtitle</span>
      </Layout.Header>
      <Layout.Content>
        <div>Block A</div>
        <div>Block B</div>
        <p>Block C</p>
      </Layout.Content>
      <Layout.Footer>
        <button type="button">Cancel</button>
        <button type="button">Continue</button>
      </Layout.Footer>
    </Layout>
  ),
};

/** JSX conditionals at Layout level and inside slots. */
export const ConditionalChildren: Story = {
  render: function ConditionalChildrenStory(props, context) {
    const [showHeader, setShowHeader] = useState(true);
    const [showExtra, setShowExtra] = useState(true);
    const [showFooter, setShowFooter] = useState(true);

    return (
      <Layout background={context.globals.gradient} {...props}>
        {showHeader && (
          <Layout.Header>
            <p>Conditional Header</p>
            {showExtra && <span>Extra header node</span>}
          </Layout.Header>
        )}
        <Layout.Content>
          <p>Always visible content</p>
          {showExtra && <p>Conditional content block</p>}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button type="button" onClick={() => setShowHeader((v) => !v)}>
              Toggle header
            </button>
            <button type="button" onClick={() => setShowExtra((v) => !v)}>
              Toggle extras
            </button>
            <button type="button" onClick={() => setShowFooter((v) => !v)}>
              Toggle footer
            </button>
          </div>
        </Layout.Content>
        {showFooter && (
          <Layout.Footer>
            <button type="button">Footer CTA</button>
          </Layout.Footer>
        )}
      </Layout>
    );
  },
};
