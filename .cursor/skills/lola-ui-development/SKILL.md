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
