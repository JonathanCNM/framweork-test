import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, type SelectProps } from "../components/Select";
import "../styles/index.css";

const items = [
  { label: "Pera", code: "1" },
  { label: "Manzana", code: "2" },
  { label: "Sandia", code: "3" },
  { label: "Limón", code: "4" },
];

const meta: Meta<SelectProps> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    items,
    top: -1,
    onClick: () => {},
    selectedItem: "",
  },
};

export const SelectGradient: Story = {
  render: (_, context) => (
    <Select
      search
      items={items}
      top={-1}
      onClick={() => {}}
      selectedBackground={context.globals.gradient}
      selectedItem={""}
      emptyItemsMessage={"No hay coincidencias"}
    />
  ),
};
