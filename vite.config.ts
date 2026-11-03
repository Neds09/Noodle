import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    // leidžia rašyti import ... from "@/components/..."
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
