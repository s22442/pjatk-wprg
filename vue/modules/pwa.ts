import type { PluginModule } from '~/types/modules';

// STARTER_DOCS: https://github.com/antfu/vite-plugin-pwa
export const install: PluginModule = async ({ isClient, router }) => {
  if (!isClient) {
    return;
  }

  await router.isReady();

  const { registerSW } = await import('virtual:pwa-register');
  registerSW({ immediate: true });
};
