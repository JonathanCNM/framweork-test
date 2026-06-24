# Lola Framework UI - Development Examples

Complete, real-world examples following project standards.

---

## Example 1: Creating a New Card Component

### Step-by-step Implementation

**1. Create Component File**

```typescript
// src/components/Card.tsx
import { type ReactNode, type HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

export const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  className = '',
  ...props
}: CardProps) => {
  const classes = [
    'lola-card',
    `lola-card--${variant}`,
    `lola-card--padding-${padding}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
```

**2. Add to Component Index**

```typescript
// src/components/index.ts
export { Card } from './Card';
export type { CardProps } from './Card';
```

**3. Add to Main Index**

```typescript
// src/index.ts
export * from './components/Card';
```

**4. Create Test File**

```typescript
// src/components/__tests__/Card.test.tsx
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  test('renders children', () => {
    render(<Card>Test content</Card>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('applies default variant', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('lola-card--default');
  });

  test('applies elevated variant', () => {
    const { container } = render(<Card variant="elevated">Content</Card>);
    expect(container.firstChild).toHaveClass('lola-card--elevated');
  });

  test('applies padding classes', () => {
    const { container } = render(<Card padding="large">Content</Card>);
    expect(container.firstChild).toHaveClass('lola-card--padding-large');
  });

  test('forwards additional props', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  test('merges custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass('lola-card', 'custom-class');
  });
});
```

**5. Add CSS**

```css
/* src/styles/index.css */

/* Card base styles */
.lola-card {
  --card-bg: var(--background, #fff);
  --card-color: var(--foreground, #000);
  --card-border: var(--border, #e5e7eb);
  
  background: var(--card-bg);
  color: var(--card-color);
  border-radius: var(--lola-border-radius, 20px);
  transition: var(--lola-transition, all 0.2s ease-in-out);
}

/* Variants */
.lola-card--default {
  border: 1px solid var(--card-border);
}

.lola-card--elevated {
  box-shadow: var(--shadow-card, 0 4px 24px -4px rgba(0, 0, 0, 0.1));
}

.lola-card--outlined {
  border: 2px solid var(--card-border);
}

/* Padding variants */
.lola-card--padding-none {
  padding: 0;
}

.lola-card--padding-small {
  padding: clamp(0.5rem, 2vw, 1rem);
}

.lola-card--padding-medium {
  padding: clamp(1rem, 3vw, 1.5rem);
}

.lola-card--padding-large {
  padding: clamp(1.5rem, 4vw, 2rem);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .lola-card {
    --card-bg: var(--card, #121216);
    --card-color: var(--card-foreground, #fafafa);
  }
}
```

**6. Create Storybook Story**

```typescript
// src/stories/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../components/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined']
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large']
    }
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'This is a default card'
  }
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'This card has elevation'
  }
};

export const WithCustomContent: Story = {
  args: {
    children: (
      <div>
        <h3>Card Title</h3>
        <p>Card content goes here</p>
      </div>
    )
  }
};
```

---

## Example 2: Creating a Custom Hook

### useToggle Hook

**1. Create Hook File**

```typescript
// src/hooks/useToggle.ts
import { useState, useCallback } from 'react';

export interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: boolean) => void;
}

export const useToggle = (initialValue: boolean = false): UseToggleReturn => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue
  };
};
```

**2. Export from Index**

```typescript
// src/hooks/index.ts
export { useToggle } from './useToggle';
export type { UseToggleReturn } from './useToggle';
```

**3. Create Tests**

```typescript
// src/hooks/__tests__/useToggle.test.ts
import { renderHook, act } from '@testing-library/react';
import { useToggle } from '../useToggle';

describe('useToggle', () => {
  test('initializes with default value false', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.value).toBe(false);
  });

  test('initializes with provided value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.value).toBe(true);
  });

  test('toggles value', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);
    
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(false);
  });

  test('sets value to true', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current.setTrue();
    });
    expect(result.current.value).toBe(true);
  });

  test('sets value to false', () => {
    const { result } = renderHook(() => useToggle(true));
    
    act(() => {
      result.current.setFalse();
    });
    expect(result.current.value).toBe(false);
  });

  test('sets specific value', () => {
    const { result } = renderHook(() => useToggle());
    
    act(() => {
      result.current.setValue(true);
    });
    expect(result.current.value).toBe(true);
    
    act(() => {
      result.current.setValue(false);
    });
    expect(result.current.value).toBe(false);
  });
});
```

**4. Usage Example**

```typescript
// Example component using the hook
import { useToggle } from 'lola-framework-ui';

function Modal() {
  const { value: isOpen, toggle, setFalse } = useToggle(false);

  return (
    <>
      <Button onClick={toggle}>Open Modal</Button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={setFalse}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
```

---

## Example 3: Component with Dynamic Styles

### Progress Bar with CSS Variables

```typescript
// src/components/ProgressBar.tsx
import { type HTMLAttributes } from 'react';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar = ({
  value,
  max = 100,
  color = 'var(--primary, #3ee0cf)',
  height = '8px',
  showLabel = false,
  className = '',
  ...props
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div
      className={`lola-progress-bar ${className}`.trim()}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      style={{
        '--progress-color': color,
        '--progress-height': height,
        '--progress-value': `${percentage}%`,
      } as React.CSSProperties & { [key: string]: string }}
      {...props}
    >
      <div className="lola-progress-bar__track">
        <div className="lola-progress-bar__fill" />
      </div>
      {showLabel && (
        <span className="lola-progress-bar__label">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};
```

**CSS**:

```css
.lola-progress-bar {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lola-progress-bar__track {
  flex: 1;
  height: var(--progress-height);
  background: var(--muted, #e4e4e7);
  border-radius: calc(var(--progress-height) / 2);
  overflow: hidden;
}

.lola-progress-bar__fill {
  height: 100%;
  width: var(--progress-value);
  background: var(--progress-color);
  transition: width 0.3s ease-out;
}

.lola-progress-bar__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--foreground);
  min-width: 3ch;
  text-align: right;
}
```

**Tests**:

```typescript
// src/components/__tests__/ProgressBar.test.tsx
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar', () => {
  test('renders with correct ARIA attributes', () => {
    render(<ProgressBar value={50} max={100} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  test('calculates percentage correctly', () => {
    const { container } = render(<ProgressBar value={75} max={100} />);
    
    const progressBar = container.querySelector('.lola-progress-bar');
    const style = progressBar?.getAttribute('style');
    expect(style).toContain('--progress-value: 75%');
  });

  test('clamps value between 0 and 100', () => {
    const { container } = render(<ProgressBar value={150} max={100} />);
    
    const style = container.querySelector('.lola-progress-bar')?.getAttribute('style');
    expect(style).toContain('--progress-value: 100%');
  });

  test('shows label when requested', () => {
    render(<ProgressBar value={75} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  test('applies custom color', () => {
    const { container } = render(<ProgressBar value={50} color="#ff0000" />);
    
    const style = container.querySelector('.lola-progress-bar')?.getAttribute('style');
    expect(style).toContain('--progress-color: #ff0000');
  });
});
```

---

## Example 4: Adding a Dependency

### Scenario: Need date formatting

**Wrong Approach** ❌:
```bash
# Don't just install without evaluation
npm install moment  # 68KB, deprecated
```

**Correct Approach** ✅:

**1. Document the Need**

```markdown
## Dependency Evaluation: Date Formatting

**Need**: Format dates in multiple locales for international support

**Alternatives Considered**:
1. **Intl.DateTimeFormat** (native)
   - Pros: Built-in, 0KB, excellent browser support
   - Cons: More verbose API
   
2. **date-fns** (modular)
   - Pros: Tree-shakeable, 2-10KB per function, well maintained
   - Cons: Requires imports per function
   
3. **moment.js** (monolithic)
   - Pros: Comprehensive API
   - Cons: 68KB, deprecated, not tree-shakeable
   
4. **day.js** (lightweight)
   - Pros: 2KB, moment-like API
   - Cons: Smaller ecosystem

**Decision**: Use native Intl.DateTimeFormat
**Reasoning**: 
- Zero bundle size impact
- Excellent browser support (all modern browsers)
- Sufficient for our use case
- No maintenance burden
```

**2. Implement Without Dependency**

```typescript
// src/utils/formatDate.ts
export const formatDate = (
  date: Date,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  }).format(date);
};

export const formatRelativeTime = (
  date: Date,
  baseDate: Date = new Date(),
  locale: string = 'en-US'
): string => {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const diffInSeconds = (date.getTime() - baseDate.getTime()) / 1000;
  
  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(Math.round(diffInSeconds), 'second');
  }
  // ... more logic
  
  return rtf.format(Math.round(diffInSeconds / 86400), 'day');
};
```

---

## Example 5: Refactoring with Type Safety

### Before (uses `any`) ❌

```typescript
// Bad: Using any
export const processData = (data: any) => {
  return data.items.map((item: any) => ({
    id: item.id,
    name: item.name,
    value: item.value
  }));
};
```

### After (properly typed) ✅

```typescript
// Good: Proper types
interface RawDataItem {
  id: string;
  name: string;
  value: number;
  metadata?: Record<string, unknown>;
}

interface RawData {
  items: RawDataItem[];
  total: number;
}

interface ProcessedItem {
  id: string;
  name: string;
  value: number;
}

export const processData = (data: unknown): ProcessedItem[] => {
  // Type guard
  if (!isValidRawData(data)) {
    throw new Error('Invalid data format');
  }
  
  return data.items.map(item => ({
    id: item.id,
    name: item.name,
    value: item.value
  }));
};

// Type guard function
function isValidRawData(data: unknown): data is RawData {
  if (typeof data !== 'object' || data === null) return false;
  
  const obj = data as Record<string, unknown>;
  
  return (
    Array.isArray(obj.items) &&
    typeof obj.total === 'number' &&
    obj.items.every(isValidRawDataItem)
  );
}

function isValidRawDataItem(item: unknown): item is RawDataItem {
  if (typeof item !== 'object' || item === null) return false;
  
  const obj = item as Record<string, unknown>;
  
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.number === 'value'
  );
}
```

---

## Example 6: Modern CSS Features

### Container Queries Example

```css
/* Card that adapts based on its container size */
.lola-card {
  container-type: inline-size;
  container-name: card;
}

.lola-card__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* When card is wide enough, use horizontal layout */
@container card (min-width: 400px) {
  .lola-card__content {
    flex-direction: row;
    align-items: center;
  }
  
  .lola-card__image {
    width: 40%;
  }
  
  .lola-card__text {
    width: 60%;
  }
}
```

### Color Functions (CSS Level 5)

```css
.lola-button {
  /* Modern color functions */
  --base-color: oklch(0.7 0.2 180);
  
  background: var(--base-color);
  
  /* Hover: lighter version */
  &:hover {
    background: oklch(from var(--base-color) calc(l + 0.1) c h);
  }
  
  /* Active: darker version */
  &:active {
    background: oklch(from var(--base-color) calc(l - 0.1) c h);
  }
}

.lola-card--theme-aware {
  /* Color mixing */
  background: color-mix(
    in oklch,
    var(--theme-primary) 20%,
    var(--theme-background)
  );
}
```

### Modern Selectors

```css
/* :has() selector - style parent based on children */
.lola-form:has(.lola-input:invalid) {
  border-color: var(--error-color);
}

/* :is() - reduce specificity complexity */
:is(.lola-button, .lola-link):hover {
  text-decoration: underline;
}

/* :where() - zero specificity */
:where(.lola-card) {
  /* Base styles that are easy to override */
  padding: 1rem;
}
```

---

## Example 7: View Implementation with Correct Text Components

### CRITICAL: Text Component Selection by View Type

Different view types require different text components for body copy.

### ❌ WRONG: Using BodyCopy in Error View

```typescript
// NEVER DO THIS - BodyCopy in gradient view
import { AuraLayout, BodyCopy, PageTitle, Layout } from 'lola-framework-ui-test';

function ErrorPage({ theme }) {
  return (
    <AuraLayout colorConfig={theme.errorView}>
      <Layout.Content>
        <PageTitle 
          highlight="Error"
          highlightColor={theme.errorView.title}
        />
        
        {/* ❌ WRONG - Don't use BodyCopy in errorView */}
        <BodyCopy textColor={theme.errorView.bodyCopy}>
          Something went wrong
        </BodyCopy>
      </Layout.Content>
    </AuraLayout>
  );
}
```

### ✅ CORRECT: Using GradientText in Error View

```typescript
// CORRECT - GradientText in gradient view
import { AuraLayout, GradientText, PageTitle, Layout } from 'lola-framework-ui-test';

function ErrorPage({ theme }) {
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
          textColor={theme.errorView.bodyCopy}
        >
          Something went wrong
        </GradientText>
      </Layout.Content>
    </AuraLayout>
  );
}
```

### ✅ CORRECT: Using BodyCopy in White View

```typescript
// CORRECT - BodyCopy in plain view
import { AuraLayout, BodyCopy, Layout, InputField } from 'lola-framework-ui-test';

function FormPage({ theme }) {
  return (
    <AuraLayout colorConfig={theme.whiteView}>
      <Layout.Content>
        <InputField label="Email" name="email" />
        
        {/* ✅ CORRECT - Use BodyCopy without props */}
        <BodyCopy>
          Enter your email address
        </BodyCopy>
      </Layout.Content>
    </AuraLayout>
  );
}
```

### Rule Summary

| View Type | Body Text Component | Configuration |
|-----------|---------------------|---------------|
| **errorView** | `GradientText` | `as="p" className="lola-body-copy bodycopy"` |
| **primaryMeshGradientView** | `GradientText` | `as="p" className="lola-body-copy bodycopy"` |
| **specialView** | `GradientText` | `as="p" className="lola-body-copy bodycopy"` |
| **whiteView** | `BodyCopy` | Standard usage |
| **dataView** | `BodyCopy` | Standard usage |

### Why This Pattern?

**Gradient views** (error, primaryMesh, special) require `GradientText` because:
- They have complex gradient backgrounds
- Text needs gradient effects to match the aesthetic
- Ensures proper visibility and visual consistency

**Plain views** (white, data) use `BodyCopy` because:
- Solid backgrounds don't need gradient text
- Simpler rendering for better performance
- Standard text styling is sufficient

### Checklist When Implementing Views

- [ ] Identify the view type first
- [ ] For gradient views (error, primaryMesh, special):
  - [ ] Use `GradientText` for body text
  - [ ] Configure as `as="p"`
  - [ ] Include `className="lola-body-copy bodycopy"`
  - [ ] Pass `textColor` from theme
- [ ] For plain views (white, data):
  - [ ] Use `BodyCopy` for body text
  - [ ] Do NOT add props unless user explicitly requests
  - [ ] Keep simple: `<BodyCopy>Text</BodyCopy>`
  - [ ] Only add `style={{ color: '...' }}` if user asks
- [ ] Verify text visibility against background
- [ ] Ensure gradient effects render correctly

---

These examples demonstrate the project's standards in real implementations. Use them as templates when creating new components or features.
