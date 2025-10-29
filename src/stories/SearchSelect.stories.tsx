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

// export const GradientLink: Story = {
//   render: (props, context) => (
//     <Button variant="link" color={context.globals.gradient} {...props}>
//       Link Gradient Button
//     </Button>
//   ),
// };

// export const GradientOutline: Story = {
//   render: (props, context) => (
//     <Button
//       variant="outline"
//       background={context.globals.gradient}
//       color={context.globals.gradient}
//       {...props}
//     >
//       Outline Gradient Button
//     </Button>
//   ),
// };

// export const GradienCancel: Story = {
//   render: (props, context) => (
//     <Button
//       variant="cancel"
//       background={context.globals.gradient}
//       color={context.globals.gradient}
//       {...props}
//     >
//       Cancel Gradient Button
//     </Button>
//   ),
// };

// export const Default: Story = {
//   args: {
//     children: "Default Button",
//   },
// };

// export const Link: Story = {
//   args: {
//     children: "Link Button",
//     variant: "link",
//     color: "blue",
//   },
// };

// export const Outline: Story = {
//   args: {
//     children: "Outline Button",
//     variant: "outline",
//     color: "#000",
//   },
// };

// export const Cancel: Story = {
//   args: {
//     children: "Cancel Button",
//     variant: "cancel",
//     color: "#000",
//   },
// };
