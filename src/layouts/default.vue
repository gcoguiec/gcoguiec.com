<script lang="ts" setup>
import { computed } from 'vue';

import { useStore } from '~/store/root';
import { useBem } from '~/composables/use-bem';

const { block } = useBem('layout');
const store = useStore();

const blockClass = computed(() =>
  block({
    default: true,
    [store.theme]: true
  })
);
</script>

<template>
  <div :class="blockClass">
    <router-view />
  </div>
</template>
