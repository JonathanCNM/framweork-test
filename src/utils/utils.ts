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
