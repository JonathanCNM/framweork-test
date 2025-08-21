import type { Preview } from "@storybook/react";
import { LocalGradientProvider } from "../src/store/LocalGradientProvider";
import { GradientSync } from "../src/store/GradientSync";
import { backgroundGradient, gradientList } from "../src/utils/constants";

export const globalTypes = {
  gradient: {
    name: "Gradient",
    description: "Select global gradient",
    defaultValue: backgroundGradient,
    toolbar: {
      icon: "paintbrush",
      items: gradientList,
    },
  },
};

const withGradient = (Story, context) => {
  return (
    <LocalGradientProvider>
      <GradientSync gradient={context.globals.gradient}>
        <Story />
      </GradientSync>
    </LocalGradientProvider>
  );
};

const preview: Preview = {
  decorators: [withGradient],
};

export default preview;
