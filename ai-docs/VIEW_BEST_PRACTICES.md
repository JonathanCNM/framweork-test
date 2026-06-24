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

## Related Documentation

- [Component Examples](./EXAMPLES.md)
- [View Implementation Guide](./components/ViewBasedImplementation.json)
- [Theme System Guide](../THEME_SYSTEM_GUIDE.md)
