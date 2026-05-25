import { defineConfig } from "vite";

// No @vitejs/plugin-react — this minimal repro just needs Vite to serve the
// app; esbuild's automatic JSX runtime handles the .tsx files.
export default defineConfig({
  esbuild: { jsx: "automatic" },
});
