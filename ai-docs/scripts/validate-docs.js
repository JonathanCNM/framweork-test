#!/usr/bin/env node

/**
 * Validate AI documentation files against the JSON schema
 * This script checks that all component documentation follows the correct format
 * 
 * Usage: node validate-docs.js [component-name]
 * Example: node validate-docs.js Button
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECT_ROOT = join(__dirname, '../..');
const DOCS_DIR = join(PROJECT_ROOT, 'ai-docs/components');
const SCHEMA_PATH = join(PROJECT_ROOT, 'ai-docs/schema/component-schema.json');

// Load schema
let schema;
try {
  schema = JSON.parse(readFileSync(SCHEMA_PATH, 'utf-8'));
} catch (error) {
  console.error('❌ Error loading schema:', error.message);
  process.exit(1);
}

// Validation results
const results = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: [],
};

// Validate a single doc file
const validateDoc = (componentName, doc) => {
  const errors = [];
  const warnings = [];
  
  // Check required fields
  const requiredFields = ['name', 'description', 'props', 'usage', 'version'];
  for (const field of requiredFields) {
    if (!doc[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }
  
  // Check usage structure
  if (doc.usage) {
    if (!doc.usage.import) {
      errors.push('Missing usage.import');
    }
    if (!doc.usage.basic) {
      errors.push('Missing usage.basic');
    }
  }
  
  // Check for TODO items
  const docString = JSON.stringify(doc);
  if (docString.includes('TODO')) {
    const todoCount = (docString.match(/TODO/g) || []).length;
    warnings.push(`Contains ${todoCount} TODO item(s) - documentation incomplete`);
  }
  
  // Check props structure
  if (doc.props && typeof doc.props === 'object') {
    for (const [propName, propInfo] of Object.entries(doc.props)) {
      if (!propInfo.type) {
        errors.push(`Prop '${propName}' missing type`);
      }
      if (!propInfo.description) {
        warnings.push(`Prop '${propName}' missing description`);
      }
    }
  }
  
  // Check version format
  if (doc.version && !/^\d+\.\d+\.\d+$/.test(doc.version)) {
    warnings.push(`Version '${doc.version}' doesn't follow semver format`);
  }
  
  // Check category
  const validCategories = [
    'form',
    'layout',
    'display',
    'navigation',
    'feedback',
    'decoration',
    'integration',
  ];
  if (doc.category && !validCategories.includes(doc.category)) {
    warnings.push(
      `Category '${doc.category}' not in valid categories: ${validCategories.join(', ')}`
    );
  }
  
  // Check import statement
  if (doc.usage?.import && !doc.usage.import.includes('lola-framework-ui-test')) {
    errors.push('Import statement should reference package name: lola-framework-ui-test');
  }
  
  return { errors, warnings };
};

// Validate all docs or specific component
const main = () => {
  console.log('🔍 Lola Framework UI - Documentation Validator');
  console.log('==============================================\n');
  
  const args = process.argv.slice(2);
  let files;
  
  if (args.length === 0) {
    // Validate all docs
    console.log('📚 Validating all component documentation...\n');
    files = readdirSync(DOCS_DIR)
      .filter((file) => file.endsWith('.json') && file !== 'index.json')
      .map((file) => join(DOCS_DIR, file));
  } else {
    // Validate specific component
    const componentName = args[0];
    console.log(`📝 Validating documentation for ${componentName}...\n`);
    files = [join(DOCS_DIR, `${componentName}.json`)];
  }
  
  for (const filePath of files) {
    results.total++;
    
    try {
      const doc = JSON.parse(readFileSync(filePath, 'utf-8'));
      const componentName = doc.name || filePath.split('/').pop().replace('.json', '');
      
      const { errors, warnings } = validateDoc(componentName, doc);
      
      if (errors.length === 0) {
        results.passed++;
        console.log(`✅ ${componentName}`);
        
        if (warnings.length > 0) {
          results.warnings += warnings.length;
          warnings.forEach((warning) => {
            console.log(`   ⚠️  ${warning}`);
          });
        }
      } else {
        results.failed++;
        console.log(`❌ ${componentName}`);
        
        errors.forEach((error) => {
          console.log(`   ❌ ${error}`);
          results.errors.push(`${componentName}: ${error}`);
        });
        
        if (warnings.length > 0) {
          results.warnings += warnings.length;
          warnings.forEach((warning) => {
            console.log(`   ⚠️  ${warning}`);
          });
        }
      }
      
      console.log('');
    } catch (error) {
      results.failed++;
      results.errors.push(`${filePath}: ${error.message}`);
      console.log(`❌ ${filePath}`);
      console.log(`   ❌ ${error.message}\n`);
    }
  }
  
  // Summary
  console.log('==============================================');
  console.log('📊 Validation Summary');
  console.log('==============================================');
  console.log(`Total files: ${results.total}`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⚠️  Warnings: ${results.warnings}`);
  console.log('');
  
  if (results.failed > 0) {
    console.log('❌ Validation failed. Please fix the errors above.');
    process.exit(1);
  } else if (results.warnings > 0) {
    console.log('⚠️  Validation passed with warnings. Consider addressing them.');
  } else {
    console.log('✨ All documentation is valid!');
  }
};

main();
