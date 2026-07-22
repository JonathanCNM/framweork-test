# Lola Framework UI - MCP Server

Model Context Protocol (MCP) server for Lola Framework UI component documentation. This server exposes component documentation to AI agents through the MCP protocol, enabling them to understand and implement Lola UI components in external projects.

## What is MCP?

Model Context Protocol (MCP) is an open protocol that standardizes how AI assistants connect to data sources. This MCP server makes Lola Framework UI documentation available to any MCP-compatible AI assistant (Claude Desktop, Cursor, etc.).

## Features

- 📚 Complete component documentation access
- 🔍 Search components by keyword
- 📝 Get usage examples and code snippets
- 🎯 Query specific component props
- 🏷️ Filter components by category
- 🚀 Real-time documentation updates

## Installation

### 1. Build the MCP Server

```bash
cd ai-docs/mcp-server
npm install
npm run build
```

### 2. Configure in Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

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

### 3. Configure in Cursor

Add to your Cursor MCP settings (`.cursor/mcp.json` or user settings):

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

## Available Tools

### 1. `get_component`
Get complete documentation for a specific component.

**Parameters:**
- `component_name` (string, required): Name of the component

**Example:**
```
Get documentation for Button component
```

### 2. `list_components`
List all available components with brief descriptions.

**Parameters:**
- `category` (string, optional): Filter by category (e.g., 'form', 'layout')

**Example:**
```
Show me all form components
```

### 3. `search_components`
Search for components by keyword.

**Parameters:**
- `query` (string, required): Search query

**Example:**
```
Search for components with gradient support
```

### 4. `get_component_usage`
Get usage examples with code snippets.

**Parameters:**
- `component_name` (string, required): Name of the component
- `example_type` (string, optional): 'basic' or 'advanced'

**Example:**
```
Show me advanced examples for InputField
```

### 5. `get_component_props`
Get detailed prop information for a component.

**Parameters:**
- `component_name` (string, required): Name of the component

**Example:**
```
What props does the Button component accept?
```

## Usage Examples

### In Claude Desktop or Cursor

Once configured, you can ask the AI assistant:

**Example 1: Basic component usage**
```
I need a button with a gradient background in my React app. 
Show me how to use the Lola Framework Button component.
```

**Example 2: Search for components**
```
What Lola Framework components are available for forms?
```

**Example 3: Get specific props**
```
What props does the InputField component accept for validation?
```

**Example 4: Advanced implementation**
```
Show me how to create an editable searchable select dropdown 
using Lola Framework components.
```

## Resources

The MCP server also exposes resources via the `lola://` URI scheme:

- `lola://component/button` - Button component documentation
- `lola://component/inputfield` - InputField component documentation
- `lola://component/select` - Select component documentation
- ... (all components)

## Development

### Watch mode
```bash
npm run dev
```

### Test the server
```bash
npm start
```

### Add new component documentation

1. Create a JSON file in `ai-docs/components/ComponentName.json`
2. Follow the schema defined in `ai-docs/schema/component-schema.json`
3. Rebuild the server: `npm run build`
4. Restart Claude Desktop/Cursor

## Component Documentation Structure

Each component should have a JSON file with:

- `name`: Component name
- `description`: What the component does
- `category`: Component category
- `version`: Version information
- `props`: Detailed prop definitions
- `usage`: Import statement and examples
- `dependencies`: Other Lola components used
- `styling`: CSS variables and classes
- `accessibility`: ARIA attributes and keyboard support
- `notes`: Additional information
- `related`: Related components

See `ai-docs/schema/component-schema.json` for the complete schema.

## Troubleshooting

### Server not appearing in Claude/Cursor
1. Check that the path in the config is absolute
2. Verify the server builds without errors
3. Restart Claude Desktop/Cursor completely
4. Check the logs in Claude Desktop: Help → View Logs

### Components not loading
1. Ensure JSON files are valid (use a JSON validator)
2. Check that files are in `ai-docs/components/` directory
3. Rebuild the server after adding new docs

### Changes not reflecting
1. Rebuild the server: `npm run build`
2. Restart the AI assistant application

## License

MIT
