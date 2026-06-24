# Lola Framework UI - AI Documentation Architecture

This document explains the technical architecture of the AI documentation system.

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    External Projects                         │
│                   (Using Lola UI Kit)                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Asks questions about components
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   AI Assistant                               │
│           (Claude Desktop, Cursor, etc.)                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ MCP Protocol
                     │ (JSON-RPC over stdio)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                 MCP Server                                   │
│          (ai-docs/mcp-server/src/index.ts)                   │
│                                                              │
│  Tools:                                                      │
│  • get_component       - Full component docs                │
│  • list_components     - Browse all components              │
│  • search_components   - Search by keyword                  │
│  • get_component_usage - Code examples                      │
│  • get_component_props - Prop details                       │
│                                                              │
│  Resources:                                                  │
│  • lola://component/{name} - Component URI                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Reads JSON files
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Component Documentation                         │
│              (ai-docs/components/)                           │
│                                                              │
│  • Button.json        - Button component                    │
│  • InputField.json    - Input field component               │
│  • Select.json        - Select dropdown                     │
│  • index.json         - Component catalog                   │
│  • ... more components                                      │
│                                                              │
│  Validated against:                                         │
│  • component-schema.json                                    │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Component Flow

### 1. User Query Flow

```
User: "Show me how to use the Button component"
  │
  ▼
AI Assistant recognizes Lola Framework UI context
  │
  ▼
AI calls MCP tool: get_component("Button")
  │
  ▼
MCP Server reads Button.json
  │
  ▼
Returns structured documentation
  │
  ▼
AI generates response with:
  • Import statement
  • Usage examples
  • Prop explanations
  • Code snippets
```

### 2. Search Flow

```
User: "I need an input with validation"
  │
  ▼
AI calls MCP tool: search_components("validation")
  │
  ▼
MCP Server searches across:
  • Component names
  • Descriptions
  • Prop names
  • Prop descriptions
  │
  ▼
Returns matching components:
  • InputField (has isValid prop)
  │
  ▼
AI suggests InputField with validation example
```

### 3. Discovery Flow

```
User: "What form components are available?"
  │
  ▼
AI calls MCP tool: list_components("form")
  │
  ▼
MCP Server filters by category
  │
  ▼
Returns categorized list:
  • Button
  • InputField
  • Select
  • SearchSelect
  • InputRadio
  • LabelInput
  │
  ▼
AI presents organized list with descriptions
```

## 🗂️ Data Structure

### Component Documentation JSON

```typescript
interface ComponentDoc {
  // Basic info
  name: string;                    // "Button"
  description: string;             // Component explanation
  category: Category;              // "form" | "layout" | etc.
  version: string;                 // "0.3.1"
  
  // Props
  props: Record<string, PropInfo>;
  
  // Usage
  usage: {
    import: string;                // Import statement
    basic: string;                 // Basic example
    advanced?: AdvancedExample[];  // Advanced examples
  };
  
  // Relationships
  dependencies?: string[];         // Other Lola components used
  related?: string[];              // Similar components
  
  // Styling
  styling?: {
    cssVariables?: CSSVariable[];
    className?: string;
  };
  
  // Accessibility
  accessibility?: {
    aria?: string[];
    keyboard?: string[];
    notes?: string;
  };
  
  // Additional
  notes?: string[];
}

interface PropInfo {
  type: string;                    // TypeScript type
  required: boolean;
  default?: any;
  description: string;
  options?: string[];              // For union types
  examples?: any[];
}
```

### MCP Protocol Messages

**Request (from AI to MCP Server):**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_component",
    "arguments": {
      "component_name": "Button"
    }
  }
}
```

**Response (from MCP Server to AI):**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{...full Button.json content...}"
      }
    ]
  }
}
```

## 🔧 Technical Stack

### MCP Server

- **Language:** TypeScript
- **Runtime:** Node.js 18+
- **Protocol:** MCP (Model Context Protocol)
- **Transport:** stdio (standard input/output)
- **SDK:** `@modelcontextprotocol/sdk`

### Documentation

- **Format:** JSON
- **Schema:** JSON Schema (Draft 7)
- **Validation:** Custom validator script
- **Generation:** Automated from TypeScript (future)

### Scripts

- **Language:** JavaScript (ES Modules)
- **Platform:** Cross-platform (bash + PowerShell)
- **Dependencies:** Minimal (Node.js built-ins)

## 🔄 Development Workflow

### Adding New Component Documentation

```
1. Write Component (src/components/Button.tsx)
         │
         ▼
2. Generate Doc Template
   npm run ai:generate-docs Button
         │
         ▼
3. Edit JSON File (ai-docs/components/Button.json)
   • Add description
   • Document props
   • Add examples
   • Complete metadata
         │
         ▼
4. Validate Documentation
   npm run ai:validate-docs Button
         │
         ▼
5. Rebuild MCP Server
   npm run ai:build
         │
         ▼
6. Test with AI Assistant
   • Restart AI assistant
   • Ask: "Show me Button component"
   • Verify response
         │
         ▼
7. Update Index (ai-docs/components/index.json)
   • Add to components array
   • Increment totalComponents
   • Update documentedComponents
         │
         ▼
8. Commit Changes
```

### MCP Server Development

```
1. Modify Server Code (ai-docs/mcp-server/src/index.ts)
         │
         ▼
2. Build
   npm run build
         │
         ▼
3. Test Locally
   node dist/index.js
   (Manually send MCP messages)
         │
         ▼
4. Test with AI Assistant
   • Update config with dev path
   • Restart AI assistant
   • Test all tools
         │
         ▼
5. Validate
   • Check logs
   • Verify all responses
   • Test error cases
         │
         ▼
6. Deploy
   npm run build
```

## 📊 Performance Considerations

### MCP Server

- **Startup Time:** <1s (loads all JSON on startup)
- **Response Time:** <50ms (reads from in-memory map)
- **Memory Usage:** ~10MB (for 24 components)
- **Concurrent Requests:** Single-threaded (stdio is serial)

### Optimization Strategies

1. **Caching:** Components loaded once at startup
2. **Indexing:** In-memory Map for O(1) lookups
3. **Lazy Loading:** Could implement for 100+ components
4. **Compression:** JSON files are small, no compression needed

## 🔒 Security

### MCP Server

- **Sandboxing:** Runs in isolated process
- **File Access:** Read-only access to documentation
- **Network:** No network access required
- **Permissions:** Standard Node.js permissions

### Documentation Files

- **Validation:** All JSON validated against schema
- **Sanitization:** No user input in JSON files
- **Version Control:** All changes tracked in git

## 🧪 Testing Strategy

### Documentation Testing

```bash
# Validate JSON structure
npm run ai:validate-docs

# Check for TODO items
grep -r "TODO" ai-docs/components/*.json

# Verify import statements
grep "import.*lola-framework-ui-test" ai-docs/components/*.json
```

### MCP Server Testing

```bash
# Unit tests (future)
npm test

# Integration test with AI assistant
# 1. Build server
npm run ai:build

# 2. Test queries with AI
# - List components
# - Get component
# - Search components
# - Get usage
# - Get props
```

### Code Example Testing

```bash
# Extract examples from JSON
node scripts/extract-examples.js

# Create test project
# Copy examples
# Compile and run
```

## 🚀 Deployment

### For End Users

1. **Install:** One-time setup script
2. **Configure:** Add to AI assistant config
3. **Use:** Automatic via AI assistant

### For Contributors

1. **Develop:** Edit documentation locally
2. **Validate:** Run validation scripts
3. **Test:** Test with AI assistant
4. **Commit:** Standard git workflow

### For CI/CD (Future)

```yaml
# .github/workflows/ai-docs.yml
name: AI Documentation

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run ai:validate-docs
      - run: npm run ai:build
```

## 📈 Scalability

### Current Capacity

- **Components:** 24 components, 3 documented
- **Documentation Size:** ~50KB per component (avg)
- **Total Size:** ~1.2MB for all components
- **Load Time:** <100ms for all docs

### Scaling to 100+ Components

- **Lazy Loading:** Load docs on demand
- **Caching:** Cache parsed JSON in memory
- **Indexing:** Build search index at startup
- **Compression:** Gzip JSON files (if needed)

### Scaling to 1000+ Components

- **Database:** SQLite for component metadata
- **Search Index:** Full-text search index
- **API:** HTTP API instead of stdio
- **CDN:** Host documentation on CDN

## 🔮 Future Enhancements

### Phase 1: Complete Documentation
- [ ] Document remaining 21 components
- [ ] Add visual examples/screenshots
- [ ] Create video tutorials

### Phase 2: Automation
- [ ] Auto-generate docs from TypeScript
- [ ] Extract props from source code
- [ ] Generate examples from Storybook

### Phase 3: Enhanced Features
- [ ] Interactive CodeSandbox examples
- [ ] Version migration guides
- [ ] Design token documentation
- [ ] Theme customization tools

### Phase 4: Advanced Capabilities
- [ ] Real-time documentation updates
- [ ] A/B testing for AI responses
- [ ] Usage analytics
- [ ] AI feedback loop for improvements

## 📚 References

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)
- [JSON Schema](https://json-schema.org/)
- [Lola Framework UI](https://github.com/JonathanCNM/framweork-test)

---

**Architecture designed for:**
- 🚀 Fast response times
- 📈 Easy scalability
- 🔧 Simple maintenance
- 🤝 Contributor-friendly
- 🤖 AI-first approach
