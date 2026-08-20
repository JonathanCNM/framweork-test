import { registeredFonts } from "../../utils/constants";
import {
  FONT_INPUT_KEYS,
  FONT_STYLE_KEYS,
  errorViewGradientList,
  foregroundColorList,
  formColorList,
  formFontInitialState,
  formStylesList,
  inputIconColorList,
  screenIconColorList,
  specialViewGradientList,
  titleColorList,
} from "./constants";
import type {
  ButtonSizeOption,
  IColorForm,
  IStylesForm,
  ThemeFieldConfig,
} from "./types";
import type { UseThemeEditorReturn } from "./useThemeEditor";

const isHexColor = (value: string) => /^#[0-9A-Fa-f]{6}$/i.test(value);

const ColorFields = ({
  fields,
  values,
  onChange,
}: {
  fields: ThemeFieldConfig[];
  values: IColorForm;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="theme-sidebar__fields">
    {fields.map(({ key, type, label }) => {
      const value = String(values[key as keyof IColorForm] ?? "");
      return (
        <label
          key={key}
          className={
            key.endsWith("Background") || key === "primaryMesh" || key === "titleColor"
              ? "theme-sidebar__field theme-sidebar__field--wide"
              : "theme-sidebar__field"
          }
        >
          <span>{label ?? key}</span>
          <span className="theme-sidebar__control">
            {type === "color" && isHexColor(value) ? (
              <input
                name={key}
                type="color"
                value={value}
                onChange={onChange}
                aria-label={`${key} color`}
              />
            ) : null}
            <input name={key} type="text" value={value} onChange={onChange} />
          </span>
        </label>
      );
    })}
  </div>
);

interface ThemeEditorFormProps {
  editor: UseThemeEditorReturn;
}

export const ThemeEditorForm = ({ editor }: ThemeEditorFormProps) => {
  const { state } = editor;

  return (
    <div className="theme-editor-form">
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
        <ColorFields
          fields={formColorList}
          values={state.formColors}
          onChange={editor.onChangeColorField}
        />
        <div className="theme-sidebar__fields">
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

      <details className="theme-sidebar__section" open>
        <summary>Foreground</summary>
        <p className="theme-sidebar__hint theme-sidebar__section-hint">
          Antes secondaryColor. Light y dark usan los defaults de --foreground
          si no los cambias.
        </p>
        <ColorFields
          fields={foregroundColorList}
          values={state.formColors}
          onChange={editor.onChangeColorField}
        />
      </details>

      <details className="theme-sidebar__section" open>
        <summary>Iconos</summary>
        <p className="theme-sidebar__hint theme-sidebar__section-hint">
          Screen: ElevatedCircle. Siguen el gradiente principal hasta que los
          edites. Input: iconos de campos. Siguen secondaryColor hasta que los
          edites.
        </p>
        <div className="theme-sidebar__font-groups">
          <fieldset className="theme-sidebar__font-group">
            <legend>Screen</legend>
            <ColorFields
              fields={screenIconColorList}
              values={state.formColors}
              onChange={editor.onChangeColorField}
            />
          </fieldset>
          <fieldset className="theme-sidebar__font-group">
            <legend>Input</legend>
            <ColorFields
              fields={inputIconColorList}
              values={state.formColors}
              onChange={editor.onChangeColorField}
            />
          </fieldset>
        </div>
      </details>

      <details className="theme-sidebar__section" open>
        <summary>Títulos</summary>
        <p className="theme-sidebar__hint theme-sidebar__section-hint">
          Igual que special view: toma primaryMesh hasta que lo edites
          directamente.
        </p>
        <div
          className="theme-sidebar__gradient-preview"
          style={{ background: state.formColors.titleColor }}
        />
        <ColorFields
          fields={titleColorList}
          values={state.formColors}
          onChange={editor.onChangeColorField}
        />
      </details>

      <details className="theme-sidebar__section" open>
        <summary>Special view</summary>
        <p className="theme-sidebar__hint theme-sidebar__section-hint">
          Sigue al primaryMesh hasta que lo edites. Después queda independiente
          y no afecta el gradiente principal.
        </p>
        <div
          className="theme-sidebar__gradient-preview"
          style={{ background: state.formColors.specialViewBackground }}
        />
        <ColorFields
          fields={specialViewGradientList}
          values={state.formColors}
          onChange={editor.onChangeColorField}
        />
      </details>

      <details className="theme-sidebar__section" open>
        <summary>Error view</summary>
        <p className="theme-sidebar__hint theme-sidebar__section-hint">
          Gradiente actual de error. Independiente del resto de colores.
        </p>
        <div
          className="theme-sidebar__gradient-preview"
          style={{ background: state.formColors.errorViewBackground }}
        />
        <ColorFields
          fields={errorViewGradientList}
          values={state.formColors}
          onChange={editor.onChangeColorField}
        />
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
                    {description ? <small>{description}</small> : null}
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
                  <label
                    key={`${fontKey}-${field}`}
                    className="theme-sidebar__field"
                  >
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
  );
};
