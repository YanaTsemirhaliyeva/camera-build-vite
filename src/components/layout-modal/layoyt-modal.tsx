import classNames from 'classnames';
import { useCallback, useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';

type LayoutModalProps = {
  children: React.ReactNode;
  isActive: boolean;
  setIsModalActive: (arg: boolean) => void;
}

function LayoutModal({children, isActive, setIsModalActive}: LayoutModalProps): JSX.Element {
  const modalRef = useRef(null);

  const onEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      setIsModalActive(false);
    }
  }, [setIsModalActive]);

  useEffect(() => {
    if (isActive && modalRef.current) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onEscapeKeydown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEscapeKeydown);
    };
  }, [isActive, onEscapeKeydown]);

  return (
    <FocusLock returnFocus disabled={!isActive}>
      <div className={classNames({'is-active': isActive}, 'modal')}
        ref={modalRef}
        data-testid='modal-container'
      >
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={() => setIsModalActive(false)}></div>
          <div className="modal__content">
            {children}
            <button className="cross-btn" type="button" aria-label="Закрыть попап"
              onClick={() => setIsModalActive(false)}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}

export default LayoutModal;
