import { type ReactNode } from "react";
import { Button, MotionWrapper } from "./components";
import "./styles/index.css";
import { GradientText } from "./components/GradientText";
import { useKeyboardVisible } from "./hooks";
import { useBlockScroll } from "./hooks/useBlockScroll";

const Code = ({ title, children }: { title: string; children: ReactNode }) => (
  <section>
    <p>{title}</p>
    <code
      style={{
        background: "#f5f5f5",
        padding: "0.5rem",
        borderRadius: "4px",
        display: "block",
        marginBottom: "1rem",
      }}
    >
      {children}
    </code>
  </section>
);

const App = () => {
  useKeyboardVisible();
  useBlockScroll();
  return (
    <MotionWrapper>
      <section style={{ width: "80%", margin: "auto" }}>
        <GradientText
          as="h1"
          colors={["red", "blue"]}
          style={{ fontSize: "2rem" }}
        >
          Lola Framework UI - Style Framework
        </GradientText>
        <p style={{ marginBottom: "2rem" }}>
          A React TypeScript component library built with Vite.
        </p>
        <div>
          <GradientText as="h2">Getting Started</GradientText>
          <Code title="Install the package:">
            npm install lola-framework-ui
          </Code>

          <Code title="Import styles:">
            <span className="comment">// in main.tsx or app.tsx file</span>
            <br />
            "lola-framework-ui-test/src/styles";
          </Code>

          <Code title="Import components and usage:">
            import {"{ Button }"} from 'lola-framework-ui';
            <br />
            <br />
            {"<Button>Default Button</Button>"}
          </Code>
          <p>Result:</p>
          <Button loading>Default Button</Button>
        </div>
      </section>
    </MotionWrapper>
  );
};

export default App;
