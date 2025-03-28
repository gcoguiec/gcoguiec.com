<script lang="ts">
import { computed, watch } from 'vue';

import { Theme } from '~/types';
import { useStore } from '~/store/root';
import { useBem } from '~/composables/use-bem';

const { block } = useBem('layout');
</script>

<script lang="ts" setup>
const store = useStore();
const blockClass = computed(() =>
  block({
    [store.theme]: true
  })
);

watch<Theme>(
  () => store.theme,
  (theme: Theme) => {
    const { block } = useBem('theme');
    const { classList } = document.documentElement;
    const [, allModifiers] = block(
      Object.fromEntries(Object.values(Theme).map(theme => [theme, true]))
    );
    classList.remove(...Object.keys(allModifiers));
    const [, modifiers] = block({ [theme]: true });
    classList.add(...Object.keys(modifiers));
  }
);
</script>

<template>
  <div :class="blockClass">
    <router-view />
  </div>
</template>

<style lang="scss" src="./default.scss"></style>
