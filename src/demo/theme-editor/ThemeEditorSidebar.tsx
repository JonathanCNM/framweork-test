import { useRef } from "react";
import { registeredFonts } from "../../utils/constants";
import {
  FONT_INPUT_KEYS,
  FONT_STYLE_KEYS,
  formColorList,
  formFontInitialState,
  formStylesList,
} from "./constants";
import type { ButtonSizeOption, IColorForm, IStylesForm } from "./types";
import type { UseThemeEditorReturn } from "./useThemeEditor";

interface ThemeEditorSidebarProps {
  editor: UseThemeEditorReturn;
}

const isHexColor = (value: string) => /^#[0-9A-Fa-f]{6}$/i.test(value);

export const ThemeEditorSidebar = ({ editor }: ThemeEditorSidebarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state, copied, feedback } = editor;

  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      void editor.onUploadThemeFile(file);
    }
    event.currentTarget.value = "";
  };

  return (
    <aside className="theme-sidebar" aria-label="Editor de tema">
      <header className="theme-sidebar__header">
        <h2 className="theme-sidebar__title">Editor de tema</h2>
        <p className="theme-sidebar__subtitle">
          Los cambios se reflejan en tiempo real en el flujo
        </p>
      </header>

      <div className="theme-sidebar__body">
        <details className="theme-sidebar__section" open>
          <summary>Fuente</summary>
          <div className="theme-sidebar__fields">
            <label className="theme-sidebar__field">
              <span>Familia registrada</span>
              <select
                value={
                  registeredFonts.some((font) => font.name === state.inputFont.name)
                    ? state.inputFont.name
                    : ""
                }
                onChange={(event) =>
                  editor.onSelectRegisteredFont(event.currentTarget.value)
                }
              >
                <option value="" disabled>
                  Selecciona una fuente
                </option>
                {registeredFonts.map((font) => (
                  <option key={font.name} value={font.name}>
                    {font.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="theme-sidebar__field">
              <span>fontfamily</span>
              <input
                name="name"
                type="text"
                value={state.inputFont.name}
                onChange={editor.onChangeFontMeta}
              />
            </label>
            <label className="theme-sidebar__field theme-sidebar__field--wide">
              <span>fontcdn</span>
              <input
                name="cdn"
                type="text"
                value={state.inputFont.cdn}
                onChange={editor.onChangeFontMeta}
              />
            </label>
          </div>
        </details>

        <details className="theme-sidebar__section" open>
          <summary>Colores</summary>
          <div className="theme-sidebar__fields">
            {formColorList.map(({ key, type }) => {
              const value = String(state.formColors[key as keyof IColorForm] ?? "");
              return (
                <label key={key} className="theme-sidebar__field">
                  <span>{key}</span>
                  <span className="theme-sidebar__control">
                    {type === "color" && isHexColor(value) ? (
                      <input
                        name={key}
                        type="color"
                        value={value}
                        onChange={editor.onChangeColorField}
                        aria-label={`${key} color`}
                      />
                    ) : null}
                    <input
                      name={key}
                      type="text"
                      value={value}
                      onChange={editor.onChangeColorField}
                    />
                  </span>
                </label>
              );
            })}
            <label className="theme-sidebar__field">
              <span>lightness</span>
              <select
                value={state.lightness}
                onChange={(event) =>
                  editor.onChangeLightness(
                    event.currentTarget.value as "light" | "dark"
                  )
                }
              >
                <option value="light">light</option>
                <option value="dark">dark</option>
              </select>
            </label>
            <label className="theme-sidebar__checkbox">
              <input
                type="checkbox"
                checked={state.useSystemTheme}
                onChange={editor.onToggleSystemTheme}
              />
              <span>Usar tema del sistema</span>
            </label>
          </div>
        </details>

        <details className="theme-sidebar__section">
          <summary>Estilos</summary>
          <div className="theme-sidebar__fields">
            {formStylesList.map(({ key, type, options, label, description }) => {
              if (type === "select" && options) {
                return (
                  <label key={key} className="theme-sidebar__field">
                    <span>{label ?? key}</span>
                    <select
                      value={String(state.formStyles[key as keyof IStylesForm])}
                      onChange={(event) =>
                        editor.onChangeButtonSize(
                          event.currentTarget.value as ButtonSizeOption
                        )
                      }
                    >
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                );
              }

              if (type === "checkbox") {
                return (
                  <label key={key} className="theme-sidebar__checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(state.formStyles[key as keyof IStylesForm])}
                      onChange={editor.onToggleButtonShowIcon}
                    />
                    <span>
                      {label ?? key}
                      {description ? (
                        <small>{description}</small>
                      ) : null}
                    </span>
                  </label>
                );
              }

              const value = String(state.formStyles[key as keyof IStylesForm] ?? "");
              return (
                <label key={key} className="theme-sidebar__field">
                  <span>{label ?? key}</span>
                  <span className="theme-sidebar__control">
                    {type === "color" && isHexColor(value) ? (
                      <input
                        name={key}
                        type="color"
                        value={value}
                        onChange={editor.onChangeStyleField}
                        aria-label={`${key} color`}
                      />
                    ) : null}
                    <input
                      name={key}
                      type="text"
                      value={value}
                      onChange={editor.onChangeStyleField}
                    />
                  </span>
                  {description ? (
                    <small className="theme-sidebar__hint">{description}</small>
                  ) : null}
                </label>
              );
            })}
          </div>
        </details>

        <details className="theme-sidebar__section">
          <summary>Tipografías</summary>
          <div className="theme-sidebar__font-groups">
            {FONT_STYLE_KEYS.map((fontKey) => (
              <fieldset key={fontKey} className="theme-sidebar__font-group">
                <legend>{fontKey}</legend>
                <div className="theme-sidebar__fields">
                  {FONT_INPUT_KEYS.map((field) => (
                    <label key={`${fontKey}-${field}`} className="theme-sidebar__field">
                      <span>{field}</span>
                      <input
                        name={`${fontKey}-${field}`}
                        type="text"
                        value={
                          state.formFont[fontKey]?.[field] ??
                          formFontInitialState[fontKey][field]
                        }
                        onChange={editor.onChangeFontField}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </details>
      </div>

      <footer className="theme-sidebar__footer">
        {feedback ? (
          <p
            className={`theme-sidebar__feedback theme-sidebar__feedback--${feedback.type}`}
            role="status"
          >
            {feedback.message}
          </p>
        ) : null}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={onFileChange}
        />
        <div className="theme-sidebar__actions">
          <button type="button" onClick={onUploadClick}>
            Subir tema
          </button>
          <button type="button" onClick={editor.onDownloadTheme}>
            Descargar
          </button>
          <button type="button" onClick={() => void editor.onCopyTheme()}>
            {copied ? "Copiado" : "Copiar tema"}
          </button>
        </div>
      </footer>
    </aside>
  );
};
