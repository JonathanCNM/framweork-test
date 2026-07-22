# Problemas Identificados

## Tabla de Contenidos

- [Problemas Críticos 🔴](#problemas-críticos-)
- [Advertencias 🟡](#advertencias-)
- [Problemas Menores 🟢](#problemas-menores-)
- [Deuda Técnica](#deuda-técnica)
- [Matriz de Priorización](#matriz-de-priorización)

---

## Problemas Críticos 🔴

### 1. Dependencia Beta en Producción

**Severidad**: 🔴 CRÍTICA  
**Componentes afectados**: `useBlockScroll` hook

**Descripción**:
```json
"body-scroll-lock": "4.0.0-beta.0"
```

La librería `body-scroll-lock` está en versión beta (4.0.0-beta.0) y no ha sido actualizada en años.

**Problemas**:
- ❌ Bugs conocidos sin resolver
- ❌ No recomendado para producción
- ❌ Sin mantenimiento activo
- ❌ Posible incompatibilidad con navegadores modernos

**Impacto**:
- Scroll locking puede fallar en ciertos dispositivos
- Problemas de UX en modales y overlays
- Riesgo de crashes en iOS Safari

**Código afectado**:
```typescript
// src/hooks/useBlockScroll.ts
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

**Soluciones**:

**Opción A: react-remove-scroll (Recomendado)**
```bash
npm uninstall body-scroll-lock @types/body-scroll-lock
npm install react-remove-scroll
```

```typescript
// useBlockScroll.ts refactorizado
import { RemoveScroll } from 'react-remove-scroll';

// Usar como component
<RemoveScroll enabled={true}>
  {children}
</RemoveScroll>

// O como hook
import { useEffect } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

export const useBlockScroll = () => {
  useEffect(() => {
    RemoveScroll.classNames.fullWidth = 'full-width';
    RemoveScroll.classNames.zeroRight = 'zero-right';
  }, []);
};
```

**Opción B: Solución Nativa CSS**
```typescript
export const useBlockScroll = () => {
  useEffect(() => {
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
      window.scrollTo(0, scrollY);
    };
  }, []);
};
```

**Timeline**: ⏰ Semana 1

---

### 2. Dependencias Externas No Instaladas

**Severidad**: 🔴 CRÍTICA  
**Componentes afectados**: VGS components, Google Maps components

**Descripción**:
El proyecto declara dependencias externas en `vite.config.ts` pero NO están instaladas:

```typescript
// vite.config.ts
rollupOptions: {
  external: [
    "@vgs/collect-js",           // ❌ NO INSTALADO
    "@vgs/collect-js-react",     // ❌ NO INSTALADO
    "@react-google-maps/api"     // ❌ NO INSTALADO
  ]
}
```

**Componentes que fallarán**:

1. **VgsInput.tsx**
```typescript
import {
  VGSCollectForm,
  type VGSCollectFocusEventData,
  type VGSCollectStateParams,
} from "@vgs/collect-js-react";  // 💥 Module not found
```

2. **VgsFormWrapper.tsx**
3. **useVgsCollectLoader.ts**
4. **VgsFormWrapper.stories.tsx**

**Impacto**:
- ❌ Build falla al importar estos componentes
- ❌ Storybook stories no cargan
- ❌ Proyectos consumidores no pueden usar VGS
- ❌ Runtime errors en producción

**Soluciones**:

**Opción A: Instalar como Peer Dependencies**
```json
{
  "peerDependencies": {
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

**Opción B: Paquete Separado**
```
@lola-ui/core            - Componentes principales
@lola-ui/vgs-components  - Componentes VGS (opcional)
```

**Opción C: Dynamic Imports**
```typescript
// vgs-components.ts
export const VgsInput = async () => {
  try {
    const module = await import('./VgsInput');
    return module.VgsInput;
  } catch (error) {
    console.error('VGS components require @vgs/collect-js-react');
    return null;
  }
};
```

**Timeline**: ⏰ Semana 1

---

### 3. Bundle Sin Optimizar

**Severidad**: 🔴 ALTA  
**Impacto**: Performance, SEO, UX

**Análisis del Bundle**:
```
Total: 708KB

Desglose:
├── index.es.js ─────────────── 156KB (22%)
├── index.js ────────────────── 103KB (15%)
├── CSS Duplicado ─────────────  57KB (8%)
│   ├── styles.css ──────────── 30KB
│   └── lola-framework-ui.css ─ 27KB ⚠️ DUPLICADO
├── Type Declarations ────────── 392KB (55%)
└── Assets ──────────────────────  KB
```

**Problemas identificados**:

1. **CSS Duplicado** (57KB → 30KB)
```bash
# Build actual genera DOS archivos CSS idénticos
dist/styles.css                    # 30KB
dist/lola-framework-ui-test.css    # 27KB ⚠️ Duplicado
```

2. **Iconos Monolíticos** (50KB+)
```typescript
// icons.tsx - 2346 líneas
// TODOS los iconos se importan juntos
// Sin tree-shaking efectivo
```

3. **Sin Code Splitting**
```typescript
// Todo el código en un solo bundle
// No hay lazy loading de componentes
```

**Impacto en proyectos consumidores**:
```
First Load:
├── App code ──────── 200KB
├── Lola Framework ── 156KB ⚠️
├── Other deps ────── 100KB
└── TOTAL ──────────── 456KB ❌ Demasiado grande
```

**Solución**:

**Fase 1: Eliminar CSS duplicado**
```json
// package.json - Simplificar build
"build": "vite build && tsc -p tsconfig.build.json"
// Remover: && cp src/styles/index.css dist/styles.css
```

**Fase 2: Separar iconos**
```
src/icons/
├── index.ts          // Barrel export
├── Camera.tsx
├── Upload.tsx
├── Arrow.tsx
└── ...

// Permitir:
import { CameraIcon } from 'lola-framework-ui/icons';
// En lugar de importar todos los 52 iconos
```

**Fase 3: Code splitting**
```typescript
// vite.config.ts
build: {
  lib: {
    entry: {
      index: './src/index.ts',
      icons: './src/icons/index.ts',
      hooks: './src/hooks/index.ts'
    }
  }
}
```

**Objetivo**:
- 708KB → 400KB (reducción del 44%)
- First Load < 150KB (gzipped)

**Timeline**: ⏰ Semana 2-3

---

### 4. Sistema de Iconos Monolítico

**Severidad**: 🔴 ALTA  
**Impacto**: Bundle size, tree-shaking

**Problema**:
```typescript
// src/icons/icons.tsx - 2346 líneas
// TODOS los 52 iconos en un solo archivo

export const CameraGradient = () => { /* 45 líneas de SVG */ };
export const UploadCloud = () => { /* 40 líneas de SVG */ };
export const BackArrow = () => { /* 35 líneas de SVG */ };
// ... 49 más
```

**Import actual**:
```typescript
// Usuario solo necesita 1 icono
import { CameraIcon } from 'lola-framework-ui';

// Pero webpack/rollup NO puede hacer tree-shaking efectivo
// Resultado: TODOS los 52 iconos en el bundle
```

**Análisis de peso**:
```
icons.tsx: 2346 líneas × ~40 bytes/línea = ~94KB
Después de minify: ~50KB
Con solo 1 icono necesario: ~1KB

Desperdicio: 49KB por cada proyecto 💸
```

**Solución**:

**Estructura propuesta**:
```
src/icons/
├── index.ts                 # Barrel export
├── camera/
│   ├── CameraGradient.tsx
│   └── CameraError.tsx
├── navigation/
│   ├── BackArrow.tsx
│   ├── RightArrow.tsx
│   └── Close.tsx
├── payment/
│   ├── CardIcon.tsx
│   └── BankIcon.tsx
└── ...
```

**Index optimizado**:
```typescript
// src/icons/index.ts
export { CameraGradient } from './camera/CameraGradient';
export { BackArrow } from './navigation/BackArrow';
export { CardIcon } from './payment/CardIcon';
// ...

// Permite tree-shaking efectivo
```

**Uso mejorado**:
```typescript
// Proyecto consumidor
import { CameraIcon } from 'lola-framework-ui/icons';
// Bundler solo incluye CameraIcon (~1KB)
// Ahorro: ~49KB 🎉
```

**Timeline**: ⏰ Semana 2-3

---

### 5. Ausencia de Tests

**Severidad**: 🔴 ALTA  
**Impacto**: Calidad, mantenibilidad, migración

**Problema**:
```bash
# No hay testing dependencies
npm list | grep -i test
# (vacío)

# No hay archivos de test
find src -name "*.test.*"
# (vacío)

# No hay configuración de testing
# ❌ No hay vitest.config.ts
# ❌ No hay jest.config.js
# ❌ No hay tests setup
```

**Riesgos**:
- ❌ No se detectan regressions
- ❌ Refactors peligrosos
- ❌ Migración React 19 sin validación
- ❌ No hay CI/CD de calidad

**Impacto en migración**:
```
Sin tests:
├── Actualizar React 19 ──────── ❌ Sin validación
├── Refactor useTheme ─────────── ❌ Sin validación
├── Cambiar body-scroll-lock ──── ❌ Sin validación
└── Optimizar bundle ──────────── ❌ Sin validación
```

**Solución**:

**Setup básico**:
```bash
npm install -D vitest @testing-library/react @testing-library/user-event jsdom
```

**Configuración**:
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
});
```

**Tests prioritarios**:

1. **Componentes core** (Button, Layout, InputField)
2. **Hooks críticos** (useTheme, useKeyboardVisible)
3. **Compatibilidad React 18/19**
4. **Regression tests** para bugs conocidos

**Coverage objetivo**: 80%

**Timeline**: ⏰ Semana 1-2

---

## Advertencias 🟡

### 6. Inconsistencias en Sistema de Estilos

**Severidad**: 🟡 MEDIA  
**Impacto**: Mantenibilidad, theming

**Problema**:
```css
/* Mezcla de valores hardcodeados y CSS variables */

/* ❌ Hardcoded */
color: #252525;
background: #fff;
border: solid 1px #979797;

/* ✅ Con variables */
color: var(--foreground);
background: var(--background);
border: solid 1px var(--border);
```

**Inconsistencias encontradas**:
```css
/* src/styles/index.css */

/* 1. Color hardcoded */
.lola-body-copy {
  color: #252525;  /* Debería: var(--foreground) */
}

/* 2. Border hardcoded */
.lola-input-field {
  border: solid 1px #979797;  /* Debería: var(--border) */
}

/* 3. Background hardcoded */
.search-select-component-container {
  background: #fff;  /* Debería: var(--background) */
}
```

**Impacto**:
- Theming incompleto
- Dark mode no funciona en todos los componentes
- Valores duplicados dificultan cambios

**Solución**:
```css
/* Audit completo y reemplazo */
#252525 → var(--foreground)
#fff    → var(--background)
#979797 → var(--border)
#e4e4e4 → var(--muted)
```

**Timeline**: ⏰ Semana 3-4

---

### 7. Performance del Hook useTheme

**Severidad**: 🟡 MEDIA  
**Impacto**: Performance en runtime

**Problema**:
```typescript
// src/hooks/useTheme.ts
export const useTheme = (theme: IUseTheme) => {
  const onSetTheme = (theme: IUseTheme) => {
    // ⚠️ Inyecta <style> tag en cada llamada
    let styleTag = document.getElementById("global-theme-styles");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "global-theme-styles";
      document.head.appendChild(styleTag);
    }
    
    // ⚠️ Re-calcula CSS en cada render
    const css = Object.entries(theme)
      .map(([className, rules]) => {
        // ... generación de CSS
      })
      .join("\n");
    
    styleTag.textContent = css;
  };
  
  // ⚠️ Se ejecuta en cada render
  useEffect(() => {
    onSetTheme(theme);
  }, [theme]);
};
```

**Problemas**:
1. **Re-cálculo innecesario**: CSS se regenera aunque no cambie
2. **DOM manipulation**: Modifica DOM en cada render
3. **Falta memoization**: No usa useMemo/useCallback

**Impacto**:
```
Componente se renderiza 100 veces
└── useTheme ejecuta 100 veces
    └── Genera CSS string 100 veces
        └── Modifica DOM 100 veces
```

**Solución**:

**Opción A: CSS Variables (Recomendado)**
```typescript
export const useTheme = (theme: IUseTheme) => {
  useEffect(() => {
    const root = document.documentElement;
    
    // Solo actualizar CSS custom properties
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--lola-${key}`, value);
    });
  }, [theme]);
};
```

**Opción B: Memoization**
```typescript
export const useTheme = (theme: IUseTheme) => {
  const css = useMemo(() => {
    return Object.entries(theme)
      .map(/* ... */)
      .join("\n");
  }, [theme]);
  
  useEffect(() => {
    const styleTag = getOrCreateStyleTag();
    styleTag.textContent = css;
  }, [css]);
};
```

**Timeline**: ⏰ Semana 3-4

---

### 8. Duplicación de Lógica

**Severidad**: 🟡 MEDIA  
**Impacto**: Mantenibilidad, DRY

**Ejemplos**:

1. **Manejo de gradientes**
```typescript
// Lógica duplicada en:
- src/utils/utils.ts: getSplittedColors()
- src/components/Button.tsx: inline gradient logic
- src/hooks/useTheme.ts: generateColorsByView()
```

2. **Manejo de teclado móvil**
```typescript
// Lógica esparcida en:
- src/hooks/useKeyboardVisible.ts
- src/components/Layout.tsx
- src/components/VgsInput.tsx
```

**Solución**: Consolidar en hooks/utils centralizados

**Timeline**: ⏰ Semana 4-5

---

### 9. TypeScript Configuration

**Severidad**: 🟡 MEDIA  
**Problema**: `verbatimModuleSyntax` puede causar issues

```json
// tsconfig.app.json
{
  "verbatimModuleSyntax": true  // ⚠️ Restrictivo
}
```

**Impacto**:
- Posibles errores con re-exports
- Problemas con type-only imports

**Solución**: Revisar y ajustar según necesidad

**Timeline**: ⏰ Semana 3

---

### 10. Build Process Manual

**Severidad**: 🟡 MEDIA  
**Problema**: Post-build scripts manuales

```json
"build": "vite build && tsc -p tsconfig.build.json && cp src/styles/index.css dist/styles.css && cp src/hooks/index.ts dist/hooks/index.ts && cp src/icons/index.ts dist/icons/index.ts"
```

**Problemas**:
- ❌ Comandos `cp` no funcionan en Windows
- ❌ Archivos pueden no actualizarse
- ❌ Proceso frágil y propenso a errores

**Solución**: Usar plugin de Vite o script cross-platform

```typescript
// vite.config.ts
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [
    {
      name: 'copy-exports',
      closeBundle() {
        copyFileSync('src/styles/index.css', 'dist/styles.css');
        // ...
      }
    }
  ]
});
```

**Timeline**: ⏰ Semana 2

---

## Problemas Menores 🟢

### 11. Documentación Incompleta

**Severidad**: 🟢 BAJA  
**Impacto**: Developer Experience

- Falta JSDoc en componentes
- Props sin documentar
- No hay guías de migración

**Timeline**: ⏰ Semana 5-6

---

### 12. Accesibilidad

**Severidad**: 🟢 BAJA  
**Impacto**: A11y, inclusión

- Sin ARIA attributes completos
- Navegación por teclado inconsistente
- Sin focus management

**Timeline**: ⏰ Semana 6+

---

## Deuda Técnica

### Resumen de Deuda Técnica

| Categoría | Items | Esfuerzo Estimado |
|-----------|-------|-------------------|
| **Crítico** | 5 | 2-3 semanas |
| **Medio** | 5 | 2-3 semanas |
| **Bajo** | 2 | 1-2 semanas |
| **TOTAL** | 12 | 5-8 semanas |

---

## Matriz de Priorización

```
      │ Alto Impacto          │ Bajo Impacto
──────┼──────────────────────┼────────────────
ALTA  │ 1. Beta dependency   │ 8. TS config
URGEN │ 2. Missing deps      │ 10. Build process
CIA   │ 3. Bundle size       │
      │ 5. No tests          │
──────┼──────────────────────┼────────────────
BAJA  │ 6. Style inconsist.  │ 11. Docs
URGEN │ 7. useTheme perf     │ 12. A11y
CIA   │ 9. Code duplication  │
```

### Plan de Acción Sugerido

**Sprint 1 (Semana 1-2)**: 🔴 Críticos
- [ ] Reemplazar body-scroll-lock
- [ ] Resolver dependencias VGS
- [ ] Setup testing básico
- [ ] Tests de compatibilidad

**Sprint 2 (Semana 3-4)**: 🟡 Performance
- [ ] Optimizar bundle
- [ ] Refactor sistema de iconos
- [ ] Mejorar useTheme
- [ ] Consolidar estilos

**Sprint 3 (Semana 5-6)**: 🟢 Calidad
- [ ] Documentación completa
- [ ] Accesibilidad básica
- [ ] CI/CD pipeline

---

[← Volver al Índice](../README.md) | [Siguiente: Migración →](../migration/README.md)
