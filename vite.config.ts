import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Build optimizations for faster load times
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    // Split vendor libraries into a separate chunk
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    // Enable gzip compression for assets
    brotliSize: false,
    chunkSizeWarningLimit: 500
  },
  // Enable gzip compression plugin (optional, requires installation)
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Uncomment the line below after installing vite-plugin-compression
    // import('vite-plugin-compression').then(m => m.default({ algorithm: 'gzip' }))
  ].filter(Boolean),
  server: {
    host: "::",
    port: 8080,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
