# Lola Framework UI - AI Documentation System

This project includes a complete AI documentation system that makes the component library fully accessible to AI agents through the Model Context Protocol (MCP).

## 🎯 What is this?

This system enables AI assistants (like Claude, Cursor, and others) to:
- Understand and explain Lola Framework UI components
- Generate correct implementation code for any component
- Search and discover components by functionality
- Provide usage examples and best practices
- Answer questions about the component library

## 📚 Quick Links

- **[Quick Start Guide](./ai-docs/QUICK_START.md)** - Get up and running in 5 minutes
- **[Usage Examples](./ai-docs/EXAMPLES.md)** - See how AI agents should use the system
- **[MCP Server Documentation](./ai-docs/mcp-server/README.md)** - Technical details about the MCP server
- **[AI Documentation README](./ai-docs/README.md)** - Complete documentation system overview

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)

**macOS/Linux:**
```bash
chmod +x ai-docs/scripts/setup-mcp.sh
./ai-docs/scripts/setup-mcp.sh
```

**Windows (PowerShell):**
```powershell
.\ai-docs\scripts\setup-mcp.ps1
```

### Option 2: Manual Setup

```bash
# 1. Install and build the MCP server
npm run ai:setup

# 2. Configure your AI assistant
# Add the configuration shown below to your assistant

# 3. Restart your AI assistant
```

## 🔧 Configuration

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

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

### Cursor IDE

Add to Cursor Settings → Extensions → Model Context Protocol:

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

## 💡 How to Use

Once configured, ask your AI assistant questions like:

```
"What components are available in Lola Framework?"

"Show me how to use the Button component with a gradient"

"Create a login form using Lola Framework UI components"

"What form components support validation?"

"Generate a search input with icons using Lola Framework"
```

## 📦 Available Scripts

Run these from the project root:

```bash
# Setup and build the MCP server
npm run ai:setup

# Rebuild MCP server (after doc changes)
npm run ai:build

# Generate documentation for components
npm run ai:generate-docs              # All components
npm run ai:generate-docs ComponentName # Specific component

# Validate documentation
npm run ai:validate-docs               # All docs
npm run ai:validate-docs ComponentName # Specific component

# Development mode (watch for changes)
npm run ai:mcp-dev
```

## 🏗️ Architecture

```
┌─────────────────────┐
│   AI Assistant      │
│ (Claude, Cursor)    │
└──────────┬──────────┘
           │ MCP Protocol
           ▼
┌─────────────────────┐
│   MCP Server        │
│ (ai-docs/mcp-server)│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ JSON Documentation  │
│ (ai-docs/components)│
└─────────────────────┘
```

## 📝 Documentation Structure

```
ai-docs/
├── schema/
│   └── component-schema.json         # JSON Schema for docs
├── components/
│   ├── index.json                    # Component catalog
│   ├── Button.json                   # Component docs
│   ├── InputField.json
│   └── ...
├── mcp-server/                       # MCP server
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── README.md
├── scripts/
│   ├── setup-mcp.sh                  # Setup script (Unix)
│   ├── setup-mcp.ps1                 # Setup script (Windows)
│   ├── generate-docs.js              # Auto-generate docs
│   └── validate-docs.js              # Validate docs
├── QUICK_START.md                    # Quick start guide
├── EXAMPLES.md                       # Usage examples
└── README.md                         # Complete overview
```

## 🎨 MCP Server Features

The MCP server provides these tools to AI agents:

1. **get_component** - Get complete component documentation
2. **list_components** - List all available components
3. **search_components** - Search by keyword
4. **get_component_usage** - Get code examples
5. **get_component_props** - Get detailed prop information

## 🔍 Current Status

- ✅ MCP Server implemented and working
- ✅ JSON Schema for documentation
- ✅ Documentation for 3 core components (Button, InputField, Select)
- ✅ Automated setup scripts
- ✅ Documentation generator
- ✅ Documentation validator
- ✅ Cursor skill for internal use
- ⏳ 21 components remaining to document

## 📈 Adding New Component Documentation

### Automated (Recommended)

```bash
# Generate template for a component
npm run ai:generate-docs ComponentName

# Edit the generated JSON file to complete TODOs
# File will be at: ai-docs/components/ComponentName.json

# Validate your documentation
npm run ai:validate-docs ComponentName

# Rebuild MCP server
npm run ai:build
```

### Manual

1. Copy an existing component JSON as a template
2. Follow the schema at `ai-docs/schema/component-schema.json`
3. Include:
   - Complete prop definitions with types
   - Basic and advanced usage examples
   - CSS variables and styling info
   - Accessibility notes
   - Related components
4. Validate: `npm run ai:validate-docs ComponentName`
5. Rebuild: `npm run ai:build`

## 🤝 Contributing to Documentation

1. **Quality Standards:**
   - Clear, concise descriptions
   - Multiple usage examples (basic + advanced)
   - Complete prop documentation
   - TypeScript types included
   - Accessibility considerations

2. **Testing:**
   - Validate with `npm run ai:validate-docs`
   - Test with AI assistant
   - Verify code examples work

3. **Versioning:**
   - Update version when components change
   - Document breaking changes
   - Keep examples up to date

## 🐛 Troubleshooting

### MCP Server Not Appearing

1. Check absolute path in config
2. Verify build: `ls ai-docs/mcp-server/dist/index.js`
3. Check Node.js version: `node -v` (need 18+)
4. Restart AI assistant completely

### Components Not Loading

1. Check JSON files exist: `ls ai-docs/components/*.json`
2. Validate JSON: `npm run ai:validate-docs`
3. Rebuild server: `npm run ai:build`

### Changes Not Reflecting

1. Rebuild: `npm run ai:build`
2. Restart AI assistant
3. Clear AI assistant cache if available

### View Logs

**Claude Desktop:**
- Help → View Logs
- Look for "lola-framework-ui"

**Cursor:**
- View → Output → MCP

## 📖 For AI Agents

If you're an AI agent reading this:

1. Use the MCP tools to access component documentation
2. Always check documentation before generating code
3. Follow the patterns shown in examples
4. Include proper imports and CSS setup
5. Mention TypeScript types when relevant
6. Check for TODO items in docs (may be incomplete)

See the [lola-mcp-usage skill](./.cursor/skills/lola-mcp-usage/SKILL.md) for detailed guidance.

## 🎯 Goals

- [x] Create AI-readable documentation format
- [x] Implement MCP server
- [x] Automated setup process
- [x] Documentation tools (generate, validate)
- [x] Core component documentation (3/24)
- [ ] Document remaining components (21/24)
- [ ] Automated doc generation from TypeScript
- [ ] Visual examples/screenshots
- [ ] CodeSandbox integration
- [ ] Version migration guides

## 📞 Support

- **Setup Issues:** See [QUICK_START.md](./ai-docs/QUICK_START.md)
- **Usage Examples:** See [EXAMPLES.md](./ai-docs/EXAMPLES.md)
- **MCP Server:** See [mcp-server/README.md](./ai-docs/mcp-server/README.md)
- **Schema Questions:** See [component-schema.json](./ai-docs/schema/component-schema.json)

## 📄 License

MIT - Same as Lola Framework UI

---

**Built with ❤️ for the AI era**

This documentation system represents a new paradigm in component library documentation: **AI-first, human-friendly, and automatically accessible to the next generation of development tools.**
