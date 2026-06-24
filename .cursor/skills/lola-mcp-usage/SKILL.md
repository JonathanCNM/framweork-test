---
name: lola-mcp-usage
description: Guide for AI agents to use Lola Framework UI components in external projects via MCP. Use when implementing Lola UI components, searching for components, or answering questions about the component library.
---

# Lola Framework UI - AI Agent Guide

This skill guides AI agents on how to use the Lola Framework UI MCP server to implement components in external React projects.

## When to Use This Skill

Apply this skill when:
- User asks about Lola Framework UI components
- User wants to implement a UI component from Lola Framework
- User asks "what components are available?"
- User needs form inputs, buttons, layouts, or UI elements
- User mentions gradients, animated text, or modern UI features
- You need to search for a specific type of component

## MCP Server Tools Available

### 1. `get_component`
Get complete documentation for a specific component.

**Use when:** You know the component name and need full documentation.

**Example:**
```
User: "How do I use the Button component?"
Agent: [Uses get_component with component_name="Button"]
```

### 2. `list_components`
List all available components with descriptions.

**Use when:** User wants to see what's available or browse components.

**Parameters:**
- `category`: Filter by 'form', 'layout', 'display', 'navigation', 'feedback', 'decoration', 'integration'

**Example:**
```
User: "What form components are available?"
Agent: [Uses list_components with category="form"]
```

### 3. `search_components`
Search for components by keyword.

**Use when:** User describes functionality without knowing component name.

**Example:**
```
User: "I need a component with gradient support"
Agent: [Uses search_components with query="gradient"]
```

### 4. `get_component_usage`
Get usage examples and code snippets.

**Use when:** User needs implementation examples.

**Parameters:**
- `component_name`: Name of the component
- `example_type`: 'basic' or 'advanced'

**Example:**
```
User: "Show me advanced examples of InputField"
Agent: [Uses get_component_usage with component_name="InputField", example_type="advanced"]
```

### 5. `get_component_props`
Get detailed prop information.

**Use when:** User asks "what props does X accept?" or needs prop details.

**Example:**
```
User: "What props does Button accept?"
Agent: [Uses get_component_props with component_name="Button"]
```

### 6. `get_view_implementation_guide`
Get the complete view-based implementation pattern for Lola Framework UI.

**Use when:** User wants to implement a full view/page with proper layout structure, or asks about AuraLayout, colorConfig, themes, or view patterns.

**Parameters:**
- `view_type`: Optional - 'primaryMeshGradientView', 'specialView', 'dataView', 'whiteView', 'errorView', or 'all'

**Example:**
```
User: "How do I create a view with AuraLayout?"
Agent: [Uses get_view_implementation_guide]

User: "Show me how to implement an error view"
Agent: [Uses get_view_implementation_guide with view_type="errorView"]
```

## Implementation Pattern

When implementing Lola Framework UI components for users:

### Pattern A: Single Component Implementation

Use this for simple component requests:

### Step 1: Search/Discover
If user describes functionality, search first:
```
User: "I need a validated email input"
Agent: [Uses search_components with query="input validation"]
```

### Step 2: Get Documentation
Once you know the component name:
```
Agent: [Uses get_component with component_name="InputField"]
```

### Step 3: Generate Implementation
Based on documentation, generate code following this template:

```tsx
// Import statement from usage.import
import { ComponentName } from 'lola-framework-ui-test';

// If first time using Lola in project, remind about CSS import
// import 'lola-framework-ui-test/dist/styles.css'; // Add to main App file

function YourComponent() {
  // State management if needed for controlled components
  const [value, setValue] = useState('');

  return (
    <ComponentName
      // Required props first
      requiredProp={value}
      
      // Then optional props with user's requirements
      variant="primary"
      color="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
      
      // Event handlers
      onChange={(e) => setValue(e.target.value)}
    >
      Content
    </ComponentName>
  );
}
```

### Pattern B: View-Based Implementation

**Use this pattern when:**
- User asks to create a "view" or "page"
- User mentions AuraLayout, Layout, or full page structure
- User asks about themes or colorConfig
- User wants a complete screen implementation

### Step 1: Get View Implementation Guide
```
Agent: [Uses get_view_implementation_guide]
```

### Step 2: Identify View Type
Determine which view type based on user's needs:
- **primaryMeshGradientView**: Primary/welcome screens with gradients
- **specialView**: Special themed screens
- **dataView**: Information/data display screens
- **whiteView**: Default/simple screens
- **errorView**: Error states

### Step 3: Generate View with Proper Structure
```tsx
import {
  AuraLayout,
  Layout,
  Navbar,
  PageTitle,
  BodyCopy,
  Button,
  ElevatedCircle,
  Grid
} from 'lola-framework-ui-test';

function MyView({ theme }) {
  // CRITICAL: Get colorConfig from theme based on view type
  const colorConfig = theme.primaryMeshGradientView; // or specialView, dataView, etc.

  return (
    <AuraLayout colorConfig={colorConfig}>
      <Layout.Header>
        <Navbar
          color={colorConfig.title}
          title="Page Title"
        />
      </Layout.Header>

      <Layout.Content>
        <Grid>
          {/* Content based on view type */}
          <ElevatedCircle>
            <Icon size={66} />
          </ElevatedCircle>
          
          <PageTitle
            highlight="Main Title"
            highlightColor={colorConfig.title}
            secondary="Subtitle"
            secondaryColor={colorConfig.subtitle}
          />
          
          <BodyCopy textColor={colorConfig.bodyCopy}>
            Content text here
          </BodyCopy>
        </Grid>
      </Layout.Content>

      <Layout.Footer>
        <Button
          showIcon
          size="large"
          background={colorConfig.backgroundBtn}
          color={colorConfig.textColorBtn}
        >
          Action Button
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
}
```

### Step 4: Explain Key Features
Mention important notes from documentation:
- Special features (gradients, animations, etc.)
- Peer dependencies if any
- CSS variables for customization
- Accessibility considerations

## Component Categories

### Form Components
- **Button** - Versatile button with variants and loading states
- **InputField** - Input with floating labels and validation
- **Select** - Dropdown with search and edit
- **SearchSelect** - Enhanced select with search
- **InputRadio** - Radio button inputs
- **LabelInput** - Floating labels

### Layout Components
- **Layout** - Main layout structure
- **AuraLayout** - Layout with glow effects
- **Page** - Page container
- **MotionWrapper** - Animation wrapper

### Display Components
- **Title** / **PageTitle** - Title components
- **GradientText** - Gradient text effect
- **RotatingText** - Animated text
- **BodyCopy** - Body text

### Feedback Components
- **Loader** - Loading spinner
- **CircularProgress** - Progress indicator
- **CustomStepper** - Multi-step indicator

## Common Patterns

### Pattern 1: Gradient Styling
Many Lola components support CSS gradients:

```tsx
<Button
  background="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
  color="#fff"
>
  Gradient Button
</Button>
```

### Pattern 2: Controlled Components
Form components are typically controlled:

```tsx
const [value, setValue] = useState('');

<InputField
  value={value}
  onChange={(e) => setValue(e.target.value)}
  name="fieldName"
  label="Field Label"
/>
```

### Pattern 3: Validation States
Input components support validation:

```tsx
const [isValid, setIsValid] = useState(true);

<InputField
  value={email}
  isValid={isValid}
  errorColor="#ff0000"
  activeColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
/>
```

### Pattern 4: Loading States
Buttons support loading:

```tsx
<Button loading={isSubmitting}>
  Submit Form
</Button>
```

## Installation Reminder

Always remind users on first implementation:

```tsx
// 1. Install the package
// npm install lola-framework-ui-test

// 2. Import CSS in your main app file (App.tsx, index.tsx, or _app.tsx)
import 'lola-framework-ui-test/dist/styles.css';

// 3. Import and use components
import { Button, InputField } from 'lola-framework-ui-test';
```

## Peer Dependencies

Lola Framework requires:
- `react`: >=18 <20
- `react-dom`: >=18 <20

Check user's React version if issues arise.

## Best Practices

### 1. TypeScript Types
Always import and use TypeScript types:

```tsx
import { Button, type ButtonProps } from 'lola-framework-ui-test';
```

### 2. CSS Variables
Components use CSS variables for theming. Users can override:

```css
.lola-button {
  --bg: your-custom-color;
}
```

### 3. Native HTML Attributes
Many components extend native HTML elements and accept all native props:

```tsx
<Button
  type="submit"
  disabled={isDisabled}
  onClick={handleClick}
  aria-label="Submit form"
>
  Submit
</Button>
```

### 4. Accessibility
Remind users about accessibility when relevant:
- Use `aria-label` for icon-only buttons
- Add `aria-invalid` for validation states
- Ensure proper label associations for inputs

## Error Handling

### Component Not Found
If MCP returns component not found:
1. Search for similar components
2. List all available components
3. Suggest alternatives from the same category

### Version Compatibility
Always mention the current version (check index.json).
Warn if user's React version might be incompatible.

### Missing Documentation
Some components don't have full documentation yet.
- Check `index.json` for `docFile: null`
- Provide basic import and usage
- Suggest checking Storybook or source code

## Example Workflows

### Workflow 1: User Knows Component Name

```
User: "How do I use the Button component with a gradient?"

1. [Use get_component with component_name="Button"]
2. Extract gradient-related props
3. Generate code example
4. Explain gradient support
```

### Workflow 2: User Describes Need

```
User: "I need a search dropdown"

1. [Use search_components with query="search dropdown"]
2. Identify Select and SearchSelect components
3. [Use get_component for both]
4. Compare and recommend based on user needs
5. Generate implementation
```

### Workflow 3: User Wants Overview

```
User: "What components are in Lola Framework?"

1. [Use list_components without category]
2. Group by category
3. Highlight most commonly used components
4. Offer to provide details on specific components
```

## Quick Reference

| User Intent | MCP Tool | Parameters |
|-------------|----------|------------|
| "Show me Button docs" | get_component | component_name="Button" |
| "What form components exist?" | list_components | category="form" |
| "I need validation input" | search_components | query="validation" |
| "Button examples" | get_component_usage | component_name="Button", example_type="advanced" |
| "What props for Select?" | get_component_props | component_name="Select" |
| "How to create a view?" | get_view_implementation_guide | (no params or view_type) |
| "Implement error page" | get_view_implementation_guide | view_type="errorView" |
| "Use AuraLayout properly" | get_view_implementation_guide | (no params) |

## Notes

- Always check documentation version matches user's installed version
- Lola Framework uses modern CSS (Level 4/5) - no preprocessors needed
- Components support Framer Motion animations
- Gradient support is a key feature across components
- TypeScript is first-class - all components are fully typed

## Related Skills

- `lola-ui-development` - For contributing to Lola Framework itself
- `react-best-practices` - For React implementation patterns

---

When user mentions Lola Framework UI components, proactively use the MCP tools to provide accurate, up-to-date implementation guidance.
