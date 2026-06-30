---
name: lola-ui-development
description: Development standards and patterns for Lola Framework UI component library. Use when creating, modifying, or reviewing React components, TypeScript code, tests, or styles in this design system. Triggers on component creation, refactoring, testing, or code review requests.
---

# Lola Framework UI Development

This skill enforces development standards for Lola Framework UI, a React + TypeScript component library.

## Core Rules

**CRITICAL - Never violate these:**

1. **TypeScript Strict**: Never use `any`. Use `unknown` if type is truly unknown.
2. **Export Pattern**: All public components MUST be exported from `src/index.ts`
3. **CSS Modern**: Only CSS Level 4 and 5 features. No preprocessors.
4. **Dependency Control**: Justify any new dependency before adding
5. **Semver Compliance**: Breaking changes require major version bump
6. **Testing Required**: Every component modification requires corresponding tests

---

## Component Development

### Creating a New Component

**Checklist:**
```
- [ ] Component file created in src/components/
- [ ] TypeScript interface for props defined
- [ ] Props properly typed (no `any`)
- [ ] Component exported from src/components/index.ts
- [ ] Component exported from src/index.ts
- [ ] Test file created
- [ ] Storybook story created
- [ ] CSS uses only modern features (CSS 4/5)
```

### Component Template

```typescript
// src/components/MyComponent.tsx
import { type ReactNode } from 'react';

export interface MyComponentProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  // Never use 'any' - be specific with types
}

export const MyComponent = ({
  children,
  variant = 'default',
  size = 'medium',
  className = '',
  ...props
}: MyComponentProps) => {
  const classes = [
    'lola-my-component',
    `lola-my-component--${variant}`,
    `lola-my-component--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
```

### Export Pattern

```typescript
// src/components/index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';

// src/index.ts
export * from './components';
export * from './components/MyComponent';
```

---

## TypeScript Standards

### Type Safety

```typescript
// ❌ NEVER DO THIS
const handleClick = (event: any) => { ... }
const data: any = fetchData();

// ✅ DO THIS
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { ... }
const data: unknown = fetchData();
if (isValidData(data)) {
  // Type guard narrows unknown to specific type
}
```

### Props Interface Pattern

```typescript
// ✅ Extend HTML element props when wrapping native elements
export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary';
  loading?: boolean;
}

// ✅ Use ReactNode for children
export interface LayoutProps {
  children: ReactNode;
  background?: string;
}

// ✅ Export types alongside components
export type { ButtonProps };
```

### Generic Types

```typescript
// ✅ Use generics for flexible, type-safe components
export interface SelectProps<T> {
  items: T[];
  selectedItem: T | null;
  onSelectItem: (item: T) => void;
  getItemLabel: (item: T) => string;
}

export function Select<T>({ items, selectedItem, ...props }: SelectProps<T>) {
  // Implementation
}
```

---

## CSS Standards

### Modern CSS Only

**Allowed (CSS Level 4/5):**
- CSS Custom Properties (variables)
- CSS Grid and Flexbox
- CSS Container Queries
- CSS Cascade Layers
- `:has()`, `:is()`, `:where()` selectors
- `clamp()`, `min()`, `max()`
- `color-mix()`, `oklch()`, `oklab()`

**Not Allowed:**
- Sass/SCSS/Less preprocessors
- PostCSS plugins (except autoprefixer)
- CSS-in-JS libraries (styled-components, emotion)

### CSS Architecture

```css
/* Component structure */
.lola-component {
  /* Use CSS custom properties for theming */
  --component-bg: var(--background, #fff);
  --component-color: var(--foreground, #000);
  
  background: var(--component-bg);
  color: var(--component-color);
  
  /* Responsive with clamp() */
  padding: clamp(1rem, 2vw, 2rem);
  
  /* Modern layout */
  display: grid;
  gap: 1rem;
}

/* Variants with data attributes or classes */
.lola-component--primary {
  --component-bg: var(--primary);
  --component-color: var(--primary-foreground);
}

/* Responsive without media queries when possible */
.lola-component__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

### CSS Variables Pattern

```typescript
// Component with dynamic CSS variables
export const Card = ({ color, padding }: CardProps) => {
  return (
    <div 
      className="lola-card"
      style={{
        '--card-color': color,
        '--card-padding': padding,
      } as React.CSSProperties & { [key: string]: string }}
    >
      {children}
    </div>
  );
};
```

---

## Theming System

Lola Framework UI uses a **dual-mode theming system** that supports both fixed brand colors and system theme adaptation.

### System Theme Configuration

```typescript
import type { LolaThemeConfig } from 'lola-framework-ui-test';

export const myTheme: LolaThemeConfig = {
  font: {
    // Font configuration
  },
  colors: {
    primaryGradient: '#1DAFA1',
    secondaryGradient: '#10B981',
    // ... other color config
    useSystemTheme: false, // false = fixed colors, true = system adaptive
    lightness: 'light',
  },
  styles: {
    // Custom styles configuration
    cardBorderRadius: '20px',
    buttonBorderRadius: '20px',
    inputBorderRadius: '10px',
    cardBorderColor: '#E4E4E4',
    buttonBorderColor: '#E4E4E4',
    inputBorderColor: '#E4E4E4',
    buttonSize: 'medium', // 'small' | 'medium' | 'large'
    buttonPadding: '1rem', // Optional: overrides buttonSize padding
    inputPadding: '0.75rem',
    cardPadding: '1.5rem',
  }
};
```

### Custom Styles Configuration

The `styles` section in theme configuration controls component styling globally through CSS variables:

```typescript
interface StylesConfig {
  cardBorderRadius?: string;      // Default: '20px'
  buttonBorderRadius?: string;    // Default: '20px'
  inputBorderRadius?: string;     // Default: '10px'
  cardBorderColor?: string;       // Default: '#E4E4E4'
  buttonBorderColor?: string;     // Default: '#E4E4E4'
  inputBorderColor?: string;      // Default: '#E4E4E4'
  buttonSize?: 'small' | 'medium' | 'large'; // Default: 'medium'
  buttonPadding?: string;         // Default: '1rem' (or derived from buttonSize)
  inputPadding?: string;          // Default: '0.75rem'
  cardPadding?: string;           // Default: '1.5rem'
}
```

#### Button Size Behavior

**IMPORTANT**: The `buttonSize` in theme configuration controls the **global padding** for all buttons through CSS variables, **not** through the Button component's `size` prop.

You can also use `buttonPadding` to define a custom padding value that overrides the one derived from `buttonSize`.

```typescript
// Button size mapping to padding:
const BUTTON_SIZE_PADDING = {
  small: '0.75rem',
  medium: '1rem',   // Default
  large: '1.5rem',
};

// ✅ Theme buttonSize applies globally
styles: {
  buttonSize: 'large', // All buttons get 1.5rem padding
}

// ✅ Or use explicit buttonPadding
styles: {
  buttonPadding: '2rem', // Custom padding, overrides buttonSize
}

// ✅ Button component size prop controls icons and height only
<Button size="large">  // Large icons, 75px height
  Click me
</Button>  // Uses padding from theme.styles.buttonPadding or derived from buttonSize
```

**CSS Variables Generated:**
```css
:root {
  --lola-style-button-padding: 1rem; /* From buttonPadding or buttonSize */
  --lola-style-input-padding: 0.75rem; /* From inputPadding */
  --lola-style-card-padding: 1.5rem; /* From cardPadding */
  --lola-style-button-border-radius: 20px;
  --lola-style-button-border-color: #E4E4E4;
}

button {
  padding: var(--lola-style-button-padding, 1rem);
  border-radius: var(--lola-style-button-border-radius, 20px);
  border-color: var(--lola-style-button-border-color, #E4E4E4);
}

.lola-layout--container {
  padding: var(--lola-style-card-padding, 1.5rem);
}

.lola-input-field input {
  padding: var(--lola-style-input-padding, 0.75rem);
}
```

**Usage Guidelines:**
- ✅ Set `buttonSize` in theme config to use predefined padding values
- ✅ Set `buttonPadding` for custom padding (overrides buttonSize)
- ✅ Set `inputPadding` and `cardPadding` for custom component spacing
- ✅ Use Button `size` prop to control icon size and height
- ❌ Don't expect Button `size` prop to override theme padding
- ❌ Don't hardcode padding in Button components

### When useSystemTheme: false (Fixed Mode)

**Behavior**: All colors remain **exactly as configured**, regardless of system theme.

**Component Defaults**:
- `BodyCopy`: Uses `#252525` (dark text) on white background
- `InputField`: Uses fixed colors from theme or component defaults
- `LabelInput`: Uses `#fff` background with dark text
- Autofill: Uses `#fff` background with dark text

**Use Case**: Apps requiring consistent brand colors across all devices/themes.

### When useSystemTheme: true (Adaptive Mode)

**Behavior**: White View and Data View **automatically adapt** to system theme (light/dark).

**Adaptive Views**:
- `whiteView`: Adapts to system theme
- `dataView`: Adapts to system theme

**Fixed Views** (preserve brand colors):
- `primaryMeshGradientView`
- `specialView`
- `errorView`

**Adaptive Components** (when in white/data views):
- `BodyCopy`: `var(--foreground)` - dark in light mode, light in dark mode
- `InputField`: Text color adapts to `var(--foreground)`
- `LabelInput`: Background and color adapt with CSS `!important` rules
- Input autofill: Background and text adapt to prevent invisibility
- Navbar titles: Adapt to `var(--foreground)`

**Technical Implementation**:
```css
/* Applied to adaptive views when useSystemTheme: true */
.white-view-background {
  /* Components automatically use CSS variables */
  .lola-body-copy {
    color: var(--foreground); /* Adapts to system */
  }
  
  .lola--label-input {
    background: var(--background) !important; /* Overrides inline styles */
    color: var(--foreground) !important;
  }
  
  /* Input and autofill also adapt */
  .lola-input-field input {
    color: var(--foreground) !important;
  }
}
```

### CSS Variables Reference

```css
/* Light Mode (Default) */
:root {
  --background: #f3f4f6;
  --foreground: #17171c;
  --card: #e5e7eb;
  --muted-foreground: #61616b;
  --primary: #3ee0cf;
}

/* Dark Mode (Auto-applied via media query) */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #09090b;
    --foreground: #fafafa;
    --card: #121216;
    --muted-foreground: #878792;
  }
}
```

### Component Usage Guidelines

#### BodyCopy Component

```typescript
// ✅ DO: Use without props (adapts automatically)
<BodyCopy>This text will adapt to theme</BodyCopy>

// ❌ DON'T: Pass textColor unless explicitly styling
<BodyCopy textColor="#000">Don't do this</BodyCopy>

// ✅ EXCEPTION: Only when user explicitly requests color change
<BodyCopy style={{ color: customColor }}>Explicitly styled</BodyCopy>
```

#### GradientText Component

**Use GradientText for**:
- Special views (`specialView`)
- Primary mesh views (`primaryMeshGradientView`)
- Error views (`errorView`)
- Titles and headings in gradient views

```typescript
// In special/error/primaryMesh views - use GradientText as <p>
<GradientText as="p" className="lola-body-copy bodycopy">
  Body text in gradient views
</GradientText>

// For titles
<GradientText as="h1" textColor={[color1, color2]}>
  Gradient Title
</GradientText>
```

**NEVER** add `bodycopy` class inside `lola-framework-ui-test` components - only in external implementations.

#### InputField & LabelInput

```typescript
// ✅ DO: Let defaults handle colors
<InputField
  label="Name"
  value={value}
  onChange={handleChange}
/>

// ❌ DON'T: Override colors when useSystemTheme: true
<InputField
  label="Name"
  color="#000" // Avoid when using system theme
  labelBackground="#fff" // Avoid when using system theme
/>

// ✅ EXCEPTION: Custom colors when useSystemTheme: false
const theme = useLolaTheme(myTheme); // useSystemTheme: false
<InputField
  label="Name"
  color={theme.views.whiteView.title}
  labelBackground={theme.views.whiteView.background}
/>
```

### Testing Both Modes

**Always test these scenarios**:
1. ✅ `useSystemTheme: false` + System light mode
2. ✅ `useSystemTheme: false` + System dark mode
3. ✅ `useSystemTheme: true` + System light mode
4. ✅ `useSystemTheme: true` + System dark mode

**Browser DevTools Testing**:
```
1. Open DevTools (F12)
2. Cmd/Ctrl + Shift + P
3. Type "Rendering"
4. Select "Emulate CSS prefers-color-scheme: dark"
```

### Common Pitfalls

❌ **Problem**: Text invisible when system is dark but `useSystemTheme: false`
✅ **Solution**: Framework now uses fixed colors when `useSystemTheme: false` - no action needed

❌ **Problem**: Label shows grey patch (`#979797`) on white background
✅ **Solution**: Ensure using v0.3.1+ with fixed `LabelInput` defaults

❌ **Problem**: Autofill text invisible
✅ **Solution**: Framework handles autofill colors automatically in both modes

❌ **Problem**: `BodyCopy` invisible in dark mode when `useSystemTheme: true`
✅ **Solution**: Framework uses `!important` rules to force adaptation - no inline styles needed

### Documentation References

- Full guide: `SYSTEM_THEME_GUIDE.md`
- Project memory: `PROJECT_MEMORY.md` (Theme System section)
- View best practices: `ai-docs/VIEW_BEST_PRACTICES.md`

---

## Testing Standards

### Test File Structure

```typescript
// src/components/__tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  test('renders children correctly', () => {
    render(<MyComponent>Test content</MyComponent>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  test('applies variant class', () => {
    render(<MyComponent variant="primary">Content</MyComponent>);
    expect(screen.getByText('Content')).toHaveClass('lola-my-component--primary');
  });
  
  test('handles user interaction', async () => {
    const onClick = vi.fn();
    render(<MyComponent onClick={onClick}>Click me</MyComponent>);
    
    await userEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  
  test('forwards additional props', () => {
    render(<MyComponent data-testid="custom">Content</MyComponent>);
    expect(screen.getByTestId('custom')).toBeInTheDocument();
  });
});
```

### Testing Hooks

```typescript
// src/hooks/__tests__/useMyHook.test.ts
import { renderHook } from '@testing-library/react';
import { useMyHook } from '../useMyHook';

describe('useMyHook', () => {
  test('returns initial state', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe(initialValue);
  });
  
  test('updates state correctly', () => {
    const { result } = renderHook(() => useMyHook());
    act(() => {
      result.current.setValue(newValue);
    });
    expect(result.current.value).toBe(newValue);
  });
  
  test('cleans up on unmount', () => {
    const cleanup = vi.fn();
    const { unmount } = renderHook(() => useMyHook());
    unmount();
    expect(cleanup).toHaveBeenCalled();
  });
});
```

### Required Test Coverage

Every component MUST have tests for:
- ✅ Rendering with default props
- ✅ Rendering with all prop variants
- ✅ User interactions (clicks, inputs, etc.)
- ✅ Accessibility attributes
- ✅ Edge cases and error states

**Minimum coverage**: 80%

---

## Dependency Management

### Before Adding a Dependency

Ask these questions:
1. **Is it necessary?** Can we implement this ourselves?
2. **Bundle size impact?** Will this bloat the bundle?
3. **Maintenance status?** Is it actively maintained?
4. **Peer dependency conflicts?** Does it work with React 18 and 19?
5. **License compatible?** Is the license MIT-compatible?

### Justification Template

```markdown
## Dependency: [package-name]

**Purpose**: [Why we need this]
**Alternatives considered**: [What else we looked at]
**Bundle size**: [+X KB to bundle]
**Maintenance**: [Last update, GitHub stars, issues]
**Decision**: [Add/Don't add because...]
```

### Current Architecture Constraints

Based on project docs:
- **Total bundle target**: <400KB
- **Component bundle**: <100KB
- **No beta versions** in production dependencies
- **Optional dependencies** for specialized features (VGS, etc.)

---

## Versioning and Breaking Changes

### Semantic Versioning

Follow [semver.org](https://semver.org/):

- **MAJOR (X.0.0)**: Breaking changes
  - Changed prop types
  - Removed props or components
  - Changed component behavior significantly
  
- **MINOR (0.X.0)**: New features, backwards compatible
  - New components
  - New optional props
  - New hooks
  
- **PATCH (0.0.X)**: Bug fixes, no API changes
  - Bug fixes
  - Performance improvements
  - Documentation updates

### Breaking Change Checklist

Before making a breaking change:
```
- [ ] Document the breaking change
- [ ] Provide migration guide
- [ ] Update CHANGELOG.md
- [ ] Bump MAJOR version
- [ ] Consider deprecation period first
```

---

## Code Review Checklist

When reviewing code in this project, verify:

### TypeScript
- [ ] No `any` types used
- [ ] Props interfaces exported
- [ ] Generic types used appropriately
- [ ] Type guards for unknown types

### Components
- [ ] Exported from index.ts
- [ ] Props have sensible defaults
- [ ] Handles all prop variants
- [ ] Accessible (ARIA attributes)

### Styles
- [ ] Only modern CSS (Level 4/5)
- [ ] Uses CSS variables for theming
- [ ] Responsive without excessive media queries
- [ ] Follows naming convention (lola-component-name)

### Tests
- [ ] Test file exists
- [ ] All variants tested
- [ ] User interactions tested
- [ ] Edge cases covered
- [ ] Coverage ≥80%

### Dependencies
- [ ] No new dependencies without justification
- [ ] All dependencies compatible with React 18/19
- [ ] No beta/alpha versions

### Documentation
- [ ] Component has Storybook story
- [ ] Props documented with JSDoc
- [ ] Usage examples provided

---

## Common Patterns

### Text Component Selection by View Type

**CRITICAL RULE:** Use the correct text component based on view type.

#### GradientText for Gradient Views
```tsx
// ✅ Use GradientText in errorView, primaryMeshGradientView, specialView
<AuraLayout colorConfig={theme.errorView}>
  <Layout.Content>
    <GradientText 
      as="p" 
      className="lola-body-copy bodycopy"
      textColor={theme.errorView.bodyCopy}
    >
      Body text for gradient views
    </GradientText>
  </Layout.Content>
</AuraLayout>
```

#### BodyCopy for Plain Views
```tsx
// ✅ Use BodyCopy in whiteView, dataView (no props by default)
<AuraLayout colorConfig={theme.whiteView}>
  <Layout.Content>
    <BodyCopy>
      Body text for plain views
    </BodyCopy>
    
    {/* Only add color if user explicitly requests it */}
    <BodyCopy style={{ color: '#DC2626' }}>
      Error text (only when user asks)
    </BodyCopy>
  </Layout.Content>
</AuraLayout>
```

**Quick Reference:**
- **Use GradientText** (`as="p" className="lola-body-copy bodycopy"`) in:
  - primaryMeshGradientView
  - specialView
  - errorView
- **Use BodyCopy** (without props unless user requests) in:
  - whiteView
  - dataView

### Compound Components

```typescript
// Pattern used in Layout component
const Layout = ({ children }: LayoutProps) => {
  // Find specific child components
  const header = Children.toArray(children).find(child => 
    isValidElement(child) && child.type === Header
  );
  
  return (
    <div className="lola-layout">
      {header}
      {/* ... */}
    </div>
  );
};

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;

export { Layout };
```

### Forwarding Refs

```typescript
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Custom Hooks Pattern

```typescript
export const useCustomHook = (config: Config) => {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [/* dependencies */]);
  
  return {
    state,
    setState,
    // Other values
  };
};
```

---

## Quick Reference

### File Structure
```
src/
├── components/
│   ├── ComponentName.tsx
│   ├── __tests__/
│   │   └── ComponentName.test.tsx
│   └── index.ts
├── hooks/
│   ├── useHookName.ts
│   ├── __tests__/
│   │   └── useHookName.test.ts
│   └── index.ts
├── styles/
│   └── index.css
└── index.ts
```

### Commands
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build library
npm run build

# Run Storybook
npm run storybook

# Lint
npm run lint
```

### Architecture Documentation
- Full analysis: [/docs/README.md](../../../docs/README.md)
- Component catalog: [/docs/components/README.md](../../../docs/components/README.md)
- Dependencies: [/docs/dependencies/README.md](../../../docs/dependencies/README.md)

---

## When to Use This Skill

Apply this skill automatically when:
- Creating new components in src/components/
- Modifying existing components
- Adding or modifying TypeScript types
- Writing or updating CSS styles
- Creating or updating tests
- Reviewing pull requests
- Adding dependencies
- Discussing architecture decisions

The agent should enforce these standards proactively without being explicitly asked.
