# Lola Framework UI - AI Documentation Quick Start

Get your AI assistant connected to Lola Framework UI documentation in 5 minutes.

## ⭐ Before You Start

**READ FIRST:** [IMPLEMENTATION_GUIDE_2026.md](./IMPLEMENTATION_GUIDE_2026.md) contains all the patterns, best practices, and correct usage examples you need. This guide has been refined through extensive use and iteration.

## Prerequisites

- Node.js 18+ installed
- Claude Desktop, Cursor, or another MCP-compatible AI assistant

## Step 1: Build the MCP Server (2 minutes)

```bash
# Navigate to the MCP server directory
cd ai-docs/mcp-server

# Install dependencies
npm install

# Build the server
npm run build
```

You should see output like:
```
Successfully compiled 1 file
```

## Step 2: Configure Your AI Assistant (2 minutes)

### Option A: Claude Desktop

1. Open/create the config file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add this configuration (replace `/absolute/path/to/` with your actual path):

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

3. **Restart Claude Desktop completely**

### Option B: Cursor IDE

1. Open Cursor Settings (Cmd/Ctrl + ,)
2. Search for "MCP"
3. Add the server configuration:

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

4. **Restart Cursor**

## Step 3: Verify Connection (1 minute)

Ask your AI assistant:

```
What components are available in Lola Framework?
```

You should get a response listing all available components.

## Step 4: Try It Out

### Example 1: Get Component Documentation

```
Show me how to use the Button component from Lola Framework
```

### Example 2: Search for Components

```
What Lola Framework components support gradients?
```

### Example 3: Get Implementation Code

```
Create an email input field with validation using Lola Framework
```

## Troubleshooting

### Server Not Appearing

1. **Check the path is absolute**
   ```bash
   # Get absolute path on macOS/Linux
   pwd
   
   # On Windows
   cd
   ```

2. **Verify build succeeded**
   ```bash
   cd ai-docs/mcp-server
   ls dist/index.js
   ```
   
   If file doesn't exist, run `npm run build` again.

3. **Check Node.js version**
   ```bash
   node --version  # Should be 18+
   ```

4. **Restart your AI assistant completely**
   - Claude Desktop: Quit and reopen
   - Cursor: Restart via Command Palette

### Components Not Loading

1. **Check JSON files exist**
   ```bash
   ls ai-docs/components/*.json
   ```
   
   You should see at least:
   - Button.json
   - InputField.json
   - Select.json
   - index.json

2. **Validate JSON syntax**
   ```bash
   # On macOS/Linux
   cat ai-docs/components/Button.json | python3 -m json.tool
   
   # On Windows (PowerShell)
   Get-Content ai-docs/components/Button.json | ConvertFrom-Json
   ```

3. **Rebuild the server**
   ```bash
   cd ai-docs/mcp-server
   npm run build
   ```

### View Logs

**Claude Desktop:**
1. Help → View Logs
2. Look for "lola-framework-ui" in the logs

**Cursor:**
1. View → Output
2. Select "MCP" from the dropdown

## Next Steps

### For Users

Start implementing Lola Framework UI components in your projects:

```tsx
// Install the library
npm install lola-framework-ui-test

// Import CSS in your main file
import 'lola-framework-ui-test/dist/styles.css';

// Ask your AI assistant for component implementations
```

### For Contributors

Add documentation for more components:

1. Copy an existing component JSON as a template
2. Fill in all sections following the schema
3. Rebuild the MCP server
4. Test with your AI assistant

See [ai-docs/README.md](./README.md) for detailed documentation format.

## Common Questions

### Q: Do I need to rebuild after adding new components?

**A:** Yes. After creating or modifying JSON files:
```bash
cd ai-docs/mcp-server
npm run build
# Then restart your AI assistant
```

### Q: Can I use this with multiple projects?

**A:** Yes! The MCP server serves documentation for the component library itself. Use it from any project that imports Lola Framework UI.

### Q: What if a component isn't documented yet?

**A:** Check `ai-docs/components/index.json` to see which components have documentation. You can:
1. Ask the AI assistant to list available components
2. Contribute documentation (see Contributing section)
3. Check the main project's Storybook

### Q: How do I update the documentation?

**A:** 
1. Edit the JSON file in `ai-docs/components/`
2. Rebuild: `npm run build` in `ai-docs/mcp-server`
3. Restart your AI assistant

### Q: Can I use this offline?

**A:** Yes! The MCP server runs locally and doesn't require internet. However, your AI assistant needs internet to function.

## Getting Help

- **MCP Server Issues**: See [mcp-server/README.md](./mcp-server/README.md)
- **Documentation Format**: See [schema/component-schema.json](./schema/component-schema.json)
- **Component Library Issues**: Check the main project README

## What's Next?

- [ ] Complete documentation for all 24 components
- [ ] Add automated documentation generation
- [ ] Create video tutorials
- [ ] Add CodeSandbox examples
- [ ] Build a web-based documentation browser

## Success!

You're now ready to use AI-assisted development with Lola Framework UI!

Try asking your AI assistant:
- "Create a login form using Lola Framework UI"
- "Show me all display components in Lola Framework"
- "How do I customize the Button gradient?"

Happy building! 🚀
