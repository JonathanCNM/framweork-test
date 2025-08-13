# Lola Framework UI

**Lola Framework UI** es un framework de estilos diseñado para **unificar la apariencia y la experiencia visual** de todos los proyectos desarrollados bajo el ecosistema de nuestra organización.  
Su objetivo principal es ofrecer **consistencia, mantenibilidad y velocidad de desarrollo**, proporcionando una colección de componentes y utilidades listos para usar, con una estética coherente y personalizable.

---

## 🚀 Propósito

En equipos con múltiples proyectos, mantener una identidad visual consistente puede ser un desafío.  
**Lola Framework UI** nace para centralizar los estilos y patrones visuales, permitiendo:

- **Unificación de estilos:** Todos los proyectos comparten la misma base visual.
- **Desarrollo más rápido:** Reutiliza componentes y evita crear estilos desde cero.
- **Facilidad de mantenimiento:** Actualiza estilos globalmente desde un único lugar.
- **Escalabilidad:** Soporta la incorporación de nuevos componentes y hooks reutilizables.

---

## 📦 Qué incluye

- **Componentes UI** reutilizables y accesibles.
- **Hooks personalizados** para funcionalidades comunes.
- **Sistema de estilos** basado en buenas prácticas y escalable.
- **Soporte para personalización** mediante props y temas.

---

## ⚙️ Configuración en tu proyecto

### Instalación:

**npm**
```bash
npm install lola-framework-ui
```

**yarn**
```bash
yarn add lola-framework-ui
```

### Implementación:

```typescript
// in your main.tsx or app.tsx file
import "lola-framework-ui/styles";
import { Button } from "lola-framework-ui";

<Button>Default Button</Button>
```