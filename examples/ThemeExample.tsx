/**
 * Complete Example: Using the New Lola Theme System
 *
 * This example demonstrates:
 * 1. Basic setup with useLolaTheme
 * 2. Using view configurations
 * 3. CSS variables
 * 4. Dynamic font changes
 * 5. Theme export
 */

import { useState } from "react";
import { useLolaTheme } from "../src/hooks/useLolaTheme";
import type { LolaThemeConfig, ViewType } from "../src/types/theme.types";
import { kapitalTheme } from "../src/utils/constants";

// Example 1: Basic Usage
export function BasicThemeExample() {
  const theme = useLolaTheme(kapitalTheme as LolaThemeConfig);

  return (
    <div style={{ background: theme.views.primaryMeshGradientView.background }}>
      <h1
        className="h1"
        style={{ color: theme.views.primaryMeshGradientView.title }}
      >
        Welcome to Lola Framework UI
      </h1>
      <p
        className="bodycopy"
        style={{ color: theme.views.primaryMeshGradientView.bodyCopy }}
      >
        This is a simple example using the new theme system.
      </p>
    </div>
  );
}

// Example 2: Using CSS Variables (Recommended)
export function CSSVariablesExample() {

  return (
    <div className="css-vars-example">
      <h1 className="h1">Using CSS Variables</h1>
      <p className="bodycopy">Better performance and maintainability</p>
      <button className="primary-button">Click Me</button>
    </div>
  );
}

// Companion CSS for Example 2
const cssVariablesStyles = `
.css-vars-example {
  background: var(--lola-view-background);
  padding: 2rem;
  font-family: var(--lola-font-family);
}

.css-vars-example h1 {
  color: var(--lola-view-title);
}

.css-vars-example p {
  color: var(--lola-view-body-copy);
}

.css-vars-example .primary-button {
  background: var(--lola-view-btn-background);
  color: var(--lola-view-btn-text);
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-family: var(--lola-font-family);
  font-weight: 600;
  cursor: pointer;
}
`;

// Example 3: View Switcher
export function ViewSwitcherExample() {
  const theme = useLolaTheme(kapitalTheme as LolaThemeConfig);
  const [currentView, setCurrentView] = useState<ViewType>(
    "primaryMeshGradientView"
  );

  const views: ViewType[] = [
    "primaryMeshGradientView",
    "specialView",
    "dataView",
    "whiteView",
    "errorView",
  ];

  const activeView = theme.views[currentView];

  return (
    <div
      style={{
        background: activeView.background,
        padding: "2rem",
        minHeight: "400px",
        transition: "all 0.3s ease",
      }}
    >
      <h1 className="h1" style={{ color: activeView.title }}>
        View: {currentView}
      </h1>

      <p className="bodycopy" style={{ color: activeView.bodyCopy }}>
        Switch between different view configurations to see color changes.
      </p>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {views.map((view) => (
          <button
            key={view}
            onClick={() => setCurrentView(view)}
            style={{
              padding: "0.75rem 1.5rem",
              background:
                currentView === view ? activeView.backgroundBtn : "transparent",
              color:
                currentView === view
                  ? activeView.textColorBtn
                  : activeView.bodyCopy,
              border: `2px solid ${activeView.backgroundBtn}`,
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.2s ease",
            }}
          >
            {view.replace("View", "")}
          </button>
        ))}
      </div>
    </div>
  );
}

// Example 4: Font Switcher
export function FontSwitcherExample() {
  const theme = useLolaTheme(kapitalTheme as LolaThemeConfig);

  const fonts = [
    {
      name: "Inter",
      cdn: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
    },
    {
      name: "Roboto",
      cdn: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
    },
    {
      name: "Poppins",
      cdn: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap",
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="h1">Dynamic Font Switching</h1>
      <p className="bodycopy">
        Current font: <strong>{theme.fontFamily}</strong>
      </p>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        {fonts.map((font) => (
          <button
            key={font.name}
            onClick={() => theme.changeFont(font.name, font.cdn)}
            style={{
              padding: "0.75rem 1.5rem",
              background:
                theme.fontFamily === font.name
                  ? theme.colors.primaryGradient
                  : "transparent",
              color:
                theme.fontFamily === font.name
                  ? theme.colors.whiteColor
                  : theme.colors.secondaryColor,
              border: `2px solid ${theme.colors.primaryGradient}`,
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: font.name,
            }}
          >
            {font.name}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2 className="h2">Sample Text</h2>
        <p className="bodycopy">
          The quick brown fox jumps over the lazy dog. This text demonstrates
          the currently selected font.
        </p>
      </div>
    </div>
  );
}

// Example 5: Custom Theme
const darkTheme: LolaThemeConfig = {
  font: {
    h1: {
      fontWeight: "700",
      min: "2rem",
      max: "3rem",
      lineHeight: "1.2",
    },
    h2: {
      fontWeight: "600",
      min: "1.5rem",
      max: "2rem",
      lineHeight: "1.3",
    },
    bodycopy: {
      fontWeight: "400",
      min: "1rem",
      max: "1.125rem",
      lineHeight: "1.6",
    },
    highlight: {
      fontWeight: "800",
      min: "2rem",
      max: "3rem",
      lineHeight: "1.1",
    },
    secondaryCta: {
      fontWeight: "500",
      min: "0.875rem",
      max: "1rem",
      lineHeight: "1",
    },
    footerText: {
      fontWeight: "400",
      min: "0.75rem",
      max: "0.875rem",
      lineHeight: "1.2",
    },
    mainButtonText: {
      fontWeight: "600",
      min: "1rem",
      max: "1.125rem",
      lineHeight: "1",
    },
    step: {
      fontWeight: "600",
      min: "0.75rem",
      max: "0.875rem",
      lineHeight: "1",
    },
    fontfamily: "Inter",
    fontcdn:
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap",
  },
  colors: {
    primaryGradient: "#8B5CF6",
    secondaryGradient: "#EC4899",
    secondaryColor: "#1F2937",
    whiteColor: "#FFFFFF",
    errorColor: "#EF4444",
    partnerHighlights: "#F3F4F6",
    primaryMesh: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
    lightness: "dark",
    useSystemTheme: false,
  },
};

export function CustomThemeExample() {
  const [isDark, setIsDark] = useState(false);
  const theme = useLolaTheme(isDark ? darkTheme : kapitalTheme as LolaThemeConfig);

  return (
    <div
      style={{
        background: theme.views.primaryMeshGradientView.background,
        padding: "2rem",
        minHeight: "400px",
      }}
    >
      <h1
        className="h1"
        style={{ color: theme.views.primaryMeshGradientView.title }}
      >
        Custom Theme Example
      </h1>

      <p
        className="bodycopy"
        style={{ color: theme.views.primaryMeshGradientView.bodyCopy }}
      >
        Toggle between light and dark custom themes.
      </p>

      <button
        onClick={() => setIsDark(!isDark)}
        style={{
          marginTop: "1rem",
          padding: "1rem 2rem",
          background: theme.views.primaryMeshGradientView.backgroundBtn,
          color: theme.views.primaryMeshGradientView.textColorBtn,
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Switch to {isDark ? "Light" : "Dark"} Theme
      </button>
    </div>
  );
}

// Example 6: Theme Exporter
export function ThemeExporterExample() {
  const theme = useLolaTheme(kapitalTheme as LolaThemeConfig);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="h1">Theme Configuration Export</h1>
      <p className="bodycopy">
        Export your current theme configuration for backup or sharing.
      </p>

      <button
        onClick={() => theme.downloadThemeConfig("my-lola-theme.json")}
        style={{
          marginTop: "1rem",
          padding: "1rem 2rem",
          background: theme.colors.primaryGradient,
          color: theme.colors.whiteColor,
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Download Theme Config
      </button>

      <div style={{ marginTop: "2rem" }}>
        <h2 className="h2">Current Colors</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {Object.entries(theme.colors).map(
            ([key, value]) =>
              typeof value === "string" &&
              value.startsWith("#") && (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: value,
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: "600" }}>
                      {key}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                      {value}
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

// Complete Demo App
export function ThemeSystemDemo() {
  const [activeExample, setActiveExample] = useState(0);

  const examples = [
    { name: "Basic Usage", component: <BasicThemeExample /> },
    { name: "CSS Variables", component: <CSSVariablesExample /> },
    { name: "View Switcher", component: <ViewSwitcherExample /> },
    { name: "Font Switcher", component: <FontSwitcherExample /> },
    { name: "Custom Theme", component: <CustomThemeExample /> },
    { name: "Theme Exporter", component: <ThemeExporterExample /> },
  ];

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <header
        style={{
          background: "linear-gradient(90deg, #1DAFA1 0%, #10B981 100%)",
          color: "white",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "2rem" }}>
          Lola Framework UI - Theme System
        </h1>
        <p style={{ margin: "0.5rem 0 0", opacity: 0.9 }}>
          New unified theme configuration system
        </p>
      </header>

      <nav
        style={{
          background: "#f9fafb",
          padding: "1rem",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveExample(index)}
            style={{
              padding: "0.5rem 1rem",
              background: activeExample === index ? "#1DAFA1" : "white",
              color: activeExample === index ? "white" : "#374151",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: activeExample === index ? "600" : "400",
              transition: "all 0.2s ease",
            }}
          >
            {example.name}
          </button>
        ))}
      </nav>

      <main>{examples[activeExample].component}</main>

      <footer
        style={{
          background: "#f9fafb",
          padding: "2rem",
          textAlign: "center",
          borderTop: "1px solid #e5e7eb",
          marginTop: "2rem",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#6B7280" }}>
          Lola Framework UI © 2026 - Modern, Type-Safe Theme System
        </p>
      </footer>

      <style>{cssVariablesStyles}</style>
    </div>
  );
}

export default ThemeSystemDemo;
