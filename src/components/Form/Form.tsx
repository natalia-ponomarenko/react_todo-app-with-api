import { Todo } from '../../types/Todo';
import { USER_ID } from '../../variables/variables';

type Props = {
  onAdd: (todo: Todo) => void,
  isInputActive: boolean,
  inputTitle: string,
  setInputTitle: React.Dispatch<React.SetStateAction<string>>,
};

export const Form:React.FC<Props> = (
  {
    onAdd,
    isInputActive,
    inputTitle,
    setInputTitle,
  },
) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      id: 0,
      userId: USER_ID,
      title: inputTitle,
      completed: false,
    };

    onAdd(newTodo);
    setInputTitle('');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={inputTitle}
        onChange={(event) => setInputTitle(event.target.value)}
        disabled={isInputActive}
      />
    </form>
  );
};
