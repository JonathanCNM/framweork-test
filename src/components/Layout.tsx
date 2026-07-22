import * as React from "react";
import { isValidElement, type ReactNode } from "react";
import { useKeyboardVisible } from "../hooks/useKeyboardVisible";
import DesignLayout from "./DesignLayout";

export interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  background?: string;
  devMode?: boolean;
  auraColors?: [string, string];
}

export interface LayoutContentProps extends React.HTMLProps<HTMLDivElement> {
  isOverflowauto?: boolean;
  children: ReactNode;
}

export interface LayoutHeaderProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export interface LayoutFooterProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

type LayoutComponent = React.FC<LayoutProps> & {
  Header: React.FC<LayoutHeaderProps>;
  Content: React.FC<LayoutContentProps>;
  Footer: React.FC<LayoutFooterProps>;
};

const Header: React.FC<LayoutHeaderProps> = ({ children, ...props }) => (
  <section
    {...props}
    className={`lola-layout--container--header ${props.className ?? ""}`}
  >
    {children}
  </section>
);

const Content: React.FC<LayoutContentProps> = ({
  isOverflowauto = false,
  children,
  ...props
}) => {
  const overflowClassName = isOverflowauto ? "overflow" : "auto";
  const classes = [
    `${props.className ?? ""}`,
    "lola-layout--container--content",
    `lola-layout--container--content--${overflowClassName}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main {...props} className={classes}>
      <div className="lola-layout--container--content--container">
        <div className="lola-layout--container--content--container--wrap">
          {children}
        </div>
      </div>
    </main>
  );
};

const Footer: React.FC<LayoutFooterProps> = ({ children, ...props }) => (
  <footer
    {...props}
    className={`lola-layout--container--footer ${props.className ?? ""}`}
  >
    {children}
  </footer>
);

const LayoutBase: React.FC<LayoutProps> = ({
  children,
  className = "",
  background = "#fff",
  devMode = false,
  auraColors = ["transparent", "transparent"],
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);
  const { viewportHeight } = useKeyboardVisible();

  const classes = ["lola-layout", "aura-background", className]
    .filter(Boolean)
    .join(" ");

  const header = childrenArray.find((child) => {
    if (!isValidElement(child)) return false;
    if (child.type === Header) return child;
  });
  const content = childrenArray.find((child) => {
    if (!isValidElement(child)) return false;
    if (child.type === Content) return child;
  });
  const footer = childrenArray.find((child) => {
    if (!isValidElement(child)) return false;
    if (child.type === Footer) return child;
  });

  return (
    <div
      {...props}
      style={
        {
          ...props.style,
          height: `${viewportHeight}px`,
          "--bg": background,
          "--color1": `${auraColors[0]}`,
          "--color2": `${auraColors[1]}`,
        } as React.CSSProperties & { [key: string]: string }
      }
      className={classes}
    >
      <section className="lola-layout--container">
        {devMode && <DesignLayout />}
        {header && header}
        {content && content}
        {!content && children}
        {footer && footer}
      </section>
    </div>
  );
};

const Layout = LayoutBase as LayoutComponent;
Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;

export { Layout };
