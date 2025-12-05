import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  SearchSelect,
  type SearchSelectProps,
  type SelectItem,
} from "../components";
import "../styles/index.css";

const items: SelectItem[] = [
  { label: "Item 1", code: "1" },
  { label: "Item 2", code: "2" },
  { label: "Item 3", code: "3" },
];

const meta: Meta<SearchSelectProps> = {
  title: "Components/SearchSelect",
  component: SearchSelect,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SearchSelect>;

export const GradientDefault: Story = {
  render: (props, context) => (
    <SearchSelect
      activeColor={context.globals.gradient}
      {...props}
      items={items}
    />
  ),
};
