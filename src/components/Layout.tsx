import * as React from "react";
import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { useKeyboardVisible } from "../hooks/useKeyboardVisible";
import DesignLayout from "./DesignLayout";

export interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Layout slots and/or arbitrary nodes.
   * Accepts 1..n children, fragments, and JSX conditionals (`{cond && <...>}`).
   */
  children?: ReactNode;
  background?: string;
  devMode?: boolean;
  auraColors?: [string, string];
}

export interface LayoutContentProps extends React.HTMLProps<HTMLDivElement> {
  isOverflowauto?: boolean;
  /**
   * Accepts 1..n nodes, fragments, arrays, and JSX conditionals.
   */
  children?: ReactNode;
}

export interface LayoutHeaderProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Accepts 1..n nodes, fragments, arrays, and JSX conditionals.
   */
  children?: ReactNode;
}

export interface LayoutFooterProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Accepts 1..n nodes, fragments, arrays, and JSX conditionals.
   */
  children?: ReactNode;
}

type LayoutComponent = React.FC<LayoutProps> & {
  Header: React.FC<LayoutHeaderProps>;
  Content: React.FC<LayoutContentProps>;
  Footer: React.FC<LayoutFooterProps>;
};

const SLOT = {
  Header: "Layout.Header",
  Content: "Layout.Content",
  Footer: "Layout.Footer",
} as const;

function getElementTypeName(type: ReactElement["type"]): string | undefined {
  if (typeof type === "string") return type;
  if (typeof type === "function" || (typeof type === "object" && type)) {
    const maybe = type as { displayName?: string; name?: string };
    return maybe.displayName || maybe.name;
  }
  return undefined;
}

/**
 * Robust slot detection:
 * - reference equality (`child.type === Slot`)
 * - displayName fallback (HMR / duplicate module copies in consumers)
 */
function isSlotElement(
  child: ReactNode,
  slotComponent: unknown,
  slotDisplayName: string
): child is ReactElement {
  if (!isValidElement(child)) return false;
  if (child.type === slotComponent) return true;
  return getElementTypeName(child.type) === slotDisplayName;
}

/**
 * Normalize children so slots accept:
 * - a single node
 * - multiple siblings
 * - fragments
 * - JSX conditionals (`false` / `null` / `undefined` are dropped by toArray)
 */
function renderChildren(children: ReactNode): ReactNode {
  const items = Children.toArray(children);
  if (items.length === 0) return null;
  if (items.length === 1) return items[0];
  return <>{items}</>;
}

const Header: React.FC<LayoutHeaderProps> = ({
  children,
  className,
  ...props
}) => (
  <section
    {...props}
    className={["lola-layout--container--header", className]
      .filter(Boolean)
      .join(" ")}
  >
    {renderChildren(children)}
  </section>
);
Header.displayName = SLOT.Header;

const Content: React.FC<LayoutContentProps> = ({
  isOverflowauto = false,
  children,
  className,
  ...props
}) => {
  const overflowClassName = isOverflowauto ? "overflow" : "auto";
  const classes = [
    className,
    "lola-layout--container--content",
    `lola-layout--container--content--${overflowClassName}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main {...props} className={classes}>
      <div className="lola-layout--container--content--container">
        <div className="lola-layout--container--content--container--wrap">
          {renderChildren(children)}
        </div>
      </div>
    </main>
  );
};
Content.displayName = SLOT.Content;

const Footer: React.FC<LayoutFooterProps> = ({
  children,
  className,
  ...props
}) => (
  <footer
    {...props}
    className={["lola-layout--container--footer", className]
      .filter(Boolean)
      .join(" ")}
  >
    {renderChildren(children)}
  </footer>
);
Footer.displayName = SLOT.Footer;

const LayoutBase: React.FC<LayoutProps> = ({
  children,
  className = "",
  background = "#fff",
  devMode = false,
  auraColors = ["transparent", "transparent"],
  ...props
}) => {
  // Flattens fragments and strips `false` / `null` / `undefined` from JSX conditionals
  const childrenArray = Children.toArray(children);
  const { viewportHeight } = useKeyboardVisible();

  const classes = ["lola-layout", "aura-background", className]
    .filter(Boolean)
    .join(" ");

  const header = childrenArray.find((child) =>
    isSlotElement(child, Header, SLOT.Header)
  );
  const content = childrenArray.find((child) =>
    isSlotElement(child, Content, SLOT.Content)
  );
  const footer = childrenArray.find((child) =>
    isSlotElement(child, Footer, SLOT.Footer)
  );

  const hasSlots = Boolean(header || content || footer);
  const otherChildren = childrenArray.filter(
    (child) =>
      !isSlotElement(child, Header, SLOT.Header) &&
      !isSlotElement(child, Content, SLOT.Content) &&
      !isSlotElement(child, Footer, SLOT.Footer)
  );

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
        {header}
        {content}
        {footer}
        {/* No compound slots → render whatever was passed (1..n / conditionals) */}
        {!hasSlots && renderChildren(children)}
        {/* Extra non-slot siblings alongside Header/Content/Footer */}
        {hasSlots && otherChildren.length > 0
          ? renderChildren(otherChildren)
          : null}
      </section>
    </div>
  );
};
LayoutBase.displayName = "Layout";

const Layout = LayoutBase as LayoutComponent;
Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;

export { Layout };
