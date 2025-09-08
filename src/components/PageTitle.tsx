import { GradientText } from "./GradientText";

export interface PageTitleProps {
  highlight: React.ReactNode | string;
  highlightColor: string;
  secudnary?: React.ReactNode | string;
  secudnaryColor?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  highlight,
  highlightColor,
  secudnary,
  secudnaryColor,
}) => (
  <GradientText
    as="h1"
    className="lola-title-highlight hightlight"
    textColor={highlightColor}
  >
    {highlight}
    {secudnary && (
      <GradientText
        as="h1"
        className="lola-title-h1 h1"
        textColor={secudnaryColor}
      >
        {secudnary}
      </GradientText>
    )}
  </GradientText>
);
