import type { UserConfig } from 'vite';
import type { ViteSSGOptions } from 'vite-ssg';

import path from 'node:path';
import ViteVueRouter from 'unplugin-vue-router/vite';
import ViteVue from '@vitejs/plugin-vue';
import ViteVueDevTools from 'vite-plugin-vue-devtools';
import ViteVueIntlify from '@intlify/unplugin-vue-i18n/vite';
import ViteVueMacros from 'unplugin-vue-macros/dist/vite';
import ViteVueLayouts from 'vite-plugin-vue-layouts';
import postcssPresetEnv from 'postcss-preset-env';
import postcssCustomMediaPlugin from 'postcss-custom-media';

import ViteJson5 from './lib/plugins/vite-json5';
import { browserslistToTarget } from './lib/utils/browserslist';

const root = path.resolve(__dirname, 'src');

export default {
  envPrefix: 'GC_',
  build: {
    outDir: path.resolve(__dirname, '_site'),
    target: browserslistToTarget(__dirname),
    cssMinify: 'lightningcss'
  },
  css: {
    postcss: {
      plugins: [
        postcssCustomMediaPlugin(),
        postcssPresetEnv({
          autoprefixer: {
            grid: true
          },
          stage: 0
        })
      ]
    }
  },
  plugins: [
    ViteVueRouter({
      extensions: ['.vue'],
      routesFolder: 'src/pages',
      logs: process.env['NODE_ENV'] === 'dev'
    }),
    ViteVueDevTools({
      launchEditor: 'hx'
    }),
    ViteVueLayouts({
      defaultLayout: 'default',
      layoutsDirs: 'src/layouts',
      pagesDirs: 'src/pages'
    }),
    ViteVueMacros({
      plugins: {
        vue: ViteVue({
          include: [/\.vue$/]
        })
      }
    }),
    ViteVueIntlify({
      compositionOnly: true,
      runtimeOnly: true,
      defaultSFCLang: 'json5',
      include: `${path.resolve(root, 'locales')}/*.json5`,
      strictMessage: true
    }),
    ViteJson5()
  ],
  publicDir: path.resolve(__dirname, 'public'),
  resolve: {
    alias: {
      '~lib': path.resolve(__dirname, 'lib'),
      '~': root
    }
  },
  server: {
    hmr: process.env['NODE_ENV'] !== 'test'
  },
  ssgOptions: {
    mock: true,
    dirStyle: 'nested',
    entry: path.resolve(root, 'index.ts'),
    formatting: 'minify',
    rootContainerId: 'gc',
    script: 'defer'
  },
  test: {
    coverage: {
      all: true,
      exclude: ['**/*.d.ts', 'src/index.ts', '**/*.spec.ts'],
      include: ['src/**/*.{ts,vue}', 'lib/**/*.ts'],
      provider: 'v8'
    },
    server: {
      deps: {
        inline: ['@vue', '@vueuse']
      }
    },
    environment: 'jsdom',
    typecheck: {
      checker: 'vue-tsc'
    },
    include: ['**/*.spec.ts'],
    setupFiles: ['vitest.setup.ts']
  },
  ssr: {
    noExternal: [/vue-i18n/]
  }
} satisfies UserConfig & { ssgOptions: ViteSSGOptions };
