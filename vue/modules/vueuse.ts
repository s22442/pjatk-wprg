import type { PluginModule } from '~/types/modules';

// STARTER_DOCS:
// Set dark theme on start up
// https://vueuse.org/
export const install: PluginModule = () => {
  useDark();
};
