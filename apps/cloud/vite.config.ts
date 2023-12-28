import { createViteConfig } from "@config/vite";
import { defineConfig, UserConfig } from "vite";

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  return await createViteConfig(command, mode, process.cwd());
});

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
