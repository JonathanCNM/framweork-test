#!/bin/bash

# Lola Framework UI - MCP Server Setup Script
# This script installs and configures the MCP server for AI assistants

set -e

echo "🚀 Lola Framework UI - MCP Server Setup"
echo "========================================"
echo ""

# Get the absolute path to the project root
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
MCP_SERVER_DIR="$PROJECT_ROOT/ai-docs/mcp-server"
MCP_SERVER_PATH="$MCP_SERVER_DIR/dist/index.js"

echo "📁 Project root: $PROJECT_ROOT"
echo ""

# Step 1: Check Node.js version
echo "1️⃣ Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18+ is required (found v$NODE_VERSION)"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"
echo ""

# Step 2: Install dependencies
echo "2️⃣ Installing MCP server dependencies..."
cd "$MCP_SERVER_DIR"
npm install
echo "✅ Dependencies installed"
echo ""

# Step 3: Build the server
echo "3️⃣ Building MCP server..."
npm run build
echo "✅ MCP server built"
echo ""

# Step 4: Verify build
if [ ! -f "$MCP_SERVER_PATH" ]; then
    echo "❌ Error: Build failed - index.js not found"
    exit 1
fi
echo "✅ Build verified"
echo ""

# Step 5: Detect AI assistant and provide configuration
echo "4️⃣ Configuration Instructions"
echo "=============================="
echo ""

# Check for Claude Desktop
CLAUDE_CONFIG_DIR=""
if [ "$(uname)" = "Darwin" ]; then
    CLAUDE_CONFIG_DIR="$HOME/Library/Application Support/Claude"
elif [ "$(uname)" = "Linux" ]; then
    CLAUDE_CONFIG_DIR="$HOME/.config/claude"
fi

if [ -d "$CLAUDE_CONFIG_DIR" ]; then
    echo "📱 Claude Desktop detected"
    echo ""
    echo "Add this to: $CLAUDE_CONFIG_DIR/claude_desktop_config.json"
    echo ""
    cat << EOF
{
  "mcpServers": {
    "lola-framework-ui": {
      "command": "node",
      "args": [
        "$MCP_SERVER_PATH"
      ]
    }
  }
}
EOF
    echo ""
    echo "Then restart Claude Desktop."
    echo ""
fi

# Check for Cursor
if command -v cursor &> /dev/null || [ -d "$HOME/.cursor" ] || [ -d "$HOME/Library/Application Support/Cursor" ]; then
    echo "🎯 Cursor IDE detected"
    echo ""
    echo "Add this to Cursor's MCP settings:"
    echo "Settings → Extensions → Model Context Protocol"
    echo ""
    cat << EOF
{
  "mcpServers": {
    "lola-framework-ui": {
      "command": "node",
      "args": [
        "$MCP_SERVER_PATH"
      ]
    }
  }
}
EOF
    echo ""
    echo "Then restart Cursor."
    echo ""
fi

echo "✨ Setup Complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Add the configuration above to your AI assistant"
echo "   2. Restart your AI assistant completely"
echo "   3. Try asking: 'What components are in Lola Framework?'"
echo ""
echo "📖 Documentation:"
echo "   - Quick Start: $PROJECT_ROOT/ai-docs/QUICK_START.md"
echo "   - Examples: $PROJECT_ROOT/ai-docs/EXAMPLES.md"
echo "   - MCP Server: $PROJECT_ROOT/ai-docs/mcp-server/README.md"
echo ""
echo "🎉 Happy coding!"
