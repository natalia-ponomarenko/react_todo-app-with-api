/* eslint-disable jsx-a11y/control-has-associated-label */
import classnames from 'classnames';
import { Todo } from '../../types/Todo';
import { Form } from '../Form';

type Props = {
  activeTodos: number,
  onAdd: (todo: Todo) => void,
  isInputActive: boolean,
  inputTitle: string,
  setInputTitle: React.Dispatch<React.SetStateAction<string>>,
  toggleAll: () => void,
};

export const Header: React.FC<Props> = ({
  activeTodos,
  onAdd,
  isInputActive,
  inputTitle,
  setInputTitle,
  toggleAll,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classnames(
          'todoapp__toggle-all',
          {
            active: activeTodos === 0,
          },
        )}
        onClick={toggleAll}
      />
      <Form
        onAdd={onAdd}
        isInputActive={isInputActive}
        inputTitle={inputTitle}
        setInputTitle={setInputTitle}
      />
    </header>
  );
};
