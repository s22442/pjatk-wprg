import VueI18n from '@intlify/vite-plugin-vue-i18n';
import Eslint from '@nabla/vite-plugin-eslint';
import Vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import Pages, { type ImportModeResolver } from 'vite-plugin-pages';
import { VitePWA } from 'vite-plugin-pwa';
import symfonyPlugin from 'vite-plugin-symfony';
import Layouts from 'vite-plugin-vue-layouts';
import generateSitemap from 'vite-ssg-sitemap';

import * as globalHelpers from './vue/helpers/_global';

import type { ComponentResolver } from 'unplugin-vue-components/types';

const GlobalHelpersImport = (options: { importPath: string }) => ({
  [options.importPath]: Object.keys(globalHelpers),
});

const BaseComponentsResolver = (options: {
  importDir: string;
  prefix?: string;
}): ComponentResolver => {
  options.importDir = options.importDir.replace(/\/$/, '');

  const pascalCasePrefix = (options.prefix || '')
    .replace(/\w+/g, (match) => match[0].toUpperCase() + match.slice(1))
    .replace(/-|\s/g, '');

  return (name: string) =>
    name.startsWith(pascalCasePrefix)
      ? `${options.importDir}/${name.slice(pascalCasePrefix.length)}.vue`
      : null;
};

const PagesImportModeResolver =
  (): ImportModeResolver =>
  (filepath, { dirs }) => {
    // top level index.vue: `sync`, others: `async`
    for (const { baseRoute, dir } of dirs) {
      if (baseRoute === '' && filepath.startsWith(`/${dir}/index`))
        return 'sync';
    }
    return 'async';
  };

const cwd = process.cwd();

export default defineConfig(({ mode }) => ({
  root: '.',

  base: '/build/',

  build: {
    assetsDir: '',
    emptyOutDir: true,
    manifest: true,
    outDir: './public/build',
    rollupOptions: { input: { app: './vue/main.ts' } },
  },

  publicDir: false,

  resolve: {
    alias: {
      '~/': `${cwd}/vue/`,
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },

  plugins: [
    symfonyPlugin(),

    Vue({ reactivityTransform: true }),

    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        GlobalHelpersImport({ importPath: '~/helpers/_global' }),
      ],
      dts: 'vue/__vite_auto-imports.d.ts',
    }),

    Components({
      dirs: [],
      resolvers: [
        BaseComponentsResolver({
          importDir: '~/components/_base',
          prefix: 'base',
        }),
      ],
      dts: 'vue/__vite_components.d.ts',
    }),

    Pages({
      dirs: 'vue/pages',
      importMode: mode === 'production' ? PagesImportModeResolver() : 'sync',
    }),

    Layouts({ layoutsDirs: 'vue/layouts', defaultLayout: '_default' }),

    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: `${cwd}/vue/locales/*.yaml`,
    }),

    Unocss(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'ViteStrict',
        short_name: 'ViteStrict',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

    Eslint({
      eslintOptions: { cache: false },
      shouldLint: (path) => /\/vue\/[^?]*\.(vue|ts)$/.test(path),
    }),

    Inspect(),
  ],

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished: generateSitemap,
  },
}));
