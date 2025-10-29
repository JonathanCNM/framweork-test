import { GradientText, Layout, PageTitle } from "../../components";
import { ElevatedCircle } from "../../components/ElevatedCircle";
import { LolaLogo, RightIcon } from "../../icons";
import type { IViewConfig } from "../../hooks/useTheme";

export const HomePage = ({ theme }: { theme: IViewConfig }) => {
  const {
    background,
    iconColors,
    backgroundIcon,
    title,
    subtitile,
    footerColor,
  } = theme.primaryMeshGradientView;
  return (
    <Layout background={background}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle background={backgroundIcon}>
            <RightIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            textAnimated
            highlight={
              <>
                Send money <br /> like "Texting"
              </>
            }
            highlightColor={title}
            secudnary={"That's easy"}
            secudnaryColor={subtitile}
          />
        </div>
      </Layout.Content>
      <Layout.Footer>
        <section className="homepage-footer">
          <GradientText className="footer-text" textColor={footerColor}>
            Powered by
          </GradientText>
          <LolaLogo size={23} colors={[backgroundIcon, backgroundIcon]} />
          <GradientText className="mx-auto footer-text" textColor={footerColor}>
            Registered Agent
          </GradientText>
        </section>
      </Layout.Footer>
    </Layout>
  );
};
