#!/usr/bin/env node

/**
 * Auto-generate AI documentation from TypeScript component files
 * This script extracts component information and generates JSON documentation
 * 
 * Usage: node generate-docs.js [component-name]
 * Example: node generate-docs.js Button
 * 
 * If no component name is provided, generates docs for all components
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECT_ROOT = join(__dirname, '../..');
const COMPONENTS_DIR = join(PROJECT_ROOT, 'src/components');
const DOCS_DIR = join(PROJECT_ROOT, 'ai-docs/components');

// Component template
const createDocTemplate = (componentName, propsInterface) => ({
  name: componentName,
  description: `[TODO: Add description for ${componentName}]`,
  category: 'uncategorized', // TODO: Categorize (form, layout, display, navigation, feedback, decoration, integration)
  version: '0.3.1',
  props: propsInterface || {},
  usage: {
    import: `import { ${componentName} } from 'lola-framework-ui-test';`,
    basic: `<${componentName}>[TODO: Add basic usage example]</${componentName}>`,
    advanced: [
      {
        title: '[TODO: Add advanced example title]',
        code: `[TODO: Add advanced example code]`,
        description: '[TODO: Add description]',
      },
    ],
  },
  dependencies: [],
  styling: {
    cssVariables: [],
    className: `lola-${componentName.toLowerCase()}`,
  },
  accessibility: {
    aria: [],
    keyboard: [],
    notes: '[TODO: Add accessibility notes]',
  },
  notes: ['[TODO: Add important notes]'],
  related: [],
});

// Extract props from TypeScript interface
const extractProps = (fileContent, interfaceName) => {
  const props = {};
  
  // Find the interface definition
  const interfaceRegex = new RegExp(
    `export interface ${interfaceName}[\\s\\S]*?\\{([\\s\\S]*?)\\}`,
    'g'
  );
  
  const match = interfaceRegex.exec(fileContent);
  if (!match) return props;
  
  const interfaceBody = match[1];
  
  // Extract individual properties
  const propRegex = /(\w+)\??:\s*([^;]+);/g;
  let propMatch;
  
  while ((propMatch = propRegex.exec(interfaceBody)) !== null) {
    const [, propName, propType] = propMatch;
    const isOptional = fileContent.includes(`${propName}?:`);
    
    props[propName] = {
      type: propType.trim(),
      required: !isOptional,
      description: `[TODO: Add description for ${propName}]`,
    };
    
    // Try to find default value in component
    const defaultRegex = new RegExp(
      `${propName}\\s*=\\s*([^,\\n}]+)`,
      'g'
    );
    const defaultMatch = defaultRegex.exec(fileContent);
    if (defaultMatch) {
      props[propName].default = defaultMatch[1].trim().replace(/['"]/g, '');
    }
    
    // Detect union types for options
    if (propType.includes('|')) {
      const options = propType
        .split('|')
        .map((opt) => opt.trim().replace(/['"]/g, ''))
        .filter((opt) => opt && opt !== 'undefined');
      props[propName].options = options;
    }
  }
  
  return props;
};

// Generate documentation for a component
const generateComponentDoc = (componentName) => {
  const componentFile = join(COMPONENTS_DIR, `${componentName}.tsx`);
  
  try {
    const content = readFileSync(componentFile, 'utf-8');
    
    // Extract props interface
    const propsInterfaceName = `${componentName}Props`;
    const props = extractProps(content, propsInterfaceName);
    
    // Create doc template
    const doc = createDocTemplate(componentName, props);
    
    // Try to extract description from JSDoc comments
    const jsdocRegex = /\/\*\*\s*\n\s*\*\s*(.+?)\s*\n/;
    const jsdocMatch = jsdocRegex.exec(content);
    if (jsdocMatch) {
      doc.description = jsdocMatch[1];
    }
    
    // Try to detect dependencies (other Lola components used)
    const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]\.\/(\w+)['"]/g;
    let importMatch;
    const dependencies = new Set();
    
    while ((importMatch = importRegex.exec(content)) !== null) {
      const [, imports, file] = importMatch;
      imports.split(',').forEach((imp) => {
        const compName = imp.trim();
        if (compName && compName !== componentName) {
          dependencies.add(compName);
        }
      });
    }
    
    if (dependencies.size > 0) {
      doc.dependencies = Array.from(dependencies);
    }
    
    // Write to file
    const outputPath = join(DOCS_DIR, `${componentName}.json`);
    writeFileSync(outputPath, JSON.stringify(doc, null, 2));
    
    console.log(`✅ Generated documentation for ${componentName}`);
    console.log(`   📄 ${outputPath}`);
    console.log(`   ⚠️  Please review and complete TODO items\n`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error generating docs for ${componentName}:`, error.message);
    return false;
  }
};

// Get all component names
const getAllComponents = () => {
  const files = readdirSync(COMPONENTS_DIR);
  return files
    .filter((file) => file.endsWith('.tsx') && file !== 'index.ts')
    .map((file) => file.replace('.tsx', ''));
};

// Main execution
const main = () => {
  const args = process.argv.slice(2);
  
  console.log('🤖 Lola Framework UI - Documentation Generator');
  console.log('==============================================\n');
  
  if (args.length === 0) {
    // Generate docs for all components
    console.log('📚 Generating documentation for all components...\n');
    const components = getAllComponents();
    let successCount = 0;
    
    for (const component of components) {
      if (generateComponentDoc(component)) {
        successCount++;
      }
    }
    
    console.log(`\n✨ Complete! Generated ${successCount}/${components.length} component docs`);
    console.log('\n⚠️  Remember to:');
    console.log('   1. Review each JSON file and complete TODO items');
    console.log('   2. Add proper descriptions, examples, and notes');
    console.log('   3. Rebuild the MCP server: cd ai-docs/mcp-server && npm run build');
    console.log('   4. Update ai-docs/components/index.json with new components');
  } else {
    // Generate docs for specific component
    const componentName = args[0];
    console.log(`📝 Generating documentation for ${componentName}...\n`);
    
    if (generateComponentDoc(componentName)) {
      console.log('\n⚠️  Remember to:');
      console.log('   1. Review the JSON file and complete TODO items');
      console.log('   2. Add proper descriptions, examples, and notes');
      console.log('   3. Rebuild the MCP server: cd ai-docs/mcp-server && npm run build');
    } else {
      process.exit(1);
    }
  }
};

main();
