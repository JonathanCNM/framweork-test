#!/bin/bash

# Script para desarrollo continuo con npm link
# Ejecuta el build en modo watch para que los cambios se reflejen automáticamente

echo "🔄 Iniciando build en modo watch..."
echo "📦 Los cambios se reflejarán automáticamente en lola-test-app"
echo ""
echo "💡 Para ver los cambios:"
echo "   1. Guarda tus archivos aquí"
echo "   2. Espera a que el build termine"
echo "   3. Reinicia el servidor de dev en lola-test-app si es necesario"
echo ""
echo "🛑 Presiona Ctrl+C para detener"
echo ""

npm run build -- --watch
