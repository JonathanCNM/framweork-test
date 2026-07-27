# Changelog: ElevatedCircle

**Date:** July 27, 2026  
**Package:** `lola-framework-ui-test`  
**Impact:** Additive / non-breaking (legacy defaults preserved)

## Summary

`ElevatedCircle` now supports configurable size and box-shadow variant, and draws a true circle with `clip-path` instead of `border-radius`.

## Changes

### New optional props

| Prop | Type | Default | Legacy behavior |
|------|------|---------|-----------------|
| `size` | `number \| string` | `128` | Same 128×128px diameter |
| `shadowVariant` | `'normal' \| 'inset' \| 'none'` | `'normal'` | Same as previous inset glow (`none` removes shadow) |

### Visual / CSS

- **Shape:** `clip-path: circle(50% at 50% 50%)` replaces `border-radius: 100%`
- **Size:** `--elevated-circle-size` CSS variable (default `128px`)
- **Shadows:**
  - `normal` (legacy): `box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5)`
  - `inset`: `box-shadow: inset 2px 2px 6px rgba(0, 0, 0, 0.25)`
  - `none`: `box-shadow: none`
- Removed `.elevated-circle` from the shared `box-shadow: var(--box-shadows)` rule so inset variants are not overridden (outer `--box-shadows` would also be clipped by `clip-path`)

## Migration

**No migration required** for existing consumers:

```tsx
// Still valid — identical defaults
<ElevatedCircle background={backgroundIcon}>
  <Icon />
</ElevatedCircle>
```

Optional adoption:

```tsx
<ElevatedCircle
  background={backgroundIcon}
  size={96}
  shadowVariant="inset"
>
  <Icon />
</ElevatedCircle>
```

## Docs updated

- `docs/components/README.md`
- `ai-docs/IMPLEMENTATION_GUIDE_2026.md`
- `ai-docs/components/ElevatedCircle.json`
- `ai-docs/components/index.json`
- `ERROR_PAGES_GUIDE.md` / `ERROR_PAGES_VISUAL_REFERENCE.md`
- Storybook: `src/stories/ElevatedCircle.stories.tsx`
