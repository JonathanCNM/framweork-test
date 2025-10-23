import elevatedIconContainer from "../assets/elevated_icon_container.png";

interface ElevatedCircleProps {
  children: React.ReactNode;
  iconSize?: string;
}

export const ElevatedCircle = ({ children }: ElevatedCircleProps) => (
  <div
    className="elevated-circle"
    style={{
      backgroundImage: `url(${elevatedIconContainer})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="elevated-circle-section">{children}</div>
  </div>
);
