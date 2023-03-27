import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodo = (userId: number, newTodo: Todo) => {
  return client.post<Todo>(`/todos?userId=${userId}`, newTodo);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const editTodoStatus = (id: number, completed: boolean) => {
  return client.patch(`/todos/${id}`, { completed });
};

export const editTodoTitle = (id: number, title: string) => {
  return client.patch(`/todos/${id}`, { title });
};
