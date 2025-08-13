import { Layout } from "../../components";
import { useBlockScroll } from "../../hooks";

export const BlockScrollDemo = () => {
  useBlockScroll();

  return (
    <Layout>
      <Layout.Header>Layout Header</Layout.Header>
      <Layout.Content>Layout Content</Layout.Content>
      <Layout.Footer>Layout Footer</Layout.Footer>
    </Layout>
  );
};
