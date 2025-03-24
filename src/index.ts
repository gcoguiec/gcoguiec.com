import { ViteSSG } from 'vite-ssg';

import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';
import { routes } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:generated-layouts';

import '~/normalizer.scss';
import App from '~/app.vue';

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
  ({ app }) => {
    app.use(i18n);
  },
  {
    rootContainer: '#gc',
    useHead: true
  }
);
