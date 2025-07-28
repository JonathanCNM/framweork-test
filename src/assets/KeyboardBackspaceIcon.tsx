interface KeyboardBackspaceIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export const KeyboardBackspaceIcon: React.FC<KeyboardBackspaceIconProps> = ({
  size = 35,
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill={color}
      {...props}
    >
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  );
};
