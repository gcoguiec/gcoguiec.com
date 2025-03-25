import { ViteSSG } from 'vite-ssg';

import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';
import { routes } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:generated-layouts';

import '~/normalizer.scss';
import App from '~/app.vue';
import { createPinia, type StateTree } from 'pinia';
import { useStore } from '~/store/root';
import devalue from '@nuxt/devalue';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: messages ?? {}
});

export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts([
      ...routes,
      {
        name: 'notfound',
        path: '/:notfound(.*)*',
        component: () => import('~/pages/not-found.vue')
      }
    ])
  },
  ({ app, initialState, router }) => {
    const pinia = createPinia();
    app.use(pinia);
    app.use(i18n);

    if (import.meta.env.SSR) {
      initialState = {
        pinia: pinia.state.value
      };
    } else {
      pinia.state.value = (initialState['pinia'] ?? {}) as Record<
        string,
        StateTree
      >;
    }

    router.beforeEach((_to, _from, next) => {
      useStore(pinia);
      next();
    });
  },
  {
    rootContainer: '#gc',
    useHead: true,
    transformState(state): unknown {
      return import.meta.env.SSR ? devalue(state) : state;
    }
  }
);
