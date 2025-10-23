import { GradientText, Layout, PageTitle } from "../../components";
import { LolaLogo, RightIcon } from "../../icons";
import { getSplittedColors } from "../../utils/utils";
import { ElevatedCircle } from "../components/ElevatedCircle";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HomePage = ({ theme }: { theme: Record<string, any> | null }) => {
  const iconColors = getSplittedColors(theme?.primaryMesh ?? "#000");
  return (
    <Layout background={theme?.primaryMesh ?? ""}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle>
            <RightIcon colors={iconColors} />
          </ElevatedCircle>

          <PageTitle
            highlight='Send money like "Texting"'
            highlightColor={theme?.partnerHighlights}
            secudnary={"That's easy"}
            secudnaryColor={theme?.whiteColor}
          />
        </div>
      </Layout.Content>
      <Layout.Footer>
        <section className="homepage-footer">
          <GradientText className="footer-text" textColor={theme?.whiteColor}>
            Powered by
          </GradientText>
          <LolaLogo size={23} colors={["#fff", "#fff"]} />
          <GradientText
            className="mx-auto footer-text"
            textColor={theme?.whiteColor}
          >
            Registered Agent
          </GradientText>
        </section>
      </Layout.Footer>
    </Layout>
  );
};
