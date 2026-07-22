# Contributing to Lola Framework AI Documentation

Thank you for helping make Lola Framework UI more accessible to AI agents!

## 📝 How to Contribute

### 1. Document a New Component

We need documentation for these components:

**High Priority (Commonly Used):**
- SearchSelect
- InputRadio
- LabelInput
- Layout
- Navbar
- Title / PageTitle
- GradientText
- Loader
- CircularProgress

**Medium Priority:**
- AuraLayout
- Page
- MotionWrapper
- DesignLayout
- RotatingText
- BodyCopy
- CustomStepper
- ElevatedCircle

**Low Priority (Specialized):**
- VgsFormWrapper
- VgsInput
- IproovButtonSlot

### 2. Steps to Add Documentation

#### Quick Method (Automated)

```bash
# 1. Generate template
npm run ai:generate-docs ComponentName

# 2. Edit the generated file
# File location: ai-docs/components/ComponentName.json
# Complete all TODO items

# 3. Validate
npm run ai:validate-docs ComponentName

# 4. Test with AI assistant
npm run ai:build
# Then ask your AI: "Show me the ComponentName from Lola Framework"

# 5. Submit PR
```

#### Manual Method

1. Copy an existing component JSON as template:
   ```bash
   cp ai-docs/components/Button.json ai-docs/components/YourComponent.json
   ```

2. Edit the file following this checklist:

**Required Fields:**
- [ ] `name` - Exact component name as exported
- [ ] `description` - Clear, concise explanation
- [ ] `category` - One of: form, layout, display, navigation, feedback, decoration, integration
- [ ] `version` - Current library version
- [ ] `props` - All props with types and descriptions
- [ ] `usage.import` - Correct import statement
- [ ] `usage.basic` - Simple, working example
- [ ] `usage.advanced` - 2-3 advanced examples

**Recommended Fields:**
- [ ] `dependencies` - Other Lola components used
- [ ] `styling.cssVariables` - CSS variables that can be customized
- [ ] `styling.className` - Main CSS class
- [ ] `accessibility` - ARIA attributes, keyboard support
- [ ] `notes` - Important warnings or tips
- [ ] `related` - Similar or complementary components

3. Validate your documentation:
   ```bash
   npm run ai:validate-docs YourComponent
   ```

4. Test with AI assistant:
   ```bash
   npm run ai:build
   # Restart your AI assistant
   # Ask: "Show me how to use YourComponent from Lola Framework"
   ```

### 3. Documentation Standards

#### Prop Documentation

```json
{
  "props": {
    "variant": {
      "type": "'primary' | 'secondary' | 'tertiary'",
      "required": false,
      "default": "primary",
      "description": "Visual style variant. Primary for main actions, secondary for less important actions, tertiary for minimal emphasis.",
      "options": ["primary", "secondary", "tertiary"],
      "examples": ["primary", "secondary"]
    }
  }
}
```

**Guidelines:**
- Type must be exact TypeScript syntax
- Description should explain WHEN to use each option
- Include options array for union types
- Provide realistic examples

#### Usage Examples

**Basic Example:**
- Simplest possible usage
- No dependencies on state or other components
- Shows most common use case

```json
{
  "usage": {
    "basic": "<Button variant=\"primary\">Click me</Button>"
  }
}
```

**Advanced Examples:**
- Real-world scenarios
- Show prop combinations
- Include state management when needed
- Demonstrate edge cases

```json
{
  "usage": {
    "advanced": [
      {
        "title": "Form submit button with loading state",
        "code": "const [loading, setLoading] = useState(false);\n\n<Button\n  variant=\"primary\"\n  loading={loading}\n  onClick={handleSubmit}\n>\n  Submit Form\n</Button>",
        "description": "Shows loading spinner during async operations and disables the button automatically"
      }
    ]
  }
}
```

#### CSS Variables

Document all customizable CSS variables:

```json
{
  "styling": {
    "cssVariables": [
      {
        "name": "--button-bg",
        "description": "Background color or gradient for the button",
        "default": "#000"
      },
      {
        "name": "--button-color",
        "description": "Text color",
        "default": "#fff"
      }
    ]
  }
}
```

#### Accessibility

Always include accessibility information:

```json
{
  "accessibility": {
    "aria": [
      "aria-label - Required for icon-only buttons",
      "aria-pressed - For toggle buttons"
    ],
    "keyboard": [
      "Enter/Space - Activates the button",
      "Tab - Moves focus to the button"
    ],
    "notes": "Button is automatically disabled when loading prop is true, preventing accidental double-submissions."
  }
}
```

### 4. Quality Checklist

Before submitting, ensure:

- [ ] No TODO items remaining
- [ ] All props documented with descriptions
- [ ] At least 1 basic example
- [ ] At least 2 advanced examples
- [ ] Import statement is correct
- [ ] Code examples are valid and tested
- [ ] TypeScript types are accurate
- [ ] Category is appropriate
- [ ] Related components listed
- [ ] Accessibility considered
- [ ] Runs `npm run ai:validate-docs` without errors
- [ ] Tested with AI assistant

### 5. Testing Your Documentation

1. **Validate JSON Structure:**
   ```bash
   npm run ai:validate-docs ComponentName
   ```

2. **Test with AI Assistant:**
   ```bash
   # Rebuild MCP server
   npm run ai:build
   
   # Restart your AI assistant
   
   # Test queries:
   # - "Show me the ComponentName from Lola Framework"
   # - "What props does ComponentName accept?"
   # - "Give me an example of ComponentName"
   ```

3. **Verify Code Examples:**
   - Copy examples to a test project
   - Ensure they compile without errors
   - Check they work as described

### 6. Submitting Your Contribution

1. **Create a branch:**
   ```bash
   git checkout -b docs/add-componentname-ai-docs
   ```

2. **Commit your changes:**
   ```bash
   git add ai-docs/components/ComponentName.json
   git commit -m "docs(ai): add AI documentation for ComponentName"
   ```

3. **Push and create PR:**
   ```bash
   git push origin docs/add-componentname-ai-docs
   ```

4. **PR Description Template:**
   ```markdown
   ## AI Documentation: ComponentName
   
   Adds complete AI-readable documentation for the ComponentName component.
   
   ### Checklist
   - [x] All required fields completed
   - [x] No TODO items
   - [x] Validation passes
   - [x] Tested with AI assistant
   - [x] Code examples verified
   
   ### Testing
   - Validated with `npm run ai:validate-docs ComponentName`
   - Tested with Claude Desktop
   - All examples compile and work correctly
   
   ### AI Agent Test Results
   Tested queries:
   - "Show me ComponentName" ✅
   - "What props does it accept?" ✅
   - "Give me an example" ✅
   ```

## 🐛 Improving Existing Documentation

Found an issue? You can help by:

1. **Fixing errors:**
   - Incorrect prop types
   - Wrong default values
   - Outdated examples

2. **Adding clarity:**
   - Better descriptions
   - More examples
   - Usage tips

3. **Updating for new versions:**
   - New props
   - Changed behavior
   - Deprecated features

## 💡 Best Practices

### Writing for AI Agents

1. **Be explicit:**
   - Don't assume context
   - Spell out requirements
   - Explain "why" not just "what"

2. **Provide context:**
   - When to use this component
   - When NOT to use it
   - Common use cases

3. **Show patterns:**
   - Multiple examples
   - Different scenarios
   - Edge cases

4. **Think about questions:**
   - What would a developer ask?
   - What could go wrong?
   - What options exist?

### Example: Good vs. Bad

**❌ Bad Description:**
```json
{
  "description": "A button component"
}
```

**✅ Good Description:**
```json
{
  "description": "A versatile button component with multiple variants (default, link, outline, cancel), loading states, gradient support, and customizable styling. Supports icons and animated text. Extends native button HTML attributes for full compatibility."
}
```

**❌ Bad Prop Documentation:**
```json
{
  "variant": {
    "type": "string",
    "description": "Button variant"
  }
}
```

**✅ Good Prop Documentation:**
```json
{
  "variant": {
    "type": "'default' | 'link' | 'outline' | 'cancel'",
    "required": false,
    "default": "default",
    "description": "Visual style variant. 'default' for filled buttons with background, 'link' for text-only buttons, 'outline' for bordered buttons, 'cancel' for destructive actions. Use 'default' for primary CTAs, 'outline' for secondary actions.",
    "options": ["default", "link", "outline", "cancel"],
    "examples": ["default", "outline"]
  }
}
```

## 🎯 Documentation Goals

Our AI documentation should enable:

1. **Discovery:** AI can find the right component for any use case
2. **Understanding:** AI can explain what a component does and why
3. **Implementation:** AI can generate correct, working code
4. **Customization:** AI can show how to customize and style
5. **Best Practices:** AI can recommend proper usage patterns

## 📞 Questions?

- Check existing documentation for examples
- See [EXAMPLES.md](./EXAMPLES.md) for usage patterns
- Review [component-schema.json](./schema/component-schema.json) for structure
- Open an issue if you're stuck

## 🙏 Thank You!

Every component documented makes Lola Framework UI more accessible to developers using AI assistants. Your contribution helps developers worldwide build better UIs faster!

---

**Remember:** Good documentation is a gift to future developers (and their AI assistants)!
