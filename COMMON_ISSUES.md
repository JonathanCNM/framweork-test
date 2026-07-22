# Lola Framework UI - Common Issues and Solutions

This document catalogues all known issues, errors, and their solutions when implementing Lola Framework UI components. Use this as a troubleshooting guide and reference for future implementations.

---

## Table of Contents

1. [React Version Issues](#react-version-issues)
2. [AuraLayout Errors](#auralayout-errors)
3. [Component-Specific Issues](#component-specific-issues)
4. [Performance Issues](#performance-issues)
5. [Best Practices Summary](#best-practices-summary)

---

## React Version Issues

### Issue 1: React CurrentDispatcher Error

**Error:**
```
Uncaught TypeError: Cannot read properties of undefined (reading 'ReactCurrentDispatcher')
```

**Cause:**
- React version mismatch between library (React 18.3.1) and consuming app (React 19.x)
- Multiple React instances in the dependency tree

**Solution:**
```bash
# Downgrade to React 18.3.1
npm install react@18.3.1 react-dom@18.3.1
```

**Prevention:**
- Always use React 18.x (specifically 18.3.1)
- For local development, add to `vite.config.ts`:
  ```typescript
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
    dedupe: ['react', 'react-dom'],
  }
  ```

**Documentation Update Needed:** ✅ Updated in IMPLEMENTATION_GUIDE.md

---

## AuraLayout Errors

### Issue 2: Cannot Destructure 'themeType'

**Error:**
```
Uncaught TypeError: Cannot destructure property 'themeType' of 'e' as it is undefined
```

**Cause:**
- `AuraLayout` requires `colorConfig` prop but it wasn't provided
- Missing or incorrect theme configuration

**Solution:**
Always provide `colorConfig` to `AuraLayout`:

```tsx
const colorConfig = {
  background: '#ffffff',
  title: '#2d3748',
  subtitle: '#4a5568',
  bodyCopy: '#718096',
  backgroundBtn: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  textColorBtn: '#ffffff',
  themeType: 'light' // REQUIRED
}

<AuraLayout colorConfig={colorConfig}>
  {/* content */}
</AuraLayout>
```

**Required colorConfig Properties:**
- `background`: Background color
- `title`: Title color
- `subtitle`: Subtitle color
- `bodyCopy`: Body text color
- `backgroundBtn`: Button background
- `textColorBtn`: Button text color
- `themeType`: 'light' | 'dark' (REQUIRED)

**Prevention:**
- Never use `AuraLayout` without `colorConfig`
- Always include all required properties
- Get colorConfig from theme object: `theme.whiteView`, `theme.primaryMeshGradientView`, etc.

**Documentation Update Needed:** ✅ Added to ViewBasedImplementation.json

---

## Component-Specific Issues

### Issue 3: BodyCopy textColor Prop Warning

**Error:**
```
Warning: React does not recognize the `textColor` prop on a DOM element
```

**Cause:**
- `BodyCopy` component defines `textColor` in types but doesn't use it internally
- Prop gets spread to DOM element causing React warning

**Solution:**
Use `style` prop instead:

```tsx
// ❌ Wrong
<BodyCopy textColor={colorConfig.bodyCopy}>
  Text content
</BodyCopy>

// ✅ Correct
<BodyCopy style={{ color: colorConfig.bodyCopy }}>
  Text content
</BodyCopy>
```

**Prevention:**
- Don't use `textColor` prop on `BodyCopy`
- Use standard `style={{ color: '...' }}` instead

**Documentation Update Needed:** ✅ Will update component docs

---

### Issue 4: SearchSelect Prop Mismatch

**Error:**
```
Uncaught TypeError: Cannot read properties of undefined (reading 'filter')
```

**Cause:**
- `SearchSelect` expects `items` prop, not `options`
- Items must have `code` and `label` properties, not `value` and `label`

**Solution:**

```tsx
// ❌ Wrong (like Select component)
const options = [
  { value: 'apple', label: 'Apple' }
]
<SearchSelect options={options} ... />

// ✅ Correct (SearchSelect specific)
const items = [
  { code: 'apple', label: '🍎 Apple' }
]
<SearchSelect 
  items={items}
  value={selected}
  onChange={(val) => setSelected(val as string)}
/>
```

**SearchSelect Props:**
- `items`: Array of `{ code: string, label: string }`
- `value`: string | null
- `onChange`: (value: unknown) => void
- `placeholder`: string (optional)
- `searchable`: boolean (default: true)

**Important: SearchSelect onChange behavior**
- `onChange` receives the entire item object, not just the code
- You must extract the code from the selected item

```tsx
<SearchSelect
  items={items}
  value={selected}
  onChange={(selected: any) => {
    // Extract code from item object
    const code = typeof selected === 'object' && selected?.code 
      ? selected.code 
      : selected
    setSelected(code)
  }}
/>
```

**Select vs SearchSelect:**

| Component | Options Prop | Item Structure |
|-----------|--------------|----------------|
| Select | `options` | `{ value, label }` |
| SearchSelect | `items` | `{ code, label }` |

**Prevention:**
- Use `items` with `code`/`label` for SearchSelect
- Use `options` with `value`/`label` for Select
- Check component docs before using

**Documentation Update Needed:** ✅ Will add to component docs

---

### Issue 7: Grid Component Not Exported

**Error:**
```
Uncaught SyntaxError: The requested module does not provide an export named 'Grid'
```

**Cause:**
- `Grid` component doesn't exist in lola-framework-ui-test
- Documentation incorrectly references Grid component

**Solution:**
Use regular HTML/CSS layout instead:

```tsx
// ❌ Wrong - Grid doesn't exist
import { Grid } from 'lola-framework-ui-test'
<Grid>
  <ElevatedCircle />
  <PageTitle />
</Grid>

// ✅ Correct - Use div with flexbox
<div style={{ 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center',
  padding: '40px 20px',
  gap: '20px'
}}>
  <ElevatedCircle />
  <PageTitle />
</div>
```

**Prevention:**
- Don't import Grid - it doesn't exist
- Use standard HTML elements (div, section) with CSS
- Check src/index.ts for available exports

**Documentation Update Needed:** ✅ Will remove Grid references

---

### Issue 8: SearchSelect onChange Passes Object, Not Code

**Error:**
```
Uncaught Error: Objects are not valid as a React child (found: object with keys {code, label})
```

**Cause:**
- SearchSelect's `onChange` passes the entire item object `{code, label}`
- Not just the code string like you might expect

**Solution:**

```tsx
// ❌ Wrong - stores entire object
<SearchSelect
  items={items}
  value={selected}
  onChange={(val) => setSelected(val as string)}
/>
// Result: selected = {code: 'apple', label: '🍎 Apple'} (object!)

// ✅ Correct - extract code from object
<SearchSelect
  items={items}
  value={selected}
  onChange={(selected: any) => {
    const code = typeof selected === 'object' && selected?.code 
      ? selected.code 
      : selected
    setSelected(code)
  }}
/>
// Result: selected = 'apple' (string!)
```

**Why this matters:**
- If you try to render the object directly, React throws an error
- The `value` prop expects a string (the code), not an object
- Must extract `code` property from the selected item

**Prevention:**
- Always extract the `code` from SearchSelect's onChange
- Remember: SearchSelect passes objects, Select passes values
- Use type checking to handle both cases safely

**Documentation Update Needed:** ✅ Updated in COMMON_ISSUES.md

---

### Issue 9: Layout Content Vertical Overflow

**Problem:**
- Content is too large vertically and overflows Layout bounds
- Footer gets pushed outside the viewport
- Layout becomes broken when content exceeds available space

**Cause:**
- Long content without proper overflow handling
- Missing `isOverflowauto` prop on Layout.Content

**Solution:**

Use the `isOverflowauto` prop on Layout.Content when content is large:

```tsx
<AuraLayout colorConfig={colorConfig}>
  <Layout.Header>
    <Navbar />
  </Layout.Header>
  
  <Layout.Content isOverflowauto={true}>
    {/* Long content that might overflow */}
  </Layout.Content>
  
  <Layout.Footer>
    <Button />
  </Layout.Footer>
</AuraLayout>
```

**What isOverflowauto does:**
- Enables proper overflow handling
- Makes content scrollable within Layout bounds
- Keeps footer visible and in place
- Prevents content from breaking layout structure

**When to use:**
- Content is dynamically sized
- Forms with many fields
- Long lists or data displays
- Text content that varies in length
- Multiple sections that stack vertically

**Best Practice:**
```tsx
<Layout.Content isOverflowauto={true}>
  <div style={{ 
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    width: '100%'
  }}>
    {/* Your content */}
  </div>
</Layout.Content>
```

**Prevention:**
- Always use `isOverflowauto={true}` when content length is uncertain
- Combine with max-width and padding for best results
- Test with long content to verify layout doesn't break

**Documentation Update Needed:** ✅ Added to COMMON_ISSUES.md

---

### Issue 5: Maximum Update Depth Exceeded (Infinite Loop)

**Error:**
```
Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect
```

**Cause:**
- Arrays or objects recreated on every render
- onChange handlers recreated on every render
- Causes component to think props changed

**Solution:**

```tsx
// ❌ Wrong - recreated every render
function App() {
  const items = [{ code: '1', label: 'One' }]
  const handleChange = (val) => setValue(val)
  
  return <SearchSelect items={items} onChange={handleChange} />
}

// ✅ Correct - defined outside component
const items = [{ code: '1', label: 'One' }]

function App() {
  return <SearchSelect 
    items={items} 
    onChange={setValue}  // Pass setState directly
  />
}

// ✅ Also correct - useMemo for dynamic items
function App() {
  const items = useMemo(() => [
    { code: '1', label: 'One' }
  ], [])  // Empty deps = created once
  
  return <SearchSelect items={items} onChange={setValue} />
}
```

**Prevention:**
- Define static arrays/objects outside component
- Use `useMemo` for dynamic data with proper dependencies
- Pass `setState` functions directly instead of wrapping them
- Use `useCallback` for complex handlers

**Documentation Update Needed:** ✅ Added to best practices

---

## Performance Issues

### Issue 6: Vite Dependency Pre-bundling Failures

**Error:**
```
Failed to run dependency scan. Skipping dependency pre-bundling.
The following dependencies are imported but could not be resolved
```

**Cause:**
- npm link issues with Vite
- Library not properly installed

**Solution:**

```bash
# For local development
npm install file:../path/to/lola-framework-ui-test

# For published package
npm install lola-framework-ui-test@latest
```

Add to `vite.config.ts`:
```typescript
optimizeDeps: {
  include: ['lola-framework-ui-test'],
  force: true,
}
```

**Prevention:**
- Use `npm install file:...` for local packages
- Configure Vite's `optimizeDeps` properly
- Rebuild library after changes: `npm run build`

---

## Best Practices Summary

### ✅ DO

1. **Always use React 18.3.1**
   ```bash
   npm install react@18.3.1 react-dom@18.3.1
   ```

2. **Provide colorConfig to AuraLayout**
   ```tsx
   const colorConfig = theme.whiteView
   <AuraLayout colorConfig={colorConfig}>
   ```

3. **Follow view-based structure**
   ```tsx
   <AuraLayout colorConfig={colorConfig}>
     <Layout.Header>
       <Navbar />
     </Layout.Header>
     <Layout.Content>
       <section className="content">...</section>
     </Layout.Content>
     <Layout.Footer>
       <Button />
     </Layout.Footer>
   </AuraLayout>
   ```

4. **Use correct prop names**
   - `SearchSelect`: `items` with `code`/`label`
   - `Select`: `options` with `value`/`label`
   - `BodyCopy`: `style={{ color }}` not `textColor`

5. **Define static data outside components**
   ```tsx
   const items = [...] // Outside component
   
   function App() {
     return <SearchSelect items={items} />
   }
   ```

6. **Import CSS once in main entry**
   ```tsx
   // main.tsx or index.tsx
   import 'lola-framework-ui-test/dist/styles.css'
   ```

### ❌ DON'T

1. **Don't use React 19**
   - Causes ReactCurrentDispatcher errors

2. **Don't use AuraLayout without colorConfig**
   - Will cause "Cannot destructure 'themeType'" error

3. **Don't mix component prop conventions**
   - Select uses `options`, SearchSelect uses `items`

4. **Don't use textColor on BodyCopy**
   - Use `style={{ color }}` instead

5. **Don't recreate arrays/objects in render**
   - Causes infinite render loops

6. **Don't use manual CSS or styled-components**
   - Use framework components only

---

## Quick Troubleshooting Checklist

When you encounter an error:

- [ ] Is React version 18.3.1? (not 19.x)
- [ ] Is colorConfig provided to AuraLayout?
- [ ] Are you using the correct prop names? (`items` vs `options`)
- [ ] Are arrays/objects defined outside the component?
- [ ] Is the CSS imported in main entry file?
- [ ] Did you rebuild the library after changes?
- [ ] Are you using `style={{ color }}` instead of `textColor` for BodyCopy?

---

## Component Prop Quick Reference

| Component | Key Props | Notes |
|-----------|-----------|-------|
| AuraLayout | `colorConfig` (required) | Must include `themeType` |
| Navbar | `color`, `title`, `noBackButton` | color accepts gradients |
| Button | `background`, `color`, `showIcon`, `size` | background accepts gradients |
| InputField | `name`, `value`, `onChange`, `label` | Standard controlled input |
| Select | `options` (array), `value`, `onChange` | options: `{value, label}` |
| SearchSelect | `items` (array), `value`, `onChange` | items: `{code, label}` |
| BodyCopy | `style`, `children` | Use `style={{color}}` not `textColor` |
| PageTitle | `highlight`, `highlightColor`, `secondary`, `secondaryColor` | For page titles |

---

## Version Compatibility Matrix

| Library Version | React Version | Works? | Notes |
|----------------|---------------|--------|-------|
| 0.3.1 | 18.3.1 | ✅ Yes | Recommended |
| 0.3.1 | 18.x | ✅ Yes | Should work |
| 0.3.1 | 19.x | ❌ No | ReactCurrentDispatcher error |
| 0.3.1 | 17.x | ⚠️ Maybe | Not tested |

---

## Getting Help

If you encounter an issue not listed here:

1. Check the error message against this document
2. Verify React version: `npm list react react-dom`
3. Check console for additional warnings
4. Ensure colorConfig is provided to AuraLayout
5. Verify component prop names match documentation
6. Check that arrays/objects aren't recreated on every render

---

## Contributing

Found a new issue? Please document it here with:
- Error message
- Cause
- Solution
- Prevention tips
- Whether docs need updating

---

**Last Updated:** June 19, 2026  
**Library Version:** 0.3.1  
**Contributors:** Development team and AI implementation testing
