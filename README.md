# lola-framework-ui

A modern React TypeScript component library built with Vite, designed for publishing as a style framework on npm.

## Features

- 🚀 Built with Vite for fast development and building
- 📦 TypeScript support with full type definitions
- 🎨 CSS-in-CSS approach with CSS variables for theming
- 🔧 Optimized for tree-shaking
- 📝 Comprehensive TypeScript interfaces
- 🌟 Modern React patterns and best practices

## Installation

```bash
npm install lola-framework-ui
```

## Usage

### Import Components

```typescript
import { Button } from "lola-framework-ui";
import "lola-framework-ui/styles";
```

### Button Component

```typescript
import { Button } from "lola-framework-ui";

function MyComponent() {
  return (
    <div>
      <Button variant="primary" size="medium">
        Click me!
      </Button>
      <Button variant="success" size="large">
        Success
      </Button>
      <Button variant="outline" size="small">
        Outline
      </Button>
    </div>
  );
}
```

## Components

### Button

The Button component supports various variants and sizes:

**Props:**

- `variant`: 'primary' | 'success' | 'outline' (default: 'primary')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- All standard HTML button attributes

## Theming

The library uses CSS variables for easy theming:

```css
:root {
  --lola-primary-color: #2e86c1;
  --lola-success-color: #28b463;
  --lola-outline-color: #007bff;
  --lola-text-color: #212529;
  --lola-border-radius: 0.375rem;
  --lola-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  --lola-transition: all 0.2s ease-in-out;
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## Publishing

```bash
# Build the library
npm run build

# Publish to npm
npm publish
```

## License

MIT

## Author

Jonathan Narvaez
# lola-framework-ui# framweork-test
