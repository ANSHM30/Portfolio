import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: "https://ansh-dev-portfolio.netlify.app",
      dynamicRoutes: [
        "/", 
        "/#about",
        "/#education",
        "/#experience",
        "/#skills",
        "/#projects",
        "/#contact",
      ],
      changefreq: "monthly",
      priority: 0.8,
    }),
  ],
});
