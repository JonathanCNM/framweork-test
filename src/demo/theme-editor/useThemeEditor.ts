import { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import {
  injectColorVariables,
  injectStyleVariables,
} from "../../hooks/useCSSVariables";
import { generateGradient } from "../../utils/utils";
import { registeredFonts } from "../../utils/constants";
import { applyImportedTheme, getAppliedSections } from "./applyImportedTheme";
import { defaultThemeEditorState } from "./constants";
import {
  copyPrimaryToSpecialView,
  isPrimaryGradientField,
  isSpecialViewField,
  omitEditorOnlyColorFields,
} from "./specialViewSync";
import type {
  ButtonSizeOption,
  ExportedTheme,
  FontInput,
  IFormFont,
  ImportedTheme,
  ThemeEditorState,
  ThemeFeedback,
} from "./types";
import { parseThemeJson, validateImportedTheme } from "./validateTheme";

const downloadJson = (data: unknown, filename: string) => {
  const text = JSON.stringify(data, null, 2);
  const blob = new Blob([text], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

const buildExportedTheme = (state: ThemeEditorState): ExportedTheme => ({
  font: {
    ...state.formFont,
    fontfamily: state.inputFont.name,
    fontcdn: state.inputFont.cdn,
  },
  colors: {
    ...omitEditorOnlyColorFields(state.formColors),
    inactived: state.formColors.inactiveColor,
    gradient: state.formColors.primaryMesh,
    lightness: state.lightness,
    useSystemTheme: state.useSystemTheme,
  },
  styles: state.formStyles,
});

export const useThemeEditor = () => {
  const [state, setState] = useState<ThemeEditorState>(defaultThemeEditorState);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<ThemeFeedback>(null);
  const { generateColorsByView } = useTheme(state.formFont);

  const showFeedback = useCallback((next: ThemeFeedback) => {
    setFeedback(next);
    window.setTimeout(() => setFeedback(null), 3200);
  }, []);

  useEffect(() => {
    const nextMesh = generateGradient(
      [state.formColors.primaryGradient, state.formColors.secondaryGradient],
      state.formColors.gradientDeg,
      state.formColors.primaryGradientPoint,
      state.formColors.secundaryGradientPoint
    );
    setState((prev) => {
      const withMesh = { ...prev.formColors, primaryMesh: nextMesh };
      const formColors = prev.specialViewLinked
        ? copyPrimaryToSpecialView(withMesh)
        : withMesh;
      const unchanged =
        prev.formColors.primaryMesh === formColors.primaryMesh &&
        prev.formColors.specialViewBackground === formColors.specialViewBackground &&
        prev.formColors.specialViewPrimaryGradient ===
          formColors.specialViewPrimaryGradient &&
        prev.formColors.specialViewSecondaryGradient ===
          formColors.specialViewSecondaryGradient &&
        prev.formColors.specialViewGradientDeg ===
          formColors.specialViewGradientDeg &&
        prev.formColors.specialViewPrimaryGradientPoint ===
          formColors.specialViewPrimaryGradientPoint &&
        prev.formColors.specialViewSecundaryGradientPoint ===
          formColors.specialViewSecundaryGradientPoint;
      return unchanged ? prev : { ...prev, formColors };
    });
    // primaryMesh is omitted on purpose so a manual edit is not overwritten
    // until a gradient source field changes.
  }, [
    state.formColors.primaryGradient,
    state.formColors.secondaryGradient,
    state.formColors.gradientDeg,
    state.formColors.primaryGradientPoint,
    state.formColors.secundaryGradientPoint,
  ]);

  useEffect(() => {
    const nextMesh = generateGradient(
      [
        state.formColors.specialViewPrimaryGradient ?? "#4BA84B",
        state.formColors.specialViewSecondaryGradient ?? "#008433",
      ],
      state.formColors.specialViewGradientDeg ?? "116.74deg",
      state.formColors.specialViewPrimaryGradientPoint ?? "23.26%",
      state.formColors.specialViewSecundaryGradientPoint ?? "111.43%"
    );
    setState((prev) =>
      prev.formColors.specialViewBackground === nextMesh
        ? prev
        : {
            ...prev,
            formColors: { ...prev.formColors, specialViewBackground: nextMesh },
          }
    );
  }, [
    state.formColors.specialViewPrimaryGradient,
    state.formColors.specialViewSecondaryGradient,
    state.formColors.specialViewGradientDeg,
    state.formColors.specialViewPrimaryGradientPoint,
    state.formColors.specialViewSecundaryGradientPoint,
  ]);

  useEffect(() => {
    const nextMesh = generateGradient(
      [
        state.formColors.errorViewPrimaryGradient ?? "#1a1a1a",
        state.formColors.errorViewSecondaryGradient ?? "#2d2d2d",
      ],
      state.formColors.errorViewGradientDeg ?? "135deg",
      state.formColors.errorViewPrimaryGradientPoint ?? "0%",
      state.formColors.errorViewSecundaryGradientPoint ?? "100%"
    );
    setState((prev) =>
      prev.formColors.errorViewBackground === nextMesh
        ? prev
        : {
            ...prev,
            formColors: { ...prev.formColors, errorViewBackground: nextMesh },
          }
    );
  }, [
    state.formColors.errorViewPrimaryGradient,
    state.formColors.errorViewSecondaryGradient,
    state.formColors.errorViewGradientDeg,
    state.formColors.errorViewPrimaryGradientPoint,
    state.formColors.errorViewSecundaryGradientPoint,
  ]);

  useEffect(() => {
    injectStyleVariables(state.formStyles);
  }, [state.formStyles]);

  useEffect(() => {
    injectColorVariables({
      ...state.formColors,
      inactived: state.formColors.inactiveColor,
      lightness: state.lightness,
      useSystemTheme: state.useSystemTheme,
    });
  }, [state.formColors, state.lightness, state.useSystemTheme]);

  const exportedTheme = useMemo(() => buildExportedTheme(state), [state]);

  const generatedViews = generateColorsByView(exportedTheme.colors, {
    ...state.formStyles,
    buttonShowIcon: state.formStyles.buttonShowIcon,
    buttonSize: state.formStyles.buttonSize,
    iconContainerBackground: state.formStyles.iconContainerBackground,
  });

  const applyTheme = useCallback(
    (imported: ImportedTheme) => {
      setState((prev) => applyImportedTheme(prev, imported));
      showFeedback({
        type: "success",
        message: `Tema aplicado (${getAppliedSections(imported)})`,
      });
    },
    [showFeedback]
  );

  const importThemeFromUnknown = useCallback(
    (value: unknown) => {
      const result = validateImportedTheme(value);
      if (result.ok === false) {
        showFeedback({ type: "error", message: result.error });
        return result;
      }
      applyTheme(result.theme);
      return result;
    },
    [applyTheme, showFeedback]
  );

  const importThemeFromJson = useCallback(
    (raw: string) => {
      const result = parseThemeJson(raw);
      if (result.ok === false) {
        showFeedback({ type: "error", message: result.error });
        return result;
      }
      applyTheme(result.theme);
      return result;
    },
    [applyTheme, showFeedback]
  );

  const onChangeFontMeta = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;
      setState((prev) => ({
        ...prev,
        inputFont: { ...prev.inputFont, [name]: value },
      }));
    },
    []
  );

  const onSelectRegisteredFont = useCallback((fontName: string) => {
    const font = registeredFonts.find((item) => item.name === fontName);
    if (!font) return;
    setState((prev) => ({
      ...prev,
      inputFont: { name: font.name, cdn: font.cdn },
    }));
  }, []);

  const onChangeFontField = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;
      const [fontKey, field] = name.split("-");
      setState((prev) => ({
        ...prev,
        formFont: {
          ...prev.formFont,
          [fontKey]: {
            ...prev.formFont[fontKey as keyof IFormFont],
            [field]: value,
          } as FontInput,
        },
      }));
    },
    []
  );

  const onChangeColorField = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;
      setState((prev) => {
        if (isSpecialViewField(name)) {
          return {
            ...prev,
            specialViewLinked: false,
            formColors: { ...prev.formColors, [name]: value },
          };
        }

        const formColors = { ...prev.formColors, [name]: value };
        return {
          ...prev,
          formColors:
            prev.specialViewLinked && isPrimaryGradientField(name)
              ? copyPrimaryToSpecialView(formColors)
              : formColors,
        };
      });
    },
    []
  );

  const onChangeStyleField = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.currentTarget;
      setState((prev) => ({
        ...prev,
        formStyles: { ...prev.formStyles, [name]: value },
      }));
    },
    []
  );

  const onChangeButtonSize = useCallback((value: ButtonSizeOption) => {
    const buttonPadding =
      value === "small" ? "0.75rem" : value === "medium" ? "1rem" : "1.5rem";
    setState((prev) => ({
      ...prev,
      formStyles: {
        ...prev.formStyles,
        buttonSize: value,
        buttonPadding,
      },
    }));
  }, []);

  const onToggleButtonShowIcon = useCallback(() => {
    setState((prev) => ({
      ...prev,
      formStyles: {
        ...prev.formStyles,
        buttonShowIcon: !prev.formStyles.buttonShowIcon,
      },
    }));
  }, []);

  const onChangeLightness = useCallback((value: "light" | "dark") => {
    setState((prev) => ({ ...prev, lightness: value }));
  }, []);

  const onToggleSystemTheme = useCallback(() => {
    setState((prev) => ({ ...prev, useSystemTheme: !prev.useSystemTheme }));
  }, []);

  const onCopyTheme = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(exportedTheme, null, 2));
      setCopied(true);
      showFeedback({ type: "success", message: "Tema copiado al portapapeles" });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      showFeedback({ type: "error", message: "No se pudo copiar el tema" });
    }
  }, [exportedTheme, showFeedback]);

  const onDownloadTheme = useCallback(() => {
    downloadJson(exportedTheme, "lola-theme.json");
    showFeedback({ type: "success", message: "Tema descargado" });
  }, [exportedTheme, showFeedback]);

  const onUploadThemeFile = useCallback(
    async (file: File) => {
      const isJson =
        file.type === "application/json" || file.name.toLowerCase().endsWith(".json");
      if (!isJson) {
        showFeedback({
          type: "error",
          message: "El archivo debe ser un JSON de tema",
        });
        return;
      }
      const raw = await file.text();
      importThemeFromJson(raw);
    },
    [importThemeFromJson, showFeedback]
  );

  return {
    state,
    copied,
    feedback,
    exportedTheme,
    generatedViews,
    applyTheme,
    importThemeFromUnknown,
    importThemeFromJson,
    onChangeFontMeta,
    onSelectRegisteredFont,
    onChangeFontField,
    onChangeColorField,
    onChangeStyleField,
    onChangeButtonSize,
    onToggleButtonShowIcon,
    onChangeLightness,
    onToggleSystemTheme,
    onCopyTheme,
    onDownloadTheme,
    onUploadThemeFile,
  };
};

export type UseThemeEditorReturn = ReturnType<typeof useThemeEditor>;
