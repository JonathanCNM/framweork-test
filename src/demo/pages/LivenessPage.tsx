import { AuraLayout, Layout, Title } from "../../components";
import type { IViewConfig } from "../../hooks/useTheme";
import livenessPreview from "../assets/liveness-preview.png";

export const LivenessPage = ({ theme }: { theme: IViewConfig }) => {
  const { title, background } = theme.whiteView;

  return (
    <AuraLayout colorConfig={theme.whiteView} className="liveness-page-layout">
      <Layout.Content>
        <div className="liveness">
          <header className="liveness-header">
            <div className="liveness-recording" aria-live="polite">
              <span className="liveness-recording__dot" />
              <span className="liveness-recording__label">Recording</span>
            </div>
            <Title title="Hold still" color={title} align="center" />
          </header>

          <div className="liveness-stage">
            <div
              className="liveness-oval"
              style={{ backgroundColor: background }}
            >
              <img
                src={livenessPreview}
                alt="Liveness camera preview"
                className="liveness-oval__feed"
              />
            </div>
          </div>
        </div>
      </Layout.Content>
    </AuraLayout>
  );
};
