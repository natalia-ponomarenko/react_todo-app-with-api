import classnames from 'classnames';
import { useEffect } from 'react';
import { Error as ErrorType } from '../../types/Error';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  errorType: ErrorType;
  closeNotification: () => void;
  isHidden: boolean;
};
export const Notification: React.FC<Props> = ({
  errorType,
  closeNotification,
  isHidden,
}) => {
  useEffect(() => {
    setTimeout(() => {
      closeNotification();
    }, 3000);
  }, [isHidden]);

  return (
    <div
      className={classnames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: isHidden,
        },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={closeNotification}
      />
      {errorType}
    </div>
  );
};
