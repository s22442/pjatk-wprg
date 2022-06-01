<route lang="yaml">
meta:
  auth: true
  loadTodos: true
</route>

<script setup lang="ts">
import { useTodos } from '~/stores/todos';

const { id } = defineProps<{ id: string }>();

const todos = useTodos();
const router = useRouter();
const { t } = useI18n();

let title = $ref('');
let body = $ref('');
let error = $ref('');

const routeTodo = todos.getById(Number(id));
if (routeTodo) {
  title = routeTodo.title;
  body = routeTodo.body;
} else {
  router.replace({ name: 'all', params: { all: ['edit', id] } });
}

const submit = async () => {
  const { status } = await todos.updateById({ id: Number(id), title, body });

  if (status === 200) {
    router.push('/');
  } else {
    error = t('todos.error.invalid_data');
  }
};
</script>

<template>
  <div v-if="routeTodo" _flex="~ col" _items-center _gap-4>
    <div _text-xl>{{ t('todos.edit') }}</div>

    <base-input v-model="title" :placeholder="t('todos.title')" autofocus />

    <base-input v-model="body" :placeholder="t('todos.body')" multiline />

    <base-button @click="submit()">{{ t('submit') }}</base-button>

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
