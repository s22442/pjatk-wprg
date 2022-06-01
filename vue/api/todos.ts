import { rest } from '~/helpers/api';

import type Todo from '~/types/Todo';

export const fetchTodos = () => rest.get<Todo[]>('/todos/get/all');

export const addTodo = (todo: Omit<Todo, 'id'>) =>
  rest.post('/todos/add', todo);

export const updateTodoById = ({ id, title, body }: Todo) =>
  rest.put(`/todos/update/${id}`, { title, body });

export const deleteTodoById = (id: number) =>
  rest.silent.delete(`/todos/delete/${id}`);
