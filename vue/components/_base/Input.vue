<script setup lang="ts">
type InputType = 'text' | 'password';

type InputEvent = Event & { target: { value: string } };

interface Props {
  modelValue: string;
  type?: InputType;
  placeholder?: string;
  autofocus?: boolean;
  multiline?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const {
  type = 'text',
  placeholder = '',
  modelValue = '',
  autofocus = false,
  multiline = false,
} = defineProps<Props>();

const emit = defineEmits<Emits>();

const tag = $computed(() => (multiline ? 'textarea' : 'input'));
const textAlign = $computed(() => (multiline ? 'start' : 'center'));

const handleInput = (e: Event) => {
  emit('update:modelValue', (e as InputEvent).target.value);
};
</script>

<template>
  <component
    :is="tag"
    :value="modelValue"
    :placeholder="placeholder"
    :aria-label="placeholder"
    :type="type"
    :autofocus="autofocus"
    autocomplete="false"
    rows="10"
    _resize-none
    _p="x2 y1"
    _w-72
    :_text="textAlign"
    _bg-primary
    _rounded
    _placeholder="text-sm text-center italic text-secondary/75"
    _border="1px secondary/30"
    _outline="~ 2px offset-0 transparent hover:accent !focus:accent-focus"
    _duration-150
    @input="handleInput"
  />
</template>
