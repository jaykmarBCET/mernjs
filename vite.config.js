import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "views", // frontend code
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../dist", // ✅ keep dist at project root
    emptyOutDir: true,
  },
  
});
