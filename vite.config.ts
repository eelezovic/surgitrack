
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Load environment variables from .env
import { config } from "dotenv";
config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      [process.env.VITE_APP_API]: {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${process.env.VITE_APP_API}`), ""),
      },
    },
  },
  plugins: [react()],
});

/*import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
});*/