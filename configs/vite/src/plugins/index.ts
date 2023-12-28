import { PluginOption } from "vite";
import { ViteEnv } from "../utils";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import { configHtmlPlugin } from "./html";
import { configMockPlugin } from "./mock";
import { configCompressPlugin } from "./compress";
import { configUnocssPlugin } from "./unocss";

export async function configVitePlugins(
  root: string,
  viteEnv: ViteEnv,
  isBuild: boolean
) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // handle .vue files
    vue(),
    // have to
    vueJsx(),
  ];
  console.log("isBuild", isBuild);
  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // vite-plugin-html
  vitePlugins.push(await configHtmlPlugin(root, viteEnv, isBuild));

  // unocss
  vitePlugins.push(configUnocssPlugin())

  // vitePlugins.push(createConfigPlugin())

  // vite-plugin-svg-icons
  // vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // vite-plugin-purge-icons
  // vitePlugins.push(purgeIcons());

  // rollup-plugin-visualizer
  // vitePlugins.push(configVisualizerConfig())

  // http2
  // vitePlugins.push(configHttpsPlugin(viteEnv))
  // monacoEditorPlugin
  // vitePlugins.push(monacoEditorPlugin({}))
  // MonorepoSupport
  // vitePlugins.push(MonoRepoAliasPlugin())

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    // VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      )
    );
  }

  return vitePlugins;
}
