# Lola Framework UI - Hooks Reference

Complete reference of all available hooks in the Lola Framework UI library.

## Table of Contents

- [Theme Hooks](#theme-hooks)
- [Utility Hooks](#utility-hooks)
- [Quick Import Guide](#quick-import-guide)

---

## Theme Hooks

### New Theme System (Recommended)

#### useLolaTheme
Main hook for theme configuration.

```typescript
import { useLolaTheme } from '@lola-framework-ui/hooks';

const theme = useLolaTheme(kapitalTheme);
```

**See:** [THEME_SYSTEM_GUIDE.md](./THEME_SYSTEM_GUIDE.md)

#### useLolaView
Access specific view configuration.

```typescript
import { useLolaView } from '@lola-framework-ui/hooks';

const dataView = useLolaView(theme, 'dataView');
```

#### useViewConfig
Generate view configurations from colors.

```typescript
import { useViewConfig } from '@lola-framework-ui/hooks';

const { views } = useViewConfig(colorPalette);
```

#### useCSSVariables
Manage CSS custom properties.

```typescript
import { useCSSVariables } from '@lola-framework-ui/hooks';

useCSSVariables(colors, fontFamily, viewConfig);
```

#### useFonts
Load and manage custom fonts.

```typescript
import { useFonts } from '@lola-framework-ui/hooks';

const { onChangeFont } = useFonts({ 
  name: 'Inter', 
  cdn: 'https://...' 
});
```

### Legacy Theme Hooks

#### useTheme (deprecated)
Legacy theme hook - still fully functional.

```typescript
import { useTheme } from '@lola-framework-ui/hooks';

const { generateColorsByView } = useTheme(fontConfig);
```

⚠️ **Deprecated:** Use `useLolaTheme` for new code.

---

## Utility Hooks

### useKeyboardVisible
Detect virtual keyboard state on mobile devices.

```typescript
import { useKeyboardVisible } from '@lola-framework-ui/hooks';

function MyComponent() {
  const { isKeyboardOpen, viewportHeight, handlerSetIsKeyboardOpen } = useKeyboardVisible();
  
  return (
    <div style={{ height: viewportHeight }}>
      {isKeyboardOpen && <p>Keyboard is open</p>}
    </div>
  );
}
```

**Returns:**
- `isKeyboardOpen: boolean` - Whether virtual keyboard is visible
- `viewportHeight: number` - Current viewport height
- `handlerSetIsKeyboardOpen: (isOpen: boolean) => void` - Manually control keyboard state

**Use Cases:**
- Adjust layout when keyboard appears
- Detect mobile keyboard state
- Manage scroll behavior with keyboard

---

### useLocalStorage
Reactive local storage utilities.

```typescript
import { setLocalStorage, listenLocalStorage } from '@lola-framework-ui/hooks';

// Set value and trigger listeners
setLocalStorage('myKey', 'myValue');

// Listen to changes
const unlisten = listenLocalStorage('myKey', () => {
  console.log('Value changed!');
});

// Clean up
unlisten();
```

**Exports:**
- `setLocalStorage(key: string, value: string): void` - Set value and notify listeners
- `listenLocalStorage(key: string, callback: () => void): () => void` - Listen to changes
- `storageEventTarget: EventTarget` - Event target for storage events

**Use Cases:**
- Cross-component state sync
- Persistent user preferences
- Multi-tab communication

---

### useBlockScroll
Disable page scrolling (useful for modals, drawers).

```typescript
import { useBlockScroll } from '@lola-framework-ui/hooks';

function Modal() {
  useBlockScroll(); // Automatically blocks scroll on mount
  
  return <div className="modal">Modal content</div>;
}
```

**Behavior:**
- Blocks scroll on mount
- Restores scroll on unmount
- Uses `body-scroll-lock` library
- Prevents scroll bar gap

**Use Cases:**
- Modal dialogs
- Side drawers
- Full-screen overlays
- Mobile menus

---

### usePreventReload
Prevent accidental page reloads.

```typescript
import { usePreventReload } from '@lola-framework-ui/hooks';

function FormComponent() {
  const hasUnsavedChanges = true;
  
  usePreventReload(hasUnsavedChanges);
  
  return <form>{/* ... */}</form>;
}
```

**Parameters:**
- `shouldPrevent?: boolean` - Whether to prevent reload (default: false)

**Prevents:**
- F5 key
- Ctrl/Cmd + R
- Browser refresh button (shows warning)

**Use Cases:**
- Forms with unsaved data
- Long-running operations
- Prevent accidental data loss

---

### useVgsCollectLoader
Load VGS Collect library for secure payment forms.

```typescript
import { useVgsCollectLoader } from '@lola-framework-ui/hooks';

function PaymentForm() {
  const { isVGSLoaded, isVGSLoading, vgsError } = useVgsCollectLoader({
    vgsVaultId: 'your-vault-id',
    vgsEnvironment: 'sandbox',
    vgsVersion: '2.25.0' // Optional
  });
  
  if (isVGSLoading) return <div>Loading secure form...</div>;
  if (vgsError) return <div>Error: {vgsError}</div>;
  if (!isVGSLoaded) return null;
  
  return <div>{/* VGS Collect form */}</div>;
}
```

**Parameters:**
- `vgsVaultId: string` - Your VGS vault ID
- `vgsEnvironment: string` - Environment (sandbox, live, etc.)
- `vgsVersion?: string` - VGS Collect version (default: '2.25.0')

**Returns:**
- `isVGSLoaded: boolean` - Whether VGS is loaded and ready
- `isVGSLoading: boolean` - Whether VGS is currently loading
- `vgsError: string | null` - Error message if loading failed

**Use Cases:**
- Secure payment forms
- PCI-compliant card input
- Sensitive data collection

---

## Quick Import Guide

### Import All from Index

```typescript
// Theme hooks
import { 
  useLolaTheme, 
  useLolaView,
  useFonts,
  useViewConfig,
  useCSSVariables 
} from '@lola-framework-ui/hooks';

// Utility hooks
import {
  useKeyboardVisible,
  useBlockScroll,
  usePreventReload,
  useVgsCollectLoader,
  setLocalStorage,
  listenLocalStorage
} from '@lola-framework-ui/hooks';

// Types
import type {
  LolaThemeConfig,
  ViewsConfig,
  UseVgsCollectLoaderProps
} from '@lola-framework-ui/hooks';
```

### Import from Individual Files

```typescript
// If you need more specific imports
import { useLolaTheme } from '@lola-framework-ui/hooks/useLolaTheme';
import { useKeyboardVisible } from '@lola-framework-ui/hooks/useKeyboardVisible';
```

---

## Hooks by Category

### 🎨 Theme & Styling
- `useLolaTheme` - Main theme configuration
- `useLolaView` - Specific view config
- `useFonts` - Font management
- `useViewConfig` - View generation
- `useCSSVariables` - CSS custom properties
- `useTheme` - Legacy theme hook (deprecated)

### 📱 Mobile & Input
- `useKeyboardVisible` - Virtual keyboard detection
- `useBlockScroll` - Scroll management

### 💾 Storage & State
- `setLocalStorage` - Set local storage with events
- `listenLocalStorage` - Listen to storage changes

### 🔒 Security & Forms
- `useVgsCollectLoader` - Secure payment forms

### 🛡️ Browser Behavior
- `usePreventReload` - Prevent accidental reloads

---

## Migration Guide

If you're migrating from old imports:

```typescript
// Old
import { useTheme } from './hooks/useTheme';

// New (both work, new is recommended)
import { useLolaTheme } from '@lola-framework-ui/hooks';
```

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for complete migration instructions.

---

## Examples

### Complete Theme Setup

```typescript
import { useLolaTheme, useKeyboardVisible } from '@lola-framework-ui/hooks';
import { kapitalTheme } from './constants';

function App() {
  const theme = useLolaTheme(kapitalTheme);
  const { isKeyboardOpen, viewportHeight } = useKeyboardVisible();
  
  return (
    <div style={{ 
      background: theme.views.primaryMeshGradientView.background,
      minHeight: viewportHeight 
    }}>
      <h1 className="h1">My App</h1>
    </div>
  );
}
```

### Modal with Scroll Lock

```typescript
import { useBlockScroll } from '@lola-framework-ui/hooks';

function Modal({ onClose }) {
  useBlockScroll();
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        {/* Modal content */}
      </div>
    </div>
  );
}
```

### Form with Unsaved Changes Warning

```typescript
import { usePreventReload } from '@lola-framework-ui/hooks';
import { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  
  usePreventReload(hasChanges);
  
  return (
    <form onChange={() => setHasChanges(true)}>
      {/* Form fields */}
    </form>
  );
}
```

---

## TypeScript Support

All hooks are fully typed with TypeScript:

```typescript
import type { 
  UseLolaThemeReturn,
  UseFontsProps,
  UseVgsCollectLoaderProps,
  LolaThemeConfig 
} from '@lola-framework-ui/hooks';

const config: LolaThemeConfig = {
  // Full type checking
};

const theme: UseLolaThemeReturn = useLolaTheme(config);
```

---

## Additional Resources

- **Theme System:** [THEME_SYSTEM_GUIDE.md](./THEME_SYSTEM_GUIDE.md)
- **API Reference:** [THEME_API_REFERENCE.md](./THEME_API_REFERENCE.md)
- **Migration:** [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- **Examples:** [examples/](./examples/)

---

**Last Updated:** 2026-06-24  
**Version:** 0.3.1
