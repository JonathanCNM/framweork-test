# Error Pages Implementation Guide

This guide demonstrates how to implement error pages using the Lola Framework UI components with the view-based pattern.

## Overview

The Lola Framework UI provides a standardized pattern for creating beautiful, themed error pages using the `errorView` configuration from the theme system. All error pages follow the same structure but can be customized for different error scenarios.

## Available Error Pages

### 1. GenericErrorPage

A reusable, customizable error page component for general error states.

**Location:** `src/demo/pages/GenericErrorPage.tsx`

**Usage:**

```tsx
import { GenericErrorPage } from './demo/pages/GenericErrorPage';
import { useTheme } from './hooks/useTheme';

function MyApp() {
  const theme = useTheme(themeConfig);
  
  return (
    <GenericErrorPage
      theme={theme}
      title="Something went"
      subtitle="wrong"
      message="We encountered an unexpected error. Please try again."
      buttonText="Try Again"
      onButtonClick={() => handleRetry()}
    />
  );
}
```

**Props:**

- `theme` (required): The theme configuration object with `errorView`
- `title` (optional): Main title text (default: "Something went")
- `subtitle` (optional): Subtitle text (default: "wrong")
- `message` (optional): Error description message
- `buttonText` (optional): Button label (default: "Try Again")
- `onButtonClick` (optional): Button click handler

### 2. NotFoundErrorPage

A specialized 404 error page for "page not found" scenarios.

**Location:** `src/demo/pages/NotFoundErrorPage.tsx`

**Usage:**

```tsx
import { NotFoundErrorPage } from './demo/pages/NotFoundErrorPage';
import { useTheme } from './hooks/useTheme';

function MyApp() {
  const theme = useTheme(themeConfig);
  
  return (
    <NotFoundErrorPage
      theme={theme}
      onGoHome={() => navigate('/')}
    />
  );
}
```

**Props:**

- `theme` (required): The theme configuration object with `errorView`
- `onGoHome` (optional): Handler for "Go Home" button

### 3. NetworkErrorPage

A specialized error page for network connectivity issues.

**Location:** `src/demo/pages/NetworkErrorPage.tsx`

**Usage:**

```tsx
import { NetworkErrorPage } from './demo/pages/NetworkErrorPage';
import { useTheme } from './hooks/useTheme';

function MyApp() {
  const theme = useTheme(themeConfig);
  
  return (
    <NetworkErrorPage
      theme={theme}
      onRetry={() => retryConnection()}
    />
  );
}
```

**Props:**

- `theme` (required): The theme configuration object with `errorView`
- `onRetry` (optional): Handler for "Retry Connection" button

### 4. IproovError

A specialized error page for identity verification failures.

**Location:** `src/demo/pages/IproovError.tsx`

**Usage:**

```tsx
import { IproovError } from './demo/pages/IproovError';
import { useTheme } from './hooks/useTheme';

function MyApp() {
  const theme = useTheme(themeConfig);
  
  return <IproovError theme={theme} />;
}
```

## Architecture Pattern

All error pages follow the Lola Framework UI view-based pattern:

### 1. Color Configuration

Error pages use `theme.errorView` which provides:

```tsx
const {
  iconColors,        // Color for the icon
  backgroundIcon,    // Background color for the elevated circle
  title,            // Color for the main title
  subtitile,        // Color for the subtitle (note: typo in original theme)
  bodyCopy,         // Color for body text
  backgroundBtn,    // Button background color
  textColorBtn,     // Button text color
} = theme.errorView;
```

### 2. Layout Structure

All error pages use the standard layout structure:

```tsx
<AuraLayout colorConfig={theme.errorView}>
  <Layout.Content>
    <div className="homepage-content elevated-circle-container">
      <ElevatedCircle background={backgroundIcon}>
        <IconComponent colors={iconColors} />
      </ElevatedCircle>

      <PageTitle
        highlight="Main Title"
        highlightColor={title}
        secudnary="Subtitle"
        secudnaryColor={subtitile}
      />

      <BodyCopy textColor={bodyCopy} className="mt-4">
        Error message text
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
      onClick={handleAction}
    >
      Action Button
    </Button>
  </Layout.Footer>
</AuraLayout>
```

### 3. Key Components

- **AuraLayout**: Provides the themed layout with gradient background
- **ElevatedCircle**: Container for the error icon with elevation effect
- **PageTitle**: Displays the error title with color customization
- **BodyCopy**: Shows the error message
- **Button**: Action button for error recovery

## Creating Custom Error Pages

To create a new custom error page, follow this template:

```tsx
import {
  AuraLayout,
  BodyCopy,
  Button,
  Layout,
  PageTitle,
} from "../../components";
import { YourIcon } from "../../icons";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import type { IViewConfig } from "../../hooks/useTheme";

interface YourErrorPageProps {
  theme: IViewConfig;
  onAction?: () => void;
  // Add custom props as needed
}

export const YourErrorPage = ({
  theme,
  onAction,
}: YourErrorPageProps) => {
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
            <YourIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight="Your Title"
            highlightColor={title}
            secudnary="Your Subtitle"
            secudnaryColor={subtitile}
          />

          <BodyCopy textColor={bodyCopy} className="mt-4">
            Your error message here
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
          onClick={onAction}
        >
          Your Action
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
};
```

## Available Icons

The framework provides several icons suitable for error pages:

- `ErrorIcon` - Generic error icon
- `WarningIcon` - Warning/alert icon
- `IproovCameraErrorIcon` - Camera/verification error icon
- `CameraErrorIcon` - Camera error icon
- `ErrorUserIcon` - User-related error icon

All icons accept:
- `size` prop (optional, default varies by icon)
- `colors` prop (array of two colors for gradient)

## Testing the Error Pages

### Local Development

Run the development server and navigate to the error pages demo:

```bash
npm run dev
```

Then visit: `http://localhost:5173/errors`

This will show an interactive demo with buttons to switch between different error page types.

### Integration Testing

To test error pages in your application:

1. Import the desired error page component
2. Pass your theme configuration
3. Provide appropriate handlers for buttons
4. Test with different theme configurations to ensure proper color handling

## Best Practices

1. **Always use theme.errorView**: Never hardcode colors; always use the colors from `theme.errorView`

2. **Consistent structure**: Follow the standard layout pattern (AuraLayout > Layout.Content > Layout.Footer)

3. **Provide handlers**: Always provide click handlers for buttons, even if they just log to console during development

4. **Appropriate icons**: Choose icons that match the error type (ErrorIcon for general errors, WarningIcon for alerts, etc.)

5. **Clear messaging**: Keep error messages concise and actionable

6. **Accessibility**: Ensure error pages are accessible with proper ARIA labels and semantic HTML

## Demo Routes

- `/errors` - Interactive error pages showcase with navigation buttons
- `/` or `/demo` - Full demo slider including error pages
- `/test` - VGS form testing page

## Related Documentation

- [View-Based Implementation Guide](./ai-docs/components/ViewBasedImplementation.json)
- [Component Documentation](./ai-docs/components/)
- [Theme System](./src/hooks/useTheme.ts)

## Notes

- The `subtitile` property name is a typo from the original theme system but is kept for consistency
- Error pages automatically adapt to the theme's light/dark mode settings
- All error pages support the gradient mesh background from AuraLayout
- Button icons are automatically shown when `showIcon` prop is true
