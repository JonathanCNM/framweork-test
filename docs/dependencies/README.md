# Análisis de Dependencias

## Tabla de Contenidos

- [Dependencias de Producción](#dependencias-de-producción)
- [Peer Dependencies](#peer-dependencies)
- [Dependencias de Desarrollo](#dependencias-de-desarrollo)
- [Dependencias Externas](#dependencias-externas)
- [Análisis de Versiones](#análisis-de-versiones)
- [Riesgos y Vulnerabilidades](#riesgos-y-vulnerabilidades)

---

## Dependencias de Producción

### Instaladas

```json
{
  "body-scroll-lock": "4.0.0-beta.0",
  "framer-motion": "^12.23.9",
  "@types/body-scroll-lock": "^3.1.2"
}
```

#### body-scroll-lock `4.0.0-beta.0`

**⚠️ CRÍTICO: Versión Beta en Producción**

| Propiedad | Valor |
|-----------|-------|
| **Versión** | 4.0.0-beta.0 |
| **Estado** | Beta (No recomendado para producción) |
| **Última actualización** | Hace varios años |
| **Uso en el proyecto** | `useBlockScroll` hook |
| **Problema** | Versión inestable con bugs conocidos |

**Componentes afectados**:
- `src/hooks/useBlockScroll.ts`
- Cualquier página/componente que use `useBlockScroll()`

**Código actual**:
```typescript
// src/hooks/useBlockScroll.ts
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

export const useBlockScroll = () => {
  useEffect(() => {
    disableBodyScroll(document.body, { reserveScrollBarGap: false });
    return () => {
      enableBodyScroll(document.body);
      clearAllBodyScrollLocks();
    };
  }, []);
};
```

**Alternativas recomendadas**:

1. **react-remove-scroll** (Recomendado)
```bash
npm install react-remove-scroll
```

2. **Solución nativa CSS**
```typescript
// useBlockScroll refactorizado
export const useBlockScroll = () => {
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, []);
};
```

---

#### framer-motion `^12.23.9`

**✅ Dependencia Estable**

| Propiedad | Valor |
|-----------|-------|
| **Versión** | 12.23.9 |
| **Estado** | Estable, bien mantenido |
| **Uso en el proyecto** | Animaciones en componentes |
| **Bundle size** | ~50KB (gzipped) |

**Componentes que lo usan**:
- `MotionWrapper.tsx`
- Animaciones en `Button.tsx`
- Transiciones en `Layout.tsx`

**Ejemplo de uso**:
```typescript
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  {children}
</motion.div>
```

**Compatibilidad React 19**: ✅ Compatible (verificar en beta)

---

#### @types/body-scroll-lock `^3.1.2`

**Tipos TypeScript para body-scroll-lock**

- Solo definiciones de tipos
- No afecta runtime
- Actualizar cuando se reemplace body-scroll-lock

---

## Peer Dependencies

```json
{
  "react": ">=18 <20",
  "react-dom": ">=18 <20"
}
```

### React `>=18 <20`

**✅ Bien Configurado**

| Característica | Valor |
|----------------|-------|
| **Versión mínima** | 18.0.0 |
| **Versión máxima** | <20.0.0 |
| **Soporta React 19** | ✅ Sí |
| **Versión dev actual** | 18.3.1 |

**Ventajas**:
- Permite a consumidores usar React 18 o 19
- No fuerza actualización en proyectos legacy
- Flexible para adopción gradual

**Testing necesario**:
- ✅ Tests en React 18.x
- ⚠️ Tests en React 19.x (pendiente)

---

## Dependencias de Desarrollo

### Build Tools

```json
{
  "vite": "^7.0.4",
  "vite-plugin-dts": "^4.5.4",
  "@vitejs/plugin-react": "^4.6.0"
}
```

**Estado**: ✅ Todas actualizadas a versiones modernas

### TypeScript

```json
{
  "typescript": "~5.8.3",
  "typescript-eslint": "^8.35.1",
  "@types/react": "^19.1.8",
  "@types/react-dom": "^19.1.6",
  "@types/node": "^24.1.0"
}
```

**Estado**: ✅ Última versión estable

### Testing

```json
{
  // ⚠️ NO HAY DEPENDENCIAS DE TESTING
}
```

**Recomendado agregar**:
```json
{
  "vitest": "^2.0.0",
  "@testing-library/react": "^16.0.0",
  "@testing-library/user-event": "^14.5.0",
  "@testing-library/jest-dom": "^6.0.0",
  "jsdom": "^24.0.0"
}
```

### Linting

```json
{
  "eslint": "^9.30.1",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.20",
  "eslint-plugin-storybook": "^9.1.2",
  "@eslint/js": "^9.30.1",
  "globals": "^16.3.0"
}
```

**Estado**: ✅ ESLint 9 con flat config (moderno)

### Documentation

```json
{
  "storybook": "^9.1.2",
  "@storybook/react-vite": "^9.1.2",
  "@storybook/addon-docs": "^9.1.2",
  "react-docgen-typescript": "^2.4.0"
}
```

**Estado**: ✅ Última versión de Storybook

### Router (Dev)

```json
{
  "react-router": "^7.7.1",
  "react-router-dom": "^7.7.1",
  "@types/react-router-dom": "^5.3.3"
}
```

**Uso**: Solo en demo pages, no en la librería publicada

---

## Dependencias Externas

### Declaradas pero NO Instaladas

**🔴 PROBLEMA CRÍTICO**

```javascript
// vite.config.ts - rollupOptions.external
[
  "@vgs/collect-js",
  "@vgs/collect-js-react",
  "@react-google-maps/api"
]
```

**Componentes afectados**:

#### 1. @vgs/collect-js + @vgs/collect-js-react

**Archivos que importan**:
- `src/components/VgsInput.tsx`
- `src/components/VgsFormWrapper.tsx`
- `src/hooks/useVgsCollectLoader.ts`
- `src/stories/VgsFormWrapper.stories.tsx`

**Código problemático**:
```typescript
// src/components/VgsInput.tsx
import {
  VGSCollectForm,
  type VGSCollectFocusEventData,
  type VGSCollectStateParams,
} from "@vgs/collect-js-react";  // ⚠️ NO INSTALADO

// src/hooks/useVgsCollectLoader.ts
import { loadVGSCollect } from "@vgs/collect-js";  // ⚠️ NO INSTALADO
```

**Impacto**:
- ❌ Build fallará si se importan estos componentes
- ❌ Storybook stories no funcionarán
- ❌ Proyectos consumidores no podrán usar VGS components

**Soluciones posibles**:

**Opción A: Instalar como peer dependency**
```json
{
  "peerDependencies": {
    "@vgs/collect-js": "^2.x",
    "@vgs/collect-js-react": "^2.x"
  },
  "peerDependenciesMeta": {
    "@vgs/collect-js": { "optional": true },
    "@vgs/collect-js-react": { "optional": true }
  }
}
```

**Opción B: Mover a paquete separado**
```
@lola-ui/core           - Componentes principales
@lola-ui/vgs-components - Componentes VGS (opcional)
```

**Opción C: Hacer imports condicionales**
```typescript
// vgs-components.ts
export const VgsInput = process.env.VGS_ENABLED
  ? require('./VgsInput').VgsInput
  : null;
```

#### 2. @react-google-maps/api

**Archivos que lo referencian**:
- `vite.config.ts` (solo en external)

**Estado**: ⚠️ Declarado pero no usado en código

**Acción**: Remover de vite.config.ts si no se usa

---

## Análisis de Versiones

### Matriz de Compatibilidad

| Dependencia | Versión Actual | React 18 | React 19 | Node 18+ | Node 20+ |
|-------------|----------------|----------|----------|----------|----------|
| body-scroll-lock | 4.0.0-beta.0 | ✅ | ⚠️ | ✅ | ✅ |
| framer-motion | 12.23.9 | ✅ | ⚠️ | ✅ | ✅ |
| vite | 7.0.4 | ✅ | ✅ | ✅ | ✅ |
| typescript | 5.8.3 | ✅ | ✅ | ✅ | ✅ |
| storybook | 9.1.2 | ✅ | ⚠️ | ✅ | ✅ |

✅ Compatible confirmado  
⚠️ Requiere testing  
❌ Incompatible

---

## Riesgos y Vulnerabilidades

### 🔴 Riesgos Críticos

1. **body-scroll-lock@beta**
   - **Severidad**: Alta
   - **Impacto**: Bugs potenciales en scroll locking
   - **Mitigación**: Reemplazar con solución estable

2. **Dependencias VGS no instaladas**
   - **Severidad**: Alta
   - **Impacto**: Build failures, runtime errors
   - **Mitigación**: Instalar o hacer opcionales

### 🟡 Riesgos Medios

3. **Sin testing dependencies**
   - **Severidad**: Media
   - **Impacto**: No se pueden detectar regressions
   - **Mitigación**: Agregar Vitest + Testing Library

4. **Compatibilidad React 19**
   - **Severidad**: Media
   - **Impacto**: Posibles breaking changes
   - **Mitigación**: Testing exhaustivo con React 19

### 🟢 Riesgos Bajos

5. **Versiones de tipos desactualizadas**
   - **Severidad**: Baja
   - **Impacto**: Type errors menores
   - **Mitigación**: Actualizar @types packages

---

## Recomendaciones de Actualización

### Inmediatas (Esta semana)

1. **Reemplazar body-scroll-lock**
```bash
npm uninstall body-scroll-lock @types/body-scroll-lock
npm install react-remove-scroll
```

2. **Resolver dependencias VGS**
```bash
# Opción A: Instalar
npm install @vgs/collect-js @vgs/collect-js-react

# Opción B: Hacer opcionales en package.json
```

### Corto plazo (1-2 semanas)

3. **Agregar testing**
```bash
npm install -D vitest @testing-library/react @testing-library/user-event jsdom
```

4. **Verificar vulnerabilidades**
```bash
npm audit
npm audit fix
```

### Mediano plazo (1 mes)

5. **Testing de compatibilidad React 19**
```bash
npm install react@19.0.0 react-dom@19.0.0
npm test
```

6. **Actualizar framer-motion** (si hay nueva versión)
```bash
npm update framer-motion
```

---

## Árbol de Dependencias

```
lola-framework-ui-test@0.3.1
│
├─┬ Production (3)
│ ├── body-scroll-lock@4.0.0-beta.0 ⚠️
│ ├── framer-motion@12.23.9
│ └── @types/body-scroll-lock@3.1.2
│
├─┬ Peer Dependencies (2)
│ ├── react@>=18 <20
│ └── react-dom@>=18 <20
│
├─┬ Dev Dependencies (21)
│ ├─┬ Build (3)
│ │ ├── vite@7.0.4
│ │ ├── vite-plugin-dts@4.5.4
│ │ └── @vitejs/plugin-react@4.6.0
│ │
│ ├─┬ TypeScript (6)
│ │ ├── typescript@5.8.3
│ │ ├── typescript-eslint@8.35.1
│ │ ├── @types/react@19.1.8
│ │ ├── @types/react-dom@19.1.6
│ │ ├── @types/react-router-dom@5.3.3
│ │ └── @types/node@24.1.0
│ │
│ ├─┬ Linting (6)
│ │ ├── eslint@9.30.1
│ │ ├── @eslint/js@9.30.1
│ │ ├── eslint-plugin-react-hooks@5.2.0
│ │ ├── eslint-plugin-react-refresh@0.4.20
│ │ ├── eslint-plugin-storybook@9.1.2
│ │ └── globals@16.3.0
│ │
│ ├─┬ Storybook (4)
│ │ ├── storybook@9.1.2
│ │ ├── @storybook/react-vite@9.1.2
│ │ ├── @storybook/addon-docs@9.1.2
│ │ └── react-docgen-typescript@2.4.0
│ │
│ └─┬ Demo (3)
│   ├── react@18.3.1
│   ├── react-dom@18.3.1
│   ├── react-router@7.7.1
│   └── react-router-dom@7.7.1
│
└─┬ External (NO instaladas) ⚠️
  ├── @vgs/collect-js
  ├── @vgs/collect-js-react
  └── @react-google-maps/api
```

---

## Bundle Size Impact

### Contribución al Bundle Final

```
Total Bundle Size: ~708KB

Desglose:
├── Framework Code ─────── 259KB (37%)
├── framer-motion ────────  50KB (7%)
├── body-scroll-lock ─────   3KB (<1%)
├── Type Declarations ──── 392KB (55%)
└── Other ────────────────   4KB (<1%)
```

**Nota**: Type declarations no afectan runtime, solo desarrollo.

---

## Checklist de Salud de Dependencias

- [ ] ✅ No usar versiones beta en producción
- [ ] ⚠️ Todas las dependencias referenciadas están instaladas
- [x] ✅ Peer dependencies correctamente configuradas
- [ ] ⚠️ Testing dependencies instaladas
- [x] ✅ Build tools actualizados
- [x] ✅ Linters actualizados
- [x] ✅ TypeScript actualizado
- [ ] ⚠️ Compatibilidad React 19 verificada
- [ ] ⚠️ Audit de seguridad pasado

---

[← Volver al Índice](../README.md) | [Siguiente: Componentes →](../components/README.md)
