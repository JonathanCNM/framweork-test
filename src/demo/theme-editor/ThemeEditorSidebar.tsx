import { useRef } from "react";
import { ThemeEditorForm } from "./ThemeEditorForm";
import type { UseThemeEditorReturn } from "./useThemeEditor";

interface ThemeEditorSidebarProps {
  editor: UseThemeEditorReturn;
}

export const ThemeEditorSidebar = ({ editor }: ThemeEditorSidebarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { copied, feedback } = editor;

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
        <ThemeEditorForm editor={editor} />
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
