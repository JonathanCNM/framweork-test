# Migration Guide: Old Theme System → New Theme System

This guide will help you migrate from the old theme system to the new, improved `useLolaTheme` system.

## Quick Overview

| Aspect | Old System | New System |
|--------|------------|------------|
| **Main Hook** | `useTheme(fontConfig)` | `useLolaTheme(completeConfig)` |
| **Setup Complexity** | 5-6 lines, manual extraction | 1 line, direct config |
| **Type Safety** | Partial, uses `any` | Complete, no `any` |
| **Code Duplication** | 200+ lines repeated | ~50 lines declarative |
| **CSS Variables** | Manual | Automatic |
| **Performance** | Good | Better |

## Migration Steps

### Step 1: Update Imports

**Before:**
```typescript
import { useTheme } from './hooks/useTheme';
import { useFonts } from './hooks/useFonts';
import type { IViewConfig, IViewColorConfig } from './hooks/useTheme';
```

**After:**
```typescript
import { useLolaTheme } from './hooks/useLolaTheme';
// or use the centralized export
import { useLolaTheme } from './hooks';

// Type imports
import type { ViewsConfig, ViewColorConfig } from './hooks';
```

### Step 2: Update Hook Usage

**Before:**
```typescript
// Old way - complex setup
const fontConfig = {
  h1: {
    weight: kapitalTheme.font.h1.fontWeight,
    min: kapitalTheme.font.h1.min,
    max: kapitalTheme.font.h1.max,
    lineHeight: kapitalTheme.font.h1.lineHeight
  },
  // ... repeat for all text styles
};

const { generateColorsByView } = useTheme(fontConfig);
const views = generateColorsByView(kapitalTheme.colors);

useFonts({
  name: kapitalTheme.font.fontfamily,
  cdn: kapitalTheme.font.fontcdn
});
```

**After:**
```typescript
// New way - simple and direct
const theme = useLolaTheme(kapitalTheme);
const views = theme.views;
```

### Step 3: Update Type References

**Before:**
```typescript
import type { IViewConfig, IViewColorConfig, IUseTheme } from './hooks/useTheme';

const views: IViewConfig = generateColorsByView(colors);
const dataView: IViewColorConfig = views.dataView;
```

**After:**
```typescript
import type { ViewsConfig, ViewColorConfig } from './hooks';

const views: ViewsConfig = theme.views;
const dataView: ViewColorConfig = views.dataView;
```

### Step 4: Update Component Usage

**Before:**
```typescript
function MyComponent() {
  const fontConfig = { /* ... */ };
  const { generateColorsByView } = useTheme(fontConfig);
  const views = generateColorsByView(kapitalTheme.colors);
  
  return (
    <div style={{ background: views?.primaryMeshGradientView?.background }}>
      <h1 style={{ color: views?.primaryMeshGradientView?.title }}>
        Hello World
      </h1>
    </div>
  );
}
```

**After:**
```typescript
function MyComponent() {
  const theme = useLolaTheme(kapitalTheme);
  
  return (
    <div style={{ background: theme.views.primaryMeshGradientView.background }}>
      <h1 className="h1" style={{ color: theme.views.primaryMeshGradientView.title }}>
        Hello World
      </h1>
    </div>
  );
}
```

**Even Better - Use CSS Variables:**
```typescript
function MyComponent() {
  const theme = useLolaTheme(kapitalTheme);
  
  return (
    <div className="my-component">
      <h1 className="h1">Hello World</h1>
    </div>
  );
}

// In your CSS file:
// .my-component {
//   background: var(--lola-view-background);
// }
// .my-component h1 {
//   color: var(--lola-view-title);
// }
```

## Migration Examples

### Example 1: Simple Component

**Before:**
```typescript
import { useTheme } from './hooks/useTheme';

function Header() {
  const fontConfig = {
    h1: {
      weight: '700',
      min: '2rem',
      max: '3rem',
      lineHeight: '1.2'
    }
  };
  
  const { generateColorsByView } = useTheme(fontConfig);
  const views = generateColorsByView({
    primaryGradient: '#1DAFA1',
    secondaryGradient: '#10B981',
    secondaryColor: '#252525',
    whiteColor: '#FFFFFF',
    errorColor: '#dc251c',
    partnerHighlights: '#EFF1F5',
    primaryMesh: 'linear-gradient(...)',
    lightness: 'light'
  });
  
  return (
    <header style={{ background: views?.primaryMeshGradientView?.background }}>
      <h1 style={{ color: views?.primaryMeshGradientView?.title }}>
        My App
      </h1>
    </header>
  );
}
```

**After:**
```typescript
import { useLolaTheme } from './hooks/useLolaTheme';
import { kapitalTheme } from './utils/constants';

function Header() {
  const theme = useLolaTheme(kapitalTheme);
  const view = theme.views.primaryMeshGradientView;
  
  return (
    <header style={{ background: view.background }}>
      <h1 className="h1" style={{ color: view.title }}>
        My App
      </h1>
    </header>
  );
}
```

### Example 2: Multi-View Component

**Before:**
```typescript
import { useState } from 'react';
import { useTheme } from './hooks/useTheme';

function ViewSwitcher() {
  const [currentView, setCurrentView] = useState('dataView');
  const { generateColorsByView } = useTheme(fontConfig);
  const views = generateColorsByView(colors);
  
  const activeView = views?.[currentView];
  
  return (
    <div style={{ background: activeView?.background }}>
      {/* content */}
    </div>
  );
}
```

**After:**
```typescript
import { useState } from 'react';
import { useLolaTheme } from './hooks/useLolaTheme';
import { kapitalTheme } from './utils/constants';

function ViewSwitcher() {
  const [currentView, setCurrentView] = useState<keyof ViewsConfig>('dataView');
  const theme = useLolaTheme(kapitalTheme);
  
  const activeView = theme.views[currentView];
  
  return (
    <div style={{ background: activeView.background }}>
      {/* content */}
    </div>
  );
}
```

### Example 3: Dynamic Font Changes

**Before:**
```typescript
import { useFonts } from './hooks/useFonts';

function FontSelector() {
  const { onChangeFont } = useFonts({
    name: 'Inter',
    cdn: 'https://fonts.googleapis.com/...'
  });
  
  return (
    <button onClick={() => onChangeFont({
      name: 'Roboto',
      cdn: 'https://fonts.googleapis.com/...'
    })}>
      Change Font
    </button>
  );
}
```

**After:**
```typescript
import { useLolaTheme } from './hooks/useLolaTheme';
import { kapitalTheme } from './utils/constants';

function FontSelector() {
  const theme = useLolaTheme(kapitalTheme);
  
  return (
    <button onClick={() => theme.changeFont(
      'Roboto',
      'https://fonts.googleapis.com/...'
    )}>
      Change Font
    </button>
  );
}
```

## Common Patterns

### Pattern 1: Accessing Nested Theme Values

**Before:**
```typescript
const primaryView = views?.primaryMeshGradientView;
const backgroundColor = primaryView?.background || '#FFFFFF';
const titleColor = primaryView?.title || '#000000';
```

**After:**
```typescript
// No need for optional chaining - fully typed
const primaryView = theme.views.primaryMeshGradientView;
const backgroundColor = primaryView.background;
const titleColor = primaryView.title;
```

### Pattern 2: Custom Theme Configuration

**Before:**
```typescript
// Had to manually construct the entire structure
const customFontConfig = {
  h1: { weight: '700', min: '2rem', max: '3rem', lineHeight: '1.2' },
  h2: { weight: '600', min: '1.5rem', max: '2rem', lineHeight: '1.3' },
  bodycopy: { weight: '400', min: '1rem', max: '1rem', lineHeight: '1.6' },
  // ... etc
};

const customColors = {
  primaryGradient: '#FF0000',
  // ... etc
};

const { generateColorsByView } = useTheme(customFontConfig);
const views = generateColorsByView(customColors);
```

**After:**
```typescript
import type { LolaThemeConfig } from './hooks';

// Clear, type-safe configuration
const customTheme: LolaThemeConfig = {
  font: {
    h1: { fontWeight: '700', min: '2rem', max: '3rem', lineHeight: '1.2' },
    h2: { fontWeight: '600', min: '1.5rem', max: '2rem', lineHeight: '1.3' },
    bodycopy: { fontWeight: '400', min: '1rem', max: '1rem', lineHeight: '1.6' },
    highlight: { fontWeight: '800', min: '2rem', max: '3rem', lineHeight: '1.1' },
    secondaryCta: { fontWeight: '500', min: '0.875rem', max: '1rem', lineHeight: '1' },
    footerText: { fontWeight: '400', min: '0.75rem', max: '0.875rem', lineHeight: '1.2' },
    mainButtonText: { fontWeight: '600', min: '1rem', max: '1rem', lineHeight: '1' },
    step: { fontWeight: '600', min: '0.75rem', max: '0.875rem', lineHeight: '1' },
    fontfamily: 'Inter',
    fontcdn: 'https://fonts.googleapis.com/...'
  },
  colors: {
    primaryGradient: '#FF0000',
    secondaryGradient: '#00FF00',
    secondaryColor: '#000000',
    whiteColor: '#FFFFFF',
    errorColor: '#dc251c',
    partnerHighlights: '#EFF1F5',
    primaryMesh: 'linear-gradient(...)',
    lightness: 'light'
  }
};

const theme = useLolaTheme(customTheme);
```

### Pattern 3: Exporting Theme Configuration

**Before:**
```typescript
const { downloadThemeTxt } = useTheme(fontConfig);

// Had to manually combine font and color configs
downloadThemeTxt({
  font: fontConfig,
  colors: colorConfig
}, 'theme.txt');
```

**After:**
```typescript
const theme = useLolaTheme(kapitalTheme);

// Everything is already combined
theme.downloadThemeConfig('theme.json');
```

## Troubleshooting

### Issue: "Property does not exist on type"

**Problem:** TypeScript complains about missing properties

**Solution:** Make sure all required font styles are defined:
```typescript
const theme: LolaThemeConfig = {
  font: {
    h1: { /* ... */ },
    h2: { /* ... */ },
    bodycopy: { /* ... */ },
    highlight: { /* ... */ },
    secondaryCta: { /* ... */ },
    footerText: { /* ... */ },
    mainButtonText: { /* ... */ },
    step: { /* ... */ },
    fontfamily: 'Inter',  // Required
    fontcdn: 'https://...' // Required
  },
  colors: { /* ... */ }
};
```

### Issue: CSS Variables Not Working

**Problem:** `var(--lola-color-*)` returns empty

**Solution:** Ensure `useLolaTheme` is called before components that use variables:
```typescript
function App() {
  // Call this at the top level
  const theme = useLolaTheme(kapitalTheme);
  
  return (
    <div className="app">
      {/* CSS variables are now available */}
    </div>
  );
}
```

### Issue: Views are Undefined

**Problem:** `theme.views.dataView` is undefined

**Solution:** Check that color configuration is complete:
```typescript
colors: {
  primaryGradient: '#1DAFA1',      // Required
  secondaryGradient: '#10B981',    // Required
  secondaryColor: '#252525',       // Required
  whiteColor: '#FFFFFF',           // Required
  errorColor: '#dc251c',           // Required
  partnerHighlights: '#EFF1F5',    // Required
  primaryMesh: 'linear-gradient(...)', // Required
  lightness: 'light'               // Required
}
```

## Backward Compatibility

The old system still works and will continue to work. You can migrate gradually:

```typescript
// Old code still works (with deprecation warnings)
import { useTheme } from './hooks/useTheme';
const { generateColorsByView } = useTheme(fontConfig);

// New code
import { useLolaTheme } from './hooks/useLolaTheme';
const theme = useLolaTheme(kapitalTheme);

// Both can coexist in the same codebase
```

## Benefits Checklist

After migration, you should have:

- ✅ Simpler, more intuitive code
- ✅ Full TypeScript type safety
- ✅ No manual config extraction
- ✅ Automatic CSS variables
- ✅ Better performance
- ✅ Easier maintenance
- ✅ Access to new features (changeFont, downloadThemeConfig, etc.)

## Need Help?

- **Documentation:** [THEME_SYSTEM_GUIDE.md](./THEME_SYSTEM_GUIDE.md)
- **API Reference:** [THEME_API_REFERENCE.md](./THEME_API_REFERENCE.md)
- **Examples:** [examples/ThemeExample.tsx](./examples/ThemeExample.tsx)
- **Types:** [src/types/theme.types.ts](./src/types/theme.types.ts)

## Timeline Recommendation

- **Week 1:** Read documentation and try examples
- **Week 2:** Migrate small components
- **Week 3:** Migrate remaining components
- **Week 4:** Remove old code and clean up

Take your time - the old system isn't going anywhere!
