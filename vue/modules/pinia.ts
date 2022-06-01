import { createPinia } from 'pinia';

import { useSession } from '~/stores/session';
import { useTodos } from '~/stores/todos';

import type { WatchStopHandle } from 'vue';
import type { PluginModule } from '~/types/modules';

export const install: PluginModule = ({
  isClient,
  initialState,
  app,
  router,
}) => {
  const pinia = createPinia();

  app.use(pinia);

  if (isClient) {
    let authWatcherStopHandle: WatchStopHandle | null = null;
    const stopAuthWatcher = () => {
      authWatcherStopHandle?.();
      authWatcherStopHandle = null;
    };

    router.beforeEach(async (to) => {
      const session = useSession();

      if (session.isAuth && !authWatcherStopHandle) {
        authWatcherStopHandle = watch(
          () => session.isAuth,
          (next) => {
            if (!next) {
              router.push('/login');
              stopAuthWatcher();
            }
          }
        );
      }

      if (to.meta.auth && !session.isAuth) {
        stopAuthWatcher();
        return '/login';
      }

      if (to.meta.loadTodos) {
        const todos = useTodos();
        await todos.load();

        if (to.meta.auth && !session.isAuth) {
          stopAuthWatcher();
          return '/login';
        }
      }

      return true;
    });
  }

  if (isClient) {
    pinia.state.value = initialState.pinia || {};
  } else {
    initialState.pinia = pinia.state.value;
  }
};
