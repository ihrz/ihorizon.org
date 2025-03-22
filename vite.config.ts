import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: `assets/[name]-[hash][extname]`,
      },
    },
  },
  publicDir: 'public',
  base: '/', // Assure-toi que le nom correspond à ton dépôt
  preview: {
    port: 8080,
    strictPort: true,
  },
}));
