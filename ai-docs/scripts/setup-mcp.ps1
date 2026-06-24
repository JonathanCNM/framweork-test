# Lola Framework UI - MCP Server Setup Script (Windows PowerShell)
# This script installs and configures the MCP server for AI assistants

$ErrorActionPreference = "Stop"

Write-Host "🚀 Lola Framework UI - MCP Server Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get the absolute path to the project root
$ProjectRoot = Resolve-Path "$PSScriptRoot\..\.."
$McpServerDir = Join-Path $ProjectRoot "ai-docs\mcp-server"
$McpServerPath = Join-Path $McpServerDir "dist\index.js"

Write-Host "📁 Project root: $ProjectRoot"
Write-Host ""

# Step 1: Check Node.js version
Write-Host "1️⃣ Checking Node.js version..." -ForegroundColor Yellow
try {
    $NodeVersion = node -v
    $VersionNumber = [int]($NodeVersion -replace 'v(\d+)\..*', '$1')
    if ($VersionNumber -lt 18) {
        Write-Host "❌ Error: Node.js 18+ is required (found $NodeVersion)" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Node.js version: $NodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 2: Install dependencies
Write-Host "2️⃣ Installing MCP server dependencies..." -ForegroundColor Yellow
Set-Location $McpServerDir
npm install
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 3: Build the server
Write-Host "3️⃣ Building MCP server..." -ForegroundColor Yellow
npm run build
Write-Host "✅ MCP server built" -ForegroundColor Green
Write-Host ""

# Step 4: Verify build
if (-not (Test-Path $McpServerPath)) {
    Write-Host "❌ Error: Build failed - index.js not found" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build verified" -ForegroundColor Green
Write-Host ""

# Step 5: Configuration Instructions
Write-Host "4️⃣ Configuration Instructions" -ForegroundColor Yellow
Write-Host "==============================" -ForegroundColor Yellow
Write-Host ""

# Check for Claude Desktop
$ClaudeConfigPath = Join-Path $env:APPDATA "Claude\claude_desktop_config.json"
if (Test-Path (Join-Path $env:APPDATA "Claude")) {
    Write-Host "📱 Claude Desktop detected" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Add this to: $ClaudeConfigPath"
    Write-Host ""
    $config = @"
{
  "mcpServers": {
    "lola-framework-ui": {
      "command": "node",
      "args": [
        "$($McpServerPath -replace '\\', '\\\\')"
      ]
    }
  }
}
"@
    Write-Host $config
    Write-Host ""
    Write-Host "Then restart Claude Desktop." -ForegroundColor Yellow
    Write-Host ""
}

# Check for Cursor
$CursorPath = Join-Path $env:LOCALAPPDATA "Programs\Cursor"
if (Test-Path $CursorPath) {
    Write-Host "🎯 Cursor IDE detected" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Add this to Cursor's MCP settings:"
    Write-Host "Settings → Extensions → Model Context Protocol"
    Write-Host ""
    $config = @"
{
  "mcpServers": {
    "lola-framework-ui": {
      "command": "node",
      "args": [
        "$($McpServerPath -replace '\\', '\\\\')"
      ]
    }
  }
}
"@
    Write-Host $config
    Write-Host ""
    Write-Host "Then restart Cursor." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Next steps:"
Write-Host "   1. Add the configuration above to your AI assistant"
Write-Host "   2. Restart your AI assistant completely"
Write-Host "   3. Try asking: 'What components are in Lola Framework?'"
Write-Host ""
Write-Host "📖 Documentation:"
Write-Host "   - Quick Start: $ProjectRoot\ai-docs\QUICK_START.md"
Write-Host "   - Examples: $ProjectRoot\ai-docs\EXAMPLES.md"
Write-Host "   - MCP Server: $ProjectRoot\ai-docs\mcp-server\README.md"
Write-Host ""
Write-Host "🎉 Happy coding!" -ForegroundColor Cyan
