<script setup lang="ts">
const { disabled = false } = defineProps<{ disabled?: boolean }>();
</script>

<template>
  <button
    :disabled="disabled"
    _rounded
    _inline-block
    _p="x4 y.5"
    _fw600
    _bg-accent-interactive
    _text-accent-interactive-contrast
    _transition-colors
    _cursor-pointer
    _select-none
    _disabled:pointer-events-none
  >
    <slot />
  </button>
</template>
