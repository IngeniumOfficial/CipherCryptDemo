import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  ssr: false,
  server: {
    prerender: {
      crawlLinks: true,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
  },
});
