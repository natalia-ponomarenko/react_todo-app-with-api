import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  tempTodo: Todo | null,
  onDelete: (id: number) => void,
  idsToDelete: number[],
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  onDelete,
  idsToDelete,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => {
        const isLoading = idsToDelete.some(id => id === todo.id);

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        );
      })}
      {tempTodo && (
        <TodoItem
          key={tempTodo.id}
          todo={tempTodo}
          onDelete={() => {}}
          isLoading
        />
      )}
    </section>
  );
};
