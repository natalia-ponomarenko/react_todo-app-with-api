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
};

export const Header: React.FC<Props> = ({
  activeTodos,
  onAdd,
  isInputActive,
  inputTitle,
  setInputTitle,
}) => {
  return (
    <header className="todoapp__header">
      {activeTodos > 0 && (
        <button
          type="button"
          className={classnames({
            'todoapp__toggle-all': true,
            active: activeTodos,
          })}
        />
      )}
      <Form
        onAdd={onAdd}
        isInputActive={isInputActive}
        inputTitle={inputTitle}
        setInputTitle={setInputTitle}
      />
    </header>
  );
};
