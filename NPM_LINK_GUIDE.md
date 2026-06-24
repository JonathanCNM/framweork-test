# NPM Link Setup Guide

Guía para configurar el desarrollo con `npm link` entre `lola-framework-ui-test` y `lola-test-app`.

## ✅ Paso 1: Link Global Creado (COMPLETADO)

El link global de `lola-framework-ui-test` ya fue creado exitosamente:

```bash
✓ lola-framework-ui-test@0.3.1 -> ./../Desktop/Projects/Microfrontends/lola-framework-ui-test
```

## 🔄 Paso 2: Conectar lola-test-app (PENDIENTE)

Ahora necesitas ir al proyecto `lola-test-app` y vincularlo:

### Opción A: Si lola-test-app está en el mismo directorio padre

```bash
# Desde lola-framework-ui-test
cd ../lola-test-app

# Crear el link
npm link lola-framework-ui-test

# Verificar que funcionó
npm list lola-framework-ui-test
```

### Opción B: Si lola-test-app está en otra ubicación

```bash
# Navegar a la ubicación de lola-test-app
cd /ruta/a/lola-test-app

# Crear el link
npm link lola-framework-ui-test

# Verificar que funcionó
npm list lola-framework-ui-test
```

## 🔧 Desarrollo con npm link

### Workflow de Desarrollo

1. **Hacer cambios en lola-framework-ui-test:**
   ```bash
   # En lola-framework-ui-test
   cd /Users/jonathantrabajo/Desktop/Projects/Microfrontends/lola-framework-ui-test
   
   # Edita tus archivos
   # ...
   
   # Reconstruir la librería
   npm run build
   ```

2. **Los cambios están disponibles inmediatamente en lola-test-app:**
   ```bash
   # En lola-test-app, simplemente reinicia tu servidor de desarrollo
   npm run dev  # o el comando que uses
   ```

### Build Watch Mode (Recomendado)

Para desarrollo continuo, puedes dejar corriendo el build en modo watch:

```bash
# Terminal 1: En lola-framework-ui-test
npm run build -- --watch

# Terminal 2: En lola-test-app
npm run dev
```

## ⚠️ Consideraciones Importantes

### 1. React Peer Dependencies

Si tienes problemas con "Invalid Hook Call" o "Multiple React instances", necesitas linkear React también:

```bash
# En lola-framework-ui-test
cd node_modules/react
npm link

cd ../react-dom
npm link

# En lola-test-app
npm link react
npm link react-dom
```

### 2. Verificar el Link

Puedes verificar que el link está funcionando:

```bash
# En lola-test-app
ls -la node_modules/lola-framework-ui-test

# Deberías ver un symlink (->)
lrwxr-xr-x ... node_modules/lola-framework-ui-test -> /Users/jonathantrabajo/Desktop/Projects/Microfrontends/lola-framework-ui-test
```

### 3. Deshacer el Link

Si necesitas volver a la versión publicada:

```bash
# En lola-test-app
npm unlink lola-framework-ui-test
npm install lola-framework-ui-test

# Para eliminar el link global (opcional)
cd /Users/jonathantrabajo/Desktop/Projects/Microfrontends/lola-framework-ui-test
npm unlink -g
```

## 🐛 Troubleshooting

### Problema: Cambios no se reflejan

**Solución:**
```bash
# Asegúrate de hacer build después de cambios
cd lola-framework-ui-test
npm run build

# Reinicia el servidor de dev en lola-test-app
```

### Problema: "Invalid Hook Call Warning"

**Causa:** Múltiples instancias de React

**Solución:**
```bash
# En lola-test-app, linkea React desde node_modules
cd node_modules/react
npm link

cd ../../lola-framework-ui-test
npm link react

# Similar para react-dom
```

### Problema: Module not found

**Solución:**
```bash
# Verifica que el link existe
npm list -g --depth=0 | grep lola-framework-ui-test

# Si no aparece, recrea el link global
cd lola-framework-ui-test
npm link

# Y vuelve a linkear en lola-test-app
cd lola-test-app
npm link lola-framework-ui-test
```

### Problema: Types no se actualizan

**Solución:**
```bash
# Reconstruir con tipos
npm run build

# Si persiste, limpia y reconstruye
rm -rf dist
npm run build
```

## 📋 Checklist

- [x] ✅ `npm link` ejecutado en lola-framework-ui-test
- [ ] ⏳ `npm link lola-framework-ui-test` ejecutado en lola-test-app
- [ ] ⏳ Verificado que el link funciona
- [ ] ⏳ Build inicial completado
- [ ] ⏳ Servidor de dev de lola-test-app corriendo

## 🚀 Comandos Rápidos

### Setup Inicial Completo

```bash
# Terminal 1: Setup lola-framework-ui-test
cd /Users/jonathantrabajo/Desktop/Projects/Microfrontends/lola-framework-ui-test
npm link
npm run build

# Terminal 2: Setup lola-test-app
cd /ruta/a/lola-test-app
npm link lola-framework-ui-test
npm run dev
```

### Desarrollo Diario

```bash
# Terminal 1: Watch mode en lola-framework-ui-test
cd lola-framework-ui-test
npm run build -- --watch

# Terminal 2: Dev server en lola-test-app
cd lola-test-app
npm run dev
```

## 📊 Verificación del Estado Actual

### lola-framework-ui-test
```bash
cd /Users/jonathantrabajo/Desktop/Projects/Microfrontends/lola-framework-ui-test
npm list -g --depth=0 | grep lola-framework-ui-test
# ✅ Resultado: lola-framework-ui-test@0.3.1 -> ./../Desktop/...
```

### lola-test-app (PENDIENTE)
```bash
cd lola-test-app
npm link lola-framework-ui-test
npm list lola-framework-ui-test
# Debería mostrar: lola-framework-ui-test@0.3.1 -> ...
```

## 💡 Tips Útiles

1. **Siempre hacer build después de cambios** - npm link no recompila automáticamente
2. **Usa build --watch** para desarrollo continuo
3. **Reinicia el dev server** después de cambios mayores
4. **Verifica el dist/** tiene los archivos actualizados
5. **Documenta qué features estás probando** para facilitar testing

## 🔗 Links Útiles

- [npm link documentation](https://docs.npmjs.com/cli/v8/commands/npm-link)
- [Troubleshooting React Hook warnings](https://reactjs.org/warnings/invalid-hook-call-warning.html)

---

**Estado:** Link global creado ✅ | Link en lola-test-app pendiente ⏳  
**Última actualización:** 2026-06-24
