<script lang="ts" setup>
import { useHeadSafe } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const route = useRoute();
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
    { name: 'og:image', content: '/social-banner.jpg' },
    {
      name: 'og:url',
      content: () =>
        `${import.meta.env['url'] ?? 'http://localhost:3000'}${route.path}`
    }
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
