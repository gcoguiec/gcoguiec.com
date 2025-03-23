<template>
  <router-view />
</template>

<style lang="scss">
@use '~/assets/scss/bem';

@include bem.block('app') {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
