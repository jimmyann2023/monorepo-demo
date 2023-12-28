import jiti from "file:///C:/Users/Administrator/Desktop/Monorepo/repo/node_modules/.pnpm/jiti@1.21.0/node_modules/jiti/lib/index.js";

/** @type {import("C:/Users/Administrator/Desktop/Monorepo/repo/configs/vite/src/index")} */
const _module = jiti(null, {
  "esmResolve": true,
  "interopDefault": true,
  "alias": {
    "@config/vite": "C:/Users/Administrator/Desktop/Monorepo/repo/configs/vite"
  }
})("C:/Users/Administrator/Desktop/Monorepo/repo/configs/vite/src/index.ts");

export const createViteConfig = _module.createViteConfig;
export const GLOB_CONFIG_FILE_NAME = _module.GLOB_CONFIG_FILE_NAME;
export const OUTPUT_DIR = _module.OUTPUT_DIR;
export const APP_NAME = _module.APP_NAME;