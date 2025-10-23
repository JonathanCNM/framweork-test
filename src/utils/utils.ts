export const getSplittedColors = (color: string): [string, string] => {
  let finalColors: [string, string] = [color, color];
  if (color.includes("gradient")) {
    const colorstemp = color.split(",");
    const startColor = colorstemp[1].split(" ")[1];
    const endColor = colorstemp[2].split(" ")[1];
    finalColors = [startColor, endColor];
  }
  return finalColors;
};

export const generateGradient = (
  colors: [string, string],
  gradientDeg: string = "90deg",
  primaryGradientPoint?: string,
  secondaryGradientPoint?: string
) => {
  if (colors.length !== 2) return "";
  if (!primaryGradientPoint) primaryGradientPoint = "0%";
  if (!secondaryGradientPoint) secondaryGradientPoint = "100%";
  return `linear-gradient(${gradientDeg}, ${colors[0]} ${primaryGradientPoint}, ${colors[1]} ${secondaryGradientPoint})`;
};
