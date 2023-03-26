import { useState } from 'react';
import classnames from 'classnames';
import { Filter as FilterType } from '../../types/Filter';

type Props = {
  notCompleted: number;
  completed: number;
  changeFilter: (filter: FilterType) => void,
  clearCompleted: () => void,
};

export const Filter: React.FC<Props> = ({
  notCompleted,
  completed,
  changeFilter,
  clearCompleted,
}) => {
  const [selected, setSelected] = useState(FilterType.ALL);

  const handleClick = (value: FilterType) => {
    changeFilter(value);
    setSelected(value);
  };

  const filters = [FilterType.ALL, FilterType.ACTIVE, FilterType.COMPLETED];

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">{`${notCompleted} items left`}</span>

      <nav className="filter">
        {filters.map((filter) => (
          <a
            href={`#/${filter.toLowerCase()}`}
            key={filter}
            className={classnames('filter__link', {
              selected: selected === filter,
            })}
            onClick={() => handleClick(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      {completed > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
