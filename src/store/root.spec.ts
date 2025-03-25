import { usePreferredColorScheme } from '@vueuse/core';
import { createPinia, setActivePinia } from 'pinia';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock
} from 'vitest';
import { ref } from 'vue';

import { FALLBACK_THEME, useStore } from '~/store/root';
import { Theme } from '~/types';

vi.mock('@vueuse/core', async () => {
  const actual =
    await vi.importActual<typeof import('@vueuse/core')>('@vueuse/core');
  return {
    ...actual,
    usePreferredColorScheme: vi.fn()
  };
});

describe('Root Store', () => {
  let store: ReturnType<typeof useStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('theme Getter', () => {
    describe('when theme setting is not set to system', () => {
      beforeEach(() => {
        store = useStore();
        store.$patch({ themeSetting: Theme.Light });
      });

      it('returns theme setting as is', () => {
        expect(store.theme).toBe(Theme.Light);
      });
    });

    describe(`when theme setting is set to system and color scheme preference
      has no-preference`, () => {
      beforeEach(() => {
        (usePreferredColorScheme as Mock).mockReturnValue(ref('no-preference'));
        store = useStore();
        store.$patch({ themeSetting: Theme.System });
      });

      it('returns fallback theme as setting', () => {
        expect(store.theme).toBe(FALLBACK_THEME);
      });
    });

    describe(`when theme setting is set to system and color scheme preference
      is set`, () => {
      beforeEach(() => {
        (usePreferredColorScheme as Mock).mockReturnValue(ref(Theme.Dark));
        store = useStore();
        store.$patch({ themeSetting: Theme.System });
      });

      it('returns color scheme preference as setting', () => {
        expect(store.theme).toBe(Theme.Dark);
      });
    });
  });
});
