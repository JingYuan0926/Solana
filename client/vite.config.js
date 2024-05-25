import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // Configure Vite to treat react-native as external
  resolve: {
    alias: {
      // Redirect react-native to an empty module to effectively ignore it
      'react-native': 'react-native-web',
    }
  },
  // Optimizing dependencies to exclude react-native
  optimizeDeps: {
    exclude: ['react-native']
  },
  // Preventing rollup from trying to bundle react-native
  build: {
    rollupOptions: {
      external: ['react-native']
    }
  }
});
