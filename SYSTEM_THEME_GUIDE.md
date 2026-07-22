# System Theme Support Guide

## Overview

Lola Framework UI supports automatic dark mode detection through the `useSystemTheme` property. When enabled, the framework will automatically adapt to the user's system theme preferences.

## How It Works

### Configuration

Enable system theme support in your theme configuration:

```typescript
import type { LolaThemeConfig } from 'lola-framework-ui-test';

export const myTheme: LolaThemeConfig = {
  font: {
    // ... font configuration
  },
  colors: {
    // ... color configuration
    useSystemTheme: true, // Enable system theme support
    lightness: 'light', // Default theme (will auto-switch to dark if system prefers dark)
  }
};
```

### View Behavior

The framework uses a **dual-mode approach** for theming:

#### When `useSystemTheme: false` (Default/Fixed Colors)
All components use **fixed color values** regardless of system theme:

- **BodyCopy**: `#252525` (dark text) on white background
- **InputField**: Fixed colors from theme config or component defaults
- **LabelInput**: `#fff` background, dark text colors
- **Autofill**: `#fff` background, dark text

This ensures **consistent appearance** across all system themes, respecting your brand colors exactly as configured.

#### When `useSystemTheme: true` (System-Adaptive)

**White View & Data View** automatically adapt using CSS variables with `!important` rules:

```typescript
// When useSystemTheme is true:
whiteView: {
  background: 'var(--background)',      // Adapts: #f3f4f6 (light) → #09090b (dark)
  title: 'var(--foreground)',           // Adapts: #17171c (light) → #fafafa (dark)
  bodyCopy: 'var(--foreground)',        // Adapts: #17171c (light) → #fafafa (dark)
  backgroundIcon: 'var(--card)',        // Adapts: #e5e7eb (light) → #121216 (dark)
  footerColor: 'var(--muted-foreground)', // Adapts based on theme
  stepsColors: 'var(--primary)',        // Consistent primary color
  // Buttons and gradients remain fixed from your theme config
}
```

**Components Affected by System Theme:**
- `BodyCopy`: Text color adapts to foreground
- `InputField`: Input text color adapts to foreground
- `LabelInput`: Background and text color adapt to system theme
- Input autofill: Background and text adapt to prevent invisible text
- Navbar titles: Color adapts to foreground

**Technical Implementation:**
The `.white-view-background` CSS class uses `!important` rules to override inline styles when system theme is active, ensuring proper adaptation in both light and dark modes.

#### Other Views (Fixed Colors)
- **primaryMeshGradientView**: Uses theme colors (no auto-adapt)
- **specialView**: Uses theme colors (no auto-adapt)
- **errorView**: Uses theme colors (no auto-adapt)

These views maintain your configured colors regardless of system theme, preserving brand identity.

## CSS Variables Reference

The framework uses these CSS variables defined in `src/styles/index.css`:

### Light Mode (Default)
```css
:root {
  --background: #f3f4f6;
  --foreground: #17171c;
  --card: #e5e7eb;
  --card-foreground: #17171c;
  --primary: #3ee0cf;
  --muted-foreground: #61616b;
  /* ... more variables */
}
```

### Dark Mode (Auto-applied)
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #09090b;
    --foreground: #fafafa;
    --card: #121216;
    --card-foreground: #fafafa;
    --primary: #3ee0cf;
    --muted-foreground: #878792;
    /* ... more variables */
  }
}
```

## Example Implementation

### Theme Configuration
```typescript
// theme.config.ts
export const appTheme: LolaThemeConfig = {
  font: {
    fontfamily: 'Inter',
    fontcdn: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    h1: { fontWeight: '700', min: '2rem', max: '2.5rem', lineHeight: '1.2' },
    bodycopy: { fontWeight: '400', min: '1rem', max: '1rem', lineHeight: '1.5' },
  },
  colors: {
    primaryGradient: '#1DAFA1',
    secondaryGradient: '#10B981',
    secondaryColor: '#252525',
    whiteColor: '#FFFFFF',
    errorColor: '#dc251c',
    primaryMesh: 'linear-gradient(90deg, #1DAFA1 6.45%, #10B981 96.13%)',
    lightness: 'light',
    useSystemTheme: true, // ← Enable here
  }
};
```

### Component Usage
```typescript
import { AuraLayout, Layout, BodyCopy, useLolaTheme } from 'lola-framework-ui-test';
import { appTheme } from './theme.config';

function MyPage() {
  const { views } = useLolaTheme(appTheme);
  
  return (
    <AuraLayout colorConfig={views.whiteView}>
      <Layout.Content>
        {/* Text will automatically adapt to dark mode */}
        <BodyCopy>
          This text will be dark in light mode and light in dark mode
        </BodyCopy>
      </Layout.Content>
    </AuraLayout>
  );
}
```

## Testing System Theme

### Browser Developer Tools
1. Open Chrome DevTools (F12)
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
3. Type "Rendering"
4. Select "Emulate CSS prefers-color-scheme: dark"

### macOS System Settings
1. System Settings → Appearance
2. Toggle between Light and Dark mode
3. Your app will update automatically

### Windows System Settings
1. Settings → Personalization → Colors
2. Choose "Dark" under "Choose your mode"
3. Your app will update automatically

## Customizing System Theme Colors

If you want to customize the system theme colors, modify `src/styles/index.css`:

```css
/* Light mode colors */
:root {
  --background: #f3f4f6;      /* Your custom light background */
  --foreground: #17171c;      /* Your custom light text color */
  /* ... */
}

/* Dark mode colors */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #09090b;    /* Your custom dark background */
    --foreground: #fafafa;    /* Your custom dark text color */
    /* ... */
  }
}
```

## Best Practices

### ✅ DO
- Enable `useSystemTheme` for apps that should adapt to user preferences
- Test **both light AND dark modes** during development for both `useSystemTheme: true` and `useSystemTheme: false`
- Use `whiteView` and `dataView` for forms and data-heavy pages that need system adaptation
- Keep gradient views (primaryMesh, special, error) for branding and fixed-color experiences
- Use `BodyCopy` without props - it adapts automatically
- Trust the framework's `!important` rules when `useSystemTheme: true`
- Rebuild the framework (`npm run build`) after any theme-related changes

### ❌ DON'T
- Don't mix system theme with manual lightness switching
- Don't hardcode colors with inline styles when using system theme
- Don't pass `textColor` prop to `BodyCopy` unless explicitly styling
- Don't expect gradient views to auto-adapt (they maintain brand colors)
- Don't override label or input colors manually when `useSystemTheme: true`
- Don't use fixed color values in CSS when components should adapt

## Troubleshooting

### Colors Not Changing
**Problem**: Views stay white/black regardless of system theme

**Solution**: 
1. Verify `useSystemTheme: true` in your theme config
2. Check that you're using `whiteView` or `dataView`
3. Clear browser cache and hard refresh
4. Verify that `AuraLayout` is being used with the correct `colorConfig`

### Text Not Visible in Dark Mode (useSystemTheme: true)
**Problem**: Text disappears in dark mode because it's the same color as background

**Solution**:
1. The framework now uses `!important` CSS rules to force adaptation
2. Ensure you're on the latest version (v0.3.1+)
3. Don't manually override colors with inline styles when `useSystemTheme: true`
4. Components automatically adapt: `BodyCopy`, `InputField`, `LabelInput` all use `var(--foreground)`

### Text Not Visible When useSystemTheme: false
**Problem**: When `useSystemTheme: false` and system is in dark mode, text is invisible

**Solution**:
1. This is now fixed - components use fixed colors when `useSystemTheme: false`
2. `BodyCopy` uses `#252525` (dark) by default
3. Inputs use `#fff` background and dark text
4. System theme CSS variables are ignored when `useSystemTheme: false`

### Label Background Shows as Grey Patch
**Problem**: `LabelInput` shows `#979797` background or incorrect color

**Solution**:
1. Ensure you're using v0.3.1+ with the fixed `LabelInput` defaults
2. When `useSystemTheme: false`: Label uses `#fff` background (fixed)
3. When `useSystemTheme: true`: Label uses `var(--background)` with `!important`
4. Rebuild your project: `npm run build` in framework, restart dev server in consuming app

### Autofill Text Invisible
**Problem**: Browser autofill makes text invisible

**Solution**:
1. Framework now handles autofill correctly for both modes
2. When `useSystemTheme: false`: Autofill background is `#fff`, text is dark
3. When `useSystemTheme: true`: Autofill adapts to `var(--background)` and `var(--foreground)`
4. Update to latest version for proper autofill handling

### Mixed Colors
**Problem**: Some elements adapt, others don't

**Solution**:
1. Only `whiteView` and `dataView` auto-adapt when `useSystemTheme: true`
2. Other views (`primaryMeshGradientView`, `specialView`, `errorView`) use your theme colors
3. This is intentional for branding consistency
4. Components within white/data views adapt automatically

## Migration from Fixed Colors

If you're updating an existing app:

### Before (Fixed Colors)
```typescript
colors: {
  // ...
  lightness: 'light',
  useSystemTheme: false, // or omitted
}
```

### After (System Theme)
```typescript
colors: {
  // ...
  lightness: 'light', // Default, will auto-switch
  useSystemTheme: true, // Enable auto-adapt
}
```

No other changes needed! Views will automatically adapt.

## Related Documentation

- [Theme System Guide](./THEME_SYSTEM_GUIDE.md)
- [Theme API Reference](./THEME_API_REFERENCE.md)
- [View Best Practices](./ai-docs/VIEW_BEST_PRACTICES.md)
