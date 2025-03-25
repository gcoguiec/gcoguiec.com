import type { ComputedRef, Ref } from 'vue';
import type { ColorSchemeType } from '@vueuse/core';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
  System = 'system'
}

export interface AppState {
  colorSchemePreference: ComputedRef<ColorSchemeType>;
  themeSetting: Ref<Theme>;
}
