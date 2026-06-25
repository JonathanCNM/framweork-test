# Guía de Button Size en Lola Framework UI

## Resumen Ejecutivo

El `buttonSize` en el tema controla el **padding global** de todos los botones a través de CSS variables. El prop `size` del componente `Button` controla únicamente el tamaño de íconos y la altura, **no** el padding.

---

## Arquitectura

### 1. Theme Configuration

```typescript
import { useLolaTheme } from 'lola-framework-ui-test';

const theme = useLolaTheme({
  // ... otras configuraciones
  styles: {
    buttonSize: 'large', // 'small' | 'medium' | 'large'
  }
});
```

### 2. Conversión a CSS Variable

El `buttonSize` se convierte automáticamente en padding:

```typescript
const BUTTON_SIZE_PADDING = {
  small: '0.75rem',   // 12px
  medium: '1rem',     // 16px (default)
  large: '1.5rem',    // 24px
};
```

Esto se inyecta como:
```css
:root {
  --lola-style-button-padding: 1rem; /* Ejemplo: medium */
}
```

### 3. Aplicación en CSS

```css
/* Todos los botones usan la variable CSS */
button {
  padding: var(--lola-style-button-padding, 1rem);
}
```

---

## Comportamiento del Componente Button

### Prop `size` del Button

El prop `size` del `Button` component **NO controla el padding**. Solo controla:

1. **Tamaño de íconos** (width/height del SVG)
2. **Altura del botón** (solo para `large`)

```tsx
// Button.tsx
export interface ButtonProps {
  size?: 'small' | 'medium' | 'large'; // Default: 'medium'
  // ... otros props
}

// Aplica clases:
// .lola-button--small   -> íconos 21px x 21px
// .lola-button--medium  -> íconos 24px x 24px
// .lola-button--large   -> íconos 28px x 28px, altura 75px
```

```css
/* CSS Actual */
.lola-button--small svg {
  width: 21px;
  height: 21px;
}

.lola-button--medium svg {
  width: 24px;
  height: 24px;
}

.lola-button--large {
  height: 75px;
}

.lola-button--large svg {
  width: 28px;
  height: 28px;
}

/* ❌ NO hay padding hardcoded en estas clases */
```

---

## Ejemplos de Uso

### Ejemplo 1: Controlar Padding Globalmente

```typescript
// Theme configuration
const theme = useLolaTheme({
  styles: {
    buttonSize: 'large', // Todos los botones tendrán padding de 1.5rem
  }
});

// En tus componentes
<Button>Click me</Button>              // padding: 1.5rem
<Button variant="outline">Cancel</Button>  // padding: 1.5rem
<Button showIcon>Next</Button>          // padding: 1.5rem
```

**Resultado**: Todos los botones tienen padding de `1.5rem` (24px).

### Ejemplo 2: Controlar Tamaño de Íconos

```typescript
// Theme con padding medium
const theme = useLolaTheme({
  styles: {
    buttonSize: 'medium', // padding: 1rem
  }
});

// Botones con diferentes tamaños de íconos
<Button size="small" showIcon>    // padding: 1rem, ícono: 21px
  Small Icon
</Button>

<Button size="medium" showIcon>   // padding: 1rem, ícono: 24px
  Medium Icon
</Button>

<Button size="large" showIcon>    // padding: 1rem, ícono: 28px, altura: 75px
  Large Icon
</Button>
```

**Resultado**: 
- Todos tienen el mismo padding (`1rem` del tema)
- Cada uno tiene íconos de diferente tamaño
- El `large` también tiene altura de 75px

### Ejemplo 3: Combinación Completa

```typescript
const theme = useLolaTheme({
  styles: {
    buttonSize: 'small',           // Global padding: 0.75rem
    buttonBorderRadius: '12px',    // Global border-radius
    buttonBorderColor: '#1DAFA1',  // Global border-color
  }
});

<Button size="large" showIcon>
  Large Button with Small Padding
</Button>
```

**Resultado**:
- Padding: `0.75rem` (del `buttonSize: 'small'` en tema)
- Border-radius: `12px` (del tema)
- Border-color: `#1DAFA1` (del tema)
- Ícono: `28px x 28px` (del `size="large"` prop)
- Altura: `75px` (del `size="large"` prop)

---

## Comparación: Antes vs Ahora

### ❌ Antes (Hardcoded)

```css
/* Padding estaba hardcoded en las clases */
.lola-button--small {
  padding: 0.75rem; /* No se podía cambiar desde el tema */
}

.lola-button--medium {
  padding: 1rem; /* No se podía cambiar desde el tema */
}

.lola-button--large {
  padding: 1.5rem; /* No se podía cambiar desde el tema */
}
```

**Problema**: No había forma de controlar el padding desde el tema.

### ✅ Ahora (CSS Variables)

```css
/* Padding controlado por variable CSS */
button {
  padding: var(--lola-style-button-padding, 1rem);
}

/* Las clases de tamaño solo controlan íconos y altura */
.lola-button--small svg { width: 21px; height: 21px; }
.lola-button--medium svg { width: 24px; height: 24px; }
.lola-button--large { height: 75px; }
.lola-button--large svg { width: 28px; height: 28px; }
```

**Ventaja**: El padding se controla desde el tema, manteniendo control granular sobre íconos.

---

## Reglas de Uso

### ✅ DO

```typescript
// 1. Configurar buttonSize en el tema para controlar padding
styles: {
  buttonSize: 'large',
}

// 2. Usar Button size prop para controlar íconos
<Button size="large" showIcon>Next</Button>

// 3. Dejar que el tema controle el padding por defecto
<Button>Click me</Button>
```

### ❌ DON'T

```typescript
// ❌ No esperar que el prop size controle el padding
<Button size="large">  // NO cambia el padding, solo íconos y altura
  Click me
</Button>

// ❌ No hardcodear padding en componentes
<Button style={{ padding: '2rem' }}>  // Evitar
  Click me
</Button>

// ❌ No asumir que size prop y buttonSize son lo mismo
// Son conceptos diferentes:
// - buttonSize (tema) -> padding global
// - size (prop) -> tamaño de íconos y altura
```

---

## Migración de Proyectos Existentes

Si tu proyecto ya usaba el prop `size` esperando que controle el padding:

### Opción 1: Usar buttonSize en Tema (Recomendado)

```typescript
// Antes
<Button size="small">Small Button</Button>
<Button size="medium">Medium Button</Button>
<Button size="large">Large Button</Button>

// Ahora
const theme = useLolaTheme({
  styles: {
    buttonSize: 'medium', // Controla padding de todos los botones
  }
});

<Button>Default Button</Button>
<Button size="small" showIcon>Small Icons</Button>
<Button size="large" showIcon>Large Icons</Button>
```

### Opción 2: Mantener Compatibilidad Temporal

Si necesitas diferentes paddings por botón (caso raro):

```typescript
<Button style={{ padding: '0.75rem' }}>Custom Small</Button>
<Button style={{ padding: '1rem' }}>Custom Medium</Button>
<Button style={{ padding: '1.5rem' }}>Custom Large</Button>
```

**Nota**: Esto no es recomendado. Lo ideal es que todos los botones tengan el mismo padding (consistencia UI).

---

## FAQ

### ¿Por qué separar padding y tamaño de íconos?

**Respuesta**: Para dar más control y flexibilidad:
- El padding afecta el tamaño visual del botón (UX consistency)
- El tamaño de íconos debe ser independiente (por ejemplo, íconos grandes en botones medianos)

### ¿Puedo tener botones con diferentes paddings?

**Respuesta**: Sí, pero no es recomendado para consistencia de UI. Si necesitas diferentes tamaños, considera crear variantes personalizadas.

### ¿Qué pasa si no configuro buttonSize?

**Respuesta**: Se usa el default `'medium'` (padding de `1rem`).

### ¿El buttonSize afecta otros componentes?

**Respuesta**: No, solo afecta elementos `<button>` y componentes basados en Button.

---

## Valores de Referencia

### Padding por ButtonSize

| buttonSize | Padding | px aproximado | Uso recomendado |
|-----------|---------|---------------|------------------|
| `small`   | 0.75rem | 12px         | UI compacta, móviles |
| `medium`  | 1rem    | 16px         | Default, balance perfecto |
| `large`   | 1.5rem  | 24px         | Hero sections, CTAs |

### Tamaño de Íconos por size prop

| size prop | Icon size | Uso recomendado |
|-----------|-----------|------------------|
| `small`   | 21x21px  | Iconos pequeños |
| `medium`  | 24x24px  | Default |
| `large`   | 28x28px + height: 75px | Botones prominentes |

---

## Conclusión

**Arquitectura actual**:
- `theme.styles.buttonSize` → Controla padding globalmente (CSS variable)
- `Button size prop` → Controla tamaño de íconos y altura específicamente

**Ventajas**:
- ✅ Control centralizado del padding desde el tema
- ✅ Flexibilidad para íconos sin afectar padding
- ✅ Consistencia visual en toda la aplicación
- ✅ Facilita cambios globales sin tocar componentes

**Default behavior**:
- Sin configuración: padding `1rem` (medium), íconos `24x24px` (medium)
