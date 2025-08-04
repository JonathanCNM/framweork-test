import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true, include: ["./src"] })],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "lola-framework-ui",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `index.${format === "es" ? "es.js" : "js"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "body-scroll-lock",
        "@types/body-scroll-lock",
        "framer-motion",
        "@vgs/collect-js",
        "@vgs/collect-js-react",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "body-scroll-lock": "body-scroll-lock",
          "@types/body-scroll-lock": "@types/body-scroll-lock",
          "framer-motion": "framer-motion",
          "@vgs/collect-js": "@vgs/collect-js",
          "@vgs/collect-js-react": "@vgs/collect-js-react",
        },
      },
    },
    cssCodeSplit: false,
  },
  server: {
    host: "0.0.0.0",
    port: 5176,
  },
});
