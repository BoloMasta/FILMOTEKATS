import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssNesting from "postcss-nesting";

export default ({ mode }: { mode: string }): UserConfig => {
  const generateScopedName = mode === "production" ? "[hash:base64]" : "[name]__[local]";

  return defineConfig({
    plugins: [react()],
    base: "/FILMOTEKATS/",
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
        generateScopedName: generateScopedName,
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/index.scss";`,
        },
      },
      postcss: {
        plugins: [postcssNesting()],
      },
    },
  });
};
