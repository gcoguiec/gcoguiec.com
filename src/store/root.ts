import { useLocalStorage, usePreferredColorScheme } from '@vueuse/core';
import { defineStore } from 'pinia';

import { Theme, type AppState } from '~/types';

export const THEME_SETTING_KEY = 'gc.theme';
export const FALLBACK_THEME = Theme.System;

export const useStore = defineStore('root', {
  state: (): AppState => ({
    colorSchemePreference: usePreferredColorScheme(),
    themeSetting: useLocalStorage<Theme>(THEME_SETTING_KEY, Theme.System)
  }),
  getters: {
    theme(state) {
      if (state.themeSetting === Theme.System) {
        return state.colorSchemePreference === 'no-preference'
          ? FALLBACK_THEME
          : (state.colorSchemePreference as Theme);
      }
      return state.themeSetting;
    }
  },
  actions: {
    setTheme(theme: Theme) {
      this.themeSetting = theme;
    }
  }
});
