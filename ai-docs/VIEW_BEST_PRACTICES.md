# Lola Framework UI - View Implementation Best Practices

## ⚠️ BREAKING CHANGE: BodyCopy No Longer Accepts textColor Prop

**As of the latest version, `BodyCopy` NO LONGER supports the `textColor` prop.**

- ❌ `<BodyCopy textColor={...}>` is **INVALID** and will not work
- ✅ Use `<GradientText textColor={...}>` for colored text in gradient views
- ✅ Use `<BodyCopy>` without textColor in plain views

## ⚠️ CRITICAL: Title Component is ONLY for Gradient Views

**The `Title` component uses `GradientText` internally and should ONLY be used in gradient views.**

- ❌ `<Title title="..." color="..." />` in white/data views is **WRONG**
- ✅ Use `<BodyCopy as="h2">Heading</BodyCopy>` for headings in plain views
- ✅ Use `<Title title="..." color="..." />` ONLY in gradient views (error, special, success)

## Text Components by View Type

Lola Framework UI uses different text components depending on the view type. This ensures consistent visual styling and proper gradient application across different view contexts.

## Rule: When to Use Components by View Type

### Use `Title` for headings in gradient views ONLY:
- ✅ **primaryMeshGradientView**
- ✅ **specialView**
- ✅ **errorView**
- ✅ **successView**
- ❌ **NOT in whiteView or dataView**

### Use `GradientText` for body text in:
- ✅ **primaryMeshGradientView** - Views with gradient mesh backgrounds
- ✅ **specialView** - Special themed views
- ✅ **errorView** - Error pages and error states
- ✅ **successView** - Success confirmation views

### Use `BodyCopy` for body text in:
- ✅ **whiteView** - White background views (forms, data entry)
- ✅ **dataView** - Data display views

### Use `BodyCopy as="h1|h2|h3"` for headings in:
- ✅ **whiteView** - Forms, modals, popups on white backgrounds
- ✅ **dataView** - Data display headings

**IMPORTANT:** `BodyCopy` should be used WITHOUT any color props. Color adapts automatically based on the view and theme settings.

## Implementation Examples

### ❌ INCORRECT: Using BodyCopy with textColor (No Longer Supported)
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
        
        {/* ❌ WRONG - BodyCopy no longer accepts textColor prop */}
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

| View Type | Heading Component | Body Text Component | Configuration |
|-----------|-------------------|---------------------|---------------|
| **primaryMeshGradientView** | `Title` | `GradientText` | `as="p" className="lola-body-copy bodycopy" textColor={...}` |
| **specialView** | `Title` | `GradientText` | `as="p" className="lola-body-copy bodycopy" textColor={...}` |
| **errorView** | `Title` | `GradientText` | `as="p" className="lola-body-copy bodycopy" textColor={...}` |
| **successView** | `Title` | `GradientText` | `as="p" className="lola-body-copy bodycopy" textColor={...}` |
| **whiteView** | `BodyCopy as="h2"` | `BodyCopy` | `<BodyCopy>Text</BodyCopy>` (NO textColor prop) |
| **dataView** | `BodyCopy as="h2"` | `BodyCopy` | `<BodyCopy>Text</BodyCopy>` (NO textColor prop) |

**⚠️ Breaking Changes:** 
- `BodyCopy` no longer accepts `textColor` prop. Use `GradientText` for colored text.
- `Title` should ONLY be used in gradient views. Use `BodyCopy as="h2"` for headings in plain views.

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
4. **Color adapts automatically** - no textColor prop needed or supported

## Common Mistakes

### Mistake 1: Using Title Component in Plain Views (Popups, Forms, White Backgrounds)
```tsx
// ❌ WRONG - Title uses GradientText internally, not for plain views
<Popup visible={true}>
  <Title title="Popup Title" color="#000" />
  <p>Popup content</p>
</Popup>

// ✅ CORRECT - Use BodyCopy as heading in plain views
<Popup visible={true}>
  <BodyCopy as="h2" style={{ fontSize: "1.5rem", fontWeight: "600" }}>
    Popup Title
  </BodyCopy>
  <p>Popup content</p>
</Popup>

// ✅ CORRECT - Title only in gradient views
<AuraLayout colorConfig={theme.errorView}>
  <Title title="Error Occurred" color={theme.errorView.title} />
</AuraLayout>
```

### Mistake 2: Using BodyCopy with textColor Prop
```tsx
// ❌ WRONG - BodyCopy no longer accepts textColor prop
<BodyCopy textColor={theme.errorView.bodyCopy}>
  Error message
</BodyCopy>

// ✅ CORRECT - Use GradientText for colored text in gradient views
<GradientText 
  as="p" 
  className="lola-body-copy bodycopy"
  textColor={theme.errorView.bodyCopy}
>
  Error message
</GradientText>
```

### Mistake 3: Forgetting Classes on GradientText
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

### Mistake 4: Using GradientText in Form Views
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

### Mistake 5: Trying to Use textColor with BodyCopy
```tsx
// ❌ WRONG - textColor prop no longer exists on BodyCopy
<BodyCopy textColor={theme.whiteView.bodyCopy}>
  Text content
</BodyCopy>

// ✅ CORRECT - Use BodyCopy without any color props
<BodyCopy>
  Text content
</BodyCopy>

// ✅ CORRECT - Only add inline style if user explicitly requests custom color
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
