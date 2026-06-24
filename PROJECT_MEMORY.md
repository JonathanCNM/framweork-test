# Project Memory: Lola Framework UI

> Documento de referencia rápida y memoria institucional del proyecto

**Última actualización**: Junio 11, 2026  
**Versión**: 0.3.1 → 0.4.0 (en migración)  
**Mantenedor**: Jonathan Narvaez  

---

## 🎯 Resumen del Proyecto

**Lola Framework UI** es una librería de componentes React (Design System) diseñada para unificar la apariencia visual y acelerar el desarrollo en múltiples proyectos del ecosistema organizacional.

### Tipo de Proyecto
- Component Library (distribución NPM)
- Design System corporativo
- Microfrontend-ready
- Open source (MIT)

### Propósito
- Unificar estilos entre proyectos
- Acelerar desarrollo con componentes reutilizables
- Mantener consistencia visual
- Facilitar mantenimiento centralizado

---

## 📊 Estado Actual

### Versión en Producción
- **v0.3.1**: Última versión estable
- **v0.4.0-beta**: En testing (React 19 support)

### Métricas Clave

| Métrica | Valor Actual | Objetivo v0.4.0 |
|---------|--------------|-----------------|
| Componentes | 24 | 24 |
| Custom Hooks | 8 | 8 |
| Iconos | 52 | 52 |
| Bundle Size | 708KB | <400KB |
| Test Coverage | 0% | 80%+ |
| React Support | 18 only | 18 & 19 |

### Stack Tecnológico

**Core**:
- React 18.3.1 (peer: >=18 <20)
- TypeScript 5.8.3
- Vite 7.0.4

**Build & Tooling**:
- Vite 7 (bundler)
- vite-plugin-dts (tipos)
- ESLint 9 (flat config)

**UI & Animation**:
- Framer Motion 12.23.9
- CSS Level 4/5 (sin preprocessores)
- CSS Variables para theming

**Testing** (en implementación):
- Vitest 2.0
- Testing Library
- 80% coverage target

**Docs**:
- Storybook 9.1.2
- TypeDoc (planeado)

---

## 🏗️ Arquitectura

### Estructura de Directorios

```
lola-framework-ui-test/
├── src/
│   ├── components/          # 24 componentes UI
│   │   ├── Button.tsx
│   │   ├── Layout.tsx
│   │   ├── InputField.tsx
│   │   └── [21 más...]
│   ├── hooks/               # 8 custom hooks
│   │   ├── useTheme.ts
│   │   ├── useBlockScroll.ts
│   │   └── [6 más...]
│   ├── icons/               # 52 iconos SVG
│   │   └── icons.tsx        # Monolítico (a refactorizar)
│   ├── styles/              # CSS global
│   │   └── index.css        # 1666 líneas
│   ├── store/               # Context API
│   ├── utils/               # Utilidades
│   ├── demo/                # Páginas demo
│   └── index.ts             # Entry point
├── dist/                    # Build output
├── docs/                    # Documentación técnica
│   ├── README.md
│   ├── architecture/
│   ├── components/
│   ├── dependencies/
│   ├── problems/
│   ├── migration/
│   └── modernization/
├── .cursor/
│   └── skills/
│       └── lola-ui-development/  # Skill de desarrollo
└── [configs]
```

### Patrones de Arquitectura

1. **Compound Components**: Layout con Header/Content/Footer
2. **Composition Pattern**: Componentes altamente componibles
3. **Barrel Exports**: Exports centralizados
4. **CSS Variables**: Theming dinámico
5. **Hook Pattern**: Lógica reutilizable separada

### Build Pipeline

```
src/ → Vite Build → Rollup Bundle → TypeScript Types → dist/
                                                          ├── index.es.js
                                                          ├── index.js
                                                          ├── index.d.ts
                                                          └── styles.css
```

**Formatos**: ESM, CommonJS, UMD  
**Externals**: react, react-dom, framer-motion, etc.

---

## 🎨 Componentes Principales

### Layout & Structure (4)
- `Layout` - Compound component principal
- `Page` - Wrapper de páginas
- `AuraLayout` - Layout con efectos
- `DesignLayout` - Grid de desarrollo

### UI Elements (6)
- `Button` - 4 variantes, loading, iconos
- `Title` - Con gradientes y subtítulos
- `GradientText` - Texto animado con gradiente
- `BodyCopy` - Texto de cuerpo
- Más...

### Form Components (7)
- `InputField` - Input con label flotante
- `Select` - Selector customizado
- `SearchSelect` - Con búsqueda
- `VgsInput` - ⚠️ Requiere @vgs/collect-js-react
- Más...

### Navigation (1)
- `Navbar` - Barra de navegación

### Feedback & Progress (3)
- `Loader` - Indicador de carga
- `CircularProgress` - Progreso circular
- `CustomStepper` - Stepper de pasos

### Hooks (8)
- `useTheme` - Sistema de theming dinámico
- `useBlockScroll` - Bloqueo de scroll
- `useKeyboardVisible` - Detección teclado móvil
- `usePreventReload` - Prevención de recarga
- Y 4 más...

### Iconos (52)
- Categorías: camera, navigation, payment, status, etc.
- Todos con colores dinámicos
- ⚠️ Sin tree-shaking actual (a resolver)

---

## ⚙️ Decisiones Técnicas Importantes

### 1. No Usar Preprocessores CSS
**Decisión**: Solo CSS moderno (Level 4/5)  
**Razón**: 
- Evitar dependencias de build
- Mejor performance
- Features nativas suficientes
- CSS Container Queries, :has(), etc.

### 2. TypeScript Strict
**Decisión**: Strict mode, nunca `any`  
**Razón**:
- Type safety completo
- Mejor DX
- Menos bugs en runtime

### 3. Exports desde index.ts
**Decisión**: Todos los exports públicos desde src/index.ts  
**Razón**:
- API consistente
- Fácil tree-shaking
- Control de superficie pública

### 4. VGS como Peer Dependencies Opcionales
**Decisión**: No instalar VGS por defecto  
**Razón**:
- No todos necesitan payment forms
- Reduce bundle size
- Evita dependencias innecesarias

### 5. Semver Estricto
**Decisión**: Seguir semver para breaking changes  
**Razón**:
- Previsibilidad para consumidores
- Migraciones controladas
- Profesionalismo

### 6. React 18 y 19 Support
**Decisión**: Soportar ambas versiones  
**Razón**:
- Adopción gradual
- No forzar upgrades
- Mercado más amplio

---

## 🚨 Problemas Conocidos

### Críticos 🔴

1. **Dependencia Beta en Producción**
   - `body-scroll-lock@4.0.0-beta.0`
   - **Solución**: Migrar a react-remove-scroll
   - **Estado**: En Fase 1 de migración

2. **Dependencias VGS No Instaladas**
   - `@vgs/collect-js` y `@vgs/collect-js-react` declarados pero no instalados
   - **Solución**: Hacer peer dependencies opcionales
   - **Estado**: En Fase 1 de migración

3. **Bundle Sin Optimizar**
   - 708KB total, CSS duplicado, iconos monolíticos
   - **Solución**: Code splitting, separar iconos
   - **Estado**: Planeado en Fase 3

4. **Sin Tree-shaking de Iconos**
   - Todos los 52 iconos se importan siempre
   - **Solución**: Separar en archivos individuales
   - **Estado**: Planeado en Fase 3

5. **Ausencia de Tests**
   - 0% coverage actual
   - **Solución**: Setup Vitest + Testing Library
   - **Estado**: Planeado en Fase 2

### Advertencias 🟡

6. **CSS con Valores Hardcodeados**
   - Mezcla de variables CSS y valores fijos
   - **Impacto**: Theming incompleto

7. **useTheme Performance**
   - Re-calcula CSS en cada render
   - **Impacto**: Performance en componentes que cambian tema frecuentemente

8. **TypeScript verbatimModuleSyntax**
   - Puede causar problemas con re-exports
   - **Impacto**: Bajo, pero vigilar

### Menores 🟢

9. **Documentación JSDoc Incompleta**
10. **Accesibilidad Mejorable**

---

## 📦 Dependencias Críticas

### Producción

```json
{
  "body-scroll-lock": "4.0.0-beta.0",    // ⚠️ BETA - A reemplazar
  "framer-motion": "^12.23.9",           // ✅ Estable
  "@types/body-scroll-lock": "^3.1.2"
}
```

### Peer Dependencies

```json
{
  "react": ">=18 <20",        // Soporta 18 y 19
  "react-dom": ">=18 <20"
}
```

### Dependencias NO Instaladas (pero referenciadas)

```json
{
  "@vgs/collect-js": "^2.25.0",           // ⚠️ Faltante
  "@vgs/collect-js-react": "^2.11.0",     // ⚠️ Faltante
  "@react-google-maps/api": "*"           // ⚠️ Referenciado
}
```

---

## 🔄 Proceso de Migración Actual

### Estado: En Progreso
- **Branch**: `feat/modernization-2026`
- **Inicio**: Junio 2026
- **Duración estimada**: 6-8 semanas
- **Versión objetivo**: 0.4.0

### Fases

| Fase | Estado | Duración | Riesgo |
|------|--------|----------|--------|
| 0. Preparación | ✅ Completo | 2-3 días | 🟢 |
| 1. Dependencias | 🟡 En curso | 1 semana | 🔴 |
| 2. Testing | ⏳ Pendiente | 1.5 semanas | 🟡 |
| 3. Bundle Opt | ⏳ Pendiente | 2 semanas | 🟡 |
| 4. React 19 | ⏳ Pendiente | 1.5 semanas | 🔴 |
| 5. CI/CD | ⏳ Pendiente | 1 semana | 🟢 |

### Objetivos de Migración

- ✅ Eliminar dependencias beta
- ✅ Implementar testing (80%+ coverage)
- ✅ Optimizar bundle (708KB → 395KB)
- ✅ Soporte React 19
- ✅ CI/CD automation
- ✅ Tree-shaking de iconos

---

## 📚 Convenciones de Código

### TypeScript

```typescript
// ✅ HACER
export interface ComponentProps {
  variant?: 'default' | 'primary';
  children: ReactNode;
}

export const Component = ({ variant = 'default' }: ComponentProps) => {
  // Implementation
};

// ❌ NUNCA
const handleClick = (event: any) => { ... }  // Never use 'any'
```

### Componentes

```typescript
// Patrón estándar
export interface MyComponentProps extends HTMLAttributes<HTMLDivElement> {
  // Props específicas
}

export const MyComponent = ({ children, ...props }: MyComponentProps) => {
  return <div {...props}>{children}</div>;
};
```

### CSS

```css
/* Usar variables para theming */
.lola-component {
  background: var(--background);
  color: var(--foreground);
  /* NO usar: #fff, #000, etc. */
}

/* Responsive con clamp */
.lola-component {
  padding: clamp(1rem, 2vw, 2rem);
}
```

### Exports

```typescript
// src/components/index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';

// src/index.ts
export * from './components';
export * from './components/MyComponent';
```

### Tests

```typescript
// __tests__/MyComponent.test.tsx
describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent>Test</MyComponent>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Commits

```bash
# Formato: tipo(scope): mensaje

feat(Button): add loading state
fix(Layout): resolve React 19 compatibility
docs: update installation guide
test: add Button component tests
refactor(icons): split monolithic file
```

---

## 🔧 Comandos Frecuentes

### Desarrollo

```bash
# Dev server
npm run dev

# Storybook
npm run storybook

# Build
npm run build

# Build demo
npm run build:demo
```

### Testing

```bash
# Run tests
npm test

# Tests en watch mode
npm run test:watch

# Coverage
npm run test:coverage

# UI de tests
npm run test:ui
```

### Linting & Quality

```bash
# Lint
npm run lint

# Check types
tsc --noEmit

# Check bundle size
npm run build:check
```

### Release

```bash
# Version bump
npm version patch|minor|major

# Build y publish
npm run build
npm publish

# Con script automatizado
./scripts/release.sh
```

---

## 📖 Documentación

### Documentos Principales

| Documento | Propósito | Ubicación |
|-----------|-----------|-----------|
| **README.md** | Inicio rápido | Raíz |
| **Architecture** | Detalles de arquitectura | docs/architecture/ |
| **Components** | Catálogo completo | docs/components/ |
| **Dependencies** | Análisis de deps | docs/dependencies/ |
| **Problems** | Problemas conocidos | docs/problems/ |
| **Migration** | Riesgos de migración | docs/migration/ |
| **Modernization** | Plan de mejoras | docs/modernization/ |
| **Migration Plan** | Plan ejecutable detallado | docs/MIGRATION_PLAN.md |
| **Skill** | Estándares de desarrollo | .cursor/skills/lola-ui-development/ |

### Storybook

```bash
npm run storybook
# http://localhost:6006
```

- Documentación interactiva de todos los componentes
- Props documentadas automáticamente
- Ejemplos de uso

---

## 🎯 Roadmap

### v0.4.0 (En progreso - Q2 2026)
- ✅ React 19 support
- ✅ Bundle optimization (-44%)
- ✅ Testing infrastructure
- ✅ CI/CD automation
- ✅ Tree-shakeable exports

### v0.5.0 (Planeado - Q3 2026)
- Accessibility improvements
- Dark mode enhancements
- Animation library update
- Performance optimizations

### v1.0.0 (Futuro - Q4 2026)
- Stable API
- Complete documentation
- 95%+ test coverage
- React 19 as minimum

### Backlog
- Más componentes (Tabs, Modal, Drawer)
- Figma integration
- CLI para scaffolding
- Themes presets

---

## 🚀 Para Nuevos Desarrolladores

### Quick Start

1. **Clone y setup**
   ```bash
   git clone <repo>
   cd lola-framework-ui-test
   npm install
   ```

2. **Explorar**
   ```bash
   npm run storybook  # Ver componentes
   npm run dev        # Dev server
   ```

3. **Leer docs**
   - Empieza por: `docs/README.md`
   - Luego: `docs/architecture/README.md`
   - Skill de desarrollo: `.cursor/skills/lola-ui-development/SKILL.md`

4. **Crear componente**
   - Usa el skill: `@lola-ui-development`
   - Sigue template en `SKILL.md`
   - Crea tests obligatorios

### Preguntas Frecuentes

**Q: ¿Puedo usar any en TypeScript?**  
A: No. Nunca. Usa `unknown` si el tipo es desconocido.

**Q: ¿Dónde van los estilos?**  
A: src/styles/index.css. Solo CSS moderno, no Sass.

**Q: ¿Cómo agrego una dependencia?**  
A: Consulta docs/dependencies/README.md. Justifica antes de agregar.

**Q: ¿Tests son obligatorios?**  
A: Sí. Mínimo 80% coverage.

**Q: ¿Cómo publico una nueva versión?**  
A: Usa `./scripts/release.sh` o consulta docs/MIGRATION_PLAN.md Fase 5.

---

## 📞 Contactos y Recursos

### Mantenedores
- **Tech Lead**: Jonathan Narvaez
- **Repository**: https://github.com/JonathanCNM/framweork-test

### Recursos

- **NPM**: https://www.npmjs.com/package/lola-framework-ui
- **Storybook**: [URL cuando esté deployado]
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions

### Comunicación

- **Issues técnicos**: GitHub Issues
- **Preguntas**: GitHub Discussions
- **Slack**: #lola-ui (si existe)

---

## 🔒 Consideraciones de Seguridad

### Dependencias
- ✅ Audit regular: `npm audit`
- ✅ Dependabot enabled
- ⚠️ body-scroll-lock beta (a reemplazar)

### Publicación
- ✅ 2FA en NPM obligatorio
- ✅ GitHub Actions con secrets
- ✅ No credentials en código

### Datos Sensibles
- ❌ No logs de datos de usuarios
- ❌ VGS components no manejan datos directamente
- ✅ Solo UI components, sin backend logic

---

## 📊 Métricas de Proyecto

### Tamaño de Código
- **Componentes**: ~12,000 líneas
- **Hooks**: ~1,500 líneas
- **Iconos**: ~2,346 líneas
- **Styles**: ~1,666 líneas
- **Tests**: ~0 líneas (en desarrollo)
- **Total**: ~18,000 líneas

### Complejidad
- **Componentes simples**: 15
- **Componentes medios**: 7
- **Componentes complejos**: 2 (Layout, VgsFormWrapper)

### Mantenimiento
- **Issues abiertos**: [Consultar GitHub]
- **PRs pendientes**: [Consultar GitHub]
- **Última release**: v0.3.1
- **Próxima release**: v0.4.0-beta

---

## 🎓 Aprendizajes y Decisiones Históricas

### Por Qué No Usamos CSS-in-JS
**Decisión tomada**: Julio 2025  
**Razón**: 
- Runtime overhead
- Bundle size
- CSS moderno es suficiente
- Mejor performance

### Por Qué Compound Components en Layout
**Decisión tomada**: Agosto 2025  
**Razón**:
- API más declarativa
- Flexibilidad para consumidores
- Pattern común en React

### Por Qué No Monorepo (aún)
**Decisión tomada**: Octubre 2025  
**Razón**:
- Complejidad no justificada con 1 package
- Considerar para v1.0 con múltiples packages

### Por Qué Vite sobre Webpack
**Decisión tomada**: Junio 2025  
**Razón**:
- Dev server más rápido
- Better DX
- Configuración más simple
- ESM nativo

---

## 🔄 Changelog Reciente

### v0.3.1 (Actual - Junio 2026)
- 24 componentes funcionando
- Storybook documentation
- Demo pages completas
- CSS variables system

### v0.3.0 (Mayo 2026)
- Added InputRadio
- Added SearchSelect
- Improved theming

### v0.2.0 (Abril 2026)
- Layout refactor
- Custom hooks added
- Icon system

### v0.1.0 (Marzo 2026)
- Initial release
- Basic components
- Storybook setup

---

## 📝 Notas Adicionales

### Build Artifacts
- `dist/` no va en git
- `demo-dist/` no va en git
- `coverage/` no va en git

### Branches
- `main`: Producción estable
- `develop`: Development (si existe)
- `feat/*`: Features
- `fix/*`: Bug fixes

### Tags
- Formato: `v0.3.1`
- Siempre con changelog
- Signed tags recomendado

### NPM
- Publicación automática con GitHub Actions
- Beta tags: `npm publish --tag beta`
- Latest tag: Automático en release

---

## ✅ Checklist para Contribuidores

Antes de crear un PR:

- [ ] Código sigue convenciones del skill
- [ ] No hay `any` en TypeScript
- [ ] Componente exportado desde index.ts
- [ ] Tests creados (80%+ coverage)
- [ ] Storybook story agregada
- [ ] Props documentadas
- [ ] CSS usa solo variables (no hardcoded)
- [ ] Build pasa sin warnings
- [ ] Lint pasa
- [ ] Commits siguen formato
- [ ] Breaking changes documentados

---

**Última revisión**: Junio 11, 2026  
**Próxima revisión programada**: Post-release v0.4.0  
**Mantenido por**: Jonathan Narvaez

---

## 🔗 Links Rápidos

- [📖 Docs Completas](./docs/README.md)
- [🏗️ Arquitectura](./docs/architecture/README.md)
- [🧩 Componentes](./docs/components/README.md)
- [📦 Dependencias](./docs/dependencies/README.md)
- [⚠️ Problemas](./docs/problems/README.md)
- [🔄 Migración](./docs/migration/README.md)
- [🚀 Modernización](./docs/modernization/README.md)
- [📋 Plan de Migración](./docs/MIGRATION_PLAN.md)
- [💻 Skill de Desarrollo](./.cursor/skills/lola-ui-development/SKILL.md)
