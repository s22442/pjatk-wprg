import App from './App.vue';

import devalue from '@nuxt/devalue';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import { ViteSSG } from 'vite-ssg';

import '@unocss/reset/tailwind.css';
import './styles/main.scss';
import 'uno.css';

const routes = [
  ...setupLayouts(generatedRoutes),
  { path: '/index.html', redirect: '/' },
  { path: '/index.php', redirect: '/' },
];

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.VITE_BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    const modules = Object.values(import.meta.globEager('./modules/*.ts'));
    for (const module of modules) {
      module.install?.(ctx);
    }
  },
  { transformState: (state) => (import.meta.env.SSR ? devalue(state) : state) }
);
