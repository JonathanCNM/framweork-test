import type { IColorForm } from "./types";

export const SPECIAL_VIEW_FIELD_KEYS = [
  "specialViewPrimaryGradient",
  "specialViewSecondaryGradient",
  "specialViewGradientDeg",
  "specialViewPrimaryGradientPoint",
  "specialViewSecundaryGradientPoint",
  "specialViewBackground",
] as const;

export const PRIMARY_GRADIENT_FIELD_KEYS = [
  "primaryGradient",
  "secondaryGradient",
  "gradientDeg",
  "primaryGradientPoint",
  "secundaryGradientPoint",
  "primaryMesh",
] as const;

export const isSpecialViewField = (key: string): boolean =>
  (SPECIAL_VIEW_FIELD_KEYS as readonly string[]).includes(key);

export const isPrimaryGradientField = (key: string): boolean =>
  (PRIMARY_GRADIENT_FIELD_KEYS as readonly string[]).includes(key);

export const copyPrimaryToSpecialView = (colors: IColorForm): IColorForm => ({
  ...colors,
  specialViewPrimaryGradient: colors.primaryGradient,
  specialViewSecondaryGradient: colors.secondaryGradient,
  specialViewGradientDeg: colors.gradientDeg,
  specialViewPrimaryGradientPoint: colors.primaryGradientPoint,
  specialViewSecundaryGradientPoint: colors.secundaryGradientPoint,
  specialViewBackground: colors.primaryMesh,
});

export const isSpecialViewInSyncWithPrimary = (colors: IColorForm): boolean =>
  colors.specialViewPrimaryGradient === colors.primaryGradient &&
  colors.specialViewSecondaryGradient === colors.secondaryGradient &&
  colors.specialViewGradientDeg === colors.gradientDeg &&
  colors.specialViewPrimaryGradientPoint === colors.primaryGradientPoint &&
  colors.specialViewSecundaryGradientPoint === colors.secundaryGradientPoint &&
  colors.specialViewBackground === colors.primaryMesh;

export const importedThemeHasSpecialView = (
  colors: Record<string, unknown>
): boolean => typeof colors.specialViewBackground === "string";

/** Editor-only helpers. Never persist these in copied/exported theme JSON. */
export const EDITOR_ONLY_COLOR_KEYS = [
  "specialViewPrimaryGradient",
  "specialViewSecondaryGradient",
  "specialViewGradientDeg",
  "specialViewPrimaryGradientPoint",
  "specialViewSecundaryGradientPoint",
  "errorViewPrimaryGradient",
  "errorViewSecondaryGradient",
  "errorViewGradientDeg",
  "errorViewPrimaryGradientPoint",
  "errorViewSecundaryGradientPoint",
] as const;

export type EditorOnlyColorKey = (typeof EDITOR_ONLY_COLOR_KEYS)[number];

export const omitEditorOnlyColorFields = <T extends object>(
  colors: T
): Omit<T, EditorOnlyColorKey> => {
  const next = { ...colors } as T & Record<string, unknown>;
  for (const key of EDITOR_ONLY_COLOR_KEYS) {
    delete next[key];
  }
  return next as Omit<T, EditorOnlyColorKey>;
};
