<script setup lang="ts">
const { all } = defineProps<{ all: string[] }>();

const router = useRouter();
const { t } = useI18n();
</script>

<template>
  <div _text-center>
    <div _icon-carbon-warning _text-4xl _inline-block _mb-1 />

    <div _text-lg _mb-4>
      <span _op75>{{ t('page_not_found') }}</span>
      {{ `/${all.join('/')}` }}
    </div>

    <base-button @click="router.push('/')">{{ t('back') }}</base-button>
  </div>
</template>
