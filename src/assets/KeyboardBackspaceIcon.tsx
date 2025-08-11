interface KeyboardBackspaceIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  colors?: [string, string];
}

export const KeyboardBackspaceIcon: React.FC<KeyboardBackspaceIconProps> = ({
  size = 35,
  colors = ["#000", "#000"],
  ...props
}) => {
  const gradientId = "keyboardBackspaceGradient";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <path
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};
