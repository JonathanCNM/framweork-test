# Lola Framework UI - AI Agent Usage Examples

This document shows real-world examples of how AI agents should interact with Lola Framework UI documentation via the MCP server.

## Example 1: Basic Component Implementation

### User Request
> "I need a button with a purple gradient in my React app"

### AI Agent Process

1. **Search for button component**
   ```
   MCP Tool: get_component
   Parameters: { component_name: "Button" }
   ```

2. **Analyze documentation**
   - Component supports gradient backgrounds via `background` prop
   - Text color via `color` prop
   - Variants: default, link, outline, cancel

3. **Generate implementation**

```tsx
import { Button } from 'lola-framework-ui-test';

function MyComponent() {
  return (
    <Button
      background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      color="#fff"
      onClick={() => console.log('Clicked!')}
    >
      Purple Gradient Button
    </Button>
  );
}

export default MyComponent;
```

4. **Provide context**
   - "Make sure you've installed the package: `npm install lola-framework-ui-test`"
   - "Import the CSS in your main app file: `import 'lola-framework-ui-test/dist/styles.css';`"
   - "You can adjust the gradient angle and colors to match your design"

---

## Example 2: Form with Validation

### User Request
> "Create a login form with email and password fields that show validation errors"

### AI Agent Process

1. **Search for form components**
   ```
   MCP Tool: list_components
   Parameters: { category: "form" }
   ```

2. **Get detailed docs**
   ```
   MCP Tool: get_component
   Parameters: { component_name: "InputField" }
   
   MCP Tool: get_component
   Parameters: { component_name: "Button" }
   ```

3. **Generate implementation**

```tsx
import { useState } from 'react';
import { InputField, Button } from 'lola-framework-ui-test';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(value.length >= 8);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailValid || !passwordValid) {
      return;
    }

    setLoading(true);
    try {
      // Your login logic here
      await login({ email, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <InputField
          type="email"
          name="email"
          label="Email address"
          value={email}
          onChange={handleEmailChange}
          isValid={emailValid}
          activeColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
          errorColor="#ff0000"
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <InputField
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          isValid={passwordValid}
          activeColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
          errorColor="#ff0000"
        />
        {!passwordValid && password.length > 0 && (
          <small style={{ color: '#ff0000' }}>
            Password must be at least 8 characters
          </small>
        )}
      </div>

      <Button
        type="submit"
        loading={loading}
        background="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
        color="#fff"
        disabled={!emailValid || !passwordValid || !email || !password}
        style={{ width: '100%' }}
      >
        Sign In
      </Button>
    </form>
  );
}

export default LoginForm;
```

---

## Example 3: Component Discovery

### User Request
> "What components does Lola Framework have for displaying loading states?"

### AI Agent Process

1. **Search by keyword**
   ```
   MCP Tool: search_components
   Parameters: { query: "loading" }
   ```

2. **Get results and categorize**

**Response:**
> Lola Framework has these components for loading states:
> 
> 1. **Button with loading prop**
>    - Built-in loading spinner for buttons
>    - Automatically disables button when loading
>    - Usage: `<Button loading={isLoading}>Submit</Button>`
> 
> 2. **Loader**
>    - Standalone loading spinner
>    - Customizable colors
>    - Can be used anywhere in your app
> 
> 3. **CircularProgress**
>    - Circular progress indicator
>    - Shows percentage completion
>    - Great for upload/download progress
> 
> 4. **CustomStepper**
>    - Multi-step progress indicator
>    - Shows current step in a process
>    - Useful for wizards and multi-step forms
> 
> Would you like to see examples of any of these?

---

## Example 4: Advanced Customization

### User Request
> "Show me how to create a search input with an icon that changes color based on the input state"

### AI Agent Process

1. **Get component docs**
   ```
   MCP Tool: get_component_usage
   Parameters: { 
     component_name: "InputField",
     example_type: "advanced"
   }
   ```

2. **Generate implementation**

```tsx
import { useState } from 'react';
import { InputField } from 'lola-framework-ui-test';

// Custom search icon component
const SearchIcon = ({ colors }: { colors: [string, string] }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    style={{ marginLeft: '8px' }}
  >
    <circle
      cx="11"
      cy="11"
      r="8"
      stroke={colors[0]}
      strokeWidth="2"
    />
    <path
      d="M21 21L16.65 16.65"
      stroke={colors[1]}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

function SearchInput() {
  const [query, setQuery] = useState('');
  const [iconColors, setIconColors] = useState<[string, string]>(['#979797', '#979797']);

  return (
    <InputField
      type="text"
      name="search"
      label="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Type to search..."
      activeColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
      inactiveColor="#979797"
      color="#222"
      icon={<SearchIcon colors={iconColors} />}
      setIconColors={setIconColors}
    />
  );
}

export default SearchInput;
```

3. **Explain the implementation**
   - "The `setIconColors` prop receives the current border color as a two-color array"
   - "The icon automatically matches the input's state (inactive, active, error)"
   - "The gradient is split into two colors for the icon"
   - "You can create any custom icon that accepts a `colors` prop"

---

## Example 5: Comparing Components

### User Request
> "What's the difference between Select and SearchSelect?"

### AI Agent Process

1. **Get both components**
   ```
   MCP Tool: get_component
   Parameters: { component_name: "Select" }
   
   MCP Tool: get_component
   Parameters: { component_name: "SearchSelect" }
   ```

2. **Compare and explain**

**Response:**
> Both components provide dropdown selection, but with different features:
> 
> **Select Component:**
> - ✅ Optional search functionality (via `searchable` prop)
> - ✅ Editable items with edit/delete actions
> - ✅ Custom styling for selected items
> - ✅ Empty state message
> - 📦 Best for: Editable lists, admin interfaces
> 
> **SearchSelect Component:**
> - ✅ Built-in search (always enabled)
> - ✅ Enhanced search algorithms
> - ✅ Optimized for large datasets
> - 📦 Best for: Large lists, user-facing dropdowns
> 
> **Quick Decision Guide:**
> - Need edit/delete actions? → Use **Select** with `editable={true}`
> - Large list (100+ items)? → Use **SearchSelect**
> - Small list with optional search? → Use **Select** with `searchable={true}`
> 
> Would you like to see code examples for either?

---

## Example 6: Error Handling

### User Request
> "How do I use the DataTable component?"

### AI Agent Process

1. **Search for component**
   ```
   MCP Tool: get_component
   Parameters: { component_name: "DataTable" }
   ```

2. **Component not found - provide helpful response**

**Response:**
> I couldn't find a `DataTable` component in Lola Framework UI. 
> 
> However, Lola Framework has these components that might help:
> 
> **Display Components:**
> - Title / PageTitle - For headers
> - BodyCopy - For text content
> 
> **Layout Components:**
> - Layout - Main page structure
> - Page - Page container
> 
> If you need a data table, you could:
> 
> 1. **Use a dedicated table library** alongside Lola:
>    - TanStack Table (React Table)
>    - AG Grid
>    - Material-UI DataGrid
> 
> 2. **Build a custom table** using Lola's styling:
>    ```tsx
>    import './styles.css'; // For Lola's CSS variables
>    
>    function DataTable({ data }) {
>      return (
>        <table className="custom-table">
>          {/* Your table implementation */}
>        </table>
>      );
>    }
>    ```
> 
> Would you like help integrating a table library with Lola Framework?

---

## Example 7: TypeScript Integration

### User Request
> "How do I properly type my Button component props in TypeScript?"

### AI Agent Process

1. **Get component props**
   ```
   MCP Tool: get_component_props
   Parameters: { component_name: "Button" }
   ```

2. **Generate TypeScript example**

```tsx
import { Button, type ButtonProps } from 'lola-framework-ui-test';
import { FC } from 'react';

// Option 1: Extend ButtonProps
interface CustomButtonProps extends ButtonProps {
  isSubmitting?: boolean;
  successMessage?: string;
}

export const CustomButton: FC<CustomButtonProps> = ({
  isSubmitting,
  successMessage,
  children,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      loading={isSubmitting}
    >
      {isSubmitting ? 'Processing...' : children}
    </Button>
  );
};

// Option 2: Use ButtonProps directly
interface FormButtonProps {
  label: string;
  onSubmit: () => void;
  buttonConfig?: Partial<ButtonProps>;
}

export const FormButton: FC<FormButtonProps> = ({
  label,
  onSubmit,
  buttonConfig = {},
}) => {
  return (
    <Button
      onClick={onSubmit}
      background="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
      color="#fff"
      {...buttonConfig}
    >
      {label}
    </Button>
  );
};

// Option 3: Component that accepts all button props
type MyButtonProps = ButtonProps & {
  tooltip?: string;
};

export const MyButton: FC<MyButtonProps> = ({
  tooltip,
  ...buttonProps
}) => {
  return (
    <div title={tooltip}>
      <Button {...buttonProps} />
    </div>
  );
};
```

3. **Provide guidance**
   - "All Lola components export their prop types"
   - "Button extends `React.ButtonHTMLAttributes<HTMLButtonElement>`"
   - "You can use all native button props (onClick, type, disabled, etc.)"
   - "Use `Partial<ButtonProps>` for optional prop overrides"

---

## Example 8: Theming and Customization

### User Request
> "Can I customize the default colors of Lola components?"

### AI Agent Process

1. **Get component styling info**
   ```
   MCP Tool: get_component
   Parameters: { component_name: "Button" }
   ```

2. **Explain customization options**

**Response:**
> Yes! Lola Framework components use CSS custom properties (variables) for easy theming. Here's how to customize:
> 
> **Method 1: CSS Variables (Global)**
> ```css
> /* In your global CSS file */
> :root {
>   --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
>   --error-color: #ff0000;
>   --success-color: #00ff00;
> }
> 
> /* Override component-specific variables */
> .lola-button {
>   --bg: var(--primary-gradient);
> }
> 
> .lola-input-field {
>   --bg: var(--primary-gradient);
> }
> ```
> 
> **Method 2: Per-Component Props**
> ```tsx
> // Each component accepts color/styling props
> <Button
>   background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
>   color="#fff"
> >
>   Themed Button
> </Button>
> 
> <InputField
>   activeColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
>   errorColor="#ff0000"
> />
> ```
> 
> **Method 3: Theme Provider (Recommended for apps)**
> ```tsx
> // Create a theme configuration
> export const theme = {
>   primaryGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
>   errorColor: '#ff0000',
>   textColor: '#ffffff',
> };
> 
> // Use throughout your app
> <Button
>   background={theme.primaryGradient}
>   color={theme.textColor}
> >
>   Themed Button
> </Button>
> ```
> 
> Available CSS variables by component:
> - **Button**: `--bg`, `--link-bg`
> - **InputField**: `--bg` (border color)
> - **Select**: `--sbg` (selected bg), `--scolor` (selected color)
> 
> Would you like a complete theme setup example?

---

## Best Practices for AI Agents

### 1. Always Check Documentation First
```
✅ Use get_component before generating code
❌ Don't guess at prop names or types
```

### 2. Provide Complete Examples
```
✅ Include imports, state management, and types
❌ Don't give fragments without context
```

### 3. Mention Installation
```
✅ Remind about package and CSS imports
❌ Don't assume user has library installed
```

### 4. Explain Key Features
```
✅ Highlight gradient support, validation, loading states
❌ Don't just dump code without context
```

### 5. Handle Missing Documentation
```
✅ Suggest alternatives and offer to help
❌ Don't claim features that don't exist
```

### 6. Consider User's Level
```
✅ Adjust explanation detail based on question
❌ Don't over-explain to advanced users
```

### 7. Provide Next Steps
```
✅ Suggest related components or features
❌ Don't leave users without direction
```

---

## Common User Patterns

### Pattern 1: "I need a [UI element]"
→ Search components → Get docs → Generate code

### Pattern 2: "How do I [do something]?"
→ Search by functionality → Show examples → Explain approach

### Pattern 3: "What's available?"
→ List components by category → Highlight popular ones

### Pattern 4: "Show me examples"
→ Get advanced examples → Explain code → Provide variations

### Pattern 5: "[Component] isn't working"
→ Check props → Validate setup → Troubleshoot

---

## Example 10: Error Page with Correct Text Components

### User Request
> "Create an error page with a message and a button to go back home"

### AI Agent Process

1. **Identify view type**
   - Error page = errorView
   - errorView requires `GradientText` for body text (NOT `BodyCopy`)

2. **Get component docs**
   ```
   MCP Tool: get_component
   Parameters: { component_name: "GradientText" }
   
   MCP Tool: get_component
   Parameters: { component_name: "PageTitle" }
   
   MCP Tool: get_component
   Parameters: { component_name: "ElevatedCircle" }
   ```

3. **Generate implementation**

```tsx
import {
  AuraLayout,
  GradientText,
  Button,
  Layout,
  PageTitle,
  ElevatedCircle,
  type ViewsConfig
} from 'lola-framework-ui-test';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  theme: ViewsConfig;
}

function ErrorPage({ theme }: ErrorPageProps) {
  const navigate = useNavigate();
  const {
    backgroundIcon,
    title: titleColor,
    subtitile: subtitleColor,
    bodyCopy,
    backgroundBtn,
    textColorBtn,
  } = theme.errorView;

  return (
    <AuraLayout colorConfig={theme.errorView}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle background={backgroundIcon}>
            <div style={{ fontSize: '60px' }}>⚠️</div>
          </ElevatedCircle>

          <PageTitle
            highlight="Algo salió"
            highlightColor={titleColor}
            secudnary="mal"
            secudnaryColor={subtitleColor}
          />

          {/* CRITICAL: Use GradientText, NOT BodyCopy for error views */}
          <GradientText 
            as="p" 
            className="lola-body-copy bodycopy mt-4"
            textColor={bodyCopy}
          >
            Lo sentimos, ha ocurrido un error inesperado. Por favor intenta nuevamente.
          </GradientText>
        </div>
      </Layout.Content>

      <Layout.Footer>
        <Button
          showIcon
          size="large"
          background={backgroundBtn}
          color={textColorBtn}
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
}

export default ErrorPage;
```

4. **Explain key points**
   - "Error pages use the `errorView` theme configuration"
   - "**IMPORTANT**: Use `GradientText` with `className="lola-body-copy bodycopy"` for body text in error views, NOT `BodyCopy`"
   - "This applies to all gradient views: primaryMeshGradientView, specialView, and errorView"
   - "`BodyCopy` is only for white and data views"

---

## Example 11: Form Page with Correct Text Components

### User Request
> "Create a form page with input fields and helper text"

### AI Agent Process

1. **Identify view type**
   - Form page = whiteView
   - whiteView uses `BodyCopy` for body text (NOT `GradientText`)

2. **Generate implementation**

```tsx
import {
  AuraLayout,
  BodyCopy,
  Layout,
  Navbar,
  Button,
  InputField,
  type ViewsConfig
} from 'lola-framework-ui-test';
import { useState } from 'react';

interface FormPageProps {
  theme: ViewsConfig;
}

function FormPage({ theme }: FormPageProps) {
  const [email, setEmail] = useState('');
  
  return (
    <AuraLayout colorConfig={theme.whiteView}>
      <Layout.Header>
        <Navbar
          color={theme.whiteView.title}
          title="Formulario"
          align="center"
        />
      </Layout.Header>

      <Layout.Content>
        <form>
          <InputField
            name="email"
            type="email"
            label="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* CORRECT: Use BodyCopy without props */}
          <BodyCopy>
            Ingresa tu correo electrónico para continuar
          </BodyCopy>
        </form>
      </Layout.Content>

      <Layout.Footer>
        <Button
          type="submit"
          showIcon
          size="large"
          background={theme.whiteView.backgroundBtn}
          color={theme.whiteView.textColorBtn}
        >
          Continuar
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
}

export default FormPage;
```

3. **Explain key points**
   - "Form pages typically use `whiteView` configuration"
   - "Use `BodyCopy` for body text in white and data views"
   - "Use `GradientText` only in gradient views (primaryMesh, special, error)"

---

## Text Component Selection Guide

### Quick Reference for AI Agents

When implementing views, always check the view type first:

| View Type | Body Text Component | Example Usage |
|-----------|---------------------|---------------|
| **errorView** | `GradientText` | `<GradientText as="p" className="lola-body-copy bodycopy" textColor={...}>` |
| **primaryMeshGradientView** | `GradientText` | `<GradientText as="p" className="lola-body-copy bodycopy" textColor={...}>` |
| **specialView** | `GradientText` | `<GradientText as="p" className="lola-body-copy bodycopy" textColor={...}>` |
| **whiteView** | `BodyCopy` | `<BodyCopy>Text</BodyCopy>` (no props by default) |
| **dataView** | `BodyCopy` | `<BodyCopy>Text</BodyCopy>` (no props by default) |

### Common Mistakes to Avoid

❌ **WRONG**: Using BodyCopy in error view
```tsx
<AuraLayout colorConfig={theme.errorView}>
  <BodyCopy textColor={theme.errorView.bodyCopy}>
    Error message
  </BodyCopy>
</AuraLayout>
```

✅ **CORRECT**: Using GradientText in error view
```tsx
<AuraLayout colorConfig={theme.errorView}>
  <GradientText 
    as="p" 
    className="lola-body-copy bodycopy"
    textColor={theme.errorView.bodyCopy}
  >
    Error message
  </GradientText>
</AuraLayout>
```

❌ **WRONG**: Adding textColor to BodyCopy without being asked
```tsx
<AuraLayout colorConfig={theme.whiteView}>
  <BodyCopy textColor={theme.whiteView.bodyCopy}>
    Text
  </BodyCopy>
</AuraLayout>
```

✅ **CORRECT**: Using BodyCopy without props
```tsx
<AuraLayout colorConfig={theme.whiteView}>
  <BodyCopy>
    Text
  </BodyCopy>
  
  {/* Only add color if user explicitly requests it */}
  <BodyCopy style={{ color: '#0EA5E9' }}>
    Blue text (only when user asks)
  </BodyCopy>
</AuraLayout>
```

---

These examples demonstrate how AI agents should use the MCP server to provide accurate, helpful, and complete assistance with Lola Framework UI components, including proper text component selection based on view type.
