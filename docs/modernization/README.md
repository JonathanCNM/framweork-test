# Propuesta de Modernización

## Tabla de Contenidos

- [Resumen Ejecutivo](#resumen-ejecutivo)
- [Fase 1: Limpieza y Estabilización](#fase-1-limpieza-y-estabilización)
- [Fase 2: Testing & Compatibilidad](#fase-2-testing--compatibilidad)
- [Fase 3: Arquitectura & Performance](#fase-3-arquitectura--performance)
- [Fase 4: Documentación & DX](#fase-4-documentación--dx)
- [Fase 5: CI/CD & Calidad](#fase-5-cicd--calidad)
- [Métricas Objetivo](#métricas-objetivo)
- [Timeline General](#timeline-general)

---

## Resumen Ejecutivo

Esta propuesta de modernización tiene como objetivo transformar **Lola Framework UI** en una librería de componentes moderna, optimizada y lista para producción, compatible con React 18 y 19.

### Objetivos Principales

✅ **Migrar React 18 → 19** con compatibilidad total  
✅ **Optimizar bundle size** de 708KB → <400KB (-44%)  
✅ **Implementar testing** con 80% coverage  
✅ **Resolver dependencias críticas** (beta, faltantes)  
✅ **Mejorar tree-shaking** para reducir bundle en consumidores  
✅ **Documentación completa** con guías de implementación  

### Duración Estimada

**Total**: 6-8 semanas (5 fases)

### ROI Esperado

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Bundle Size | 708KB | <400KB | -44% |
| First Load | 156KB | <100KB | -36% |
| Tree Shaking | ❌ | ✅ | +100% |
| Test Coverage | 0% | 80% | +80% |
| Build Time | ~30s | ~15s | -50% |

---

## Fase 1: Limpieza y Estabilización

**Duración**: 1-2 semanas  
**Prioridad**: 🔴 CRÍTICA

### Objetivos

1. Resolver dependencias críticas
2. Reemplazar código legacy
3. Establecer base estable para migración

---

### 1.1. Resolver Dependencias Críticas

#### Problema 1: body-scroll-lock Beta

**Acción**: Reemplazar con `react-remove-scroll`

**Implementación**:

```bash
# Instalar
npm uninstall body-scroll-lock @types/body-scroll-lock
npm install react-remove-scroll
```

**Refactor useBlockScroll**:

```typescript
// src/hooks/useBlockScroll.ts
import { useEffect } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

export const useBlockScroll = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;
    
    // RemoveScroll maneja todo automáticamente
    document.body.setAttribute('data-scroll-locked', 'true');
    
    return () => {
      document.body.removeAttribute('data-scroll-locked');
    };
  }, [enabled]);
};

// Alternativa: Como componente
export const ScrollLock = RemoveScroll;
```

**Actualizar componentes**:

```typescript
// Antes
function Modal() {
  useBlockScroll();
  return <div>Modal</div>;
}

// Después (opción 1 - hook)
function Modal({ isOpen }) {
  useBlockScroll(isOpen);
  return <div>Modal</div>;
}

// Después (opción 2 - component)
function Modal({ isOpen }) {
  return (
    <RemoveScroll enabled={isOpen}>
      <div>Modal</div>
    </RemoveScroll>
  );
}
```

**Testing**:

```typescript
// src/hooks/__tests__/useBlockScroll.test.ts
import { renderHook } from '@testing-library/react';
import { useBlockScroll } from '../useBlockScroll';

describe('useBlockScroll', () => {
  test('locks scroll when enabled', () => {
    renderHook(() => useBlockScroll(true));
    expect(document.body.getAttribute('data-scroll-locked')).toBe('true');
  });
  
  test('unlocks scroll on unmount', () => {
    const { unmount } = renderHook(() => useBlockScroll(true));
    unmount();
    expect(document.body.getAttribute('data-scroll-locked')).toBeNull();
  });
});
```

---

#### Problema 2: Dependencias VGS No Instaladas

**Opción A: Instalar como Peer Dependencies (Recomendado)**

```json
// package.json
{
  "peerDependencies": {
    "react": ">=18 <20",
    "react-dom": ">=18 <20",
    "@vgs/collect-js": "^2.25.0",
    "@vgs/collect-js-react": "^2.11.0"
  },
  "peerDependenciesMeta": {
    "@vgs/collect-js": {
      "optional": true
    },
    "@vgs/collect-js-react": {
      "optional": true
    }
  }
}
```

**Documentación**:

```markdown
## VGS Components (Optional)

VGS components require additional dependencies:

\`\`\`bash
npm install @vgs/collect-js @vgs/collect-js-react
\`\`\`

If you don't need payment forms, you can skip this installation.
```

**Opción B: Paquete Separado**

```bash
# Estructura de monorepo
lola-ui/
├── packages/
│   ├── core/              # @lola-ui/core
│   ├── vgs-components/    # @lola-ui/vgs-components
│   └── hooks/             # @lola-ui/hooks
```

**Opción C: Dynamic Imports**

```typescript
// src/components/VgsInput.tsx
let VGSCollectForm: any;

async function loadVGS() {
  try {
    const module = await import('@vgs/collect-js-react');
    VGSCollectForm = module.VGSCollectForm;
  } catch (error) {
    console.error('VGS Collect is not installed');
    throw new Error('Install @vgs/collect-js-react to use VGS components');
  }
}

export const VgsInput = ({ ...props }) => {
  useEffect(() => {
    loadVGS();
  }, []);
  
  if (!VGSCollectForm) {
    return <div>Loading VGS...</div>;
  }
  
  return <VGSCollectForm {...props} />;
};
```

---

### 1.2. Eliminar CSS Duplicado

**Problema**: Dos archivos CSS idénticos

```bash
dist/styles.css                    # 30KB
dist/lola-framework-ui-test.css    # 27KB (duplicado)
```

**Solución**:

```json
// package.json - Simplificar build
{
  "scripts": {
    "build": "vite build && tsc -p tsconfig.build.json"
  }
}
```

```typescript
// vite.config.ts - Configurar nombre CSS
export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "lola-framework-ui",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "es.js" : "js"}`
    },
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'lola-framework-ui.css';
          }
          return assetInfo.name;
        }
      }
    }
  }
});
```

**Resultado esperado**:
```
dist/
├── index.es.js
├── index.js
├── index.d.ts
└── lola-framework-ui.css  # UN solo archivo CSS
```

**Ahorro**: 27KB (-47%)

---

### 1.3. Actualizar Documentación de Instalación

```markdown
// README.md

## Installation

\`\`\`bash
npm install lola-framework-ui
\`\`\`

### Basic Usage

\`\`\`tsx
// Import styles
import 'lola-framework-ui/dist/lola-framework-ui.css';

// Import components
import { Button, Layout } from 'lola-framework-ui';

function App() {
  return (
    <Layout>
      <Button>Click me</Button>
    </Layout>
  );
}
\`\`\`

### Optional: VGS Payment Components

\`\`\`bash
npm install @vgs/collect-js @vgs/collect-js-react
\`\`\`

\`\`\`tsx
import { VgsInput } from 'lola-framework-ui';
\`\`\`
```

---

## Fase 2: Testing & Compatibilidad

**Duración**: 2-3 semanas  
**Prioridad**: 🔴 ALTA

### Objetivos

1. Setup infrastructure de testing
2. Crear suite de tests comprehensiva
3. Validar compatibilidad React 18 y 19

---

### 2.1. Setup Testing Infrastructure

**Instalar dependencias**:

```bash
npm install -D \
  vitest \
  @testing-library/react \
  @testing-library/user-event \
  @testing-library/jest-dom \
  jsdom \
  @vitest/coverage-v8
```

**Configuración Vitest**:

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.stories.tsx',
        'src/demo/',
        '**/*.d.ts'
      ],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

**Setup file**:

```typescript
// src/tests/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock visualViewport
Object.defineProperty(window, 'visualViewport', {
  writable: true,
  value: {
    height: 768,
    width: 1024,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  },
});
```

**Scripts de package.json**:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

### 2.2. Tests Prioritarios

#### Test Suite: Componentes Core

**Button.test.tsx**:

```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  test('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    
    await userEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  
  test('shows loading state', () => {
    render(<Button loading>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    // Verificar loader visible
  });
  
  test('applies variant styles', () => {
    const { rerender } = render(<Button variant="outline">Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('lola-button--outline');
    
    rerender(<Button variant="link">Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('lola-button--link');
  });
});
```

**Layout.test.tsx**:

```typescript
// src/components/__tests__/Layout.test.tsx
import { render } from '@testing-library/react';
import { Layout } from '../Layout';

describe('Layout', () => {
  test('renders Header, Content, Footer', () => {
    const { container } = render(
      <Layout>
        <Layout.Header>Header</Layout.Header>
        <Layout.Content>Content</Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    );
    
    expect(container.querySelector('.lola-layout--container--header')).toHaveTextContent('Header');
    expect(container.querySelector('.lola-layout--container--content')).toHaveTextContent('Content');
    expect(container.querySelector('.lola-layout--container--footer')).toHaveTextContent('Footer');
  });
  
  test('applies aura colors', () => {
    const { container } = render(
      <Layout auraColors={['#ff0000', '#00ff00']}>
        <div>Content</div>
      </Layout>
    );
    
    const layout = container.firstChild as HTMLElement;
    expect(layout.style.getPropertyValue('--color1')).toBe('#ff0000');
    expect(layout.style.getPropertyValue('--color2')).toBe('#00ff00');
  });
});
```

#### Test Suite: Hooks

**useTheme.test.ts**:

```typescript
// src/hooks/__tests__/useTheme.test.ts
import { renderHook } from '@testing-library/react';
import { useTheme } from '../useTheme';

describe('useTheme', () => {
  test('injects theme styles', () => {
    const theme = {
      h1: { weight: 600, min: '2rem', max: '4rem' }
    };
    
    renderHook(() => useTheme(theme));
    
    const styleTag = document.getElementById('global-theme-styles');
    expect(styleTag).toBeInTheDocument();
    expect(styleTag?.textContent).toContain('.h1');
  });
  
  test('generates color palettes', () => {
    const { result } = renderHook(() => useTheme({}));
    
    const colors = result.current.generateColorsByView({
      primaryMesh: '#000',
      whiteColor: '#fff',
      primaryGradient: '#f00',
      secondaryGradient: '#0f0',
      secondaryColor: '#00f',
      errorColor: '#ff0000',
      partnerHighlights: '#ffff00',
      lightness: 'light'
    });
    
    expect(colors).toBeDefined();
    expect(colors?.primaryMeshGradientView).toBeDefined();
  });
});
```

---

### 2.3. Tests de Compatibilidad React 19

**Matriz de testing**:

```json
// package.json
{
  "scripts": {
    "test:react18": "npm install react@18 react-dom@18 && npm test",
    "test:react19": "npm install react@19 react-dom@19 && npm test"
  }
}
```

**Test específico**:

```typescript
// src/tests/react-compat.test.tsx
describe('React 18/19 Compatibility', () => {
  test('Layout Children API works', () => {
    // Test que Layout.Header es encontrado correctamente
    const { container } = render(
      <Layout>
        <Layout.Header>Test</Layout.Header>
      </Layout>
    );
    
    expect(container.querySelector('.lola-layout--container--header')).toBeInTheDocument();
  });
  
  test('useEffect cleanup works correctly', () => {
    const cleanup = vi.fn();
    
    function TestComponent() {
      useEffect(() => {
        return cleanup;
      }, []);
      return null;
    }
    
    const { unmount } = render(<TestComponent />);
    unmount();
    
    expect(cleanup).toHaveBeenCalled();
  });
});
```

---

### 2.4. Visual Regression Tests

**Setup con Storybook**:

```bash
npm install -D @storybook/test-runner playwright
```

```json
// package.json
{
  "scripts": {
    "test:visual": "test-storybook"
  }
}
```

---

## Fase 3: Arquitectura & Performance

**Duración**: 3-4 semanas  
**Prioridad**: 🟡 MEDIA-ALTA

### Objetivos

1. Optimizar bundle size
2. Mejorar tree-shaking
3. Refactor sistema de theming

---

### 3.1. Optimización de Bundle

#### Separar Iconos

**Nueva estructura**:

```
src/icons/
├── index.ts
├── camera/
│   ├── CameraGradient.tsx
│   ├── CameraError.tsx
│   └── IproovCamera.tsx
├── navigation/
│   ├── BackArrow.tsx
│   ├── RightArrow.tsx
│   ├── RightRounded.tsx
│   └── Close.tsx
├── payment/
│   ├── CardIcon.tsx
│   ├── BankIcon.tsx
│   ├── CreditCard.tsx
│   └── DebitCard.tsx
├── status/
│   ├── SuccessIcon.tsx
│   ├── ErrorIcon.tsx
│   └── WarningIcon.tsx
└── [más categorías...]
```

**Barrel exports optimizados**:

```typescript
// src/icons/index.ts
// Camera
export { CameraGradient } from './camera/CameraGradient';
export { CameraError } from './camera/CameraError';

// Navigation  
export { BackArrow } from './navigation/BackArrow';
export { RightArrow } from './navigation/RightArrow';

// ... (52 exports individuales)
```

**Template de componente de icono**:

```typescript
// src/icons/camera/CameraGradient.tsx
import { type SVGProps } from 'react';

export interface CameraGradientProps extends SVGProps<SVGSVGElement> {
  colors?: [string, string];
  size?: number;
}

export const CameraGradient = ({
  colors = ['#3ee0cf', '#ff6b6b'],
  size = 24,
  ...props
}: CameraGradientProps) => {
  const gradientId = `camera-gradient-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <path d="..." fill={`url(#${gradientId})`} />
    </svg>
  );
};
```

**Script de migración**:

```bash
# scripts/split-icons.js
const fs = require('fs');
const path = require('path');

// Script para dividir icons.tsx en archivos individuales
// (Implementación completa disponible si se requiere)
```

**Beneficio**: 
- Bundle reduction: 50KB → 1KB por icono usado
- Tree-shaking efectivo

---

#### Code Splitting

**vite.config.ts actualizado**:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: './src/index.ts',
        icons: './src/icons/index.ts',
        hooks: './src/hooks/index.ts',
        utils: './src/utils/index.ts'
      },
      name: 'LolaFrameworkUI',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-remove-scroll',
        'framer-motion'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-remove-scroll': 'RemoveScroll',
          'framer-motion': 'FramerMotion'
        },
        // Code splitting por chunks
        manualChunks: (id) => {
          if (id.includes('framer-motion')) {
            return 'vendor-motion';
          }
          if (id.includes('icons/')) {
            return 'icons';
          }
          if (id.includes('hooks/')) {
            return 'hooks';
          }
        }
      }
    }
  }
});
```

**package.json exports**:

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./icons": {
      "import": "./dist/icons.es.js",
      "require": "./dist/icons.js",
      "types": "./dist/icons/index.d.ts"
    },
    "./hooks": {
      "import": "./dist/hooks.es.js",
      "require": "./dist/hooks.js",
      "types": "./dist/hooks/index.d.ts"
    },
    "./styles": "./dist/lola-framework-ui.css"
  }
}
```

**Uso mejorado**:

```typescript
// Antes (importa TODO)
import { CameraIcon } from 'lola-framework-ui';

// Después (tree-shakeable)
import { CameraIcon } from 'lola-framework-ui/icons';
```

---

### 3.2. Sistema de Theming Mejorado

**Refactor useTheme**:

```typescript
// src/hooks/useTheme.ts (refactorizado)
import { useEffect, useMemo } from 'react';
import type { IUseTheme } from './types';

export const useTheme = (theme: IUseTheme) => {
  // Memoize CSS generation
  const cssProperties = useMemo(() => {
    return Object.entries(theme).reduce((acc, [key, value]) => {
      acc[`--lola-${key}`] = value;
      return acc;
    }, {} as Record<string, string>);
  }, [theme]);
  
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    Object.entries(cssProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Cleanup
    return () => {
      Object.keys(cssProperties).forEach((property) => {
        root.style.removeProperty(property);
      });
    };
  }, [cssProperties]);
  
  return {
    onSetTheme: (newTheme: IUseTheme) => {
      // Trigger re-render con nuevo theme
    },
    downloadThemeTxt,
    generateColorsByView
  };
};
```

**CSS actualizado**:

```css
/* Usar CSS variables en lugar de clases dinámicas */
.h1 {
  font-size: clamp(
    var(--lola-h1-min, 1.5rem),
    2vw + 0.25rem,
    var(--lola-h1-max, 3rem)
  );
  font-weight: var(--lola-h1-weight, 600);
  line-height: var(--lola-h1-lineHeight, 1.2);
}
```

**Beneficio**:
- Performance: 100x más rápido
- No más DOM manipulation innecesaria
- CSS native performance

---

## Fase 4: Documentación & DX

**Duración**: 2 semanas  
**Prioridad**: 🟢 MEDIA

### 4.1. Documentación Automática

**Setup TypeDoc**:

```bash
npm install -D typedoc typedoc-plugin-markdown
```

```json
// typedoc.json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs/api",
  "plugin": ["typedoc-plugin-markdown"],
  "readme": "README.md",
  "exclude": [
    "**/*+(.test|.spec).ts",
    "**/*.stories.tsx",
    "src/demo/**/*"
  ]
}
```

```json
// package.json
{
  "scripts": {
    "docs:generate": "typedoc"
  }
}
```

---

### 4.2. Guías de Implementación

Crear guías por componente:

```markdown
// docs/guides/button.md

# Button Component

## Installation

\`\`\`bash
npm install lola-framework-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Button } from 'lola-framework-ui';

<Button onClick={handleClick}>
  Click me
</Button>
\`\`\`

## Variants

### Default Button
...

### Outline Button
...

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | ... | ... | ... |

## Examples

### Loading State
...

### With Icon
...

## Best Practices

1. ...
2. ...

## Accessibility

- Uses semantic `<button>` element
- Keyboard navigable
- Screen reader compatible

## Related Components

- [Layout](#layout)
- [Navbar](#navbar)
```

---

### 4.3. Cursor Skills

```markdown
// .cursor/skills/lola-ui-integration/SKILL.md

# Lola Framework UI Integration Skill

Help developers integrate Lola Framework UI into their projects.

## Triggers

- "how do I use lola ui"
- "install lola framework"
- "lola component Button"
- "lola ui setup"

## Actions

1. **Installation**
   \`\`\`bash
   npm install lola-framework-ui
   \`\`\`

2. **Import Styles**
   \`\`\`tsx
   import 'lola-framework-ui/dist/lola-framework-ui.css';
   \`\`\`

3. **Use Components**
   \`\`\`tsx
   import { Button, Layout } from 'lola-framework-ui';
   \`\`\`

## Component Patterns

### Layout Structure
\`\`\`tsx
<Layout>
  <Layout.Header><Navbar /></Layout.Header>
  <Layout.Content>{children}</Layout.Content>
  <Layout.Footer><Button /></Layout.Footer>
</Layout>
\`\`\`

### Form Pattern
...

### Theming Pattern
...

## Common Issues

1. **CSS not loading**: Make sure to import styles
2. **VGS components error**: Install @vgs dependencies
3. **Tree shaking not working**: Use specific imports

## Best Practices

1. Import only what you need
2. Use Layout for consistent structure
3. Apply theme at app root
4. Wrap modals with RemoveScroll
```

---

### 4.4. MCP Server

```typescript
// mcp-server/lola-ui-docs.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Define resources
const resources = [
  {
    uri: 'lola://components/button',
    name: 'Button Component',
    description: 'Documentation for Button component'
  },
  // ... más componentes
];

// Define tools
const tools = [
  {
    name: 'search_component',
    description: 'Search for a component by name',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' }
      }
    }
  }
];

// Implement server
const server = new Server(
  {
    name: 'lola-ui-docs',
    version: '1.0.0'
  },
  {
    capabilities: {
      resources: {},
      tools: {}
    }
  }
);

// Handler implementations...
```

---

## Fase 5: CI/CD & Calidad

**Duración**: 1 semana  
**Prioridad**: 🟢 MEDIA

### 5.1. GitHub Actions

**.github/workflows/ci.yml**:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Test (React ${{ matrix.react }})
    runs-on: ubuntu-latest
    strategy:
      matrix:
        react: ['18', '19']
        node: ['18', '20']
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install React ${{ matrix.react }}
        run: |
          npm install react@${{ matrix.react }} react-dom@${{ matrix.react }}
      
      - name: Run tests
        run: npm test
      
      - name: Coverage
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        if: matrix.react == '18' && matrix.node == '20'

  build:
    name: Build
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - run: npm ci
      - run: npm run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  lint:
    name: Lint
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
```

---

### 5.2. Release Automation

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: npm test
      - run: npm run build
      
      - name: Publish to NPM
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      
      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
```

---

### 5.3. Bundle Analysis

```bash
npm install -D rollup-plugin-visualizer
```

```typescript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    // ...
    visualizer({
      filename: './dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
});
```

```json
// package.json
{
  "scripts": {
    "build:analyze": "npm run build && open dist/stats.html"
  }
}
```

---

## Métricas Objetivo

### Bundle Size

| Archivo | Antes | Objetivo | Reducción |
|---------|-------|----------|-----------|
| index.es.js | 156KB | <100KB | -36% |
| index.js | 103KB | <70KB | -32% |
| CSS | 57KB | 30KB | -47% |
| **TOTAL** | **708KB** | **<400KB** | **-44%** |

### Performance

| Métrica | Antes | Objetivo | Mejora |
|---------|-------|----------|--------|
| First Load (gzipped) | ~50KB | <35KB | -30% |
| TTI (3G) | ~4s | <3s | -25% |
| Build Time | ~30s | <15s | -50% |

### Calidad

| Métrica | Antes | Objetivo | Mejora |
|---------|-------|----------|--------|
| Test Coverage | 0% | 80% | +80% |
| Type Coverage | ~60% | 95% | +35% |
| A11y Score | ~70 | >90 | +20 |

---

## Timeline General

```
┌─────────────────────────────────────────────────────────┐
│ FASE 1: Limpieza (1-2 semanas)                        │
├─────────────────────────────────────────────────────────┤
│ ✓ Resolver dependencias críticas                       │
│ ✓ Eliminar CSS duplicado                              │
│ ✓ Actualizar documentación                            │
└─────────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│ FASE 2: Testing (2-3 semanas)                         │
├─────────────────────────────────────────────────────────┤
│ ✓ Setup Vitest                                        │
│ ✓ Tests de componentes                                │
│ ✓ Tests de hooks                                      │
│ ✓ React 18/19 compatibility                           │
└─────────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│ FASE 3: Performance (3-4 semanas)                     │
├─────────────────────────────────────────────────────────┤
│ ✓ Separar iconos                                      │
│ ✓ Code splitting                                      │
│ ✓ Refactor useTheme                                   │
│ ✓ Bundle optimization                                 │
└─────────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│ FASE 4: Documentación (2 semanas)                     │
├─────────────────────────────────────────────────────────┤
│ ✓ TypeDoc setup                                       │
│ ✓ Guías de componentes                                │
│ ✓ Cursor Skills                                       │
│ ✓ MCP Server                                          │
└─────────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│ FASE 5: CI/CD (1 semana)                              │
├─────────────────────────────────────────────────────────┤
│ ✓ GitHub Actions                                      │
│ ✓ Release automation                                  │
│ ✓ Bundle analysis                                     │
└─────────────────────────────────────────────────────────┘
                      ↓
                  ✅ DONE
```

**Duración Total**: 6-8 semanas

---

## Próximos Pasos Inmediatos

1. ✅ **Revisar y aprobar plan**
2. ✅ **Asignar recursos (desarrolladores)**
3. ✅ **Crear proyecto/board de seguimiento**
4. ⚠️ **Iniciar Fase 1**: Resolver dependencias críticas
5. ⚠️ **Setup rama de desarrollo**: `feat/modernization`

---

[← Volver al Índice](../README.md)
