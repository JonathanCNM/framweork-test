# Changelog: iconContainerBackground

**Date:** July 27, 2026  
**Impact:** Additive / non-breaking (default `transparent` preserves legacy)

## Summary

New optional theme style for **icon container** backgrounds (e.g. `ElevatedCircle`). Does **not** change icon SVG colors or auto-apply to any component.

## API

### Per-view mapping (`VIEW_COLOR_MAPPINGS`)

Mapped on every view type (light + dark):

- `primaryMeshGradientView`
- `specialView`
- `dataView`
- `whiteView`
- `errorView`

Default mapping value: `'transparent'` (legacy).

### `styles.iconContainerBackground` (optional global override)

| | |
|--|--|
| Type | `string` |
| Default | unset → each view keeps mapped `'transparent'` |
| Exposed on | every view as `view.iconContainerBackground` |
| CSS variable | `--lola-style-icon-container-background` |

### Usage (opt-in)

```tsx
// Theme config
styles: {
  iconContainerBackground: '#FFFFFF', // or keep 'transparent'
}

// Consumer chooses to apply it to a container — never auto-applied
<ElevatedCircle background={theme.specialView.iconContainerBackground}>
  <SuccessIcon colors={theme.specialView.iconColors} />
</ElevatedCircle>
```

### Legacy

- Omitting the property → `'transparent'` on all views
- Existing apps that keep using `background={backgroundIcon}` are unchanged
- Icon components (`iconColors`) are not affected

## Files

- `src/types/theme.types.ts`
- `src/hooks/useViewConfig.ts` / `useTheme.ts` / `useCSSVariables.ts`
- `src/stories/demo/FontSettingDemo.tsx`
- Docs: `THEME_API_REFERENCE.md`, `ai-docs/IMPLEMENTATION_GUIDE_2026.md`, etc.
