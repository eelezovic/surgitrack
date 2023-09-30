import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  build: {
    // Set the correct path for the public directory
    outDir: 'dist',       // Your output directory
    assetsDir: 'public',  // The path to your public directory
  },
});
