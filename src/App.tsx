import "./styles/index.css";
import "./index.css";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import { CircularProgress, MotionWrapper, Page } from "./components";
import {
  getDemoFlowComponent,
  isDemoFlowSlug,
  resolveDemoFlow,
} from "./demo/flows";
import {
  STORYBOOK_ORIGINS,
  ThemeEditorSidebar,
  useThemeEditor,
} from "./demo/theme-editor";

const App = () => {
  const { flow } = useParams<{ flow?: string }>();
  const editor = useThemeEditor();
  const { generatedViews, state, importThemeFromUnknown } = editor;

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!(STORYBOOK_ORIGINS as readonly string[]).includes(event.origin)) {
        return;
      }
      if (event.data?.type === "storybook-config") {
        importThemeFromUnknown(event.data.payload);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [importThemeFromUnknown]);

  if (flow && !isDemoFlowSlug(flow)) {
    return <Navigate to="/" replace />;
  }

  if (!generatedViews) return <CircularProgress />;

  const flowSlug = resolveDemoFlow(flow);
  const Flow = getDemoFlowComponent(flowSlug);

  return (
    <div className="app-playground">
      <div className="app-playground__preview">
        <Page font={state.inputFont}>
          <MotionWrapper className="app-playground__motion">
            <Flow theme={generatedViews} slug={flowSlug} />
          </MotionWrapper>
        </Page>
      </div>
      <ThemeEditorSidebar editor={editor} />
    </div>
  );
};

export default App;
