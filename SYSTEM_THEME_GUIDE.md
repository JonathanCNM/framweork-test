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

When `useSystemTheme: true` is enabled:

#### White View & Data View (Auto-adapt)
These views will **automatically use CSS variables** that respond to system theme changes:

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

#### Other Views (Fixed Colors)
- **primaryMeshGradientView**: Uses theme colors (no auto-adapt)
- **specialView**: Uses theme colors (no auto-adapt)
- **errorView**: Uses theme colors (no auto-adapt)

These views maintain your configured colors regardless of system theme.

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
- Test both light and dark modes during development
- Use `whiteView` and `dataView` for forms and data-heavy pages
- Keep gradient views (primaryMesh, special, error) for branding

### ❌ DON'T
- Don't mix system theme with manual lightness switching
- Don't hardcode colors in components when using system theme
- Don't expect gradient views to auto-adapt (they use theme colors)

## Troubleshooting

### Colors Not Changing
**Problem**: Views stay white/black regardless of system theme

**Solution**: 
1. Verify `useSystemTheme: true` in your theme config
2. Check that you're using `whiteView` or `dataView`
3. Clear browser cache and hard refresh

### Text Not Visible
**Problem**: Text disappears in dark mode

**Solution**:
1. Don't add inline styles with fixed colors
2. Use `BodyCopy` without `textColor` prop (it will use CSS variables)
3. For custom colors, use CSS variables: `style={{ color: 'var(--foreground)' }}`

### Mixed Colors
**Problem**: Some elements adapt, others don't

**Solution**:
1. Only `whiteView` and `dataView` auto-adapt
2. Other views use your theme colors
3. This is intentional for branding consistency

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
