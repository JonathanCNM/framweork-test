export interface LoaderProps {
  size?: number;
  strokeWidth?: number;
  value?: number;
  max?: number;
  type?: "solid" | "gradient";
  color?: string;
  gradientColors?: [string, string];
  children?: React.ReactNode;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 20,
  strokeWidth = 4,
  value,
  max = 100,
  type = "solid",
  color = "currentColor",
  gradientColors = ["#6b0ecf", "#fd0166"],
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress =
    typeof value === "number" ? Math.min(Math.max(value, 0), max) : undefined;
  const offset =
    progress !== undefined ? circumference * (1 - progress / max) : 0;

  const stroke = type === "solid" ? color : `url(#spinnerGradient)`;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={value === undefined ? "animate-spin" : ""}
    >
      {type === "gradient" && (
        <defs>
          <linearGradient
            id="spinnerGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={gradientColors[0]} />
            <stop offset="100%" stopColor={gradientColors[1]} />
          </linearGradient>
        </defs>
      )}

      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={
          progress !== undefined ? offset : circumference * 0.25
        }
        style={{
          transition: "stroke-dashoffset 0.35s",
        }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />

      {children && (
        <foreignObject
          x="0"
          y="0"
          width={size}
          height={size}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              width: size,
              height: size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </div>
        </foreignObject>
      )}
    </svg>
  );
};
