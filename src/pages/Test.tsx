import { useState } from "react";
import {
  Button,
  Layout,
  Loader,
  MotionWrapper,
  Navbar,
  Title,
} from "../components";

const Test = () => {
  const [count, setCount] = useState(0);

  return (
    <MotionWrapper>
      <Layout>
        <Layout.Header>
          <Navbar title="Testing" />
        </Layout.Header>
        <Layout.Content>
          <section>
            <Title title="Title testing" />
            <Loader size={100} />
          </section>
        </Layout.Content>
        <Layout.Footer>
          <Button
            size="large"
            onClick={() => setCount((prev: number) => prev + 1)}
          >
            Testing {count}
          </Button>
        </Layout.Footer>
      </Layout>
    </MotionWrapper>
  );
};

export default Test;
