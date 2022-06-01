import { createI18n } from 'vue-i18n';

import type { PluginModule } from '~/types/modules';

const messages = Object.fromEntries(
  Object.entries(import.meta.globEager('../locales/*.yaml')).map(
    ([path, module]) => [path.slice(11, -5), module.default]
  )
);

export const install: PluginModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
  });

  app.use(i18n);
};
