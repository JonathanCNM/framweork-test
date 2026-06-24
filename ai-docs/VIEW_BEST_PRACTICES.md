# Lola Framework UI - View Implementation Best Practices

## Text Components by View Type

Lola Framework UI uses different text components depending on the view type. This ensures consistent visual styling and proper gradient application across different view contexts.

## Rule: When to Use GradientText vs BodyCopy

### Use `GradientText` for body text in:
- ✅ **primaryMeshGradientView** - Views with gradient mesh backgrounds
- ✅ **specialView** - Special themed views
- ✅ **errorView** - Error pages and error states

### Use `BodyCopy` for body text in:
- ✅ **whiteView** - White background views (forms, data entry)
- ✅ **dataView** - Data display views

**IMPORTANT:** `BodyCopy` should be used WITHOUT the `textColor` prop by default. Only add inline styles for color if explicitly requested by the user.

## Implementation Examples

### ❌ INCORRECT: Using BodyCopy in Error View
```tsx
import { AuraLayout, BodyCopy, PageTitle } from 'lola-framework-ui-test';

function ErrorPage({ theme }) {
  const { bodyCopy } = theme.errorView;
  
  return (
    <AuraLayout colorConfig={theme.errorView}>
      <Layout.Content>
        <PageTitle 
          highlight="Error"
          highlightColor={theme.errorView.title}
        />
        
        {/* ❌ WRONG - Don't use BodyCopy in error views */}
        <BodyCopy textColor={bodyCopy}>
          Something went wrong
        </BodyCopy>
      </Layout.Content>
    </AuraLayout>
  );
}
```

### ✅ CORRECT: Using GradientText in Error View
```tsx
import { AuraLayout, GradientText, PageTitle } from 'lola-framework-ui-test';

function ErrorPage({ theme }) {
  const { bodyCopy } = theme.errorView;
  
  return (
    <AuraLayout colorConfig={theme.errorView}>
      <Layout.Content>
        <PageTitle 
          highlight="Error"
          highlightColor={theme.errorView.title}
        />
        
        {/* ✅ CORRECT - Use GradientText with bodycopy classes */}
        <GradientText 
          as="p" 
          className="lola-body-copy bodycopy"
          textColor={bodyCopy}
        >
          Something went wrong
        </GradientText>
      </Layout.Content>
    </AuraLayout>
  );
}
```

### ✅ CORRECT: Using BodyCopy in White View
```tsx
import { AuraLayout, BodyCopy, InputField } from 'lola-framework-ui-test';

function FormPage({ theme }) {
  return (
    <AuraLayout colorConfig={theme.whiteView}>
      <Layout.Content>
        <InputField 
          label="Name"
          name="name"
        />
        
        {/* ✅ CORRECT - Use BodyCopy without textColor by default */}
        <BodyCopy>
          Please enter your full name
        </BodyCopy>
        
        {/* Only add color if explicitly requested */}
        <BodyCopy style={{ color: '#FF0000' }}>
          Error: Field is required (only if user requests red color)
        </BodyCopy>
      </Layout.Content>
    </AuraLayout>
  );
}
```

## Quick Reference Table

| View Type | Body Text Component | Configuration |
|-----------|-------------------|---------------|
| **primaryMeshGradientView** | `GradientText` | `as="p" className="lola-body-copy bodycopy"` |
| **specialView** | `GradientText` | `as="p" className="lola-body-copy bodycopy"` |
| **errorView** | `GradientText` | `as="p" className="lola-body-copy bodycopy"` |
| **whiteView** | `BodyCopy` | `<BodyCopy>Text</BodyCopy>` (no props unless requested) |
| **dataView** | `BodyCopy` | `<BodyCopy>Text</BodyCopy>` (no props unless requested) |

## Why This Pattern?

### Gradient Views Need GradientText
Views with gradient backgrounds (primaryMesh, special, error) require `GradientText` because:
1. It applies proper gradient text effects that match the view's aesthetic
2. It ensures text is visible against complex gradient backgrounds
3. It maintains visual consistency with other gradient elements (titles, highlights)

### Plain Views Use BodyCopy
Views with solid backgrounds (white, data) use `BodyCopy` because:
1. Simpler rendering for better performance
2. Standard text styling is sufficient
3. No gradient effects needed

**Usage:** Use `BodyCopy` without props by default. Only add `style={{ color: '...' }}` if the user explicitly requests a color change.

## Common Mistakes

### Mistake 1: Using BodyCopy in Error Pages
```tsx
// ❌ WRONG
<BodyCopy textColor={theme.errorView.bodyCopy}>
  Error message
</BodyCopy>

// ✅ CORRECT
<GradientText 
  as="p" 
  className="lola-body-copy bodycopy"
  textColor={theme.errorView.bodyCopy}
>
  Error message
</GradientText>
```

### Mistake 2: Forgetting Classes on GradientText
```tsx
// ❌ WRONG - Missing classes
<GradientText as="p" textColor={color}>
  Text
</GradientText>

// ✅ CORRECT - Includes required classes
<GradientText 
  as="p" 
  className="lola-body-copy bodycopy"
  textColor={color}
>
  Text
</GradientText>
```

### Mistake 3: Using GradientText in Form Views
```tsx
// ❌ WRONG
<AuraLayout colorConfig={theme.whiteView}>
  <GradientText as="p" className="bodycopy" textColor={color}>
    Form helper text
  </GradientText>
</AuraLayout>

// ✅ CORRECT
<AuraLayout colorConfig={theme.whiteView}>
  <BodyCopy>
    Form helper text
  </BodyCopy>
</AuraLayout>
```

### Mistake 4: Adding textColor prop without being asked
```tsx
// ❌ WRONG - Don't add textColor unless user requests it
<BodyCopy textColor={theme.whiteView.bodyCopy}>
  Text content
</BodyCopy>

// ✅ CORRECT - Use BodyCopy without props by default
<BodyCopy>
  Text content
</BodyCopy>

// ✅ CORRECT - Only add color if user explicitly asks
<BodyCopy style={{ color: '#333' }}>
  Custom colored text (only when requested)
</BodyCopy>
```

## Implementation Checklist

When implementing a new view:

- [ ] Identify the view type (primaryMesh, special, error, white, or data)
- [ ] For gradient views (primaryMesh, special, error):
  - [ ] Use `GradientText` for body text
  - [ ] Configure as `as="p"`
  - [ ] Include `className="lola-body-copy bodycopy"`
  - [ ] Pass `textColor` from theme
- [ ] For plain views (white, data):
  - [ ] Use `BodyCopy` for body text
  - [ ] Do NOT add `textColor` prop unless user explicitly requests color
  - [ ] Keep it simple: `<BodyCopy>Text</BodyCopy>`
- [ ] Test text visibility against background
- [ ] Verify gradient effects render correctly

## System Theme Adaptation (useSystemTheme)

Lola Framework UI supports automatic adaptation to system theme (light/dark mode) via the `useSystemTheme` configuration.

### When useSystemTheme: false (Default)
All colors remain **fixed** as configured in your theme, regardless of system theme:

```tsx
// Theme configuration
const myTheme: LolaThemeConfig = {
  colors: {
    // ... color config
    useSystemTheme: false, // Fixed colors
  }
};

// Result: Colors stay consistent across light and dark system themes
// - BodyCopy: Always #252525 (dark text) on white background
// - InputField: Fixed colors from theme
// - No adaptation to system preferences
```

### When useSystemTheme: true (Adaptive)
**White View and Data View** automatically adapt to system theme:

```tsx
// Theme configuration
const myTheme: LolaThemeConfig = {
  colors: {
    // ... color config
    useSystemTheme: true, // Enable adaptation
  }
};

// Result in whiteView/dataView:
// - Light mode: Dark text on light background
// - Dark mode: Light text on dark background
// - Automatic adaptation via CSS variables
```

**Important Notes:**
- Only `whiteView` and `dataView` adapt when `useSystemTheme: true`
- Gradient views (`primaryMeshGradientView`, `specialView`, `errorView`) **always use fixed theme colors**
- This preserves brand identity in key visual areas

### Component Behavior with System Theme

```tsx
// ✅ CORRECT: BodyCopy adapts automatically
<AuraLayout colorConfig={theme.whiteView}> {/* useSystemTheme: true */}
  <BodyCopy>
    This text adapts: dark in light mode, light in dark mode
  </BodyCopy>
</AuraLayout>

// ✅ CORRECT: InputField adapts automatically
<AuraLayout colorConfig={theme.whiteView}> {/* useSystemTheme: true */}
  <InputField label="Name" />
  {/* Input text, label, and autofill all adapt automatically */}
</AuraLayout>

// ✅ CORRECT: GradientText in error view stays fixed
<AuraLayout colorConfig={theme.errorView}> {/* Always fixed, even if useSystemTheme: true */}
  <GradientText as="p" className="lola-body-copy bodycopy" textColor={theme.errorView.bodyCopy}>
    Error message maintains brand colors
  </GradientText>
</AuraLayout>
```

### Testing Requirements

**Always test all four combinations:**
1. ✅ `useSystemTheme: false` + System light mode
2. ✅ `useSystemTheme: false` + System dark mode
3. ✅ `useSystemTheme: true` + System light mode
4. ✅ `useSystemTheme: true` + System dark mode

**Browser DevTools for Testing:**
```
1. Open DevTools (F12)
2. Cmd/Ctrl + Shift + P → "Rendering"
3. Select "Emulate CSS prefers-color-scheme: dark"
4. Verify text is visible in all scenarios
```

### Common Issues

❌ **Problem**: Text invisible when system is dark but `useSystemTheme: false`
✅ **Solution**: This is now fixed - framework uses fixed colors when `useSystemTheme: false`

❌ **Problem**: BodyCopy invisible in dark mode when `useSystemTheme: true`
✅ **Solution**: Framework automatically handles this with CSS `!important` rules

❌ **Problem**: Input labels showing grey patch or invisible text
✅ **Solution**: Ensure using v0.3.1+ with proper label color handling

For complete system theme documentation, see [SYSTEM_THEME_GUIDE.md](../SYSTEM_THEME_GUIDE.md).

## Related Documentation

- [Component Examples](./EXAMPLES.md)
- [View Implementation Guide](./components/ViewBasedImplementation.json)
- [System Theme Guide](../SYSTEM_THEME_GUIDE.md)
- [Project Memory](../PROJECT_MEMORY.md)
