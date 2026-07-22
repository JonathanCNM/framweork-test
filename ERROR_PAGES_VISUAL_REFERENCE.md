# Error Pages Visual Reference

## Component Hierarchy

```
Page (font configuration)
  └── MotionWrapper (animation wrapper)
       └── AuraLayout (themed background + glow effects) ← colorConfig={theme.errorView}
            ├── Layout.Content (main content area)
            │    └── div.homepage-content.elevated-circle-container
            │         ├── ElevatedCircle (icon container) ← background={backgroundIcon}
            │         │    └── Icon (error icon) ← colors={iconColors}
            │         │
            │         ├── PageTitle (main title)
            │         │    ├── highlight text ← highlightColor={title}
            │         │    └── secondary text ← secudnaryColor={subtitile}
            │         │
            │         └── BodyCopy (error message) ← textColor={bodyCopy}
            │
            └── Layout.Footer (action area)
                 └── Button (action button)
                      ├── background ← {backgroundBtn}
                      └── color ← {textColorBtn}
```

## Color Flow Diagram

```
theme.errorView
  │
  ├─→ iconColors ────────────→ Icon colors prop
  │
  ├─→ backgroundIcon ────────→ ElevatedCircle background prop
  │
  ├─→ title ─────────────────→ PageTitle highlightColor prop
  │
  ├─→ subtitile ─────────────→ PageTitle secudnaryColor prop
  │
  ├─→ bodyCopy ──────────────→ BodyCopy textColor prop
  │
  ├─→ backgroundBtn ─────────→ Button background prop
  │
  └─→ textColorBtn ──────────→ Button color prop
```

## Visual Layout

```
┌─────────────────────────────────────────────────────────────┐
│                       AuraLayout                             │
│  (Gradient Background + Glow Effects)                        │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  Layout.Content                        │  │
│  │                                                        │  │
│  │              ╭─────────────────╮                       │  │
│  │              │                 │                       │  │
│  │              │  ElevatedCircle │                       │  │
│  │              │      + Icon     │                       │  │
│  │              │                 │                       │  │
│  │              ╰─────────────────╯                       │  │
│  │                                                        │  │
│  │                 ┌─────────────┐                        │  │
│  │                 │  PageTitle  │                        │  │
│  │                 │   Highlight │  ← title color        │  │
│  │                 │   Secondary │  ← subtitle color     │  │
│  │                 └─────────────┘                        │  │
│  │                                                        │  │
│  │                 ┌─────────────┐                        │  │
│  │                 │  BodyCopy   │  ← bodyCopy color     │  │
│  │                 │   Message   │                        │  │
│  │                 └─────────────┘                        │  │
│  │                                                        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  Layout.Footer                         │  │
│  │                                                        │  │
│  │              ┌───────────────────┐                     │  │
│  │              │      Button       │                     │  │
│  │              │   ▶ Action Text   │                     │  │
│  │              └───────────────────┘                     │  │
│  │                                                        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Implementation Checklist

Use this checklist when creating a new error page:

### 1. Imports
```tsx
□ Import AuraLayout
□ Import Layout
□ Import PageTitle
□ Import BodyCopy
□ Import Button
□ Import ElevatedCircle
□ Import appropriate Icon
□ Import IViewConfig type
```

### 2. Props Interface
```tsx
□ Define interface with theme: IViewConfig
□ Add optional custom props
□ Add optional event handlers
□ Export interface
```

### 3. Color Extraction
```tsx
□ Destructure theme.errorView
□ Get iconColors
□ Get backgroundIcon
□ Get title
□ Get subtitile
□ Get bodyCopy
□ Get backgroundBtn
□ Get textColorBtn
```

### 4. Component Structure
```tsx
□ Wrap in AuraLayout with colorConfig
□ Add Layout.Content
□ Add container div with proper classNames
□ Add ElevatedCircle with background
□ Add Icon with colors
□ Add PageTitle with highlight colors
□ Add BodyCopy with textColor
□ Add Layout.Footer
□ Add Button with background and color
```

### 5. Props Usage
```tsx
□ Pass theme colors to all components
□ Use custom text props if provided
□ Connect event handlers to buttons
□ Provide default values for optional props
```

## Quick Reference Table

| Component | Required Props | Theme Color Source |
|-----------|---------------|-------------------|
| `AuraLayout` | `colorConfig` | `theme.errorView` (entire object) |
| `ElevatedCircle` | `background` | `theme.errorView.backgroundIcon` |
| `Icon` | `colors` | `theme.errorView.iconColors` (array) |
| `PageTitle` | `highlight`, `highlightColor` | `theme.errorView.title` |
| `PageTitle` | `secudnary`, `secudnaryColor` | `theme.errorView.subtitile` |
| `BodyCopy` | `textColor` | `theme.errorView.bodyCopy` |
| `Button` | `background` | `theme.errorView.backgroundBtn` |
| `Button` | `color` | `theme.errorView.textColorBtn` |

## Props Type Reference

```typescript
// AuraLayout
interface AuraLayoutProps {
  colorConfig: {
    background: string;
    iconColors: [string, string];
    backgroundIcon: string;
    title: string;
    subtitile: string;
    bodyCopy: string;
    backgroundBtn: string;
    textColorBtn: string;
    themeType: 'light' | 'dark';
  };
  children: ReactNode;
}

// ElevatedCircle
interface ElevatedCircleProps {
  background: string;
  children: ReactNode;
}

// Icon (generic)
interface IconProps {
  size?: number;
  colors?: [string, string];
}

// PageTitle
interface PageTitleProps {
  highlight: string | ReactNode;
  highlightColor: string;
  secudnary?: string | ReactNode;
  secudnaryColor?: string;
  textAnimated?: boolean;
}

// BodyCopy
interface BodyCopyProps {
  textColor: string;
  className?: string;
  children: ReactNode;
}

// Button
interface ButtonProps {
  background: string;
  color: string;
  showIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: ReactNode;
}
```

## Common Patterns Comparison

### Pattern 1: Generic (Reusable)
```tsx
export const GenericErrorPage = ({
  theme,
  title = "Default",
  message = "Default message",
  onAction,
}: Props) => {
  // Flexible, accepts props
  return <AuraLayout>...</AuraLayout>
}
```

**Use when:** Need flexibility for different error scenarios

### Pattern 2: Specific (Dedicated)
```tsx
export const NotFoundErrorPage = ({
  theme,
  onGoHome,
}: Props) => {
  // Fixed content, specific purpose
  return (
    <AuraLayout>
      <PageTitle highlight="404" />
      <BodyCopy>Page not found</BodyCopy>
    </AuraLayout>
  )
}
```

**Use when:** Have a specific, unchanging error scenario

## File Naming Convention

```
[Purpose][Type]Page.tsx
 │        │      └── Always ends with Page.tsx
 │        └── Type: Error, Success, Loading, etc.
 └── Purpose: Generic, NotFound, Network, etc.

Examples:
✅ GenericErrorPage.tsx
✅ NotFoundErrorPage.tsx
✅ NetworkErrorPage.tsx
✅ IproovError.tsx
```

## Integration Points

### React Router
```tsx
<Route path="*" element={<NotFoundErrorPage theme={theme} />} />
```

### Error Boundary
```tsx
componentDidCatch() {
  return <GenericErrorPage theme={theme} />
}
```

### Conditional Rendering
```tsx
{error && <GenericErrorPage theme={theme} />}
```

### Try-Catch
```tsx
try {
  // code
} catch (error) {
  return <NetworkErrorPage theme={theme} />
}
```

## Theme View Types Reference

For error pages, ALWAYS use `theme.errorView`:

```tsx
✅ const colorConfig = theme.errorView;

❌ const colorConfig = theme.primaryMeshGradientView;  // Wrong
❌ const colorConfig = theme.specialView;              // Wrong
❌ const colorConfig = theme.dataView;                 // Wrong
❌ const colorConfig = theme.whiteView;                // Wrong
```

Other view types are for different page types:
- `primaryMeshGradientView` → Welcome/primary screens
- `specialView` → Special themed screens
- `dataView` → Data display screens
- `whiteView` → Simple/default screens
- `errorView` → ERROR PAGES (this is what you need!)

## Complete Minimal Example

```tsx
// Minimum viable error page
import {
  AuraLayout,
  BodyCopy,
  Button,
  Layout,
  PageTitle,
} from "../../components";
import { WarningIcon } from "../../icons";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";

export const MinimalError = ({ theme }: { theme: IViewConfig }) => {
  const {
    iconColors,
    backgroundIcon,
    title,
    subtitile,
    bodyCopy,
    backgroundBtn,
    textColorBtn,
  } = theme.errorView;

  return (
    <AuraLayout colorConfig={theme.errorView}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle background={backgroundIcon}>
            <WarningIcon colors={iconColors} />
          </ElevatedCircle>
          <PageTitle
            highlight="Error"
            highlightColor={title}
            secudnary="Occurred"
            secudnaryColor={subtitile}
          />
          <BodyCopy textColor={bodyCopy}>
            Something went wrong
          </BodyCopy>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <Button
          background={backgroundBtn}
          color={textColorBtn}
        >
          OK
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
};
```

This is the absolute minimum structure. Everything else is customization!

## Testing Checklist

□ Page renders without errors
□ All theme colors are applied correctly
□ Icon displays with correct colors
□ Title displays with correct colors
□ Body text displays with correct color
□ Button displays with correct colors
□ Button click handler works
□ Page works in light theme
□ Page works in dark theme
□ Layout is properly centered
□ Content is responsive
□ No console errors
□ No TypeScript errors
□ No linter errors

---

**Remember:** This pattern works for ALL view types in Lola Framework UI, not just error pages. The same structure applies to success pages, loading pages, and any other full-screen view. Just change `theme.errorView` to the appropriate view type!
