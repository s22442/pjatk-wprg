<script setup lang="ts">
import TheMenu from './components/&app/TheMenu.vue';

import { isDark } from '~/composables/dark';

const route = useRoute();

useHead({
  title: 'todos',
  meta: [
    {
      name: 'theme-color',
      content: computed(() => (isDark.value ? '#00aba9' : '#ffffff')),
    },
  ],
});
</script>

<template>
  <TheMenu />
  <router-view v-slot="{ Component }">
    <base-fade-transition appear>
      <component :is="Component" :key="route.name" />
    </base-fade-transition>
  </router-view>
</template>
