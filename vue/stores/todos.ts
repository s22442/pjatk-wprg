import { acceptHMRUpdate, defineStore } from 'pinia';

import {
  fetchTodos,
  addTodo,
  updateTodoById,
  deleteTodoById,
} from '~/api/todos';

import type Todo from '~/types/Todo';

export const useTodos = defineStore('todos', () => {
  let all = $ref<Todo[]>([]);

  // using computed breaks transition-group
  let sorted = $ref<Todo[]>([]);
  watch(
    $$(all),
    () => {
      sorted = all.sort((a, b) => {
        if (a.title !== b.title) {
          return a.title > b.title ? 1 : -1;
        }

        if (a.body !== b.body) {
          return a.body > b.body ? 1 : -1;
        }

        return b.id - a.id;
      });
    },
    { immediate: true }
  );

  const getById = (id: Todo['id']) => all.find((item) => item.id === id);

  const load = async () => {
    const { data } = await fetchTodos();
    all = data || [];
  };

  const deleteById = async (id: Todo['id']) => {
    const index = all.findIndex((todo) => todo.id === id);

    if (index === -1) {
      return;
    }

    all.splice(index, 1);
    await deleteTodoById(id);
  };

  return $$({
    all,
    sorted,
    getById,
    load,
    add: addTodo,
    updateById: updateTodoById,
    deleteById,
  });
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodos, import.meta.hot));
}
