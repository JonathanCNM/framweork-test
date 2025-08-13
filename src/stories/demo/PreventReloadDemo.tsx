import { Layout } from "../../components";
import { usePreventReload } from "../../hooks";

export const PreventReloadDemo = () => {
  usePreventReload();

  return (
    <Layout>
      <Layout.Header>Layout Header</Layout.Header>
      <Layout.Content>Layout Content</Layout.Content>
      <Layout.Footer>Layout Footer</Layout.Footer>
    </Layout>
  );
};
