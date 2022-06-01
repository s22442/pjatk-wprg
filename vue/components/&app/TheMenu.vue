<script setup lang="ts">
import { useSession } from '~/stores/session';

import { toggleDark } from '~/composables/dark';

const session = useSession();
</script>

<template>
  <base-fade-transition>
    <div
      :key="String(session.isAuth)"
      _absolute
      _inset="t-0 r-0"
      _z-1
      _p-3
      _flex
      _gap-4
      _text-3xl
      _children="cursor-pointer transition"
    >
      <a
        href="https://github.com/s22442/pjatk-wprg"
        target="_blank"
        _icon-akar-icons-github-fill
        _bg-secondary-interactive
        _rounded-full
      />
      <div
        _icon="bi-moon-stars-fill dark:akar-icons-sun-fill"
        _bg-secondary-interactive
        @click="toggleDark()"
      />
      <div
        v-if="session.isAuth"
        _icon-ic-round-logout
        _bg-secondary-interactive
        @click="session.logOut()"
      />
    </div>
  </base-fade-transition>
</template>
