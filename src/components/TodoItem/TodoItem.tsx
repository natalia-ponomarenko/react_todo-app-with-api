import classnames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onDelete: (id: number) => void,
  isLoading: boolean,
};

export const TodoItem: React.FC<Props> = (
  {
    todo,
    onDelete,
    isLoading,
  },
) => {
  const {
    title,
    completed,
    id,
  } = todo;

  return (
    <div className={classnames(
      'todo', {
        completed,
      },
    )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => {}}
        />
      </label>

      <span className="todo__title">{title}</span>
      <button
        type="button"
        className="todo__remove"
        onClick={() => onDelete(id)}
      >
        ×
      </button>

      <div
        className={classnames(
          'modal overlay', {
            'is-active': isLoading,
          },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
