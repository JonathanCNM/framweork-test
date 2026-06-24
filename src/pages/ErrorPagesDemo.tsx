import { useState } from "react";
import { CircularProgress, MotionWrapper, Page } from "../components";
import { useTheme, type IViewConfig } from "../hooks/useTheme";
import { GenericErrorPage } from "../demo/pages/GenericErrorPage";
import { NotFoundErrorPage } from "../demo/pages/NotFoundErrorPage";
import { NetworkErrorPage } from "../demo/pages/NetworkErrorPage";
import { IproovError } from "../demo/pages/IproovError";
import "../styles/index.css";
import "../index.css";

// Default theme for standalone demo
const defaultTheme = {
  fontfamily: "Inter",
  fontcdn: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  lightness: "light",
  primaryColor: "#FF6B35",
  secondaryColor: "#004E89",
  primaryGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  specialGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
};

type ErrorPageType = "generic" | "404" | "network" | "iproov";

export const ErrorPagesDemo = () => {
  const [currentPage, setCurrentPage] = useState<ErrorPageType>("generic");
  const { generateColorsByView } = useTheme(defaultTheme);
  const theme: IViewConfig = generateColorsByView(defaultTheme);

  if (!theme) return <CircularProgress />;

  const renderErrorPage = () => {
    switch (currentPage) {
      case "generic":
        return (
          <GenericErrorPage
            theme={theme}
            title="Something went"
            subtitle="wrong"
            message="We encountered an unexpected error. Please try again or contact support if the problem persists."
            buttonText="Try Again"
            onButtonClick={() => console.log("Retry clicked")}
          />
        );
      case "404":
        return (
          <NotFoundErrorPage
            theme={theme}
            onGoHome={() => console.log("Go home clicked")}
          />
        );
      case "network":
        return (
          <NetworkErrorPage
            theme={theme}
            onRetry={() => console.log("Retry connection clicked")}
          />
        );
      case "iproov":
        return <IproovError theme={theme} />;
      default:
        return null;
    }
  };

  return (
    <Page
      font={{
        name: defaultTheme.fontfamily,
        cdn: defaultTheme.fontcdn,
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          maxWidth: "300px",
        }}
      >
        <button
          onClick={() => setCurrentPage("generic")}
          style={{
            padding: "8px 16px",
            background: currentPage === "generic" ? "#667eea" : "#fff",
            color: currentPage === "generic" ? "#fff" : "#333",
            border: "1px solid #667eea",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Generic Error
        </button>
        <button
          onClick={() => setCurrentPage("404")}
          style={{
            padding: "8px 16px",
            background: currentPage === "404" ? "#667eea" : "#fff",
            color: currentPage === "404" ? "#fff" : "#333",
            border: "1px solid #667eea",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          404 Error
        </button>
        <button
          onClick={() => setCurrentPage("network")}
          style={{
            padding: "8px 16px",
            background: currentPage === "network" ? "#667eea" : "#fff",
            color: currentPage === "network" ? "#fff" : "#333",
            border: "1px solid #667eea",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Network Error
        </button>
        <button
          onClick={() => setCurrentPage("iproov")}
          style={{
            padding: "8px 16px",
            background: currentPage === "iproov" ? "#667eea" : "#fff",
            color: currentPage === "iproov" ? "#fff" : "#333",
            border: "1px solid #667eea",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Verification Error
        </button>
      </div>

      <MotionWrapper>{renderErrorPage()}</MotionWrapper>
    </Page>
  );
};
