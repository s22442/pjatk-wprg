<route lang="yaml">
meta:
  auth: true
  loadTodos: true
</route>

<script setup lang="ts">
import { useTodos } from '~/stores/todos';

const todos = useTodos();
const router = useRouter();
const { t } = useI18n();
</script>

<template>
  <div _flex="~ col" _items-center _gap-6>
    <base-button @click="router.push('/new')">{{ t('todos.add') }}</base-button>

    <base-fade-transition>
      <div
        v-if="todos.all.length"
        _self-stretch
        _relative
        _flex="~ wrap"
        _justify-center
        _items-start
        _gap-4
      >
        <transition-group
          enter-from-class="op0"
          leave-to-class="op0 translate-y-180"
          leave-active-class="absolute pointer-events-none duration-300"
          move-class="transition"
        >
          <div
            v-for="{ id, title, body } in todos.sorted"
            :key="id"
            _w-70
            _rounded
            _overflow-hidden
            _border="~ accent/0 hover:accent"
            _transition
          >
            <div
              _bg-accent
              _text="accent-contrast center ellipsis lg"
              _leading-9
              _fw600
              _whitespace-nowrap
              _select-none
            >
              {{ title }}
            </div>
            <div
              _py-1
              _bg="accent/40"
              _flex
              _justify-center
              _gap-2
              _text-xs
              _select-none
              _children="cursor-pointer transition"
            >
              <div
                _icon="clarity-edit-solid"
                _text="accent-contrast hover:secondary"
                @click="router.push(`/edit/${id}`)"
              />
              <div
                _icon="clarity-trash-solid"
                _text="accent-contrast hover:secondary"
                @click="todos.deleteById(id)"
              />
            </div>
            <div v-if="body" _bg="accent/20" _p-2>{{ body }}</div>
          </div>
        </transition-group>
      </div>
      <div v-else _text="xl center">
        {{ t('todos.empty') }}
      </div>
    </base-fade-transition>
  </div>
</template>
