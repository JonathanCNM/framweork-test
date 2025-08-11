import { useId } from "react";

export interface LoaderProps {
  size?: number;
  strokeWidth?: number;
  value?: number;
  max?: number;
  colors?: [string, string];
  children?: React.ReactNode;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 20,
  strokeWidth = 4,
  value,
  max = 100,
  colors = ["#000", "#000"],
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress =
    typeof value === "number" ? Math.min(Math.max(value, 0), max) : undefined;
  const offset =
    progress !== undefined ? circumference * (1 - progress / max) : 0;

  const id = useId();
  const idGradient = `spinnerGradient-${id}`;

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
      <defs>
        <linearGradient id={idGradient} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={`url(#${idGradient})`}
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
