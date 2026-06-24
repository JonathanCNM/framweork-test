# Lola Framework UI - Complete Implementation Guide

This guide walks you through the complete setup of Lola Framework UI, from installing the library to configuring AI-assisted development with MCP.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Part 1: Installing the UI Kit in Your Project](#part-1-installing-the-ui-kit-in-your-project)
3. [Part 2: Setting Up the MCP Server (for AI Assistance)](#part-2-setting-up-the-mcp-server-for-ai-assistance)
4. [Part 3: Using the Components](#part-3-using-the-components)
5. [Troubleshooting](#troubleshooting)
6. [Next Steps](#next-steps)

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **npm** or **pnpm** package manager
- **React 18+** in your project
- **TypeScript** (recommended but optional)
- **Claude Desktop** or **Cursor IDE** (optional, for AI assistance)

Check your versions:
```bash
node --version  # Should be 18 or higher
npm --version
```

---

## Part 1: Installing the UI Kit in Your Project

### Step 1.1: Install the Package

Navigate to your React project directory and install Lola Framework UI:

```bash
# Using npm
npm install lola-framework-ui-test

# Using pnpm
pnpm add lola-framework-ui-test

# Using yarn
yarn add lola-framework-ui-test
```

**Note:** The package requires React 18+ as a peer dependency. If you don't have it:

```bash
npm install react@^18.3.1 react-dom@^18.3.1
```

### Step 1.2: Import Global Styles

In your main entry file (usually `src/main.tsx`, `src/index.tsx`, or `src/App.tsx`), import the global CSS:

```tsx
// src/main.tsx or src/App.tsx
import 'lola-framework-ui-test/dist/styles.css';

// ... rest of your imports and app code
```

**Important:** Import this CSS file **only once** in your application's entry point.

### Step 1.3: Verify Installation

Create a simple test component to verify everything works:

```tsx
// src/components/TestLola.tsx
import { Button } from 'lola-framework-ui-test';

export function TestLola() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Lola Framework UI Test</h1>
      <Button 
        background="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
        color="#fff"
        onClick={() => alert('Lola UI is working!')}
      >
        Click Me!
      </Button>
    </div>
  );
}
```

Import and render this component in your app. If you see a gradient button, you're all set!

### Step 1.4: TypeScript Configuration (Optional but Recommended)

If using TypeScript, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "types": ["react", "react-dom"]
  }
}
```

---

## Part 2: Setting Up the MCP Server (for AI Assistance)

The MCP (Model Context Protocol) server enables AI assistants like Claude and Cursor to access Lola Framework UI documentation and help you implement components.

### Step 2.1: Clone or Access the Lola Framework Repository

If you want AI assistance, you'll need access to the Lola Framework UI repository (this project):

```bash
# If you don't have it yet, clone the repository
git clone https://github.com/JonathanCNM/framweork-test.git lola-framework-ui-test
cd lola-framework-ui-test
```

**Important:** Note the **absolute path** to this directory. You'll need it later.

```bash
# Get absolute path on macOS/Linux
pwd

# On Windows (PowerShell)
cd
```

### Step 2.2: Build the MCP Server

Navigate to the MCP server directory and build it:

```bash
cd ai-docs/mcp-server
npm install
npm run build
```

You should see output like:
```
Successfully compiled 1 file with swc
```

### Step 2.3: Configure MCP in Your AI Assistant

Choose your AI assistant and follow the corresponding instructions:

#### Option A: Claude Desktop

1. **Locate the config file:**
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. **Create or edit the file** with this configuration:

```json
{
  "mcpServers": {
    "lola-framework-ui": {
      "command": "node",
      "args": [
        "/absolute/path/to/lola-framework-ui-test/ai-docs/mcp-server/dist/index.js"
      ]
    }
  }
}
```

**Replace `/absolute/path/to/` with your actual absolute path!**

3. **Restart Claude Desktop completely** (Quit and reopen, not just close the window)

#### Option B: Cursor IDE

1. **Open Cursor Settings:**
   - Press `Cmd + ,` (Mac) or `Ctrl + ,` (Windows/Linux)
   - Or go to `Cursor → Settings`

2. **Search for "MCP"** in settings

3. **Edit the MCP configuration file** (`.cursor/mcp.json` or add to user settings):

```json
{
  "mcpServers": {
    "lola-framework-ui": {
      "command": "node",
      "args": [
        "/absolute/path/to/lola-framework-ui-test/ai-docs/mcp-server/dist/index.js"
      ]
    }
  }
}
```

**Replace `/absolute/path/to/` with your actual absolute path!**

4. **Restart Cursor IDE**

### Step 2.4: Verify MCP Connection

Ask your AI assistant:

```
What components are available in Lola Framework UI?
```

If configured correctly, you should get a response listing components like Button, InputField, Select, etc.

**Alternative test questions:**
- "Show me how to use the Button component from Lola Framework"
- "What form components are in Lola Framework?"
- "Create an email input with validation using Lola Framework"

---

## Part 3: Using the Components

### Basic Usage Examples

#### Example 1: Button with Gradient

```tsx
import { Button } from 'lola-framework-ui-test';

function MyComponent() {
  return (
    <Button
      background="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
      color="#fff"
      onClick={() => console.log('Clicked!')}
    >
      Gradient Button
    </Button>
  );
}
```

#### Example 2: Validated Input Field

```tsx
import { InputField } from 'lola-framework-ui-test';
import { useState } from 'react';

function EmailForm() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(regex.test(value));
  };

  return (
    <InputField
      name="email"
      type="email"
      label="Email Address"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
      }}
      isValid={isValid}
      activeColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
      errorColor="#fd2a35"
      required
    />
  );
}
```

#### Example 3: Select Dropdown

```tsx
import { Select } from 'lola-framework-ui-test';
import { useState } from 'react';

function CountrySelector() {
  const [country, setCountry] = useState('');

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' }
  ];

  return (
    <Select
      name="country"
      label="Select Country"
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      options={countries}
      searchable
    />
  );
}
```

### Using AI Assistance

Once MCP is configured, you can ask your AI assistant for help:

**Example prompts:**
- "Create a login form with email and password using Lola Framework UI"
- "Show me how to implement a multi-step form with Lola components"
- "What props does the Button component accept?"
- "Create a contact form with validation using Lola Framework"

The AI will have access to:
- Complete component documentation
- Prop definitions and types
- Usage examples
- Best practices
- Styling options

---

## Important Notes & Common Pitfalls

### React Version Compatibility

**CRITICAL:** Lola Framework UI is built with **React 18.3.1**. You must use React 18.x in your project.

```bash
# If you have React 19, downgrade to React 18
npm install react@18.3.1 react-dom@18.3.1
```

**Why?** Using React 19 with a React 18 library causes the error:
```
Cannot read properties of undefined (reading 'ReactCurrentDispatcher')
```

### Component Requirements

Some Lola Framework UI components require specific props or context providers:

#### ✅ Safe Components (No Setup Required)
- `Button` - Works out of the box
- `InputField` - Works out of the box
- `Select` - Works out of the box
- `GradientText` - Works out of the box
- `Title` / `PageTitle` - Works out of the box

#### ⚠️ Components Requiring Context
- `AuraLayout` - Requires theme context or specific props
- `Layout` - May require configuration

**Recommendation:** Start with simple components like `Button` and `InputField` before using layout components.

### Vite Configuration for Local Development

When testing the library locally (not from npm), add this to your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['lola-framework-ui-test'],
    force: true,
  },
})
```

This prevents React duplicate instances when using a local package.

### Component Usage Best Practices

1. **Import Only What You Need**
   ```tsx
   // Good
   import { Button, InputField } from 'lola-framework-ui-test';
   
   // Avoid (imports everything)
   import * as Lola from 'lola-framework-ui-test';
   ```

2. **Always Provide Required Props**
   ```tsx
   // Button - background and color are optional but recommended
   <Button
     background="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
     color="#fff"
   >
     Click Me
   </Button>
   
   // InputField - name, value, and onChange are required
   <InputField
     name="email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     label="Email"
   />
   ```

3. **Test Components Individually**
   - Start with one component (e.g., Button)
   - Verify it works before adding more
   - This helps isolate issues quickly

4. **Check Console for Warnings**
   - Missing required props will show warnings
   - TypeScript will catch many issues at compile time

---

## Troubleshooting

### Package Installation Issues

**Problem:** `npm install` fails with peer dependency warnings

**Solution:**
```bash
# Install React 18 if you don't have it
npm install react@^18.3.1 react-dom@^18.3.1

# Then retry
npm install lola-framework-ui-test
```

---

**Problem:** Styles not loading

**Solution:** Ensure you've imported the CSS in your main entry file:
```tsx
import 'lola-framework-ui-test/dist/styles.css';
```

---

### MCP Server Issues

**Problem:** MCP server not appearing in Claude/Cursor

**Solutions:**
1. **Verify the path is absolute:**
   ```bash
   # macOS/Linux
   pwd
   
   # Windows PowerShell
   cd
   ```
   Copy the output and use it in your config

2. **Check the build succeeded:**
   ```bash
   cd ai-docs/mcp-server
   ls dist/index.js  # File should exist
   ```

3. **Verify Node.js version:**
   ```bash
   node --version  # Should be 18+
   ```

4. **Restart your AI assistant completely** (not just reload)

5. **Check logs:**
   - **Claude Desktop**: Help → View Logs
   - **Cursor**: View → Output → Select "MCP"

---

**Problem:** Components not loading in AI responses

**Solution:**
1. Check JSON files exist:
   ```bash
   ls ai-docs/components/*.json
   ```
   
2. Rebuild the server:
   ```bash
   cd ai-docs/mcp-server
   npm run build
   ```

3. Restart your AI assistant

---

**Problem:** Changes to documentation not reflecting

**Solution:**
```bash
# 1. Rebuild the MCP server
cd ai-docs/mcp-server
npm run build

# 2. Restart your AI assistant completely
```

---

### TypeScript Issues

**Problem:** Type errors when importing components

**Solution:** Ensure your `tsconfig.json` has proper module resolution:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

### Common Component Issues

**Problem:** Button not showing gradient

**Solution:** Use the `background` prop with a CSS gradient:
```tsx
<Button background="linear-gradient(90deg, #667eea 0%, #764ba2 100%)">
  Button Text
</Button>
```

---

**Problem:** InputField label not floating

**Solution:** Make sure you're using the `label` prop:
```tsx
<InputField
  name="email"
  label="Email"  // Required for floating label
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

## Next Steps

### For Developers Using the Library

1. **Explore Components:** Ask your AI assistant "What components are available in Lola Framework?"
2. **Build Forms:** Try creating complex forms with validation
3. **Custom Styling:** Learn about CSS variables for theming
4. **Check Storybook:** Run `npm run storybook` in the Lola Framework repo to see all components

### For Contributors

1. **Add Documentation:** Create JSON docs for undocumented components
2. **Improve Examples:** Add more usage examples to existing docs
3. **Build Components:** Create new components following Lola patterns
4. **Update Schema:** Enhance the documentation schema

### Quick Reference Commands

```bash
# In your project (using Lola UI)
npm install lola-framework-ui-test

# In Lola Framework repo (for MCP)
cd ai-docs/mcp-server
npm install && npm run build

# Rebuild MCP after doc changes
cd ai-docs/mcp-server && npm run build

# Watch mode for MCP development
cd ai-docs/mcp-server && npm run dev
```

---

## Resources

- **Component Documentation:** `ai-docs/components/`
- **MCP Server:** `ai-docs/mcp-server/`
- **Schema Definition:** `ai-docs/schema/component-schema.json`
- **Quick Start:** `ai-docs/QUICK_START.md`
- **Examples:** `ai-docs/EXAMPLES.md`

## Getting Help

- **Installation Issues:** Check this guide's Troubleshooting section
- **Component Usage:** Ask your AI assistant (if MCP is configured)
- **MCP Server Issues:** See `ai-docs/mcp-server/README.md`
- **Contributing:** See `ai-docs/CONTRIBUTING.md`

---

## Summary Checklist

### ✅ Installing the Library

- [ ] Install `lola-framework-ui-test` in your project
- [ ] Import CSS in your main entry file
- [ ] Test with a simple component
- [ ] Configure TypeScript (if applicable)

### ✅ Setting Up MCP

- [ ] Clone/access Lola Framework UI repository
- [ ] Build the MCP server (`npm run build`)
- [ ] Get absolute path to MCP server
- [ ] Configure Claude Desktop or Cursor
- [ ] Restart AI assistant
- [ ] Test MCP connection with a question

### ✅ Start Building

- [ ] Import components in your project
- [ ] Use AI assistance for implementation
- [ ] Refer to examples and documentation
- [ ] Customize with props and CSS variables

---

**You're all set!** Start building beautiful UIs with Lola Framework UI and AI-powered development assistance. 🚀

**Pro Tip:** Always ask your AI assistant for help with component implementation. With MCP configured, it has access to complete, up-to-date documentation and can generate production-ready code instantly.
