import { Loader } from "./Loader";

export interface CircularProgressProps {
  size?: number;
  className?: string;
  color1?: string;
  color2?: string;
  children?: React.ReactNode;
  transparent?: boolean;
  type?: "solid" | "gradient";
  variant?: "full" | "loading";
  gradientColors?: [string, string];
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 154,
  gradientColors,
  type = "solid",
  children,
  variant = "loading",
}) => {
  const value = variant === "full" ? 100 : undefined;

  return (
    <section className="lola-cirular-progress">
      <Loader
        size={size}
        type={type}
        value={value}
        gradientColors={gradientColors}
      />
      {children && (
        <section
          className="lola-cirular-progress--element"
          style={{ backgroundColor: "red" }}
        >
          {children}
        </section>
      )}
    </section>
  );
};
