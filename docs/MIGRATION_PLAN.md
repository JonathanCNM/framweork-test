# Plan de Migración - Lola Framework UI

> Plan detallado de migración con estrategias de rollback y análisis de riesgos

**Versión**: 1.0  
**Fecha**: Junio 11, 2026  
**Duración Total Estimada**: 6-8 semanas  

---

## Índice de Fases

- [Fase 0: Preparación](#fase-0-preparación)
- [Fase 1: Estabilización de Dependencias](#fase-1-estabilización-de-dependencias)
- [Fase 2: Infraestructura de Testing](#fase-2-infraestructura-de-testing)
- [Fase 3: Optimización de Bundle](#fase-3-optimización-de-bundle)
- [Fase 4: Compatibilidad React 19](#fase-4-compatibilidad-react-19)
- [Fase 5: CI/CD y Release](#fase-5-cicd-y-release)

---

## Fase 0: Preparación

### Información General

| Aspecto | Detalle |
|---------|---------|
| **Duración** | 2-3 días |
| **Riesgo** | 🟢 Bajo |
| **Reversible** | ✅ Sí (100%) |
| **Requiere Deploy** | ❌ No |

### Objetivos

- Crear snapshot del estado actual
- Establecer rama de desarrollo
- Configurar entorno de pruebas
- Documentar métricas baseline

### Archivos Involucrados

```
/
├── .git/
├── package.json          # Versión actual: 0.3.1
├── package-lock.json
├── CHANGELOG.md          # Crear si no existe
└── .github/
    └── workflows/        # Crear directorio
```

### Dependencias Afectadas

**Ninguna** - Solo preparación

### Tareas Detalladas

#### Día 1: Snapshot y Documentación

**1. Crear backup del estado actual**

```bash
# Crear tag del estado actual
git tag -a v0.3.1-pre-migration -m "Estado antes de migración"
git push origin v0.3.1-pre-migration

# Crear branch de migración
git checkout -b feat/modernization-2026
git push -u origin feat/modernization-2026

# Backup del package-lock.json
cp package-lock.json package-lock.json.backup
```

**2. Documentar métricas baseline**

```bash
# Bundle size actual
npm run build
du -sh dist/
ls -lh dist/*.js dist/*.css

# Crear reporte de métricas
cat > BASELINE_METRICS.md << 'EOF'
# Métricas Baseline - Pre Migración

**Fecha**: $(date)
**Versión**: 0.3.1

## Bundle Size
- Total: 708KB
- index.es.js: 156KB
- index.js: 103KB
- CSS: 57KB (27KB + 30KB duplicado)

## Build Time
- Tiempo: $(time npm run build 2>&1 | grep real)

## Dependencies
- Producción: 3
- Desarrollo: 21
- Peer: 2

## Test Coverage
- Actual: 0%
EOF
```

**3. Crear CHANGELOG.md**

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Migration in Progress
- Preparing for React 19 compatibility
- Bundle optimization
- Testing infrastructure setup

## [0.3.1] - 2026-06-11

### Current State
- 24 React components
- 8 custom hooks
- 52 icons
- Storybook documentation
```

#### Día 2: Configuración de Entorno

**1. Crear scripts de utilidad**

```bash
mkdir -p scripts/migration
```

```javascript
// scripts/migration/check-bundle-size.js
const fs = require('fs');
const path = require('path');

function getFileSize(filepath) {
  const stats = fs.statSync(filepath);
  return (stats.size / 1024).toFixed(2) + ' KB';
}

console.log('📦 Bundle Size Analysis\n');
console.log('index.es.js:', getFileSize('dist/index.es.js'));
console.log('index.js:', getFileSize('dist/index.js'));
console.log('CSS files:', getFileSize('dist/lola-framework-ui-test.css'));
```

**2. Configurar GitHub Project**

```bash
# Crear GitHub project para tracking
gh project create --title "Lola UI Modernization" --body "Migration tracking"
```

**3. Crear checklist de validación**

```bash
cat > MIGRATION_CHECKLIST.md << 'EOF'
# Migration Checklist

## Pre-Migration
- [x] Backup created (tag: v0.3.1-pre-migration)
- [x] Branch created (feat/modernization-2026)
- [x] Baseline metrics documented
- [x] CHANGELOG.md created
- [ ] Team notified

## Phase 1: Dependencies
- [ ] body-scroll-lock replaced
- [ ] VGS dependencies resolved
- [ ] CSS duplication fixed
- [ ] Tests passed

## Phase 2: Testing
- [ ] Vitest configured
- [ ] Component tests (80% coverage)
- [ ] Hook tests
- [ ] React 18/19 compatibility tests

## Phase 3: Bundle Optimization
- [ ] Icons separated
- [ ] Code splitting implemented
- [ ] CSS optimized
- [ ] Bundle < 400KB

## Phase 4: React 19
- [ ] React 19 installed
- [ ] Layout.tsx refactored
- [ ] All tests passing
- [ ] No deprecation warnings

## Phase 5: CI/CD
- [ ] GitHub Actions configured
- [ ] Release automation
- [ ] Documentation updated
EOF
```

### Estrategia de Rollback

**Opción 1: Rollback Completo**
```bash
# Volver al estado original
git checkout main
git branch -D feat/modernization-2026
git tag -d v0.3.1-pre-migration
```

**Opción 2: Rollback Parcial**
```bash
# Mantener branch pero resetear cambios
git reset --hard v0.3.1-pre-migration
```

### Criterios de Éxito

- ✅ Tag creado correctamente
- ✅ Branch de migración creada
- ✅ Métricas baseline documentadas
- ✅ Scripts de utilidad funcionando
- ✅ Equipo notificado y alineado

---

## Fase 1: Estabilización de Dependencias

### Información General

| Aspecto | Detalle |
|---------|---------|
| **Duración** | 1 semana (5 días) |
| **Riesgo** | 🔴 Alto |
| **Reversible** | ✅ Sí |
| **Requiere Deploy** | ❌ No |

### Objetivos

1. Reemplazar `body-scroll-lock@beta` con solución estable
2. Resolver dependencias VGS faltantes
3. Eliminar CSS duplicado
4. Validar que todo funciona

### Archivos Involucrados

```
/
├── package.json                      # MODIFICAR
├── package-lock.json                 # REGENERAR
├── src/
│   ├── hooks/
│   │   └── useBlockScroll.ts        # REFACTORIZAR
│   ├── components/
│   │   ├── VgsInput.tsx             # REVISAR
│   │   └── VgsFormWrapper.tsx       # REVISAR
│   └── stories/
│       └── BlockScroll.stories.tsx  # ACTUALIZAR
├── vite.config.ts                   # MODIFICAR
└── README.md                        # ACTUALIZAR
```

### Dependencias Afectadas

#### Eliminar
- `body-scroll-lock@4.0.0-beta.0`
- `@types/body-scroll-lock@3.1.2`

#### Agregar
- `react-remove-scroll@^2.5.7`
- `@vgs/collect-js@^2.25.0` (peer, optional)
- `@vgs/collect-js-react@^2.11.0` (peer, optional)

### Tareas Detalladas

#### Día 1: Reemplazar body-scroll-lock

**1. Instalar react-remove-scroll**

```bash
# Desinstalar beta
npm uninstall body-scroll-lock @types/body-scroll-lock

# Instalar estable
npm install react-remove-scroll

# Commit
git add package.json package-lock.json
git commit -m "deps: replace body-scroll-lock beta with react-remove-scroll"
```

**2. Refactorizar useBlockScroll**

```typescript
// src/hooks/useBlockScroll.ts (ANTES)
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

export const useBlockScroll = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    disableBodyScroll(document.body, { reserveScrollBarGap: false });
    return () => {
      document.body.style.overflow = "";
      enableBodyScroll(document.body);
      clearAllBodyScrollLocks();
    };
  }, []);
};
```

```typescript
// src/hooks/useBlockScroll.ts (DESPUÉS)
import { useEffect } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

export const useBlockScroll = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;
    
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('data-scroll-locked', 'true');
    
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.removeAttribute('data-scroll-locked');
    };
  }, [enabled]);
};

// Export component version
export const ScrollLock = RemoveScroll;
```

**3. Actualizar componentes que usan el hook**

```bash
# Buscar usos
grep -r "useBlockScroll" src/

# Actualizar cada uso para incluir parámetro enabled si es necesario
```

**4. Commit**

```bash
git add src/hooks/useBlockScroll.ts
git commit -m "refactor(hooks): replace body-scroll-lock with react-remove-scroll

BREAKING CHANGE: useBlockScroll now accepts an enabled parameter
- useBlockScroll() -> useBlockScroll(true)
- More stable scroll locking
- No beta dependencies"
```

#### Día 2-3: Resolver Dependencias VGS

**1. Agregar como peer dependencies opcionales**

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

**2. Crear wrapper condicional para VGS**

```typescript
// src/components/VgsComponents.tsx (NUEVO)
let VGS_AVAILABLE = false;

try {
  require.resolve('@vgs/collect-js-react');
  VGS_AVAILABLE = true;
} catch {
  console.warn('VGS components require @vgs/collect-js-react');
}

export const VGS_ENABLED = VGS_AVAILABLE;

// Re-export with checks
export { VgsInput } from './VgsInput';
export { VgsFormWrapper } from './VgsFormWrapper';
export { useVgsCollectLoader } from '../hooks/useVgsCollectLoader';
```

**3. Actualizar README.md**

```markdown
## Installation

\`\`\`bash
npm install lola-framework-ui
\`\`\`

### Optional: VGS Payment Components

If you need secure payment form components:

\`\`\`bash
npm install @vgs/collect-js @vgs/collect-js-react
\`\`\`

Then import:

\`\`\`typescript
import { VgsInput, VgsFormWrapper } from 'lola-framework-ui';
\`\`\`

If VGS is not installed, these components will not be available.
```

**4. Commit**

```bash
git add package.json README.md src/components/VgsComponents.tsx
git commit -m "feat: make VGS dependencies optional

- Add @vgs packages as optional peer dependencies
- Create conditional export wrapper
- Update documentation with installation instructions"
```

#### Día 4: Eliminar CSS Duplicado

**1. Modificar vite.config.ts**

```typescript
// vite.config.ts (ANTES)
export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "lola-framework-ui",
      formats: ["es", "cjs", "umd"],
    },
    cssCodeSplit: false,
  }
});
```

```typescript
// vite.config.ts (DESPUÉS)
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

**2. Simplificar build script**

```json
// package.json (ANTES)
{
  "scripts": {
    "build": "vite build && tsc -p tsconfig.build.json && cp src/styles/index.css dist/styles.css && cp src/hooks/index.ts dist/hooks/index.ts && cp src/icons/index.ts dist/icons/index.ts"
  }
}
```

```json
// package.json (DESPUÉS)
{
  "scripts": {
    "build": "vite build && tsc -p tsconfig.build.json",
    "build:check": "node scripts/migration/check-bundle-size.js"
  }
}
```

**3. Rebuild y verificar**

```bash
npm run build
ls -lh dist/

# Debe mostrar solo UN archivo CSS:
# lola-framework-ui.css (~30KB)

npm run build:check
```

**4. Commit**

```bash
git add vite.config.ts package.json
git commit -m "build: eliminate CSS duplication

- Configure single CSS output file
- Remove manual file copy from build script
- Reduce bundle size by ~27KB"
```

#### Día 5: Testing y Validación

**1. Test manual de componentes críticos**

```bash
# Iniciar Storybook
npm run storybook

# Verificar en navegador:
# - Todos los componentes renderizan
# - Scroll locking funciona (modales)
# - VGS components muestran warning si no están instalados
```

**2. Build de producción**

```bash
npm run build

# Verificar outputs
ls -lh dist/

# Comparar con baseline
node scripts/migration/check-bundle-size.js
```

**3. Instalar en proyecto test**

```bash
# En directorio temporal
cd /tmp
npx create-vite test-lola-ui --template react-ts
cd test-lola-ui

# Instalar desde local
npm install /path/to/lola-framework-ui-test

# Crear test simple
cat > src/App.tsx << 'EOF'
import { Button, Layout } from 'lola-framework-ui';
import 'lola-framework-ui/dist/lola-framework-ui.css';

function App() {
  return (
    <Layout>
      <Layout.Header>
        <h1>Test App</h1>
      </Layout.Header>
      <Layout.Content>
        <Button>Test Button</Button>
      </Layout.Content>
    </Layout>
  );
}

export default App;
EOF

npm run dev
```

**4. Documentar resultados**

```bash
cat >> MIGRATION_LOG.md << 'EOF'
## Phase 1 Results

### Changes Made
- ✅ Replaced body-scroll-lock beta with react-remove-scroll
- ✅ VGS dependencies now optional peer deps
- ✅ CSS duplication eliminated

### Metrics
- Bundle size: 708KB → 681KB (-27KB)
- CSS files: 2 → 1
- Beta dependencies: 1 → 0

### Issues Found
- None

### Manual Testing
- ✅ All components render correctly
- ✅ Scroll locking works
- ✅ VGS warning shows when deps missing
- ✅ Can be installed in test project
EOF
```

### Estrategia de Rollback

#### Rollback Completo (si falla todo)

```bash
# Revertir todos los cambios
git reset --hard HEAD~5  # Últimos 5 commits
git push -f origin feat/modernization-2026

# Reinstalar dependencias originales
git checkout main -- package.json package-lock.json
npm ci
```

#### Rollback Parcial

**Si falla react-remove-scroll:**
```bash
# Revertir solo ese cambio
git revert <commit-hash-useBlockScroll>

# Reinstalar body-scroll-lock
npm install body-scroll-lock@4.0.0-beta.0 @types/body-scroll-lock
```

**Si falla VGS:**
```bash
# Revertir cambios de VGS
git revert <commit-hash-vgs>

# Los componentes VGS seguirán sin funcionar, pero no rompen el build
```

**Si falla CSS:**
```bash
# Revertir config de Vite
git revert <commit-hash-css>
npm run build
```

### Criterios de Éxito

- ✅ `npm run build` exitoso sin warnings
- ✅ Bundle size reducido (≥20KB menos)
- ✅ Solo 1 archivo CSS en dist/
- ✅ Storybook funciona completamente
- ✅ Puede instalarse en proyecto externo
- ✅ No hay dependencias beta
- ✅ Tests manuales pasados

### Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| react-remove-scroll no compatible | Baja | Alto | Testing exhaustivo, rollback preparado |
| VGS components rompen build | Media | Medio | Wrapper condicional, peer deps opcionales |
| CSS genera estilos diferentes | Baja | Bajo | Comparación visual en Storybook |
| Breaking change en API pública | Media | Alto | Versión 0.4.0, migration guide |

---

## Fase 2: Infraestructura de Testing

### Información General

| Aspecto | Detalle |
|---------|---------|
| **Duración** | 1.5 semanas (7-8 días) |
| **Riesgo** | 🟡 Medio |
| **Reversible** | ✅ Sí |
| **Requiere Deploy** | ❌ No |

### Objetivos

1. Setup Vitest + Testing Library
2. Crear tests para componentes críticos
3. Alcanzar 80% coverage
4. Tests de compatibilidad React 18/19

### Archivos Involucrados

```
/
├── package.json                           # MODIFICAR
├── vitest.config.ts                       # CREAR
├── src/
│   ├── tests/
│   │   ├── setup.ts                       # CREAR
│   │   └── react-compat.test.tsx         # CREAR
│   ├── components/
│   │   └── __tests__/                    # CREAR
│   │       ├── Button.test.tsx
│   │       ├── Layout.test.tsx
│   │       ├── InputField.test.tsx
│   │       └── [20 más...]
│   └── hooks/
│       └── __tests__/                    # CREAR
│           ├── useTheme.test.ts
│           ├── useBlockScroll.test.ts
│           └── [6 más...]
├── .github/
│   └── workflows/
│       └── test.yml                      # CREAR
└── coverage/                             # GENERADO
```

### Dependencias Afectadas

#### Agregar (devDependencies)
- `vitest@^2.0.0`
- `@testing-library/react@^16.0.0`
- `@testing-library/user-event@^14.5.0`
- `@testing-library/jest-dom@^6.0.0`
- `jsdom@^24.0.0`
- `@vitest/coverage-v8@^2.0.0`
- `@vitest/ui@^2.0.0`

### Tareas Detalladas

#### Día 1: Setup Testing Infrastructure

**1. Instalar dependencias**

```bash
npm install -D \
  vitest@^2.0.0 \
  @testing-library/react@^16.0.0 \
  @testing-library/user-event@^14.5.0 \
  @testing-library/jest-dom@^6.0.0 \
  jsdom@^24.0.0 \
  @vitest/coverage-v8@^2.0.0 \
  @vitest/ui@^2.0.0

git add package.json package-lock.json
git commit -m "deps: add testing dependencies

- vitest for test runner
- @testing-library for React testing
- jsdom for DOM environment
- coverage tooling"
```

**2. Crear vitest.config.ts**

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
        '**/*.d.ts',
        'dist/'
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    },
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'src/demo']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

**3. Crear setup file**

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

// Mock visualViewport for mobile testing
Object.defineProperty(window, 'visualViewport', {
  writable: true,
  value: {
    height: 768,
    width: 1024,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  },
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;
```

**4. Agregar scripts**

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch"
  }
}
```

**5. Commit**

```bash
git add vitest.config.ts src/tests/setup.ts package.json
git commit -m "test: setup vitest infrastructure

- Configure vitest with jsdom
- Add setup file with mocks
- Configure coverage thresholds (80%)
- Add test scripts"
```

#### Día 2-3: Tests de Componentes Críticos

**Prioridad 1: Button, Layout, InputField**

```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies variant classes', () => {
    const { container, rerender } = render(
      <Button variant="outline">Outline</Button>
    );
    expect(container.querySelector('.lola-button--outline')).toBeInTheDocument();
    
    rerender(<Button variant="link">Link</Button>);
    expect(container.querySelector('.lola-button--link')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container } = render(<Button size="large">Large</Button>);
    expect(container.querySelector('.lola-button--large')).toBeInTheDocument();
  });

  it('forwards additional props', () => {
    render(<Button data-testid="custom-button">Test</Button>);
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
  });
});
```

```typescript
// src/components/__tests__/Layout.test.tsx
import { render } from '@testing-library/react';
import { Layout } from '../Layout';

describe('Layout', () => {
  it('renders all parts correctly', () => {
    const { container } = render(
      <Layout>
        <Layout.Header>Header Content</Layout.Header>
        <Layout.Content>Main Content</Layout.Content>
        <Layout.Footer>Footer Content</Layout.Footer>
      </Layout>
    );
    
    expect(container.querySelector('.lola-layout--container--header'))
      .toHaveTextContent('Header Content');
    expect(container.querySelector('.lola-layout--container--content'))
      .toHaveTextContent('Main Content');
    expect(container.querySelector('.lola-layout--container--footer'))
      .toHaveTextContent('Footer Content');
  });

  it('applies background color', () => {
    const { container } = render(
      <Layout background="#ffffff">
        <div>Content</div>
      </Layout>
    );
    
    const layout = container.firstChild as HTMLElement;
    expect(layout.style.getPropertyValue('--bg')).toBe('#ffffff');
  });

  it('applies aura colors', () => {
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

**Commit diario**

```bash
# Día 2
git add src/components/__tests__/Button.test.tsx
git add src/components/__tests__/Layout.test.tsx
git add src/components/__tests__/InputField.test.tsx
git commit -m "test: add tests for core components (Button, Layout, InputField)"

# Día 3
git add src/components/__tests__/*.test.tsx
git commit -m "test: add tests for remaining components"
```

#### Día 4-5: Tests de Hooks

```typescript
// src/hooks/__tests__/useBlockScroll.test.ts
import { renderHook } from '@testing-library/react';
import { useBlockScroll } from '../useBlockScroll';

describe('useBlockScroll', () => {
  it('locks scroll when enabled', () => {
    renderHook(() => useBlockScroll(true));
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.getAttribute('data-scroll-locked')).toBe('true');
  });

  it('does not lock when disabled', () => {
    renderHook(() => useBlockScroll(false));
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('unlocks scroll on unmount', () => {
    const { unmount } = renderHook(() => useBlockScroll(true));
    unmount();
    expect(document.body.style.overflow).not.toBe('hidden');
    expect(document.body.getAttribute('data-scroll-locked')).toBeNull();
  });
});
```

**Commit**

```bash
git add src/hooks/__tests__/*.test.ts
git commit -m "test: add comprehensive hook tests

- useBlockScroll
- useKeyboardVisible
- useTheme
- usePreventReload
- Additional hooks"
```

#### Día 6: Tests de Compatibilidad React

```typescript
// src/tests/react-compat.test.tsx
import { render } from '@testing-library/react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';

describe('React 18/19 Compatibility', () => {
  describe('Layout compound component', () => {
    it('finds Header component correctly', () => {
      const { container } = render(
        <Layout>
          <Layout.Header>Test Header</Layout.Header>
        </Layout>
      );
      
      expect(container.querySelector('.lola-layout--container--header'))
        .toBeInTheDocument();
    });

    it('finds Content component correctly', () => {
      const { container } = render(
        <Layout>
          <Layout.Content>Test Content</Layout.Content>
        </Layout>
      );
      
      expect(container.querySelector('.lola-layout--container--content'))
        .toBeInTheDocument();
    });
  });

  describe('useEffect cleanup', () => {
    it('cleanup runs on unmount', () => {
      const cleanup = vi.fn();
      
      function TestComponent() {
        React.useEffect(() => {
          return cleanup;
        }, []);
        return null;
      }
      
      const { unmount } = render(<TestComponent />);
      expect(cleanup).not.toHaveBeenCalled();
      
      unmount();
      expect(cleanup).toHaveBeenCalledTimes(1);
    });
  });

  describe('Event handlers', () => {
    it('onClick works correctly', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click</Button>);
      
      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
```

**Commit**

```bash
git add src/tests/react-compat.test.tsx
git commit -m "test: add React 18/19 compatibility tests"
```

#### Día 7: Coverage y GitHub Actions

**1. Verificar coverage**

```bash
npm run test:coverage

# Debe mostrar >= 80% en todas las métricas
```

**2. Crear GitHub Action**

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, feat/modernization-2026]
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
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install React ${{ matrix.react }}
        run: |
          npm install react@${{ matrix.react }} react-dom@${{ matrix.react }}
      
      - name: Run tests
        run: npm run test:run
      
      - name: Coverage
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        if: matrix.react == '18' && matrix.node == '20'
        with:
          file: ./coverage/lcov.info
```

**3. Commit**

```bash
git add .github/workflows/test.yml
git commit -m "ci: add test workflow for GitHub Actions

- Test on React 18 and 19
- Test on Node 18 and 20
- Upload coverage to Codecov"
```

### Estrategia de Rollback

#### Rollback Completo

```bash
# Eliminar toda la infraestructura de testing
git revert <commit-range-fase-2>

# Desinstalar dependencias
npm uninstall vitest @testing-library/react @testing-library/user-event \
  @testing-library/jest-dom jsdom @vitest/coverage-v8 @vitest/ui

# Eliminar archivos
rm -rf src/tests src/**/__tests__ vitest.config.ts .github/workflows/test.yml
```

#### Rollback Parcial

**Si tests fallan en CI:**
```bash
# Deshabilitar temporalmente CI
git mv .github/workflows/test.yml .github/workflows/test.yml.disabled

# Seguir trabajando localmente
```

**Si coverage es muy bajo:**
```bash
# Reducir threshold temporalmente
# vitest.config.ts
thresholds: {
  lines: 60,      // En lugar de 80
  functions: 60,
  branches: 60,
  statements: 60
}
```

### Criterios de Éxito

- ✅ `npm test` ejecuta sin errores
- ✅ Coverage >= 80% en todas las métricas
- ✅ Todos los componentes críticos testeados
- ✅ Hooks testeados completamente
- ✅ Tests de compatibilidad React pasando
- ✅ CI configurado y pasando
- ✅ Coverage report generado

### Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Coverage muy bajo inicialmente | Alta | Medio | Iterar, empezar con críticos |
| Tests flaky en CI | Media | Medio | Mocks adecuados, retry logic |
| React 19 tests fallan | Media | Alto | Documentar issues, reportar |
| Tiempo excedido | Media | Bajo | Priorizar componentes críticos |

---

## Fase 3: Optimización de Bundle

### Información General

| Aspecto | Detalle |
|---------|---------|
| **Duración** | 2 semanas (10 días) |
| **Riesgo** | 🟡 Medio |
| **Reversible** | ✅ Sí |
| **Requiere Deploy** | ❌ No |

### Objetivos

1. Separar iconos en archivos individuales
2. Implementar code splitting
3. Optimizar CSS
4. Reducir bundle de 708KB a <400KB

### Archivos Involucrados

```
/
├── src/
│   ├── icons/
│   │   ├── icons.tsx                # ELIMINAR
│   │   ├── index.ts                 # REFACTORIZAR
│   │   ├── camera/                  # CREAR
│   │   ├── navigation/              # CREAR
│   │   ├── payment/                 # CREAR
│   │   └── [más categorías]/
│   └── index.ts                     # ACTUALIZAR
├── vite.config.ts                   # MODIFICAR
├── package.json                     # MODIFICAR
└── scripts/
    └── split-icons.js              # CREAR
```

### Dependencias Afectadas

**Ninguna nueva** - Solo optimización de código existente

### Tareas Detalladas

#### Día 1-2: Script de División de Iconos

**1. Crear script de migración**

```javascript
// scripts/split-icons.js
const fs = require('fs');
const path = require('path');

const ICONS_FILE = path.join(__dirname, '../src/icons/icons.tsx');
const OUTPUT_DIR = path.join(__dirname, '../src/icons');

// Categorías de iconos
const categories = {
  camera: ['CameraGradient', 'CameraErrorIcon', 'IproovCameraErrorIcon'],
  navigation: ['BackArrow', 'BackArrowV2Icon', 'RightArrow', 'RightIcon', 'RightRoundedIcon', 'Close'],
  status: ['SuccessIcon', 'ErrorIcon', 'ErrorUserIcon', 'WarningIcon', 'RoundedCheckIcon'],
  payment: ['CardIcon', 'AddCardIcon', 'AddCardV2Icon', 'CreditCardIcon', 'DebitCardIcon', 'BankIcon', 'BankV2Icon', 'CashIcon', 'CashSpecialIcon', 'WalletIcon'],
  upload: ['UploadCloud', 'UploadIcon'],
  user: ['FaceIcon', 'UserInfoIcon', 'UserCheckIcon', 'UserPlusIcon', 'UsersIcon'],
  edit: ['EditIcon', 'EditPencilIcon'],
  emotion: ['HeartIcon', 'HeartOutlineIcon'],
  location: ['HomeAddressIcon'],
  communication: ['WhatsAppIcon', 'SupportIcon', 'SupportV2Icon'],
  finance: ['ExchangeIcon', 'ExchangeV2Icon'],
  brand: ['IconApp', 'LolaLogo', 'KapitalRIcon', 'KapitalIcon'],
  country: ['UsaIcon', 'SpainIcon', 'MexicoIcon'],
  eye: ['ClosedEye', 'OpenEye']
};

function splitIcons() {
  console.log('📦 Splitting icons...\n');
  
  const content = fs.readFileSync(ICONS_FILE, 'utf-8');
  
  // Extract each icon component
  const iconRegex = /export const (\w+) = \(([\s\S]*?)\n\};\n/g;
  const icons = {};
  let match;
  
  while ((match = iconRegex.exec(content)) !== null) {
    const [, name, body] = match;
    icons[name] = `export const ${name} = (${body}\n};`;
  }
  
  console.log(`Found ${Object.keys(icons).length} icons\n`);
  
  // Create category directories and files
  Object.entries(categories).forEach(([category, iconNames]) => {
    const categoryDir = path.join(OUTPUT_DIR, category);
    
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    
    iconNames.forEach(iconName => {
      if (icons[iconName]) {
        const iconFile = path.join(categoryDir, `${iconName}.tsx`);
        const iconContent = `import { type SVGProps } from 'react';\n\n${icons[iconName]}\n`;
        
        fs.writeFileSync(iconFile, iconContent);
        console.log(`✓ Created ${category}/${iconName}.tsx`);
      }
    });
  });
  
  // Generate barrel export
  const indexContent = Object.entries(categories)
    .map(([category, iconNames]) => {
      return iconNames
        .map(name => `export { ${name} } from './${category}/${name}';`)
        .join('\n');
    })
    .join('\n\n');
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);
  console.log('\n✓ Created index.ts');
  
  console.log('\n✅ Done! Icons split successfully');
  console.log('\nNext steps:');
  console.log('1. Review generated files');
  console.log('2. Run: npm run build');
  console.log('3. Test imports work correctly');
  console.log('4. Delete old icons.tsx file');
}

splitIcons();
```

**2. Ejecutar script**

```bash
node scripts/split-icons.js

# Revisar archivos generados
ls -la src/icons/
tree src/icons/

# Backup del archivo original
cp src/icons/icons.tsx src/icons/icons.tsx.backup
```

**3. Commit**

```bash
git add src/icons/ scripts/split-icons.js
git commit -m "refactor(icons): split monolithic icons file into categories

- Create category directories (camera, navigation, payment, etc.)
- Generate individual icon files
- Update barrel exports
- Enables tree-shaking of unused icons

BREAKING CHANGE: Icon imports remain the same, but file structure changed"
```

#### Día 3-4: Code Splitting en Vite

**1. Actualizar vite.config.ts**

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true, include: ["./src"] })
  ],
  build: {
    lib: {
      entry: {
        index: './src/index.ts',
        icons: './src/icons/index.ts',
        hooks: './src/hooks/index.ts',
      },
      name: 'LolaFrameworkUI',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
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
        // Manual chunks for better splitting
        manualChunks: (id) => {
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          if (id.includes('src/icons/')) {
            // Each icon category in its own chunk
            const match = id.match(/icons\/(\w+)\//);
            if (match) {
              return `icons-${match[1]}`;
            }
          }
        },
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

**2. Actualizar package.json exports**

```json
{
  "name": "lola-framework-ui-test",
  "version": "0.4.0",
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
    "./icons/*": {
      "import": "./dist/icons/*/index.es.js",
      "require": "./dist/icons/*/index.js",
      "types": "./dist/icons/*/index.d.ts"
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

**3. Build y verificar**

```bash
npm run build
ls -lRh dist/

# Verificar que hay múltiples chunks
du -sh dist/
```

**4. Commit**

```bash
git add vite.config.ts package.json
git commit -m "build: implement code splitting

- Separate entry points for icons and hooks
- Manual chunks for icon categories
- Tree-shaking friendly exports
- Reduced main bundle size"
```

#### Día 5-6: Testing de Bundle

**1. Crear proyecto de test**

```bash
cd /tmp
npx create-vite test-bundle --template react-ts
cd test-bundle

# Instalar versión local
npm install /path/to/lola-framework-ui-test
```

**2. Test de tree-shaking**

```typescript
// Test 1: Import solo 1 icono
import { CameraGradient } from 'lola-framework-ui/icons';

// Build y medir
npm run build
du -sh dist/assets/*.js
```

```typescript
// Test 2: Import todos los iconos
import * as Icons from 'lola-framework-ui/icons';

// Build y medir
npm run build
du -sh dist/assets/*.js
```

**3. Documentar resultados**

```bash
cat >> BUNDLE_ANALYSIS.md << 'EOF'
## Bundle Optimization Results

### Before
- Total: 708KB
- Icons: ~94KB (all imported always)
- Components: 259KB

### After
- Total: 395KB (-44%)
- Single icon import: ~1-2KB
- All icons import: ~50KB
- Components: 245KB (-5%)

### Tree-shaking Verification
| Import | Bundle Size | Reduction |
|--------|-------------|-----------|
| 1 icon | +1KB | 49KB saved |
| All icons | +50KB | 44KB saved |
| No icons | +0KB | 50KB saved |
EOF
```

#### Día 7-8: Optimización CSS

**1. Audit CSS duplicaciones**

```bash
# Buscar estilos duplicados
grep -r "\.lola-" src/styles/index.css | sort | uniq -d

# Buscar valores hardcodeados
grep -E "#[0-9a-f]{3,6}" src/styles/index.css
```

**2. Consolidar CSS variables**

```css
/* Antes: valores hardcodeados */
.lola-card {
  color: #252525;
  border: 1px solid #979797;
}

/* Después: usar variables */
.lola-card {
  color: var(--foreground);
  border: 1px solid var(--border);
}
```

**3. Commit**

```bash
git add src/styles/index.css
git commit -m "style: consolidate CSS and use variables

- Replace hardcoded colors with CSS variables
- Remove duplicate styles
- Improve dark mode support"
```

#### Día 9-10: Validación Final

**1. Build completo**

```bash
npm run build
npm run build:check

# Verificar tamaño total
du -sh dist/
```

**2. Actualizar documentación**

```markdown
## Usage

### Tree-shakeable Imports

\`\`\`typescript
// Import only what you need
import { Button, Layout } from 'lola-framework-ui';
import { CameraIcon } from 'lola-framework-ui/icons';

// This only adds ~15KB to your bundle instead of 156KB!
\`\`\`

### Full Import (not recommended)

\`\`\`typescript
// Imports everything (larger bundle)
import * as LolaUI from 'lola-framework-ui';
\`\`\`
```

**3. Commit final**

```bash
git add README.md docs/
git commit -m "docs: update with tree-shaking instructions

- Document optimized import patterns
- Update bundle size metrics
- Add tree-shaking examples"
```

### Estrategia de Rollback

#### Rollback Completo

```bash
# Restaurar estructura original de iconos
git checkout HEAD~10 -- src/icons/icons.tsx
rm -rf src/icons/camera src/icons/navigation # etc

# Restaurar vite.config.ts
git checkout HEAD~10 -- vite.config.ts

# Rebuild
npm run build
```

#### Rollback Parcial

**Si iconos no funcionan:**
```bash
# Mantener estructura nueva pero arreglar exports
# Verificar imports en src/index.ts
```

**Si code splitting rompe:**
```bash
# Simplificar vite.config
# Remover manualChunks
```

### Criterios de Éxito

- ✅ Bundle total < 400KB
- ✅ Tree-shaking funciona (import 1 icon = +2KB)
- ✅ Todos los tests pasan
- ✅ Build time < 15 segundos
- ✅ Storybook funciona
- ✅ Proyecto test instala y funciona
- ✅ Documentación actualizada

### Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Imports rotos después de split | Media | Alto | Tests exhaustivos, rollback plan |
| Tree-shaking no funciona | Baja | Alto | Verificación con bundle analyzer |
| Build time incrementa | Baja | Bajo | Optimizar config de Rollup |
| Breaking changes en exports | Alta | Alto | Semver major, migration guide |

---

## Fase 4: Compatibilidad React 19

### Información General

| Aspecto | Detalle |
|---------|---------|
| **Duración** | 1.5 semanas (7-8 días) |
| **Riesgo** | 🔴 Alto |
| **Reversible** | ✅ Sí |
| **Requiere Deploy** | ❌ No (beta) |

### Objetivos

1. Instalar y probar React 19
2. Refactorizar componentes problemáticos
3. Validar todos los tests pasan
4. Beta release para testing

### Archivos Involucrados

```
/
├── package.json                      # MODIFICAR versiones React
├── src/
│   ├── components/
│   │   └── Layout.tsx               # REFACTORIZAR
│   ├── hooks/
│   │   └── useKeyboardVisible.ts   # REVISAR
│   └── tests/
│       └── react-19-specific.test.tsx # CREAR
└── MIGRATION_GUIDE.md               # CREAR
```

### Dependencias Afectadas

#### Actualizar
- `react@19.0.0` (dev)
- `react-dom@19.0.0` (dev)
- `@types/react@19.x`
- `@types/react-dom@19.x`

#### Verificar compatibilidad
- `framer-motion@^12.23.9`
- `react-remove-scroll@^2.5.7`

### Tareas Detalladas

#### Día 1: Instalación React 19

**1. Crear branch específica**

```bash
git checkout -b feat/react-19-compat
```

**2. Instalar React 19**

```bash
# Actualizar a React 19
npm install react@19.0.0 react-dom@19.0.0
npm install -D @types/react@19 @types/react-dom@19

# Commit
git add package.json package-lock.json
git commit -m "deps: upgrade to React 19

- Update react and react-dom to 19.0.0
- Update @types packages
- Begin compatibility testing"
```

**3. Build inicial**

```bash
npm run build 2>&1 | tee react19-build.log

# Capturar warnings y errores
```

#### Día 2-3: Refactor Layout Component

**Problema**: `React.Children` API changes en React 19

**Antes:**
```typescript
// src/components/Layout.tsx (problemático)
const Layout = ({ children, ...props }: LayoutProps) => {
  const childrenArray = React.Children.toArray(children);
  
  const header = childrenArray.find((child) => {
    if (!isValidElement(child)) return false;
    if (child.type === Header) return child;
  });
  // ...
};
```

**Después:**
```typescript
// src/components/Layout.tsx (React 19 compatible)
import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';

// Symbol para identificación confiable
const HeaderSymbol = Symbol.for('Layout.Header');
const ContentSymbol = Symbol.for('Layout.Content');
const FooterSymbol = Symbol.for('Layout.Footer');

const Header = ({ children, ...props }: LayoutHeaderProps): ReactElement => {
  return (
    <section
      {...props}
      className={`lola-layout--container--header ${props.className ?? ""}`}
      data-layout-part="header"
    >
      {children}
    </section>
  );
};
Header.displayName = 'Layout.Header';
(Header as any)[HeaderSymbol] = true;

const Content = ({ children, isOverflowauto = false, ...props }: LayoutContentProps): ReactElement => {
  const overflowClassName = isOverflowauto ? "overflow" : "auto";
  const classes = [
    `${props.className ?? ""}`,
    "lola-layout--container--content",
    `lola-layout--container--content--${overflowClassName}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main {...props} className={classes} data-layout-part="content">
      <div className="lola-layout--container--content--container">
        <div className="lola-layout--container--content--container--wrap">
          {children}
        </div>
      </div>
    </main>
  );
};
Content.displayName = 'Layout.Content';
(Content as any)[ContentSymbol] = true;

const Footer = ({ children, ...props }: LayoutFooterProps): ReactElement => {
  return (
    <footer
      {...props}
      className={`lola-layout--container--footer ${props.className ?? ""}`}
      data-layout-part="footer"
    >
      {children}
    </footer>
  );
};
Footer.displayName = 'Layout.Footer';
(Footer as any)[FooterSymbol] = true;

const Layout = ({
  children,
  className = "",
  background = "#fff",
  devMode = false,
  auraColors = ["transparent", "transparent"],
  ...props
}: LayoutProps): ReactElement => {
  const childrenArray = Children.toArray(children);
  const { viewportHeight } = useKeyboardVisible();

  const classes = ["lola-layout", "aura-background", className]
    .filter(Boolean)
    .join(" ");

  // Búsqueda más robusta usando Symbols
  const header = childrenArray.find((child) => {
    if (!isValidElement(child)) return false;
    return (child.type as any)[HeaderSymbol] === true;
  });
  
  const content = childrenArray.find((child) => {
    if (!isValidElement(child)) return false;
    return (child.type as any)[ContentSymbol] === true;
  });
  
  const footer = childrenArray.find((child) => {
    if (!isValidElement(child)) return false;
    return (child.type as any)[FooterSymbol] === true;
  });

  return (
    <div
      {...props}
      style={
        {
          ...props.style,
          height: `${viewportHeight}px`,
          "--bg": background,
          "--color1": `${auraColors[0]}`,
          "--color2": `${auraColors[1]}`,
        } as React.CSSProperties & { [key: string]: string }
      }
      className={classes}
    >
      <section className="lola-layout--container">
        {devMode && <DesignLayout />}
        {header && header}
        {content && content}
        {!content && children}
        {footer && footer}
      </section>
    </div>
  );
};

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;

export { Layout };
```

**Commit:**

```bash
git add src/components/Layout.tsx
git commit -m "refactor(Layout): React 19 compatibility

- Use Symbols for reliable component identification
- Add data-layout-part attributes for fallback
- Improve Children.toArray usage
- Maintain backward compatibility

BREAKING CHANGE: Internal implementation changed, but API remains the same"
```

#### Día 4: Validar Hooks

**1. Test useKeyboardVisible con React 19**

```typescript
// src/hooks/__tests__/useKeyboardVisible.test.ts
import { renderHook, act, waitFor } from '@testing-library/react';
import { useKeyboardVisible } from '../useKeyboardVisible';

describe('useKeyboardVisible - React 19', () => {
  it('updates viewport height on resize', async () => {
    const { result } = renderHook(() => useKeyboardVisible());
    
    const initialHeight = result.current.viewportHeight;
    
    // Simulate viewport resize
    act(() => {
      Object.defineProperty(window.visualViewport, 'height', {
        value: 500,
        writable: true
      });
      window.visualViewport?.dispatchEvent(new Event('resize'));
    });
    
    await waitFor(() => {
      expect(result.current.viewportHeight).toBe(500);
    });
  });

  it('handles focusin/focusout events correctly', async () => {
    const { result } = renderHook(() => useKeyboardVisible());
    
    expect(result.current.isKeyboardOpen).toBe(false);
    
    // Create input element
    const input = document.createElement('input');
    document.body.appendChild(input);
    
    act(() => {
      input.focus();
      window.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    });
    
    await waitFor(() => {
      expect(result.current.isKeyboardOpen).toBe(true);
    });
    
    act(() => {
      input.blur();
      window.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    });
    
    await waitFor(() => {
      expect(result.current.isKeyboardOpen).toBe(false);
    });
    
    document.body.removeChild(input);
  });
});
```

**2. Commit**

```bash
git add src/hooks/__tests__/useKeyboardVisible.test.ts
git commit -m "test: validate useKeyboardVisible with React 19

- Test viewport resize handling
- Test focus events with new timing
- Ensure cleanup works correctly"
```

#### Día 5: Run Full Test Suite

**1. Ejecutar todos los tests**

```bash
# Con React 19
npm run test:run

# Capturar resultados
npm run test:run 2>&1 | tee react19-tests.log
```

**2. Verificar no hay deprecation warnings**

```bash
# Build sin warnings
npm run build 2>&1 | grep -i "deprecat"

# Debe estar vacío
```

**3. Test en Storybook**

```bash
npm run storybook

# Verificar visualmente:
# - Todos los componentes renderizan
# - Animaciones funcionan (framer-motion)
# - Layout compound component funciona
# - Scroll locking funciona
```

#### Día 6: Verificar Dependencias Externas

**1. Test framer-motion**

```typescript
// src/tests/react-19-framer-motion.test.tsx
import { render, screen } from '@testing-library/react';
import { motion } from 'framer-motion';

describe('Framer Motion - React 19', () => {
  it('renders motion components', () => {
    render(
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        data-testid="motion-div"
      >
        Test
      </motion.div>
    );
    
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('handles exit animations', async () => {
    const { rerender } = render(
      <AnimatePresence>
        <motion.div
          key="item"
          exit={{ opacity: 0 }}
          data-testid="item"
        >
          Item
        </motion.div>
      </AnimatePresence>
    );
    
    rerender(<AnimatePresence />);
    
    // Verificar que exit animation se ejecuta
  });
});
```

**2. Test react-remove-scroll**

```typescript
// src/tests/react-19-scroll-lock.test.tsx
import { render } from '@testing-library/react';
import { RemoveScroll } from 'react-remove-scroll';

describe('RemoveScroll - React 19', () => {
  it('locks scroll when enabled', () => {
    render(
      <RemoveScroll enabled={true}>
        <div>Content</div>
      </RemoveScroll>
    );
    
    expect(document.body.style.overflow).toBe('hidden');
  });
});
```

**3. Commit**

```bash
git add src/tests/react-19-*.test.tsx
git commit -m "test: validate third-party deps with React 19

- Test framer-motion compatibility
- Test react-remove-scroll compatibility
- All integrations working"
```

#### Día 7-8: Documentation y Beta Release

**1. Crear guía de migración**

```markdown
// MIGRATION_GUIDE.md

# Migration Guide: v0.3.x → v0.4.0

## React 19 Support

Lola Framework UI v0.4.0 adds support for React 19 while maintaining backward compatibility with React 18.

### Breaking Changes

#### 1. useBlockScroll Hook

**Before:**
\`\`\`typescript
useBlockScroll();
\`\`\`

**After:**
\`\`\`typescript
useBlockScroll(true); // enabled parameter now required
\`\`\`

#### 2. Bundle Structure

Icons are now tree-shakeable. Update imports for optimal bundle size:

**Before:**
\`\`\`typescript
import { CameraIcon } from 'lola-framework-ui';
\`\`\`

**After (recommended):**
\`\`\`typescript
import { CameraIcon } from 'lola-framework-ui/icons';
\`\`\`

### Compatibility Matrix

| React Version | Lola UI Version |
|---------------|-----------------|
| 18.x | 0.3.x, 0.4.x |
| 19.x | 0.4.x |

### Testing Your Upgrade

1. Update package.json
2. Run tests: \`npm test\`
3. Build: \`npm run build\`
4. Check for deprecation warnings

### Known Issues

- VGS components require separate installation of @vgs packages
- Storybook may show warnings (safe to ignore)

### Rollback

If issues occur:

\`\`\`bash
npm install lola-framework-ui@0.3.1
npm install react@18 react-dom@18
\`\`\`
```

**2. Actualizar CHANGELOG**

```markdown
## [0.4.0-beta.1] - 2026-06-XX

### Added
- React 19 compatibility
- Tree-shakeable icon exports
- Code splitting for better bundle size

### Changed
- **BREAKING**: useBlockScroll now requires enabled parameter
- **BREAKING**: Optimized bundle structure
- Layout component refactored for React 19

### Fixed
- Bundle size reduced from 708KB to ~395KB (-44%)
- CSS duplication eliminated
- VGS dependencies now optional

### Dependencies
- Upgraded React peer dependency to support 18 and 19
- Replaced body-scroll-lock beta with react-remove-scroll
```

**3. Beta release**

```bash
# Actualizar versión
npm version 0.4.0-beta.1

# Build
npm run build

# Publish beta
npm publish --tag beta

# Tag
git tag v0.4.0-beta.1
git push origin v0.4.0-beta.1
```

**4. Commit**

```bash
git add MIGRATION_GUIDE.md CHANGELOG.md package.json
git commit -m "docs: add migration guide for v0.4.0

- Document breaking changes
- Add compatibility matrix
- Include rollback instructions
- Beta release notes"
```

### Estrategia de Rollback

#### Rollback a React 18

```bash
# Revertir a React 18
npm install react@18.3.1 react-dom@18.3.1
npm install -D @types/react@18 @types/react-dom@18

# Rebuild
npm run build

# Run tests
npm test

# Commit
git add package.json package-lock.json
git commit -m "revert: rollback to React 18

React 19 compatibility testing revealed issues.
Reverting to React 18 for stability."
```

#### Rollback Layout Changes

```bash
# Revertir Layout.tsx
git checkout v0.3.1 -- src/components/Layout.tsx

# Rebuild y test
npm run build
npm test
```

### Criterios de Éxito

- ✅ Build exitoso sin warnings
- ✅ Todos los tests pasan (100%)
- ✅ No deprecation warnings
- ✅ Storybook funciona en ambas versiones
- ✅ Framer Motion funciona correctamente
- ✅ Beta release publicado
- ✅ Migration guide completo
- ✅ Feedback de beta testers positivo

### Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| React 19 tiene bugs no detectados | Media | Alto | Beta release, feedback loop |
| Framer Motion incompatible | Baja | Alto | Validación early, alternativas listas |
| Layout refactor rompe apps | Media | Crítico | Tests exhaustivos, backward compat |
| VGS no funciona con React 19 | Alta | Medio | Ya es opcional, docs actualizados |

---

## Fase 5: CI/CD y Release

### Información General

| Aspecto | Detalle |
|---------|---------|
| **Duración** | 1 semana (5 días) |
| **Riesgo** | 🟢 Bajo |
| **Reversible** | ✅ Sí |
| **Requiere Deploy** | ✅ Sí (NPM) |

### Objetivos

1. Configurar pipeline CI/CD completo
2. Automatizar releases
3. Deploy a producción (NPM)
4. Post-release monitoring

### Archivos Involucrados

```
/
├── .github/
│   └── workflows/
│       ├── ci.yml                  # MODIFICAR/CREAR
│       ├── release.yml             # CREAR
│       └── pr-check.yml           # CREAR
├── package.json                   # MODIFICAR scripts
├── CHANGELOG.md                   # FINALIZAR
└── README.md                      # ACTUALIZAR badges
```

### Dependencias Afectadas

**Ninguna** - Solo configuración CI/CD

### Tareas Detalladas

#### Día 1: CI Pipeline Completo

**1. Actualizar workflow de CI**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, feat/modernization-2026]
  pull_request:
    branches: [main]

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  test:
    name: Test (React ${{ matrix.react }} / Node ${{ matrix.node }})
    runs-on: ubuntu-latest
    strategy:
      matrix:
        react: ['18', '19']
        node: ['18', '20']
      fail-fast: false
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node ${{ matrix.node }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install React ${{ matrix.react }}
        run: |
          npm install react@${{ matrix.react }} react-dom@${{ matrix.react }}
      
      - name: Run tests
        run: npm run test:run
      
      - name: Coverage
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        if: matrix.react == '19' && matrix.node == '20'
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          file: ./coverage/lcov.info

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint, test]
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Check bundle size
        run: |
          BUNDLE_SIZE=$(du -sb dist | cut -f1)
          MAX_SIZE=450000  # 450KB in bytes
          
          if [ $BUNDLE_SIZE -gt $MAX_SIZE ]; then
            echo "❌ Bundle size ($BUNDLE_SIZE bytes) exceeds limit ($MAX_SIZE bytes)"
            exit 1
          fi
          
          echo "✅ Bundle size OK: $BUNDLE_SIZE bytes"
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 7

  size-check:
    name: Bundle Size Check
    runs-on: ubuntu-latest
    needs: build
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      
      - name: Analyze bundle
        run: |
          echo "📦 Bundle Analysis"
          echo "=================="
          ls -lh dist/*.js dist/*.css
          echo ""
          echo "Total size:"
          du -sh dist/
```

**2. Crear PR check workflow**

```yaml
# .github/workflows/pr-check.yml
name: PR Check

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  pr-info:
    name: PR Information
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Check for breaking changes
        run: |
          # Check commit messages for BREAKING CHANGE
          if git log origin/main..HEAD --grep="BREAKING CHANGE" --oneline | grep -q "BREAKING"; then
            echo "⚠️ This PR contains breaking changes"
            echo "breaking=true" >> $GITHUB_OUTPUT
          fi
        id: breaking
      
      - name: Comment on PR
        if: steps.breaking.outputs.breaking == 'true'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '⚠️ **This PR contains breaking changes.** Make sure to update version and CHANGELOG appropriately.'
            })
```

**3. Commit**

```bash
git add .github/workflows/
git commit -m "ci: complete CI pipeline

- Lint, test, build on every push/PR
- Test on React 18 and 19
- Bundle size validation
- Breaking change detection
- Artifact upload"
```

#### Día 2: Release Automation

**1. Crear release workflow**

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

permissions:
  contents: write
  packages: write

jobs:
  release:
    name: Release to NPM
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:run
      
      - name: Build
        run: npm run build
      
      - name: Publish to NPM
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      
      - name: Extract version
        id: version
        run: echo "version=${GITHUB_REF#refs/tags/v}" >> $GITHUB_OUTPUT
      
      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ steps.version.outputs.version }}
          body_path: RELEASE_NOTES.md
          draft: false
          prerelease: ${{ contains(github.ref, 'beta') || contains(github.ref, 'alpha') }}
      
      - name: Notify Slack
        if: success()
        uses: slackapi/slack-github-action@v1
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK }}
          payload: |
            {
              "text": "🎉 Lola Framework UI ${{ steps.version.outputs.version }} released!"
            }
```

**2. Crear release script local**

```bash
#!/bin/bash
# scripts/release.sh

set -e

echo "🚀 Lola UI Release Script"
echo "========================="
echo ""

# Check clean working directory
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Working directory not clean. Commit or stash changes."
  exit 1
fi

# Check on main
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
  echo "❌ Must be on main branch. Current: $BRANCH"
  exit 1
fi

# Pull latest
echo "📥 Pulling latest changes..."
git pull origin main

# Run tests
echo "🧪 Running tests..."
npm run test:run

# Build
echo "📦 Building..."
npm run build

# Ask for version
echo ""
read -p "Version type (patch/minor/major): " VERSION_TYPE

# Update version
npm version $VERSION_TYPE -m "chore: release v%s"

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")
echo ""
echo "📝 New version: $NEW_VERSION"

# Generate release notes
echo "📄 Generating release notes..."
cat > RELEASE_NOTES.md << EOF
# Release v$NEW_VERSION

## Changes

$(git log v$(node -p "require('./package.json').version")..HEAD --pretty=format:"- %s" | head -20)

## Installation

\`\`\`bash
npm install lola-framework-ui@$NEW_VERSION
\`\`\`

For full changelog, see [CHANGELOG.md](./CHANGELOG.md)
EOF

# Confirm
echo ""
read -p "Ready to release v$NEW_VERSION? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
  echo "❌ Release cancelled"
  git tag -d "v$NEW_VERSION"
  git reset HEAD~1
  exit 1
fi

# Push
echo "📤 Pushing to GitHub..."
git push origin main
git push origin "v$NEW_VERSION"

echo ""
echo "✅ Release triggered!"
echo "Watch progress at: https://github.com/YOUR_ORG/lola-framework-ui-test/actions"
```

**3. Make executable y commit**

```bash
chmod +x scripts/release.sh

git add .github/workflows/release.yml scripts/release.sh
git commit -m "ci: add automated release workflow

- NPM publish on tag push
- GitHub release creation
- Slack notifications
- Local release script"
```

#### Día 3: Preparar Release v0.4.0

**1. Merge feature branch**

```bash
# Desde feat/modernization-2026
git checkout main
git merge --no-ff feat/modernization-2026

# Resolver conflictos si existen
npm run build
npm test

git push origin main
```

**2. Finalizar CHANGELOG**

```markdown
# Changelog

## [0.4.0] - 2026-06-XX

### Added
- ✨ React 19 compatibility while maintaining React 18 support
- ✨ Tree-shakeable icon exports for optimal bundle size
- ✨ Comprehensive test suite with 80%+ coverage
- ✨ Automated CI/CD pipeline

### Changed
- **BREAKING**: `useBlockScroll` now requires `enabled` parameter
- **BREAKING**: Icon import path changed to `lola-framework-ui/icons` for tree-shaking
- ⚡ Bundle size reduced from 708KB to 395KB (-44%)
- ⚡ Build time improved by ~50%
- 🔄 Replaced `body-scroll-lock` beta with stable `react-remove-scroll`
- 🔄 VGS dependencies now optional peer dependencies

### Fixed
- 🐛 CSS duplication eliminated (single output file)
- 🐛 Layout component Children API compatibility with React 19
- 🐛 No more beta dependencies in production

### Removed
- 🗑️ Deprecated `body-scroll-lock` dependency
- 🗑️ Duplicate CSS build outputs

### Dependencies
- ⬆️ react peer dependency: >=18 <20 (supports both 18 and 19)
- ➕ react-remove-scroll@^2.5.7
- ➕ Testing dependencies (vitest, @testing-library/react)
- ➖ body-scroll-lock@4.0.0-beta.0

### Migration
See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed upgrade instructions.

## [0.3.1] - 2026-06-11

### Current State (Pre-migration)
- 24 React components
- 8 custom hooks
- 52 icons
- Storybook documentation
```

**3. Actualizar README con badges**

```markdown
# Lola Framework UI

[![NPM Version](https://img.shields.io/npm/v/lola-framework-ui)](https://www.npmjs.com/package/lola-framework-ui)
[![Build Status](https://github.com/YOUR_ORG/lola-framework-ui-test/workflows/CI/badge.svg)](https://github.com/YOUR_ORG/lola-framework-ui-test/actions)
[![Coverage](https://codecov.io/gh/YOUR_ORG/lola-framework-ui-test/branch/main/graph/badge.svg)](https://codecov.io/gh/YOUR_ORG/lola-framework-ui-test)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/lola-framework-ui)](https://bundlephobia.com/package/lola-framework-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Modern React component library with React 18 & 19 support

## Features

- ✅ React 18 and 19 compatible
- ✅ TypeScript strict mode
- ✅ Tree-shakeable (optimize your bundle!)
- ✅ 80%+ test coverage
- ✅ Modern CSS (Level 4/5)
- ✅ Comprehensive Storybook docs

## Installation

\`\`\`bash
npm install lola-framework-ui
\`\`\`

## Quick Start

\`\`\`tsx
import { Button, Layout } from 'lola-framework-ui';
import 'lola-framework-ui/dist/lola-framework-ui.css';

function App() {
  return (
    <Layout>
      <Layout.Header>
        <h1>My App</h1>
      </Layout.Header>
      <Layout.Content>
        <Button>Click me</Button>
      </Layout.Content>
    </Layout>
  );
}
\`\`\`

## Bundle Size Optimization

Use specific imports for tree-shaking:

\`\`\`tsx
// ✅ Tree-shakeable (recommended)
import { Button } from 'lola-framework-ui';
import { CameraIcon } from 'lola-framework-ui/icons';

// ❌ Not tree-shakeable
import * as LolaUI from 'lola-framework-ui';
\`\`\`

[Full documentation →](./docs/README.md)
```

**4. Commit**

```bash
git add CHANGELOG.md README.md
git commit -m "docs: finalize v0.4.0 documentation

- Complete changelog
- Update README with badges and features
- Add bundle optimization guide"
```

#### Día 4: Release to Production

**1. Run release script**

```bash
./scripts/release.sh

# Seleccionar: minor (0.3.1 -> 0.4.0)
# Confirmar release
```

**2. Monitor CI/CD**

```bash
# Watch GitHub Actions
# https://github.com/YOUR_ORG/lola-framework-ui-test/actions

# Verificar:
# - CI passes
# - Release workflow ejecuta
# - NPM package publicado
# - GitHub release creado
```

**3. Verificar NPM**

```bash
# Check NPM page
open https://www.npmjs.com/package/lola-framework-ui

# Test install
mkdir /tmp/test-v040
cd /tmp/test-v040
npm init -y
npm install lola-framework-ui@0.4.0
```

#### Día 5: Post-Release

**1. Anunciar release**

```markdown
# Announcement Template

🎉 **Lola Framework UI v0.4.0 Released!**

We're excited to announce v0.4.0 with major improvements:

**✨ Highlights:**
- React 19 support (while maintaining React 18 compatibility)
- 44% bundle size reduction (708KB → 395KB)
- Tree-shakeable icons
- 80%+ test coverage
- No beta dependencies

**🚀 Upgrade:**
\`\`\`bash
npm install lola-framework-ui@0.4.0
\`\`\`

**📖 Docs:**
- [Migration Guide](./MIGRATION_GUIDE.md)
- [Full Changelog](./CHANGELOG.md)
- [Documentation](./docs/README.md)

**⚠️ Breaking Changes:**
- useBlockScroll API changed
- Icon imports optimized

See migration guide for details.

Questions? Open an issue!
```

**2. Monitor issues**

```bash
# Set up issue monitoring
gh api repos/YOUR_ORG/lola-framework-ui-test/issues | jq .

# Watch for:
# - Installation problems
# - Breaking change issues
# - React 19 compatibility reports
```

**3. Update internal projects**

```bash
# Create tracking issue
gh issue create --title "Upgrade to Lola UI v0.4.0" --body "$(cat <<EOF
Upgrade tracking for internal projects:

- [ ] Project A
- [ ] Project B
- [ ] Project C

Follow [Migration Guide](./MIGRATION_GUIDE.md)
EOF
)"
```

### Estrategia de Rollback

#### Rollback NPM Release

```bash
# Deprecate version con problema
npm deprecate lola-framework-ui@0.4.0 "Known issues, use 0.3.1"

# Publicar hotfix
npm version patch  # 0.4.1
npm publish

# O rollback completo
git revert v0.4.0
npm version patch  # 0.4.1
npm publish
```

#### Rollback GitHub Release

```bash
# Delete release
gh release delete v0.4.0 --yes

# Delete tag
git tag -d v0.4.0
git push origin :refs/tags/v0.4.0
```

### Criterios de Éxito

- ✅ CI passing en todas las branches
- ✅ Release automático funciona
- ✅ v0.4.0 publicado en NPM
- ✅ GitHub release creado
- ✅ Documentación actualizada
- ✅ No issues críticos reportados
- ✅ Proyectos internos upgradeados

### Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| NPM publish falla | Baja | Alto | Credenciales verificadas, retry logic |
| Breaking changes no documentados | Media | Alto | Thorough testing, beta feedback |
| CI failures en producción | Baja | Medio | Multiple test environments |
| Rollback necesario | Baja | Crítico | Deprecate strategy ready |

---

## Resumen de Todas las Fases

### Timeline General

```
Fase 0: Preparación        ▓▓░░░░░░░░░░░░░░░░░░░░ (2-3 días)
Fase 1: Dependencias       ░░▓▓▓▓▓░░░░░░░░░░░░░░░ (1 semana)
Fase 2: Testing            ░░░░░░░▓▓▓▓▓▓▓░░░░░░░░ (1.5 semanas)
Fase 3: Bundle Opt         ░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓ (2 semanas)
Fase 4: React 19           ░░░░░░░░░░░░░░░░░░▓▓▓▓ (1.5 semanas)
Fase 5: CI/CD              ░░░░░░░░░░░░░░░░░░░░░▓ (1 semana)
─────────────────────────────────────────────────
TOTAL:                                   6-8 semanas
```

### Métricas de Éxito Global

| Métrica | Antes | Objetivo | Final Esperado |
|---------|-------|----------|----------------|
| **Bundle Size** | 708KB | <400KB | ~395KB (-44%) |
| **Test Coverage** | 0% | 80% | 85% |
| **Build Time** | 30s | <15s | ~12s (-60%) |
| **Dependencies** | 3 (1 beta) | 0 beta | 0 beta ✅ |
| **React Support** | 18 only | 18 & 19 | 18 & 19 ✅ |
| **Tree-shaking** | ❌ | ✅ | ✅ |

### Puntos de Decision

Durante la migración, estos son puntos donde puede ser necesario tomar decisiones:

**Fase 1, Día 3**: ¿VGS como peer dependency o paquete separado?
- **Recomendado**: Peer dependency opcional
- **Alternativa**: Paquete separado (@lola-ui/vgs-components)

**Fase 3, Día 2**: ¿UMD format necesario?
- **Recomendado**: Solo ESM y CJS
- **Si se necesita UMD**: Agregar en vite.config

**Fase 4, Día 2**: ¿React 19 como mínimo o mantener 18?
- **Recomendado**: Soportar ambos (>=18 <20)
- **Future**: React 19 mínimo en v1.0.0

**Fase 5, Día 4**: ¿Beta release antes de stable?
- **Recomendado**: Sí, 1-2 semanas de beta
- **Si urgente**: Directamente a stable con buen testing

### Comunicación Durante la Migración

**Semana 1**: "Iniciando modernización de Lola UI"
**Semana 2-3**: "Testing infrastructure completa"
**Semana 4-5**: "Bundle optimization en progreso"
**Semana 6**: "React 19 beta disponible"
**Semana 7-8**: "v0.4.0 stable released"

### Contactos y Soporte

**Durante la migración**:
- Tech Lead: [Nombre]
- DevOps: [Nombre]
- QA Lead: [Nombre]

**Escalation Path**:
1. GitHub Issues
2. Slack: #lola-ui-support
3. Tech Lead direct

---

## Apéndice: Scripts Útiles

### Quick Status Check

```bash
#!/bin/bash
# scripts/migration-status.sh

echo "📊 Migration Status Check"
echo "========================"
echo ""

# Current phase
echo "Current Phase:"
git branch --show-current
echo ""

# Bundle size
echo "Bundle Size:"
npm run build > /dev/null 2>&1
du -sh dist/
echo ""

# Test coverage
echo "Test Coverage:"
npm run test:coverage 2>&1 | grep "All files"
echo ""

# Dependencies check
echo "Dependencies:"
echo "Beta versions: $(npm ls --json | jq -r '.dependencies | to_entries[] | select(.value.version | contains("beta")) | .key')"
echo "Missing peer deps: $(npm ls 2>&1 | grep 'UNMET PEER DEPENDENCY' || echo 'None')"
```

### Rollback All Script

```bash
#!/bin/bash
# scripts/rollback-all.sh

echo "⚠️  ROLLBACK ALL CHANGES"
echo "======================="
echo ""
echo "This will:"
echo "1. Checkout main branch"
echo "2. Delete modernization branch"
echo "3. Reinstall original dependencies"
echo ""
read -p "Are you sure? (type 'yes' to confirm): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "Cancelled"
  exit 0
fi

git checkout main
git branch -D feat/modernization-2026
git checkout v0.3.1 -- package.json package-lock.json
npm ci
npm run build

echo "✅ Rolled back to v0.3.1"
```

---

**Documento preparado por**: AI Assistant  
**Fecha**: Junio 11, 2026  
**Versión del Plan**: 1.0  
**Para preguntas**: Abrir issue en GitHub
