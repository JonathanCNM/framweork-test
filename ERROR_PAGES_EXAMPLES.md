# Error Pages - Code Examples & Explanations

This document provides annotated code examples to help understand the Lola Framework UI error page implementation pattern.

## Example 1: Basic Error Page Structure

```tsx
import {
  AuraLayout,      // ← Main layout wrapper with themed background
  BodyCopy,        // ← Themed body text component
  Button,          // ← Themed button component
  Layout,          // ← Layout sections (Header/Content/Footer)
  PageTitle,       // ← Themed title component with highlight support
} from "../../components";
import { WarningIcon } from "../../icons";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";

export const GenericErrorPage = ({ theme }: { theme: IViewConfig }) => {
  // STEP 1: Extract colors from theme.errorView
  const {
    iconColors,      // Colors for the icon (gradient)
    backgroundIcon,  // Background color for the icon circle
    title,          // Color for main title text
    subtitile,      // Color for subtitle text
    bodyCopy,       // Color for body text
    backgroundBtn,  // Button background color
    textColorBtn,   // Button text color
  } = theme.errorView;

  return (
    // STEP 2: Wrap everything in AuraLayout with colorConfig
    <AuraLayout colorConfig={theme.errorView}>
      
      {/* STEP 3: Use Layout.Content for main content */}
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          
          {/* STEP 4: Icon in elevated circle */}
          <ElevatedCircle background={backgroundIcon}>
            <WarningIcon colors={iconColors} />
          </ElevatedCircle>

          {/* STEP 5: Title with colors from theme */}
          <PageTitle
            highlight="Something went"
            highlightColor={title}
            secudnary="wrong"
            secudnaryColor={subtitile}
          />

          {/* STEP 6: Body text with color from theme */}
          <BodyCopy textColor={bodyCopy} className="mt-4">
            Error message goes here
          </BodyCopy>
        </div>
      </Layout.Content>

      {/* STEP 7: Use Layout.Footer for action buttons */}
      <Layout.Footer>
        <Button
          showIcon
          size="large"
          type="button"
          background={backgroundBtn}
          color={textColorBtn}
        >
          Try Again
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
};
```

## Example 2: Customizable Error Page with Props

```tsx
interface GenericErrorPageProps {
  theme: IViewConfig;           // ← Required: theme configuration
  title?: string;               // ← Optional: custom title
  subtitle?: string;            // ← Optional: custom subtitle
  message?: string;             // ← Optional: custom message
  buttonText?: string;          // ← Optional: custom button text
  onButtonClick?: () => void;   // ← Optional: button click handler
}

export const GenericErrorPage = ({
  theme,
  title = "Something went",        // Default values
  subtitle = "wrong",
  message = "We encountered an unexpected error.",
  buttonText = "Try Again",
  onButtonClick,
}: GenericErrorPageProps) => {
  const {
    iconColors,
    backgroundIcon,
    title: titleColor,              // Rename to avoid conflict
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
            highlight={title}                // Use prop value
            highlightColor={titleColor}      // Use theme color
            secudnary={subtitle}             // Use prop value
            secudnaryColor={subtitile}       // Use theme color
          />

          <BodyCopy textColor={bodyCopy} className="mt-4">
            {message}                        // Use prop value
          </BodyCopy>
        </div>
      </Layout.Content>
      
      <Layout.Footer>
        <Button
          showIcon
          size="large"
          type="button"
          background={backgroundBtn}
          color={textColorBtn}
          onClick={onButtonClick}           // Use prop handler
        >
          {buttonText}                      // Use prop value
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
};
```

## Example 3: Usage in a Real Application

```tsx
import { useState } from 'react';
import { GenericErrorPage } from './demo/pages/GenericErrorPage';
import { NotFoundErrorPage } from './demo/pages/NotFoundErrorPage';
import { NetworkErrorPage } from './demo/pages/NetworkErrorPage';
import { useTheme } from './hooks/useTheme';

function MyApp() {
  const [errorType, setErrorType] = useState<string | null>(null);
  const theme = useTheme(themeConfig);

  // Example: API call with error handling
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        if (response.status === 404) {
          setErrorType('404');
        } else if (response.status >= 500) {
          setErrorType('server');
        }
      }
    } catch (error) {
      // Network error
      setErrorType('network');
    }
  };

  // Show appropriate error page
  if (errorType === '404') {
    return (
      <NotFoundErrorPage
        theme={theme}
        onGoHome={() => {
          setErrorType(null);
          // Navigate to home
        }}
      />
    );
  }

  if (errorType === 'network') {
    return (
      <NetworkErrorPage
        theme={theme}
        onRetry={() => {
          setErrorType(null);
          fetchData(); // Retry the request
        }}
      />
    );
  }

  if (errorType === 'server') {
    return (
      <GenericErrorPage
        theme={theme}
        title="Server Error"
        subtitle="occurred"
        message="Our servers are experiencing issues. Please try again later."
        buttonText="Try Again"
        onButtonClick={() => {
          setErrorType(null);
          fetchData();
        }}
      />
    );
  }

  // Normal app content
  return <YourNormalContent />;
}
```

## Example 4: Error Boundary Integration

```tsx
import React, { Component, ReactNode } from 'react';
import { GenericErrorPage } from './demo/pages/GenericErrorPage';
import type { IViewConfig } from './hooks/useTheme';

interface ErrorBoundaryProps {
  children: ReactNode;
  theme: IViewConfig;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <GenericErrorPage
          theme={this.props.theme}
          title="Application Error"
          subtitle="occurred"
          message="An unexpected error occurred in the application."
          buttonText="Reload Page"
          onButtonClick={() => {
            window.location.reload();
          }}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## Example 5: Router Integration with React Router

```tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFoundErrorPage } from './demo/pages/NotFoundErrorPage';
import { useTheme } from './hooks/useTheme';

function App() {
  const theme = useTheme(themeConfig);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage theme={theme} />,
    },
    {
      path: '/about',
      element: <AboutPage theme={theme} />,
    },
    {
      // 404 catch-all route
      path: '*',
      element: (
        <NotFoundErrorPage
          theme={theme}
          onGoHome={() => {
            window.location.href = '/';
          }}
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
```

## Example 6: Custom Icon Error Page

```tsx
import {
  AuraLayout,
  BodyCopy,
  Button,
  Layout,
  PageTitle,
} from "../../components";
import { ErrorUserIcon } from "../../icons";  // ← Different icon
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";

export const UserErrorPage = ({ theme }: { theme: IViewConfig }) => {
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
            {/* Use a different icon for user-related errors */}
            <ErrorUserIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="Account"
            highlightColor={title}
            secudnary="Suspended"
            secudnaryColor={subtitile}
          />

          <BodyCopy textColor={bodyCopy} className="mt-4">
            Your account has been suspended. <br />
            Please contact support for more information.
          </BodyCopy>
        </div>
      </Layout.Content>
      
      <Layout.Footer>
        <Button
          showIcon
          size="large"
          type="button"
          background={backgroundBtn}
          color={textColorBtn}
          onClick={() => window.open('mailto:support@example.com')}
        >
          Contact Support
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
};
```

## Key Patterns Summary

### ✅ DO's

```tsx
// ✅ Always extract colors from theme.errorView
const { title, subtitle, bodyCopy } = theme.errorView;

// ✅ Always wrap in AuraLayout with colorConfig
<AuraLayout colorConfig={theme.errorView}>

// ✅ Use Layout.Content and Layout.Footer
<Layout.Content>...</Layout.Content>
<Layout.Footer>...</Layout.Footer>

// ✅ Use ElevatedCircle for icons
<ElevatedCircle background={backgroundIcon}>
  <Icon colors={iconColors} />
</ElevatedCircle>

// ✅ Use PageTitle with theme colors
<PageTitle
  highlight="Title"
  highlightColor={title}
  secudnary="Subtitle"
  secudnaryColor={subtitle}
/>

// ✅ Use BodyCopy with theme color
<BodyCopy textColor={bodyCopy}>Message</BodyCopy>

// ✅ Use Button with theme colors
<Button
  background={backgroundBtn}
  color={textColorBtn}
>
  Action
</Button>
```

### ❌ DON'Ts

```tsx
// ❌ Don't hardcode colors
<Button background="#ff0000" color="#fff">

// ❌ Don't use inline styles for colors
<div style={{ color: '#333' }}>

// ❌ Don't skip AuraLayout
<Layout.Content>...</Layout.Content>

// ❌ Don't forget colorConfig prop
<AuraLayout>  // Missing colorConfig!

// ❌ Don't use manual CSS for theming
<div className="my-custom-error-page">
```

## Testing Your Error Page

```tsx
// Create a test component to preview your error page
function ErrorPageTest() {
  const theme = useTheme(defaultTheme);

  return (
    <div>
      <YourErrorPage theme={theme} />
    </div>
  );
}

// Test with different themes
function ThemeTest() {
  const lightTheme = useTheme({ ...config, lightness: 'light' });
  const darkTheme = useTheme({ ...config, lightness: 'dark' });

  return (
    <div>
      <h2>Light Theme</h2>
      <YourErrorPage theme={lightTheme} />
      
      <h2>Dark Theme</h2>
      <YourErrorPage theme={darkTheme} />
    </div>
  );
}
```

## Common Mistakes & Solutions

### Mistake 1: Missing colorConfig
```tsx
// ❌ Wrong
<AuraLayout>
  <Layout.Content>...</Layout.Content>
</AuraLayout>

// ✅ Correct
<AuraLayout colorConfig={theme.errorView}>
  <Layout.Content>...</Layout.Content>
</AuraLayout>
```

### Mistake 2: Hardcoded Colors
```tsx
// ❌ Wrong
<Button background="#667eea" color="#fff">

// ✅ Correct
<Button background={backgroundBtn} color={textColorBtn}>
```

### Mistake 3: Wrong View Type
```tsx
// ❌ Wrong - using wrong view type
const { title } = theme.primaryMeshGradientView;

// ✅ Correct - use errorView for error pages
const { title } = theme.errorView;
```

### Mistake 4: Not Using Layout Components
```tsx
// ❌ Wrong
<AuraLayout colorConfig={theme.errorView}>
  <div>
    <h1>Error</h1>
    <p>Message</p>
    <button>Retry</button>
  </div>
</AuraLayout>

// ✅ Correct
<AuraLayout colorConfig={theme.errorView}>
  <Layout.Content>
    <PageTitle highlight="Error" highlightColor={title} />
    <BodyCopy textColor={bodyCopy}>Message</BodyCopy>
  </Layout.Content>
  <Layout.Footer>
    <Button background={backgroundBtn} color={textColorBtn}>
      Retry
    </Button>
  </Layout.Footer>
</AuraLayout>
```

## Available Icons for Error Pages

```tsx
import {
  ErrorIcon,              // General error icon
  WarningIcon,            // Warning/alert icon
  IproovCameraErrorIcon,  // Camera/verification error
  CameraErrorIcon,        // Camera error
  ErrorUserIcon,          // User-related error
} from "../../icons";

// All icons accept these props:
<WarningIcon 
  size={66}                    // Optional, default varies
  colors={iconColors}          // Array of two colors for gradient
/>
```

---

These examples demonstrate the complete pattern for implementing error pages in the Lola Framework UI. Follow these patterns to create consistent, themed error pages across your application.
