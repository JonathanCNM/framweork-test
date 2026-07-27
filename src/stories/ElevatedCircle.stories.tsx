import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ElevatedCircle,
  type ElevatedCircleProps,
} from "../components";
import "../styles/index.css";

const meta: Meta<ElevatedCircleProps> = {
  title: "Components/ElevatedCircle",
  component: ElevatedCircle,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "text",
      description:
        "Circle diameter. Numbers are treated as px. Default 128 (legacy).",
    },
    shadowVariant: {
      control: "radio",
      options: ["normal", "inset", "none"],
      description:
        "Box-shadow style. `normal` is the legacy inset glow; `inset` is the softer directional inset; `none` removes the shadow.",
    },
    background: {
      control: "color",
    },
  },
  args: {
    background: "#fff",
    size: 128,
    shadowVariant: "normal",
    children: "●",
  },
};

export default meta;

type Story = StoryObj<typeof ElevatedCircle>;

export const LegacyDefault: Story = {
  name: "Legacy default (128 / normal)",
  args: {
    size: 128,
    shadowVariant: "normal",
    children: (
      <span style={{ fontSize: 32, fontWeight: 600 }} aria-hidden>
        ✓
      </span>
    ),
  },
};

export const ShadowInset: Story = {
  args: {
    size: 128,
    shadowVariant: "inset",
    children: (
      <span style={{ fontSize: 32, fontWeight: 600 }} aria-hidden>
        ✓
      </span>
    ),
  },
};

export const CustomSize: Story = {
  args: {
    size: 96,
    shadowVariant: "normal",
    children: (
      <span style={{ fontSize: 24, fontWeight: 600 }} aria-hidden>
        ✓
      </span>
    ),
  },
};

export const LargeInset: Story = {
  args: {
    size: 160,
    shadowVariant: "inset",
    background: "#f3f4f6",
    children: (
      <span style={{ fontSize: 40, fontWeight: 600 }} aria-hidden>
        ✓
      </span>
    ),
  },
};

export const NoShadow: Story = {
  args: {
    size: 128,
    shadowVariant: "none",
    children: (
      <span style={{ fontSize: 32, fontWeight: 600 }} aria-hidden>
        ✓
      </span>
    ),
  },
};
