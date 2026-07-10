# Theme System API Reference

Complete API documentation for the Lola Framework UI Theme System.

## Table of Contents

- [Hooks](#hooks)
  - [useLolaTheme](#uselolaTheme)
  - [useLolaView](#uselolerview)
  - [useViewConfig](#useviewconfig)
  - [useCSSVariables](#usecssvariables)
  - [useFonts](#usefonts)
- [Types](#types)
- [CSS Variables](#css-variables)
- [Utilities](#utilities)

---

## Hooks

### useLolaTheme

Main hook for configuring and managing the Lola Framework theme.

**Signature:**
```typescript
function useLolaTheme(config: LolaThemeConfig): UseLolaThemeReturn
```

**Parameters:**
- `config: LolaThemeConfig` - Complete theme configuration object

**Returns: `UseLolaThemeReturn`**
```typescript
{
  views: ViewsConfig;                              // All view configurations
  colors: ColorPalette;                            // Color palette
  fontFamily: string;                              // Current font family name
  fontStyles: Record<string, FontStyleConfig>;     // Text style configurations
  changeFont: (name: string, cdn: string) => void; // Change font dynamically
  generateViewConfigs: (colors: ColorPalette) => ViewsConfig; // Generate views from colors
  downloadThemeConfig: (filename?: string) => void; // Export theme as JSON
}
```

**Example:**
```typescript
import { useLolaTheme } from '@/hooks/useLolaTheme';
import { kapitalTheme } from '@/utils/constants';

function App() {
  const theme = useLolaTheme(kapitalTheme);
  
  return (
    <div style={{ background: theme.views.primaryMeshGradientView.background }}>
      <h1 className="h1">Hello World</h1>
    </div>
  );
}
```

**Side Effects:**
- Injects font link tag into `<head>`
- Creates `<style>` tag with text styles
- Sets CSS custom properties on `:root`

---

### useLolaView

Hook for accessing a specific view configuration.

**Signature:**
```typescript
function useLolaView(
  theme: UseLolaThemeReturn, 
  viewType: ViewType
): ViewColorConfig
```

**Parameters:**
- `theme: UseLolaThemeReturn` - Theme object from `useLolaTheme`
- `viewType: ViewType` - One of: `'primaryMeshGradientView'`, `'specialView'`, `'dataView'`, `'whiteView'`, `'errorView'`

**Returns: `ViewColorConfig`**

**Example:**
```typescript
import { useLolaTheme, useLolaView } from '@/hooks';

function MyComponent() {
  const theme = useLolaTheme(kapitalTheme);
  const dataView = useLolaView(theme, 'dataView');
  
  return (
    <div style={{ background: dataView.background }}>
      <h1 style={{ color: dataView.title }}>Data View</h1>
    </div>
  );
}
```

---

### useViewConfig

Hook for generating view configurations from a color palette.

**Signature:**
```typescript
function useViewConfig(
  colorPalette: ColorPalette,
  customViews?: Partial<ViewsConfig>
): {
  views: ViewsConfig;
  generateViewConfigs: (colors: ColorPalette) => ViewsConfig;
}
```

**Parameters:**
- `colorPalette: ColorPalette` - Color configuration
- `customViews?: Partial<ViewsConfig>` - Optional view overrides

**Returns:**
- `views` - Generated view configurations
- `generateViewConfigs` - Function to generate views from different colors

**Example:**
```typescript
import { useViewConfig } from '@/hooks/useViewConfig';

function ThemeGenerator() {
  const { views } = useViewConfig({
    primaryGradient: '#1DAFA1',
    secondaryGradient: '#10B981',
    // ... other colors
    lightness: 'light'
  });
  
  return <div style={{ background: views.dataView.background }}>Content</div>;
}
```

---

### useCSSVariables

Hook for managing CSS custom properties.

**Signature:**
```typescript
function useCSSVariables(
  colors: ColorPalette,
  fontFamily: string,
  viewConfig?: ViewColorConfig | null
): {
  injectColorVariables: (colors: ColorPalette) => void;
  injectViewVariables: (viewConfig: ViewColorConfig) => void;
  injectFontVariable: (fontFamily: string) => void;
}
```

**Parameters:**
- `colors: ColorPalette` - Color palette to inject
- `fontFamily: string` - Font family name
- `viewConfig?: ViewColorConfig` - Optional view configuration

**Example:**
```typescript
import { useCSSVariables } from '@/hooks/useCSSVariables';

function App() {
  useCSSVariables(
    { primaryGradient: '#1DAFA1', /* ... */ },
    'Inter',
    viewConfig
  );
  
  return <div className="app">Content</div>;
}

// In CSS:
// .app { color: var(--lola-color-primary-gradient); }
```

---

### useFonts

Hook for loading and managing custom fonts.

**Signature:**
```typescript
function useFonts(font: UseFontsProps): {
  fontStyle: UseFontsProps;
  onChangeFont: (font: UseFontsProps) => void;
}
```

**Parameters:**
```typescript
interface UseFontsProps {
  name: string;  // Font family name
  cdn: string;   // CDN URL for font
}
```

**Example:**
```typescript
import { useFonts } from '@/hooks/useFonts';

function App() {
  const { onChangeFont } = useFonts({
    name: 'Inter',
    cdn: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
  });
  
  return (
    <button onClick={() => onChangeFont({
      name: 'Roboto',
      cdn: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
    })}>
      Change Font
    </button>
  );
}
```

---

## Types

### LolaThemeConfig

Main theme configuration interface.

```typescript
interface LolaThemeConfig {
  font: {
    h1?: FontStyleConfig;
    h2?: FontStyleConfig;
    bodycopy?: FontStyleConfig;
    highlight?: FontStyleConfig;
    secondaryCta?: FontStyleConfig;
    footerText?: FontStyleConfig;
    mainButtonText?: FontStyleConfig;
    step?: FontStyleConfig;
    [key: string]: FontStyleConfig | string | undefined;
    fontfamily: string;  // Required
    fontcdn: string;     // Required
  };
  colors: ColorPalette;
  views?: Partial<ViewsConfig>;  // Optional view overrides
  styles?: StylesConfig;          // Optional custom styles
}
```

---

### FontStyleConfig

Configuration for a text style.

```typescript
interface FontStyleConfig {
  fontWeight: string | number;  // e.g., '700' or 700
  min: string;                   // Minimum font size (e.g., '1rem')
  max: string;                   // Maximum font size (e.g., '2rem')
  lineHeight: string | number;   // Line height (e.g., '1.5' or '1.5rem')
  dynamicFormula?: string;       // Optional: custom clamp formula (e.g., '2vw + 0.25rem')
}
```

---

### ColorPalette

Color configuration for the theme.

```typescript
interface ColorPalette {
  primaryGradient: string;       // Primary brand color
  secondaryGradient: string;     // Secondary brand color
  secondaryColor: string;        // Text/UI color
  whiteColor: string;            // Light backgrounds/text
  errorColor: string;            // Error states
  partnerHighlights: string;     // Accent/highlight color
  primaryMesh: string;           // Full gradient definition
  lightness: 'light' | 'dark';   // Theme mode
  useSystemTheme?: boolean;      // Use system preference
  inactived?: string;            // Inactive state color
  gradient?: string;             // Alternative gradient
  gradientDeg?: string;          // Gradient angle
  primaryGradientPoint?: string; // Gradient color stop
  secundaryGradientPoint?: string; // Gradient color stop
  errorViewBackground?: string;  // Background for error views (solid color or gradient)
  cardPanelBackground?: string;  // Card panel background (default: 'transparent')
  cardBackground?: string;       // Card background (uses --card CSS variable)
  cardBackgroundSecundary?: string; // Secondary card background (uses --card-foreground CSS variable)
}
```

---

### ViewColorConfig

Configuration for a single view.

```typescript
interface ViewColorConfig {
  background: string;                // View background color
  iconColors: [string, string];      // Icon gradient colors
  backgroundIcon: string;            // Icon background
  title: string;                     // Title text color
  subtitile: string;                 // Subtitle text color
  bodyCopy: string;                  // Body text color
  footerColor: string;               // Footer text color
  backgroundBtn: string;             // Button background
  textColorBtn: string;              // Button text color
  stepsColors: string;               // Steps indicator color
  stepsLabelColor: string;           // Steps label color
  dropzoneColors: [string, string];  // Dropzone gradient colors
  errorColor?: string;               // Error state color
  highlight?: string;                // Highlight color
  themeType?: 'light' | 'dark';      // Theme mode
  useSystemTheme?: boolean;          // Use system preference
  viewConfig: ViewType;              // View type identifier
}
```

---

### ViewsConfig

Collection of all view configurations.

```typescript
interface ViewsConfig {
  primaryMeshGradientView: ViewColorConfig;
  specialView: ViewColorConfig;
  dataView: ViewColorConfig;
  whiteView: ViewColorConfig;
  errorView: ViewColorConfig;
}
```

---

### StylesConfig

Custom styles configuration for components.

```typescript
interface StylesConfig {
  // Border radius
  cardBorderRadius?: string;      // Card border radius (default: '16px')
  buttonBorderRadius?: string;    // Button border radius (default: '8px')
  inputBorderRadius?: string;     // Input border radius (default: '8px')
  
  // Border colors
  cardBorderColor?: string;       // Card border color (default: '#E4E4E4')
  buttonBorderColor?: string;     // Button border color (default: '#E4E4E4')
  inputBorderColor?: string;      // Input border color (default: '#E4E4E4')
  
  // Component sizes
  buttonSize?: ButtonSize;        // Button size: 'small' | 'medium' | 'large' (default: 'medium')
}
```

**Example:**
```typescript
styles: {
  cardBorderRadius: '20px',
  buttonBorderRadius: '12px',
  inputBorderRadius: '10px',
  cardBorderColor: '#CCCCCC',
  buttonBorderColor: '#1DAFA1',
  inputBorderColor: '#E0E0E0',
  buttonSize: 'large',
}
```

**Generated CSS Variables:**
- `--lola-style-card-border-radius`
- `--lola-style-button-border-radius`
- `--lola-style-input-border-radius`
- `--lola-style-card-border-color`
- `--lola-style-button-border-color`
- `--lola-style-input-border-color`
- `--lola-style-button-size`

---

### ViewType

Available view types.

```typescript
type ViewType = 
  | 'primaryMeshGradientView'
  | 'specialView'
  | 'dataView'
  | 'whiteView'
  | 'errorView';
```

---

## CSS Variables

The theme system automatically injects these CSS custom properties:

### Global Color Variables

```css
--lola-color-primary-gradient    /* Primary brand color */
--lola-color-secondary-gradient  /* Secondary brand color */
--lola-color-secondary           /* Text/UI color */
--lola-color-white               /* White/light color */
--lola-color-error               /* Error state color */
--lola-color-highlights          /* Highlight/accent color */
--lola-color-primary-mesh        /* Primary gradient */
--lola-color-inactived           /* Inactive state color */
--lola-color-card-panel-background /* Card panel background */
--lola-color-card-background     /* Card background */
--lola-color-card-background-secundary /* Secondary card background */
```

### Font Variable

```css
--lola-font-family               /* Current font family */
```

### View-Specific Variables

These change based on the active view:

```css
--lola-view-background           /* View background */
--lola-view-title                /* Title text color */
--lola-view-subtitle             /* Subtitle text color */
--lola-view-body-copy            /* Body text color */
--lola-view-footer               /* Footer text color */
--lola-view-btn-background       /* Button background */
--lola-view-btn-text             /* Button text color */
```

### Usage Example

```css
.my-component {
  background: var(--lola-view-background);
  color: var(--lola-view-title);
  font-family: var(--lola-font-family);
}

.my-button {
  background: var(--lola-view-btn-background);
  color: var(--lola-view-btn-text);
}

.error-message {
  color: var(--lola-color-error);
}
```

---

## Utilities

### generateViewConfigs

Standalone function to generate view configurations from a color palette.

**Signature:**
```typescript
function generateViewConfigs(colorPalette: ColorPalette): ViewsConfig
```

**Example:**
```typescript
import { generateViewConfigs } from '@/hooks/useViewConfig';

const views = generateViewConfigs({
  primaryGradient: '#1DAFA1',
  secondaryGradient: '#10B981',
  // ... other colors
  lightness: 'light'
});
```

---

### injectColorVariables

Inject color CSS variables into the document.

**Signature:**
```typescript
function injectColorVariables(colors: ColorPalette): void
```

---

### injectFontVariable

Inject font family CSS variable.

**Signature:**
```typescript
function injectFontVariable(fontFamily: string): void
```

---

### injectViewVariables

Inject view-specific CSS variables.

**Signature:**
```typescript
function injectViewVariables(viewConfig: ViewColorConfig): void
```

---

## Text Style Classes

The following CSS classes are automatically generated:

| Class | Usage | Default Min | Default Max |
|-------|-------|-------------|-------------|
| `.h1` | Large headings | 1.75rem | 2rem |
| `.highlight` | Highlighted text | 1.75rem | 2rem |
| `.h2` | Medium headings | 1.25rem | 1.35rem |
| `.bodycopy` | Body text | 1rem | 1rem |
| `.secondary-cta` | Secondary CTAs | 0.74rem | 1rem |
| `.footer-text` | Footer text | 0.75rem | 0.75rem |
| `.main-button-text` | Button text | 1rem | 1rem |
| `.step` | Step indicators | 0.5rem | 0.875rem |

All classes use responsive `clamp()` sizing with customizable formulas.

---

## Constants

### CSS_VARIABLES

Object containing all CSS variable names.

```typescript
import { CSS_VARIABLES } from '@/types/theme.types';

// Use in your code
element.style.setProperty(CSS_VARIABLES.PRIMARY_GRADIENT, '#FF0000');
```

---

## Migration from Legacy API

### Old API (Deprecated)

```typescript
import { useTheme } from './hooks/useTheme';

const { generateColorsByView } = useTheme(fontConfig);
const views = generateColorsByView(colorConfig);
```

### New API

```typescript
import { useLolaTheme } from './hooks/useLolaTheme';

const theme = useLolaTheme(completeConfig);
const views = theme.views;
```

---

## TypeScript Tips

### Type Inference

```typescript
import type { LolaThemeConfig } from '@/hooks';

// Get full type checking
const myTheme: LolaThemeConfig = {
  font: {
    // TypeScript will validate structure
  },
  colors: {
    // TypeScript will validate structure
  }
};
```

### Extending Types

```typescript
import type { ViewColorConfig } from '@/types/theme.types';

interface CustomViewConfig extends ViewColorConfig {
  customProperty: string;
}
```

---

## Best Practices

1. **Define themes outside components** - Prevents unnecessary re-renders
2. **Use CSS variables when possible** - Better performance
3. **Leverage TypeScript** - Catch configuration errors early
4. **Use view system** - Don't create custom color mappings
5. **Memoize custom configs** - Use `useMemo` for dynamic configs

---

## Performance Considerations

- **CSS Injection:** Styles are injected once on mount
- **CSS Variables:** Changes update instantly without re-injection
- **Re-renders:** Hook uses proper dependencies to minimize updates
- **Memory:** Old style tags are replaced, not duplicated

---

## Browser Support

- **CSS Variables:** All modern browsers (IE11 requires polyfill)
- **clamp():** All modern browsers (IE11 not supported)
- **Dynamic Imports:** All modern browsers

---

For more examples and guides, see:
- [THEME_SYSTEM_GUIDE.md](./THEME_SYSTEM_GUIDE.md) - Complete usage guide
- [examples/ThemeExample.tsx](./examples/ThemeExample.tsx) - Working examples
