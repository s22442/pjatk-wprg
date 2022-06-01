<route lang="yaml">
meta:
  auth: true
</route>

<script setup lang="ts">
import { useTodos } from '~/stores/todos';

const todos = useTodos();
const router = useRouter();
const { t } = useI18n();

const title = $ref('');
const body = $ref('');
let error = $ref('');

const submit = async () => {
  const { status } = await todos.add({ title, body });

  if (status === 200) {
    router.push('/');
  } else {
    error = t('todos.error.invalid_data');
  }
};
</script>

<template>
  <div _flex="~ col" _items-center _gap-4>
    <div _text-xl>{{ t('todos.add') }}</div>

    <base-input v-model="title" :placeholder="t('todos.title')" autofocus />

    <base-input v-model="body" :placeholder="t('todos.body')" multiline />

    <base-button :disabled="!title" @click="submit()">
      {{ t('submit') }}
    </base-button>

    <base-button _text-sm @click="router.push('/')">
      {{ t('cancel') }}
    </base-button>

    <base-fade-transition>
      <div v-if="error" _text-error _italic>
        {{ error }}
      </div>
    </base-fade-transition>
  </div>
</template>
