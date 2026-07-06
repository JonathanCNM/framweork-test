import type { Meta, StoryObj } from "@storybook/react-vite";
import { RainbowWrapper, type RainbowWrapperProps, InputField } from "../components";
import "../styles/index.css";

const meta: Meta<RainbowWrapperProps> = {
  title: "Components/RainbowWrapper",
  component: RainbowWrapper,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RainbowWrapper>;

export const StaticBorder: Story = {
  args: {
    isActive: true,
    isStatic: true,
    backgroundBtn: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    borderStroke: 2,
    children: (
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
    ),
  },
};

export const MovingRainbow: Story = {
  args: {
    isActive: true,
    isStatic: false,
    customRainbowColors: [
      "#667eea 0%",
      "#764ba2 25%",
      "#f093fb 50%",
      "#4facfe 75%",
      "#667eea 100%",
    ],
    borderStroke: 2,
    children: (
      <InputField
        label="Username"
        type="text"
        placeholder="Enter username"
      />
    ),
  },
};

export const WithError: Story = {
  args: {
    isActive: true,
    error: "This field is required",
    isStatic: true,
    backgroundBtn: "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)",
    borderStroke: 2,
    children: (
      <InputField
        label="Password"
        type="password"
        placeholder="Enter password"
        isValid={false}
      />
    ),
  },
};

export const Inactive: Story = {
  args: {
    isActive: false,
    children: (
      <InputField
        label="Name"
        type="text"
        placeholder="Enter your name"
      />
    ),
  },
};

export const CustomColors: Story = {
  args: {
    isActive: true,
    isStatic: false,
    customRainbowColors: [
      "#10b981 0%",
      "#3b82f6 50%",
      "#10b981 100%",
    ],
    borderStroke: 3,
    children: (
      <div style={{
        padding: "20px",
        background: "white",
        borderRadius: "8px",
        textAlign: "center",
      }}>
        <h3 style={{ margin: 0 }}>Rainbow Border Box</h3>
      </div>
    ),
  },
};

export const ThickBorder: Story = {
  args: {
    isActive: true,
    isStatic: true,
    backgroundBtn: "linear-gradient(90deg, #f59e0b 0%, #f97316 100%)",
    borderStroke: 4,
    children: (
      <InputField
        label="Amount"
        type="number"
        placeholder="0.00"
      />
    ),
  },
};
