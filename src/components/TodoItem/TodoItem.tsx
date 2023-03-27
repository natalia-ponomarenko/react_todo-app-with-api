import classnames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onDelete: (id: number) => void,
  isLoading: boolean,
  toggleTodoStatus: (id: number, status: boolean) => void,
  editTodoTitle: (id: number, title: string) => void,
};

export const TodoItem: React.FC<Props> = (
  {
    todo,
    onDelete,
    isLoading,
    toggleTodoStatus,
    editTodoTitle,
  },
) => {
  const [isEdited, setEdited] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const {
    title,
    completed,
    id,
  } = todo;

  const handleKeyUp = (key: string) => {
    if (key === 'Escape') {
      setNewTitle(title);
      setEdited(false);
    }
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    todoId: number,
  ) => {
    event.preventDefault();

    if (newTitle === '') {
      onDelete(todoId);
    } else {
      editTodoTitle(todoId, newTitle);
    }

    setEdited(false);
  };

  return (
    <div
      className={classnames(
        'todo', {
          completed,
        },
      )}
      onDoubleClick={() => setEdited(true)}
      onBlur={() => setEdited(false)}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => toggleTodoStatus(id, completed)}
        />
      </label>

      {isEdited ? (
        <form
          onSubmit={(event) => handleSubmit(event, id)}
        >
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            onKeyUp={(event) => handleKeyUp(event.key)}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        </form>
      ) : (
        <>
          <span className="todo__title">{title}</span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => onDelete(id)}
          >
            ×
          </button>
        </>

      )}
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
