<template>
  <router-view />
</template>

<style lang="scss">
@use '~/assets/scss/mixins' as *;

@include block('app') {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
