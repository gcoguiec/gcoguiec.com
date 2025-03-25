<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useHeadSafe } from '@unhead/vue';

const { t } = useI18n();

useHeadSafe({
  templateParams: {
    site: {
      name: 'Guillaume Coguiec'
    },
    separator: '—'
  },
  titleTemplate: '%site.name %separator %s',
  meta: [
    { name: 'description', content: t('description') },
    { name: 'author', content: 'Guillaume Coguiec' },
    { name: 'og:type', content: 'website' },
    { name: 'og:site_name', content: 'gcoguiec.com' },
    { name: 'og:image', content: '/social-banner.jpg' }
  ]
});
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@use 'sass:map';

@use '~/assets/scss/constants';
@use '~/assets/scss/bem';

$themes: (
  dark: (
    background-color: constants.$tuna
  ),
  light: (
    background-color: white
  )
);

@mixin app-theme($options) {
  background-color: map.get($options, 'background-color');
}

@include bem.block('theme') {
  &:not(#{bem.modifier_selector('user-set')}) {
    @each $theme, $options in $themes {
      @media (prefers-color-scheme: $theme) {
        color-scheme: $theme;
        @include app-theme($options);
      }
    }
  }

  @each $theme, $options in $themes {
    @include bem.modifier($theme) {
      color-scheme: $theme;
      @include app-theme($options);
    }
  }
}

@include bem.block('app') {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
