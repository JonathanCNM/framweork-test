# ✅ NPM Link - Estado Actual

## Configuración Completada

El npm link entre `lola-framework-ui-test` y `lola-test-app` ha sido configurado exitosamente.

## 📊 Estado

### ✅ lola-framework-ui-test
- **Ubicación:** `/Users/jonathantrabajo/Desktop/Projects/Microfrontends/lola-framework-ui-test`
- **Link Global:** ✅ Creado
- **Versión:** 0.3.1
- **Build:** ✅ Completado

### ✅ lola-test-app
- **Ubicación:** `/Users/jonathantrabajo/Desktop/Projects/Microfrontends/lola-test-app`
- **Link a lola-framework-ui-test:** ✅ Conectado
- **Symlink:** `node_modules/lola-framework-ui-test -> ../../lola-framework-ui-test`

## 🚀 Workflow de Desarrollo

### Opción 1: Build Manual (Recomendado para cambios puntuales)

```bash
# 1. Hacer cambios en lola-framework-ui-test
cd /Users/jonathantrabajo/Desktop/Projects/Microfrontends/lola-framework-ui-test

# 2. Editar archivos...

# 3. Reconstruir
npm run build

# 4. Los cambios ya están disponibles en lola-test-app
# Reinicia el dev server si es necesario
```

### Opción 2: Watch Mode (Recomendado para desarrollo continuo)

**Terminal 1: Build automático en lola-framework-ui-test**
```bash
cd /Users/jonathantrabajo/Desktop/Projects/Microfrontends/lola-framework-ui-test
./dev-scripts/watch-and-build.sh
# o simplemente:
npm run build -- --watch
```

**Terminal 2: Dev server en lola-test-app**
```bash
cd /Users/jonathantrabajo/Desktop/Projects/Microfrontends/lola-test-app
npm run dev  # o el comando que uses
```

## 📝 Ejemplos de Uso

### Probar el nuevo hook useLolaTheme

```typescript
// En lola-test-app/src/App.tsx
import { useLolaTheme } from 'lola-framework-ui-test';

const theme = useLolaTheme({
  font: {
    h1: { fontWeight: '700', min: '2rem', max: '3rem', lineHeight: '1.2' },
    // ... más configuración
    fontfamily: 'Inter',
    fontcdn: 'https://fonts.googleapis.com/...'
  },
  colors: {
    primaryGradient: '#1DAFA1',
    secondaryGradient: '#10B981',
    // ... más colores
    lightness: 'light'
  }
});

// Usar el tema
console.log(theme.views.primaryMeshGradientView);
```

### Probar otros hooks

```typescript
// Hooks utilitarios
import { 
  useKeyboardVisible,
  useBlockScroll,
  usePreventReload 
} from 'lola-framework-ui-test';

// Hooks legacy (aún funcionan)
import { useTheme, useFonts } from 'lola-framework-ui-test';
```

## ⚠️ Troubleshooting

### Si los cambios no se reflejan:

1. **Verificar que el build se completó:**
   ```bash
   cd lola-framework-ui-test
   npm run build
   # Espera a que termine
   ```

2. **Reiniciar el dev server en lola-test-app:**
   ```bash
   cd lola-test-app
   # Ctrl+C para detener
   npm run dev
   ```

3. **Verificar el symlink:**
   ```bash
   ls -la lola-test-app/node_modules/lola-framework-ui-test
   # Debe mostrar: -> ../../lola-framework-ui-test
   ```

### Si hay problemas con React Hooks:

```bash
# En lola-test-app, linkea React desde sus propios node_modules
cd lola-test-app/node_modules/react
npm link

cd ../react-dom
npm link

# En lola-framework-ui-test, usa esos React linkeados
cd lola-framework-ui-test
npm link react
npm link react-dom
```

## 🧹 Deshacer el Link (cuando termines)

```bash
# En lola-test-app: desconectar el link
cd lola-test-app
npm unlink lola-framework-ui-test
npm install  # Reinstala la versión publicada

# En lola-framework-ui-test: eliminar link global (opcional)
cd lola-framework-ui-test
npm unlink -g
```

## 📋 Checklist de Verificación

- [x] ✅ Link global de lola-framework-ui-test creado
- [x] ✅ Link en lola-test-app conectado
- [x] ✅ Symlink verificado
- [x] ✅ Build inicial completado
- [x] ✅ Script de desarrollo creado
- [ ] ⏳ Servidor de dev de lola-test-app corriendo (hazlo cuando quieras)

## 🎯 Próximos Pasos

1. **Inicia el dev server en lola-test-app:**
   ```bash
   cd /Users/jonathantrabajo/Desktop/Projects/Microfrontends/lola-test-app
   npm run dev
   ```

2. **Prueba el nuevo sistema de temas:**
   - Importa `useLolaTheme` en tu aplicación
   - Pasa la configuración completa del tema
   - Verifica que funcione correctamente

3. **Para desarrollo continuo:**
   - Abre 2 terminales
   - Terminal 1: `./dev-scripts/watch-and-build.sh` en lola-framework-ui-test
   - Terminal 2: `npm run dev` en lola-test-app

## 💡 Tips

- **Los cambios en src/** requieren rebuild
- **Los cambios en dist/** se reflejan inmediatamente (pero no edites dist/)
- **Reinicia el dev server** después de cambios mayores en tipos
- **Usa console.log** para verificar que estás usando la versión linkeada
- **Documenta los bugs** que encuentres para corregirlos aquí

## 📚 Documentación Relacionada

- [NPM_LINK_GUIDE.md](./NPM_LINK_GUIDE.md) - Guía detallada completa
- [THEME_SYSTEM_GUIDE.md](./THEME_SYSTEM_GUIDE.md) - Cómo usar el nuevo sistema de temas
- [BACKWARD_COMPATIBILITY_GUARANTEE.md](./BACKWARD_COMPATIBILITY_GUARANTEE.md) - Garantía de compatibilidad

---

**Estado:** ✅ COMPLETAMENTE CONFIGURADO  
**Fecha:** 2026-06-24  
**Listo para usar:** SÍ
