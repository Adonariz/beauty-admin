import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@hooks": path.resolve(__dirname, "./src/hooks/"),
      "@services": path.resolve(__dirname, "./src/services/"),
      "@style": path.resolve(__dirname, "./src/style/"),
    },
  },
});
