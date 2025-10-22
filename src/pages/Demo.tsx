import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Layout,
  MotionWrapper,
  Navbar,
  Page,
  Title,
} from "../components";
import { useTheme } from "../hooks/useTheme";

export const Demo = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [theme, setTheme] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useTheme(theme || {});

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:6006") return;
      if (event.data?.type === "storybook-config") {
        setTheme(event.data.payload);
        setIsLoading(false);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  if (isLoading) return <CircularProgress />;

  return (
    <Page font={{ name: theme?.fontfamily ?? "", cdn: theme?.fontcdn ?? "" }}>
      <MotionWrapper>
        <section>
          <section>
            <Layout>
              <Layout.Header>
                <Navbar title="Demo Page" />
              </Layout.Header>
              <Layout.Content>
                <section>
                  <Title title="Hellow" />
                </section>
              </Layout.Content>
              <Layout.Footer>
                <Button>Button Sampler</Button>
              </Layout.Footer>
            </Layout>
          </section>
        </section>
      </MotionWrapper>
    </Page>
  );
};
