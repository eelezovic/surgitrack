
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Load environment variables from .env
import { config } from "dotenv";
config();

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
  plugins: [react()],
});

