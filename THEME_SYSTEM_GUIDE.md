# Lola Framework UI - Theme System Guide

## Overview

The Lola Framework UI theme system has been completely refactored to provide a more intuitive, type-safe, and maintainable way to configure colors, fonts, and view-based theming.

## What Changed?

### Before (Old System)
```tsx
// ❌ Complex, non-intuitive setup
import { useTheme } from './hooks/useTheme';
import { useFonts } from './hooks/useFonts';

// Had to manually extract and transform theme config
const fontConfig = { /* manually extracted */ };
const colorConfig = { /* manually extracted */ };

const theme = useTheme(fontConfig);
const { generateColorsByView } = theme;
const views = generateColorsByView(colorConfig);
useFonts({ name: 'Inter', cdn: '...' });
```

### After (New System)
```tsx
// ✅ Simple, unified setup
import { useLolaTheme } from './hooks/useLolaTheme';
import { kapitalTheme } from './utils/constants';

// Pass the complete config directly
const theme = useLolaTheme(kapitalTheme);

// Everything is ready to use!
const primaryView = theme.views.primaryMeshGradientView;
```

## Key Improvements

### 1. Unified Configuration
You can now pass the complete theme configuration object (like `kapitalTheme`) directly to `useLolaTheme`.

### 2. Type Safety
All interfaces are properly typed with no `any` types:
```typescript
import type { LolaThemeConfig, ViewsConfig } from './hooks';

const myTheme: LolaThemeConfig = {
  font: { /* ... */ },
  colors: { /* ... */ }
};
```

### 3. CSS Variables Support
Colors and fonts are automatically injected as CSS custom properties:
```css
/* Available CSS variables */
--lola-color-primary-gradient
--lola-color-secondary-gradient
--lola-color-secondary
--lola-color-white
--lola-color-error
--lola-color-highlights
--lola-color-primary-mesh
--lola-font-family

/* View-specific variables */
--lola-view-background
--lola-view-title
--lola-view-subtitle
--lola-view-body-copy
--lola-view-footer
--lola-view-btn-background
--lola-view-btn-text
```

Use them in your components:
```tsx
<div style={{ 
  color: 'var(--lola-color-primary-gradient)',
  fontFamily: 'var(--lola-font-family)'
}}>
  Hello World
</div>
```

### 4. Declarative View System
The repetitive 200+ lines of view configuration code has been replaced with a clean declarative mapping system.

### 5. Better Performance
- CSS is injected once and reused
- No unnecessary re-renders
- Optimized hook dependencies

## Quick Start

### 1. Basic Usage

```tsx
import { useLolaTheme } from '@/hooks/useLolaTheme';
import { kapitalTheme } from '@/utils/constants';

function App() {
  const theme = useLolaTheme(kapitalTheme);
  
  return (
    <div style={{ 
      background: theme.views.primaryMeshGradientView.background 
    }}>
      <h1 className="h1">Welcome to Lola Framework</h1>
      <p className="bodycopy">Type-safe, intuitive theming</p>
    </div>
  );
}
```

### 2. Using Specific Views

```tsx
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

### 3. Using CSS Variables (Recommended)

```tsx
function MyComponent() {
  const theme = useLolaTheme(kapitalTheme);
  
  return (
    <div className="my-component">
      <h1>Hello World</h1>
    </div>
  );
}

// In your CSS file
.my-component {
  background: var(--lola-view-background);
  color: var(--lola-view-title);
  font-family: var(--lola-font-family);
}

.my-component h1 {
  color: var(--lola-color-primary-gradient);
}
```

### 4. Custom Theme Configuration

```tsx
import type { LolaThemeConfig } from '@/hooks';

const customTheme: LolaThemeConfig = {
  font: {
    h1: {
      fontWeight: '700',
      min: '2rem',
      max: '3rem',
      lineHeight: '1.2',
      dynamicFormula: '2.5vw + 0.5rem' // Optional: custom responsive formula
    },
    h2: {
      fontWeight: '600',
      min: '1.5rem',
      max: '2rem',
      lineHeight: '1.3'
    },
    bodycopy: {
      fontWeight: '400',
      min: '1rem',
      max: '1.125rem',
      lineHeight: '1.6'
    },
    // ... other text styles
    fontfamily: 'Inter',
    fontcdn: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
  },
  colors: {
    primaryGradient: '#1DAFA1',
    secondaryGradient: '#10B981',
    secondaryColor: '#252525',
    whiteColor: '#FFFFFF',
    errorColor: '#dc251c',
    partnerHighlights: '#EFF1F5',
    primaryMesh: 'linear-gradient(90deg, #1DAFA1 6.45%, #10B981 96.13%)',
    lightness: 'light',
    useSystemTheme: false
  }
};

function App() {
  const theme = useLolaTheme(customTheme);
  return <div>My App</div>;
}
```

### 5. Dynamic Font Changes

```tsx
function FontSelector() {
  const theme = useLolaTheme(kapitalTheme);
  
  const handleFontChange = (fontName: string, fontCdn: string) => {
    theme.changeFont(fontName, fontCdn);
  };
  
  return (
    <button onClick={() => handleFontChange(
      'Roboto', 
      'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
    )}>
      Switch to Roboto
    </button>
  );
}
```

## Theme Configuration Structure

### Font Configuration
```typescript
font: {
  // Text styles
  h1: {
    fontWeight: '400',
    min: '1.75rem',        // Minimum size (mobile)
    max: '2rem',           // Maximum size (desktop)
    lineHeight: '1',
    dynamicFormula: '2vw + 0.25rem' // Optional: override default responsive formula
  },
  highlight: { /* ... */ },
  h2: { /* ... */ },
  bodycopy: { /* ... */ },
  secondaryCta: { /* ... */ },
  footerText: { /* ... */ },
  mainButtonText: { /* ... */ },
  step: { /* ... */ },
  
  // Font metadata
  fontfamily: 'Inter',
  fontcdn: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
}
```

### Color Configuration
```typescript
colors: {
  primaryGradient: '#1DAFA1',      // Primary brand color (gradient start)
  secondaryGradient: '#10B981',    // Secondary brand color (gradient end)
  secondaryColor: '#252525',       // Text/UI color
  whiteColor: '#FFFFFF',           // Light backgrounds/text
  errorColor: '#dc251c',           // Error states
  partnerHighlights: '#EFF1F5',    // Accent/highlight color
  primaryMesh: 'linear-gradient(90deg, #1DAFA1 6.45%, #10B981 96.13%)', // Full gradient
  lightness: 'light' | 'dark',     // Theme mode
  useSystemTheme: false            // Use system preference
}
```

### View Types
The system generates configurations for 5 view types:
- `primaryMeshGradientView` - Main branded view with gradient background
- `specialView` - Similar to primary but with variations
- `dataView` - Data-focused, typically with white/light background
- `whiteView` - Clean white background view
- `errorView` - Error state view with dark background

## Migration Guide

### Step 1: Update Imports
```tsx
// Old
import { useTheme } from './hooks/useTheme';
import { useFonts } from './hooks/useFonts';

// New
import { useLolaTheme } from './hooks/useLolaTheme';
// or
import { useLolaTheme } from './hooks';
```

### Step 2: Simplify Hook Usage
```tsx
// Old
const { generateColorsByView } = useTheme(fontConfig);
const views = generateColorsByView(colorConfig);
useFonts({ name: fontName, cdn: fontCdn });

// New
const theme = useLolaTheme(kapitalTheme);
const views = theme.views;
```

### Step 3: Update Type Imports
```tsx
// Old
import type { IViewConfig, IViewColorConfig } from './hooks/useTheme';

// New
import type { ViewsConfig, ViewColorConfig } from './hooks';
```

### Step 4: Use CSS Variables (Optional but Recommended)
```tsx
// Instead of inline styles
<div style={{ color: theme.views.dataView.title }}>

// Use CSS variables
<div className="my-title">
  
/* In CSS */
.my-title {
  color: var(--lola-view-title);
}
```

## Advanced Usage

### Custom View Overrides
```tsx
import type { LolaThemeConfig } from './hooks';

const themeWithCustomView: LolaThemeConfig = {
  font: { /* ... */ },
  colors: { /* ... */ },
  views: {
    // Override or extend specific views
    dataView: {
      background: '#F5F5F5',
      title: '#000000',
      // ... other properties
    }
  }
};

const theme = useLolaTheme(themeWithCustomView);
```

### Generate View Configs Programmatically
```tsx
function ThemeExplorer() {
  const theme = useLolaTheme(kapitalTheme);
  
  // Generate views for different color palettes
  const customViews = theme.generateViewConfigs({
    ...kapitalTheme.colors,
    primaryGradient: '#FF0000', // Change to red
    secondaryGradient: '#00FF00'
  });
  
  return <div>{/* Use customViews */}</div>;
}
```

### Download Theme Configuration
```tsx
function ThemeExporter() {
  const theme = useLolaTheme(kapitalTheme);
  
  return (
    <button onClick={() => theme.downloadThemeConfig('my-theme.json')}>
      Export Theme
    </button>
  );
}
```

## Text Style Classes

The following CSS classes are automatically generated and available:

- `.h1` - Large heading
- `.highlight` - Highlighted text (same size as h1, heavier weight)
- `.h2` - Medium heading
- `.bodycopy` - Body text
- `.secondary-cta` - Secondary call-to-action text
- `.footer-text` - Footer text
- `.main-button-text` - Button text
- `.step` - Step indicator text

All classes use responsive `clamp()` sizing for optimal display across devices.

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  LolaThemeConfig,
  ColorPalette,
  FontConfig,
  FontStyleConfig,
  ViewColorConfig,
  ViewsConfig,
  ViewType,
  ThemeLightness,
  UseLolaThemeReturn
} from '@/hooks';
```

## Backward Compatibility

The old `useTheme` hook is still available but deprecated:

```tsx
// Still works but shows deprecation warnings
import { useTheme } from './hooks/useTheme';
const { generateColorsByView } = useTheme(fontConfig);
```

All old interfaces are maintained with deprecation notices.

## Best Practices

1. **Use `useLolaTheme` as the main entry point** - It orchestrates everything
2. **Prefer CSS variables** - Better performance and easier to maintain
3. **Define theme configs outside components** - Prevents re-renders
4. **Use TypeScript types** - Catch configuration errors early
5. **Leverage the view system** - Don't create custom color mappings unless necessary

## Troubleshooting

### Issue: CSS variables not working
**Solution**: Make sure `useLolaTheme` is called before components that use the variables.

### Issue: Fonts not loading
**Solution**: Check that the `fontcdn` URL is correct and accessible.

### Issue: Theme not updating
**Solution**: Ensure the theme config object reference changes when you update it. Use `useMemo` or define it outside the component.

## Examples

See the `/examples` directory for complete working examples:
- Basic theme setup
- Multiple themes with switcher
- Custom view configurations
- CSS variables usage
- Dynamic theme generation

## API Reference

See [API.md](./API.md) for complete API documentation.
