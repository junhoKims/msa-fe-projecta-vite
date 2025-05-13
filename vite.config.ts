import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import { federation } from "@module-federation/vite";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "aProject",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        // remoteEntry.js가 assets 디렉토리에 생성되도록 설정
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
