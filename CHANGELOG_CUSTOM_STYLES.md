# Changelog: Custom Styles Configuration

## Version 2.2.0 - Estilos Personalizados y Card Panel Background

### Nuevas Funcionalidades

Se agregaron dos nuevas secciones de configuración al sistema de temas:

1. **Nueva sección `styles`** - Estilos personalizados para componentes
2. **Nuevo color `cardPanelBackground`** - Background para card panels

---

## 1. Sección de Estilos Personalizados

### Nueva Interface: `StylesConfig`

```typescript
interface StylesConfig {
  // Border radius
  cardBorderRadius?: string;
  buttonBorderRadius?: string;
  inputBorderRadius?: string;
  
  // Border colors
  cardBorderColor?: string;
  buttonBorderColor?: string;
  inputBorderColor?: string;
  
  // Component sizes
  buttonSize?: 'small' | 'medium' | 'large';
}
```

### Valores por Defecto

```typescript
{
  cardBorderRadius: '16px',
  buttonBorderRadius: '8px',
  inputBorderRadius: '8px',
  cardBorderColor: '#E4E4E4',
  buttonBorderColor: '#E4E4E4',
  inputBorderColor: '#E4E4E4',
  buttonSize: 'medium'
}
```

### Uso

```typescript
import { useLolaTheme } from '@lola-framework/ui';

const theme = useLolaTheme({
  colors: {
    // ... colores
  },
  font: {
    // ... fuentes
  },
  styles: {
    // Border radius personalizados
    cardBorderRadius: '20px',
    buttonBorderRadius: '12px',
    inputBorderRadius: '6px',
    
    // Colores de borde personalizados
    cardBorderColor: '#CCCCCC',
    buttonBorderColor: '#1DAFA1',
    inputBorderColor: '#E0E0E0',
    
    // Tamaño de botones
    buttonSize: 'large', // 'small' | 'medium' | 'large'
  }
});
```

### CSS Variables Generadas

Cuando se configuran estilos, se generan las siguientes CSS variables:

```css
:root {
  --lola-style-card-border-radius: 16px;
  --lola-style-button-border-radius: 8px;
  --lola-style-input-border-radius: 8px;
  --lola-style-card-border-color: #E4E4E4;
  --lola-style-button-border-color: #E4E4E4;
  --lola-style-input-border-color: #E4E4E4;
  --lola-style-button-size: medium;
}
```

### Uso en CSS

```css
.my-card {
  border-radius: var(--lola-style-card-border-radius);
  border: 1px solid var(--lola-style-card-border-color);
}

.my-button {
  border-radius: var(--lola-style-button-border-radius);
  border-color: var(--lola-style-button-border-color);
}

.my-input {
  border-radius: var(--lola-style-input-border-radius);
  border-color: var(--lola-style-input-border-color);
}
```

---

## 2. Card Panel Background

### Nuevo Campo en ColorPalette

```typescript
interface ColorPalette {
  // ... campos existentes
  cardPanelBackground?: string;  // Default: 'transparent'
}
```

### Uso

```typescript
const theme = useLolaTheme({
  colors: {
    primaryGradient: '#1DAFA1',
    secondaryGradient: '#10B981',
    // ... otros colores
    
    // Background para card panels
    cardPanelBackground: 'rgba(255, 255, 255, 0.05)',
    // o
    cardPanelBackground: 'linear-gradient(135deg, rgba(29, 175, 161, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
  },
  font: { /* ... */ }
});
```

### CSS Variable

```css
:root {
  --lola-color-card-panel-background: transparent; /* default */
}
```

### Uso en Componentes

```css
.card-panel {
  background: var(--lola-color-card-panel-background);
}
```

---

## Ejemplos Completos

### Ejemplo 1: Tema con Bordes Redondeados

```typescript
const roundedTheme = useLolaTheme({
  colors: {
    primaryGradient: '#1DAFA1',
    secondaryGradient: '#10B981',
    secondaryColor: '#252525',
    whiteColor: '#FFFFFF',
    errorColor: '#dc251c',
    partnerHighlights: '#EFF1F5',
    primaryMesh: 'linear-gradient(90deg, #1DAFA1 6.45%, #10B981 96.13%)',
    lightness: 'light',
    cardPanelBackground: 'rgba(255, 255, 255, 0.8)',
  },
  styles: {
    cardBorderRadius: '24px',
    buttonBorderRadius: '20px',
    inputBorderRadius: '16px',
    cardBorderColor: '#E0E0E0',
    buttonBorderColor: '#1DAFA1',
    inputBorderColor: '#CCCCCC',
    buttonSize: 'large',
  },
  font: {
    fontfamily: 'Inter',
    fontcdn: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
    // ... estilos de fuente
  }
});
```

### Ejemplo 2: Tema Minimalista con Bordes Cuadrados

```typescript
const minimalTheme = useLolaTheme({
  colors: {
    // ... colores
    cardPanelBackground: 'transparent',
  },
  styles: {
    cardBorderRadius: '4px',
    buttonBorderRadius: '4px',
    inputBorderRadius: '4px',
    cardBorderColor: '#000000',
    buttonBorderColor: '#000000',
    inputBorderColor: '#000000',
    buttonSize: 'small',
  },
  font: { /* ... */ }
});
```

### Ejemplo 3: Tema Glassmorphism

```typescript
const glassTheme = useLolaTheme({
  colors: {
    // ... colores
    cardPanelBackground: 'rgba(255, 255, 255, 0.1)',
  },
  styles: {
    cardBorderRadius: '16px',
    buttonBorderRadius: '12px',
    inputBorderRadius: '10px',
    cardBorderColor: 'rgba(255, 255, 255, 0.2)',
    buttonBorderColor: 'rgba(255, 255, 255, 0.3)',
    inputBorderColor: 'rgba(255, 255, 255, 0.2)',
    buttonSize: 'medium',
  },
  font: { /* ... */ }
});
```

---

## Backward Compatibility

- ✅ **100% retrocompatible** - Todos los campos son opcionales
- ✅ Si no se proporciona `styles`, se usan los valores por defecto
- ✅ Si no se proporciona `cardPanelBackground`, se usa `'transparent'`
- ✅ Código existente sigue funcionando sin cambios

---

## Archivos Modificados

### Core
- `src/types/theme.types.ts` - Agregadas interfaces `StylesConfig` y `ButtonSize`
- `src/hooks/useCSSVariables.ts` - Agregada función `injectStyleVariables`
- `src/hooks/useLolaTheme.ts` - Soporte para `styles` en configuración

### Demo
- `src/stories/demo/FontSettingDemo.tsx` - Agregada UI para estilos personalizados

### Tipos
- `src/types/index.ts` - Exportados nuevos tipos

---

## Variables CSS Disponibles

### Colores (actualizados)
- `--lola-color-card-panel-background` (nuevo)
- ... (variables existentes)

### Estilos (nuevos)
- `--lola-style-card-border-radius`
- `--lola-style-button-border-radius`
- `--lola-style-input-border-radius`
- `--lola-style-card-border-color`
- `--lola-style-button-border-color`
- `--lola-style-input-border-color`
- `--lola-style-button-size`

---

## Testing

### Checklist
- [x] Build de TypeScript pasa sin errores
- [x] Estilos se inyectan correctamente como CSS variables
- [x] Valores por defecto funcionan correctamente
- [x] Valores personalizados sobrescriben los defaults
- [x] Retrocompatibilidad verificada
- [x] Demo funcional con controles UI
- [x] Tipos exportados correctamente

---

## Future Enhancements

Posibles mejoras futuras basadas en este patrón:

```typescript
interface StylesConfig {
  // Actual
  cardBorderRadius?: string;
  buttonBorderRadius?: string;
  inputBorderRadius?: string;
  
  // Futuro
  shadowIntensity?: 'none' | 'low' | 'medium' | 'high';
  transitionSpeed?: 'fast' | 'normal' | 'slow';
  spacing?: 'compact' | 'normal' | 'relaxed';
  // ...
}
```

---

## Casos de Uso

### 1. Branding Corporativo
```typescript
styles: {
  cardBorderRadius: '8px',    // Corporativo y profesional
  buttonBorderRadius: '4px',
  inputBorderRadius: '4px',
  buttonSize: 'large',
}
```

### 2. Aplicación Moderna
```typescript
styles: {
  cardBorderRadius: '20px',   // Moderno y amigable
  buttonBorderRadius: '16px',
  inputBorderRadius: '12px',
  buttonSize: 'medium',
}
```

### 3. Aplicación Minimalista
```typescript
styles: {
  cardBorderRadius: '0px',    // Sin bordes redondeados
  buttonBorderRadius: '0px',
  inputBorderRadius: '0px',
  buttonSize: 'small',
}
```

---

**Estado**: ✅ **COMPLETADO Y LISTO PARA PRODUCCIÓN**

**Build**: ✅ Pasa sin errores

**Retrocompatibilidad**: ✅ 100% garantizada
