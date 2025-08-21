import * as React from "react";
import { isValidElement, type ReactElement, type ReactNode } from "react";
import { useKeyboardVisible } from "../hooks/useKeyboardVisible";

export interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  background?: string;
}

const Header = ({ children }: { children: ReactNode }) => (
  <section className="lola-layout--container--header">{children}</section>
);

const Content = ({
  isOverflowauto = false,
  className = "",
  children,
}: {
  isOverflowauto?: boolean;
  children: ReactNode;
  className?: string;
}) => {
  const overflowClassName = isOverflowauto ? "overflow" : "auto";
  const classes = [
    "lola-layout--container--content",
    `lola-layout--container--content--${overflowClassName}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={classes}>
      <div
        className={`lola-layout--container--content--container ${className}`}
      >
        <div className="lola-layout--container--content--container--wrap">
          {children}
        </div>
      </div>
    </main>
  );
};

const Footer = ({ children }: { children: ReactNode }) => (
  <footer className="lola-layout--container--footer">{children}</footer>
);

const Layout = ({
  children,
  className = "",
  background = "#fff",
  ...props
}: LayoutProps): ReactElement => {
  const childrenArray = React.Children.toArray(children);
  const { viewportHeight } = useKeyboardVisible();

  const isValidStructure = childrenArray.every((child, index) => {
    if (!isValidElement(child)) return false;
    if (index === 0 && child.type !== Header) return false;
    if (index === 1 && child.type !== Content) return false;
    if (index === 2 && child.type !== Footer) return false;
    if (index > 2) return false;
    return true;
  });

  if (!isValidStructure) {
    console.warn(
      "[Layout] Children must be in order: <Layout.Header /> <Layout.Content /> <Layout.Footer /> (Header/Footer optional)"
    );
  }

  const classes = ["lola-layout", className].filter(Boolean).join(" ");

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
        } as React.CSSProperties & { [key: string]: string }
      }
      className={classes}
    >
      <section className="lola-layout--container">
        {header && header}
        {content && content}
        {!content && children}
        {footer && footer}
      </section>
    </div>
  );
};

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;

export { Layout };
