import { PluginOption } from 'vite'
import { ViteEnv } from '../utils'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import purgeIcons from 'vite-plugin-purge-icons'
import { configHtmlPlugin } from './html'
import { configCompressPlugin } from './compress'
import { configUnocssPlugin } from './unocss'
import { configHttpsPlugin } from './https'
import { createConfigPlugin } from './config'
import { configSvgIconsPlugin } from './svg-icons'
import { configVisualizerConfig } from './visualizer'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import MonoRepoAliasPlugin from './monorepo'
import { configImageminPlugin } from './imagesmin'

export async function configVitePlugins(
  root: string,
  viteEnv: ViteEnv,
  isBuild: boolean,
) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  console.log('isBuild', isBuild)

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // handle .vue files
    vue(),
    // have to
    vueJsx(),
  ]

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy())

  // vite-plugin-html
  vitePlugins.push(await configHtmlPlugin(root, viteEnv, isBuild))

  // unocss
  vitePlugins.push(configUnocssPlugin())

  vitePlugins.push(createConfigPlugin())

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-mock
  // VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons())

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig())

  // http2
  vitePlugins.push(configHttpsPlugin(viteEnv))
  // monacoEditorPlugin
  vitePlugins.push(monacoEditorPlugin({}))
  // MonorepoSupport
  vitePlugins.push(MonoRepoAliasPlugin())

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin())

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      ),
    )
  }

  return vitePlugins
}
