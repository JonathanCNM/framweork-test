# Riesgos de Migración

## Tabla de Contenidos

- [React 18 → 19](#react-18--19)
- [Vite 5 → 7](#vite-5--7)
- [TypeScript](#typescript)
- [Dependencias de Terceros](#dependencias-de-terceros)
- [Breaking Changes](#breaking-changes)
- [Estrategia de Migración](#estrategia-de-migración)
- [Checklist de Validación](#checklist-de-validación)

---

## React 18 → 19

### Estado Actual

```json
{
  "peerDependencies": {
    "react": ">=18 <20",          // ✅ Ya soporta 19
    "react-dom": ">=18 <20"       // ✅ Ya soporta 19
  },
  "devDependencies": {
    "react": "^18.3.1",           // Dev actual
    "react-dom": "^18.3.1"
  }
}
```

**Versión objetivo**: React 19.x

---

### 🔴 Riesgos Altos

#### 1. Dependencias Externas

**@vgs/collect-js-react**
```typescript
// src/components/VgsInput.tsx
import { VGSCollectForm } from "@vgs/collect-js-react";
```

**Riesgo**: 
- ⚠️ Compatibilidad desconocida con React 19
- ⚠️ Posibles breaking changes en integración
- ⚠️ Última actualización de VGS puede no soportar React 19

**Mitigación**:
1. Consultar roadmap de VGS
2. Testing exhaustivo en sandbox
3. Plan B: Mantener React 18 para componentes VGS

---

#### 2. Framer Motion

```typescript
import { motion } from "framer-motion";
```

**Estado**: 
- ✅ Framer Motion 12.x tiene beta para React 19
- ⚠️ Requiere testing de animaciones

**Puntos a validar**:
- Animaciones de layout
- Shared layout animations
- Exit animations
- AnimatePresence

**Testing necesario**:
```typescript
// tests/react-19/framer-motion.test.tsx
describe('Framer Motion React 19', () => {
  test('MotionWrapper animations work', () => {
    render(
      <MotionWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Content
      </MotionWrapper>
    );
    // Verificar animación
  });
});
```

---

#### 3. React.Children Manipulation

**Código afectado**:
```typescript
// src/components/Layout.tsx
const Layout = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children);
  
  const header = childrenArray.find((child) => {
    if (!isValidElement(child)) return false;
    if (child.type === Header) return child;
  });
  // ...
};
```

**Riesgo**: 
- ⚠️ React 19 cambia comportamiento de Children API
- ⚠️ `child.type` puede no ser confiable

**Solución recomendada**:
```typescript
// Usar Symbol para identificar componentes
const HeaderSymbol = Symbol('Layout.Header');

const Header = ({ children }: LayoutHeaderProps) => {
  return <section data-layout-part="header">{children}</section>;
};
Header.displayName = 'Layout.Header';
Header[HeaderSymbol] = true;

const Layout = ({ children }) => {
  const header = Children.toArray(children).find(child => 
    isValidElement(child) && child.type[HeaderSymbol]
  );
};
```

---

#### 4. visualViewport API

**Código afectado**:
```typescript
// src/hooks/useKeyboardVisible.ts
const [viewportHeight, setViewportHeight] = useState(
  window.visualViewport?.height || window.innerHeight
);

useEffect(() => {
  const handleResize = () =>
    setViewportHeight(window.visualViewport?.height || window.innerHeight);
  
  window.visualViewport?.addEventListener("resize", handleResize);
  // ...
});
```

**Riesgo**: 
- ⚠️ Interacción con Concurrent Features de React 19
- ⚠️ Posible race condition con automatic batching

**Mitigación**:
- Testing exhaustivo en dispositivos móviles
- Considerar `useLayoutEffect` si hay flickering

---

### 🟡 Riesgos Medios

#### 5. useEffect Changes

React 19 puede cambiar timing de useEffect en algunos casos.

**Componentes a revisar**:
- `useBlockScroll` - Modifica DOM
- `useTheme` - Inyecta styles
- `useKeyboardVisible` - Event listeners

**Testing necesario**:
```typescript
describe('useEffect timing', () => {
  test('useBlockScroll applies before paint', () => {
    const { unmount } = render(<ComponentUsingBlockScroll />);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
```

---

#### 6. defaultProps Deprecation

React 19 depreca `defaultProps` en favor de default parameters.

**Audit necesario**:
```bash
# Buscar uso de defaultProps
grep -r "defaultProps" src/
```

**Si se encuentran, refactorizar**:
```typescript
// ❌ Antiguo
Component.defaultProps = {
  variant: 'default',
  size: 'medium'
};

// ✅ Nuevo
const Component = ({
  variant = 'default',
  size = 'medium'
}: Props) => {
  // ...
};
```

---

#### 7. Context API

**Código que usa Context**:
```typescript
// src/store/index.ts
export const GradientContext = createContext<GrdientThemeProps | null>(null);
```

**Riesgo**: 
- ⚠️ React 19 optimiza Context rendering
- ⚠️ Posibles cambios en re-render behavior

**Testing**:
```typescript
describe('Context with React 19', () => {
  test('GradientContext updates correctly', () => {
    // Test context updates
  });
});
```

---

### 🟢 Riesgos Bajos

#### 8. TypeScript Types

React 19 actualiza tipos de TypeScript.

**Cambios esperados**:
```typescript
// Tipos más estrictos en:
- React.FC (puede requerir ajustes)
- Event handlers (onChange, onClick, etc.)
- Ref types (useRef, forwardRef)
```

**Acción**:
```bash
# Actualizar @types/react
npm install -D @types/react@19 @types/react-dom@19

# Revisar errores de tipos
npm run build
```

---

#### 9. CSS-in-JS

**Código que genera estilos**:
```typescript
// useTheme inyecta <style> tags
const styleTag = document.createElement("style");
document.head.appendChild(styleTag);
```

**Riesgo**: 
- 🟢 Bajo, pero validar que funciona con Concurrent Features

---

## Vite 5 → 7

### Estado Actual

```json
{
  "vite": "^7.0.4"  // ✅ Ya está en Vite 7
}
```

**No hay migración necesaria**, pero revisar:

1. **Plugin API**: Verificar que plugins funcionan
2. **CSS Handling**: Validar output CSS
3. **Build Output**: Comparar bundles

---

## TypeScript

### Estado Actual

```json
{
  "typescript": "~5.8.3"  // ✅ Última versión
}
```

**No hay migración necesaria**, pero:

1. **Strict Mode**: Ya activado ✅
2. **Nuevas reglas**: Pueden aparecer warnings
3. **Type Inference**: Mejorada, puede requerir ajustes

---

## Dependencias de Terceros

### Matriz de Compatibilidad

| Dependencia | Versión Actual | React 18 | React 19 | Acción |
|-------------|----------------|----------|----------|--------|
| framer-motion | 12.23.9 | ✅ | ⚠️ Beta | Testing |
| body-scroll-lock | 4.0.0-beta.0 | ✅ | ⚠️ | Reemplazar |
| @vgs/collect-js-react | N/A | ? | ❌ | Consultar |
| react-router-dom | 7.7.1 | ✅ | ✅ | OK |

---

## Breaking Changes

### Cambios Confirmados en React 19

1. **Automatic Batching** (ya en 18, mejorado en 19)
2. **Concurrent Features** (mejoras)
3. **New Hooks** (useDeferredValue, useTransition mejoras)
4. **defaultProps deprecation**
5. **Children.toArray behavior changes**

### Cambios que Afectan Lola Framework UI

```typescript
// ANTES (React 18)
const Layout = ({ children }) => {
  const header = React.Children.toArray(children).find(
    child => child.type === Header
  );
};

// DESPUÉS (React 19 - más seguro)
const Layout = ({ children }) => {
  const header = React.Children.toArray(children).find(child => 
    isValidElement(child) && 
    child.type?.displayName === 'Layout.Header'
  );
};
```

---

## Estrategia de Migración

### Fase 1: Preparación (1 semana)

**Objetivos**:
- Setup de testing
- Crear rama de migración
- Documentar estado actual

**Tareas**:
```bash
# 1. Crear rama
git checkout -b feat/react-19-migration

# 2. Instalar React 19
npm install react@19.0.0 react-dom@19.0.0
npm install -D @types/react@19 @types/react-dom@19

# 3. Setup testing
npm install -D vitest @testing-library/react
```

---

### Fase 2: Testing Inicial (1 semana)

**Objetivos**:
- Identificar breaking changes
- Documentar issues
- Priorizar fixes

**Tests a ejecutar**:

1. **Build Test**
```bash
npm run build
# Verificar sin errores
```

2. **Component Tests**
```bash
npm test -- --run
# Verificar todos pasan
```

3. **Visual Regression Test**
```bash
npm run storybook
# Revisar visualmente todos los componentes
```

4. **Integration Tests**
```typescript
// Crear proyecto test que consume la librería
npx create-vite test-app
cd test-app
npm install ../lola-framework-ui-test
```

---

### Fase 3: Fixes (2 semanas)

**Prioritarios**:

1. **Layout.tsx** - Refactor Children API
2. **useKeyboardVisible** - Testing exhaustivo
3. **VGS Components** - Validar o deshabilitar
4. **Framer Motion** - Validar animaciones

**Por cada fix**:
```typescript
// 1. Crear test que falla
test('Layout finds Header correctly', () => {
  // ...
});

// 2. Implementar fix
// ...

// 3. Verificar test pasa
npm test

// 4. Commit
git commit -m "fix(Layout): React 19 Children API compatibility"
```

---

### Fase 4: Validación (1 semana)

**Full Testing Suite**:

1. **Unit Tests**: 100% coverage de componentes críticos
2. **Integration Tests**: Proyecto consumidor funciona
3. **Visual Tests**: Storybook sin regresiones
4. **Performance Tests**: No degradación
5. **Cross-browser**: Chrome, Safari, Firefox
6. **Mobile**: iOS Safari, Chrome Mobile

---

### Fase 5: Release (1 semana)

**Release Strategy**:

1. **Beta Release**
```bash
npm version 0.4.0-beta.1
npm publish --tag beta
```

2. **Testing en Producción**
- Proyecto piloto interno
- Monitoreo de errores
- Recolección de feedback

3. **Stable Release**
```bash
npm version 0.4.0
npm publish
```

---

## Checklist de Validación

### Pre-Migration

- [ ] ✅ Crear backup/branch
- [ ] ✅ Documentar estado actual
- [ ] ✅ Setup testing environment
- [ ] ⚠️ Consultar compatibilidad VGS
- [ ] ⚠️ Verificar roadmap Framer Motion

### During Migration

#### Código
- [ ] ⚠️ Refactor `React.Children` usage
- [ ] ⚠️ Eliminar `defaultProps`
- [ ] ⚠️ Validar `useEffect` timing
- [ ] ⚠️ Revisar Context API

#### Dependencies
- [ ] ⚠️ Actualizar @types/react
- [ ] ⚠️ Testing framer-motion
- [ ] ⚠️ Resolver body-scroll-lock
- [ ] ⚠️ Validar VGS components

#### Testing
- [ ] ⚠️ Unit tests pasan
- [ ] ⚠️ Integration tests pasan
- [ ] ⚠️ Visual regression tests
- [ ] ⚠️ Performance benchmarks
- [ ] ⚠️ Mobile testing

### Post-Migration

- [ ] ⚠️ Beta release
- [ ] ⚠️ Proyecto piloto
- [ ] ⚠️ Documentación actualizada
- [ ] ⚠️ Changelog completo
- [ ] ⚠️ Stable release

---

## Rollback Plan

### Si algo sale mal

**Criterios para rollback**:
- Más de 5 breaking changes críticos
- VGS components no funcionan
- Performance degradation >20%
- Issues en producción sin fix rápido

**Proceso de rollback**:
```bash
# 1. Revertir package.json
git checkout main -- package.json

# 2. Reinstalar
rm -rf node_modules package-lock.json
npm install

# 3. Rebuild
npm run build

# 4. Comunicar
# Notificar a stakeholders
```

---

## Timeline Estimado

```
Fase 1: Preparación ──── 1 semana
Fase 2: Testing ──────── 1 semana
Fase 3: Fixes ─────────── 2 semanas
Fase 4: Validación ────── 1 semana
Fase 5: Release ───────── 1 semana
─────────────────────────────────
TOTAL: ───────────────── 6 semanas
```

**Con buffer**: 8 semanas

---

## Recursos

### Documentación Oficial

- [React 19 Release Notes](https://react.dev/blog)
- [Framer Motion React 19 Support](https://www.framer.com/motion/)
- [Vite 7 Migration Guide](https://vitejs.dev/guide/migration)

### Testing

- [Testing Library React 19](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest](https://vitest.dev/)

---

[← Volver al Índice](../README.md) | [Siguiente: Modernización →](../modernization/README.md)
