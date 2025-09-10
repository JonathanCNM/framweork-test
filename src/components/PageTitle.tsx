import { GradientText } from "./GradientText";

export interface PageTitleProps {
  highlight: React.ReactNode | string;
  highlightColor: string;
  secudnary?: React.ReactNode | string;
  secudnaryColor?: string;
  isLeaving?: boolean;
  textAnimated?: boolean;
  textAnimatedDelay?: number;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  highlight,
  highlightColor,
  secudnary,
  secudnaryColor,
  isLeaving = false,
  textAnimated = false,
  textAnimatedDelay = 0,
}) => (
  <GradientText
    as="h1"
    className="lola-title-highlight highlight"
    textColor={highlightColor}
    textAnimated={textAnimated}
    textAnimatedDelay={textAnimatedDelay}
  >
    {highlight}
    {secudnary && (
      <GradientText
        as="h1"
        className="lola-title-h1 h1"
        textColor={secudnaryColor}
        isLeaving={isLeaving}
        textAnimated={textAnimated}
        textAnimatedDelay={textAnimatedDelay}
      >
        {secudnary}
      </GradientText>
    )}
  </GradientText>
);
