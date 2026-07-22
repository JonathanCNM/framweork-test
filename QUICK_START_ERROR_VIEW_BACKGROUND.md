# Quick Start: Error View Background Customization

> New in v2.1.0: Customize the background of error views independently from other view types.

## Overview

The `errorViewBackground` field in `ColorPalette` allows you to set a custom background (solid color or gradient) specifically for error views, giving you more control over the appearance of error pages.

## Basic Usage

### 1. Solid Color Background

```typescript
import { useLolaTheme } from '@lola-framework/ui';

const theme = useLolaTheme({
  colors: {
    primaryGradient: '#1DAFA1',
    secondaryGradient: '#10B981',
    secondaryColor: '#252525',
    whiteColor: '#FFFFFF',
    errorColor: '#dc251c',
    partnerHighlights: '#EFF1F5',
    primaryMesh: 'linear-gradient(90deg, #1DAFA1 6.45%, #10B981 96.13%)',
    lightness: 'light',
    
    // Set a dark charcoal background for error views
    errorViewBackground: '#1a1a1a',
  },
  font: { /* ... */ }
});
```

### 2. Gradient Background

```typescript
const theme = useLolaTheme({
  colors: {
    // ... other colors
    
    // Use a dramatic gradient for error views
    errorViewBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  font: { /* ... */ }
});
```

## Use Cases

### 1. Brand-Specific Error Pages

Match your brand's error page design:

```typescript
// Dark, professional look
errorViewBackground: '#0f172a'

// Warm, friendly approach
errorViewBackground: 'linear-gradient(to bottom, #f5af19 0%, #f12711 100%)'
```

### 2. Severity-Based Backgrounds

Different backgrounds for different error types:

```typescript
// Critical errors: Red gradient
errorViewBackground: 'linear-gradient(135deg, #c31432 0%, #240b36 100%)'

// Network errors: Cool blue
errorViewBackground: 'linear-gradient(to bottom, #1e3c72 0%, #2a5298 100%)'

// Generic errors: Neutral dark
errorViewBackground: '#1a1a1a'
```

### 3. Match Design System

Keep error pages consistent with your design system:

```typescript
// Material Design inspired
errorViewBackground: '#1e1e1e'

// iOS inspired
errorViewBackground: '#000000'

// Custom brand gradient
errorViewBackground: 'linear-gradient(to right, #434343 0%, #000000 100%)'
```

## Demo

Check out the interactive demo:

```typescript
import { ErrorViewBackgroundDemo } from '@lola-framework/ui/demo/pages/ErrorViewBackgroundDemo';
```

The demo shows:
- Default behavior (uses `secondaryColor`)
- Various solid color options
- Multiple gradient presets
- Real-time background switching

## Backward Compatibility

This feature is **100% backward compatible**:

```typescript
// Old code (still works)
const theme = useLolaTheme({
  colors: {
    primaryGradient: '#1DAFA1',
    // ... no errorViewBackground
  }
});
// Error views automatically use secondaryColor as background

// New code (with customization)
const theme = useLolaTheme({
  colors: {
    primaryGradient: '#1DAFA1',
    errorViewBackground: '#1a1a1a',  // Custom background
  }
});
// Error views use the custom background
```

## Tips

1. **Contrast is Key**: Ensure sufficient contrast between the background and white text used in error views.

2. **Test in Both Themes**: If you use `lightness: 'dark'`, test your error background in both light and dark modes.

3. **Gradients**: Use subtle gradients for better readability. Avoid very bright or busy gradients.

4. **Accessibility**: Maintain WCAG AA contrast ratios (at least 4.5:1 for body text, 3:1 for large text).

5. **Performance**: Solid colors are more performant than complex gradients on older devices.

## Common Patterns

### Pattern 1: Subtle Gradient

```typescript
errorViewBackground: 'linear-gradient(to bottom, #1a1a1a 0%, #2d2d2d 100%)'
```

### Pattern 2: Brand Color + Dark

```typescript
errorViewBackground: 'linear-gradient(135deg, #1DAFA1 0%, #0a0a0a 100%)'
```

### Pattern 3: Radial Glow Effect

```typescript
errorViewBackground: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)'
```

## Troubleshooting

### Issue: Background not showing

**Solution**: Ensure you're using the `errorView` configuration:

```typescript
<AuraLayout colorConfig={theme.views.errorView}>
  {/* Your error content */}
</AuraLayout>
```

### Issue: Gradient looks different in production

**Solution**: Some build tools optimize/compress CSS. Use vendor prefixes:

```typescript
errorViewBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

### Issue: Text not visible on custom background

**Solution**: The error view uses white text by default. If your background is too light:

1. Choose a darker background, OR
2. Customize the entire `errorView` configuration in the `views` prop

```typescript
const theme = useLolaTheme({
  colors: { /* ... */ },
  views: {
    errorView: {
      // Override specific colors if needed
      title: '#000000',
      subtitile: '#333333',
      // ...
    }
  }
});
```

## Next Steps

- Explore the [full theme documentation](./THEME_SYSTEM_GUIDE.md)
- See the [API reference](./THEME_API_REFERENCE.md)
- Check the [changelog](./CHANGELOG_ERROR_VIEW_BACKGROUND.md) for technical details
- Try the [interactive demo](./src/demo/pages/ErrorViewBackgroundDemo.tsx)

## Feedback

Have ideas for more customization options? Let us know!
