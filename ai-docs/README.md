# Lola Framework UI - AI Documentation

This directory contains AI-readable documentation for the Lola Framework UI component library. The documentation is structured to enable AI agents to understand, search, and implement Lola UI components in external React projects.

## ⭐ IMPORTANT: Start Here

**📖 [IMPLEMENTATION_GUIDE_2026.md](./IMPLEMENTATION_GUIDE_2026.md)** - Complete, authoritative implementation guide updated July 2026 with:
- ✅ Correct import paths (especially for icons)
- ✅ All component patterns and best practices
- ✅ Theme system (including legacy support)
- ✅ Common mistakes and solutions
- ✅ New components documentation
- ✅ Real-world examples

**This guide incorporates years of learnings and iterations. Read it first before implementing.**

## 📁 Directory Structure

```
ai-docs/
├── schema/
│   └── component-schema.json       # JSON Schema for component documentation
├── components/
│   ├── Button.json                 # Button component documentation
│   ├── InputField.json             # InputField component documentation
│   ├── Select.json                 # Select component documentation
│   └── ...                         # Other component docs
├── mcp-server/                     # MCP server for AI agent access
│   ├── src/
│   │   └── index.ts               # MCP server implementation
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
└── README.md                       # This file
```

## 🎯 Purpose

This documentation system enables:

1. **AI Agent Understanding**: Structured JSON documentation that AI agents can parse and understand
2. **MCP Protocol Access**: Real-time access to component documentation via Model Context Protocol
3. **External Project Integration**: AI agents can implement Lola components in any React project
4. **Search & Discovery**: Find components by functionality, props, or use case
5. **Code Generation**: AI agents can generate correct implementation code with proper props

## 🚀 Quick Start

### For AI Assistants (Claude, Cursor, etc.)

1. **Install the MCP Server**
   ```bash
   cd ai-docs/mcp-server
   npm install
   npm run build
   ```

2. **Configure Your AI Assistant**
   
   See [mcp-server/README.md](./mcp-server/README.md) for configuration instructions for:
   - Claude Desktop
   - Cursor IDE
   - Other MCP-compatible tools

3. **Read the Complete Implementation Guide** ⭐
   
   **START HERE:** [IMPLEMENTATION_GUIDE_2026.md](./IMPLEMENTATION_GUIDE_2026.md) - The authoritative, up-to-date guide with all patterns, best practices, and correct usage examples.

4. **Start Using**
   
   Ask your AI assistant questions like:
   - "Show me how to use the Lola Framework Button component"
   - "What form components are available in Lola Framework?"
   - "Create an input field with gradient borders using Lola UI"

### For Developers

1. **Add New Component Documentation**
   
   Create a new JSON file in `components/` following the schema:
   
   ```bash
   cp components/Button.json components/YourComponent.json
   # Edit the file with your component's documentation
   ```

2. **Validate Against Schema**
   
   Use the schema at `schema/component-schema.json` to validate your documentation

3. **Rebuild MCP Server**
   
   ```bash
   cd mcp-server
   npm run build
   ```

## 📋 Component Documentation Format

Each component has a JSON file with the following structure:

```json
{
  "name": "ComponentName",
  "description": "What the component does",
  "category": "form | layout | display | navigation",
  "version": "0.3.1",
  "props": {
    "propName": {
      "type": "TypeScript type",
      "required": false,
      "default": "default value",
      "description": "What this prop does",
      "options": ["option1", "option2"],
      "examples": ["example1", "example2"]
    }
  },
  "usage": {
    "import": "import { Component } from 'lola-framework-ui-test';",
    "basic": "Basic usage code example",
    "advanced": [
      {
        "title": "Example title",
        "code": "Code example",
        "description": "What this example demonstrates"
      }
    ]
  },
  "dependencies": ["OtherComponent"],
  "styling": {
    "cssVariables": [
      {
        "name": "--variable-name",
        "description": "What it controls",
        "default": "default value"
      }
    ],
    "className": "main-css-class"
  },
  "accessibility": {
    "aria": ["aria attributes"],
    "keyboard": ["keyboard interactions"],
    "notes": "Additional a11y notes"
  },
  "notes": ["Important notes"],
  "related": ["RelatedComponent"]
}
```

## 🔍 Available Components

Currently documented components:

- **Button** - Versatile button with variants, gradients, and loading states
- **InputField** - Feature-rich input with floating labels and validation
- **Select** - Customizable dropdown with search and edit functionality

More components coming soon...

## 🛠️ MCP Server Tools

The MCP server provides these tools for AI agents:

### `get_component`
Get complete documentation for a specific component

### `list_components`
List all available components (optionally filtered by category)

### `search_components`
Search for components by keyword

### `get_component_usage`
Get usage examples and code snippets

### `get_component_props`
Get detailed information about component props

See [mcp-server/README.md](./mcp-server/README.md) for detailed tool documentation.

## 💡 Usage Examples

### Example 1: Basic Component Implementation

**User Query:**
> "I need a button with a gradient background in my React app using Lola Framework"

**AI Agent Response:**
```tsx
import { Button } from 'lola-framework-ui-test';

function MyComponent() {
  return (
    <Button
      background="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
      color="#fff"
      onClick={() => console.log('clicked')}
    >
      Gradient Button
    </Button>
  );
}
```

### Example 2: Component Discovery

**User Query:**
> "What components are available for building forms in Lola Framework?"

**AI Agent Response:**
> Lola Framework has these form components:
> - **Button** - Submit buttons with loading states
> - **InputField** - Text inputs with floating labels and validation
> - **Select** - Dropdown selection with search
> - **SearchSelect** - Enhanced select with search
> - **InputRadio** - Radio button inputs

### Example 3: Advanced Implementation

**User Query:**
> "Create a validated email input with gradient focus color using Lola Framework"

**AI Agent Response:**
```tsx
import { InputField } from 'lola-framework-ui-test';
import { useState } from 'react';

function EmailInput() {
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
      label="Email address"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
      }}
      isValid={isValid}
      activeColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
      errorColor="#fd2a35"
    />
  );
}
```

## 📚 Schema Reference

The complete JSON Schema is available at `schema/component-schema.json`. This schema defines:

- Required and optional fields
- Data types and formats
- Validation rules
- Description of each field

Use this schema to:
- Validate new documentation files
- Generate documentation templates
- Ensure consistency across components

## 🤝 Contributing

To add or update component documentation:

1. Create/edit JSON file in `components/`
2. Follow the schema in `schema/component-schema.json`
3. Include comprehensive prop descriptions
4. Provide multiple usage examples
5. Document CSS variables and styling options
6. Add accessibility information
7. Test with the MCP server

## 🔄 Workflow

```
Component Code → Extract Props → Generate JSON → MCP Server → AI Agent
    (src/)         (manual)      (ai-docs/)     (MCP)        (Usage)
```

### Future: Automated Documentation Generation

We plan to add automated documentation generation from TypeScript source files using tools like `react-docgen-typescript`.

## 🎨 Best Practices

### For Documentation Authors

1. **Be Explicit**: Don't assume AI knows context
2. **Provide Examples**: Show real-world usage scenarios
3. **Explain Trade-offs**: Document when to use each variant/prop
4. **Include Edge Cases**: Document limitations and gotchas
5. **Keep Updated**: Update docs when components change

### For AI Agents

1. **Always Check Version**: Ensure compatibility with target project
2. **Import Correctly**: Use exact import path from usage.import
3. **Type Safety**: Use TypeScript types from props definitions
4. **Dependencies**: Check if component depends on others
5. **Styling**: Respect CSS variables and className patterns

## 📞 Support

For issues or questions:

- **MCP Server Issues**: See [mcp-server/README.md](./mcp-server/README.md)
- **Schema Questions**: See [schema/component-schema.json](./schema/component-schema.json)
- **Component Issues**: Check the main project documentation

## 🗺️ Roadmap

- [ ] Complete documentation for all components
- [ ] Automated doc generation from TypeScript
- [ ] Interactive examples with CodeSandbox links
- [ ] Migration guides between versions
- [ ] Design tokens documentation
- [ ] Theme customization guide
- [ ] Storybook integration
- [ ] Visual regression test examples

## 📄 License

MIT - Same as Lola Framework UI
