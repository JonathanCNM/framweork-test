export interface ElevatedCircleProps {
  background?: string;
  children: React.ReactNode;
}

export const ElevatedCircle: React.FC<ElevatedCircleProps> = ({
  background = "#fff",
  children,
}) => (
  <div className="elevated-circle" style={{ background }}>
    <div className="elevated-circle-section">{children}</div>
  </div>
);
