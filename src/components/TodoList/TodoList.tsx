import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  onDelete: (id: number) => void;
  loadingTodos: number[];
  toggleTodoStatus: (id: number, completed: boolean) => void;
  editTodoTitle: (id: number, title: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  onDelete,
  loadingTodos,
  toggleTodoStatus,
  editTodoTitle,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo) => {
        const isLoading = loadingTodos.some((id) => id === todo.id);

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            isLoading={isLoading}
            toggleTodoStatus={toggleTodoStatus}
            editTodoTitle={editTodoTitle}
          />
        );
      })}
      {tempTodo && (
        <TodoItem
          key={tempTodo.id}
          todo={tempTodo}
          onDelete={() => {}}
          toggleTodoStatus={() => {}}
          editTodoTitle={() => {}}
          isLoading
        />
      )}
    </section>
  );
};
