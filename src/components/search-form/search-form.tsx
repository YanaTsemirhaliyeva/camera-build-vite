import { ChangeEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras/cameras.selectors';
import classNames from 'classnames';
import { useOutsideClick } from '../../hooks/useOutsideClick/useOutsideClick';
import { useNavigate } from 'react-router-dom';
import { AppRoute, DEFAULT_DROPDOWNS_COUNT, DEFAULT_DROPDOWNS_INPUT_LENGTH, KeyCode } from '../../const';
import useKeyPress from '../../hooks/useKeyPress/useKeyPress';
import ReactFocusLock from 'react-focus-lock';
import MemoSearchCameraItem from '../search-camera-item/search-camera-item';

function SearchForm(): JSX.Element {

  const cameraList = useAppSelector(getCameras);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(-1);
  const [textValue, setTextValue] = useState('');

  const searchedCameras = useMemo(() =>
    cameraList.filter((camera) =>
      camera.name.toLowerCase().includes(textValue.toLowerCase())), [cameraList, textValue]);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  useOutsideClick(formRef, () => setTextValue(''));

  const handleInputReset = () => {
    setTextValue('');
  };

  const handleInputSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    setTextValue(evt.target.value);
  };

  const arrowUp = useKeyPress({ targetKey: KeyCode.ArrowUp });
  const arrowDown = useKeyPress({ targetKey: KeyCode.ArrowDown });
  const escKey = useKeyPress({targetKey: KeyCode.Esc});
  const isUpArrowPressed = textValue && searchedCameras.length && arrowUp;
  const isDownArrowPressed = textValue && searchedCameras.length && arrowDown;
  const isEscPressed = textValue && searchedCameras.length && escKey;

  useEffect(() => {
    if (searchedCameras.length && isUpArrowPressed) {
      setCurrentCameraIndex((prev) => (prev ? prev - 1 : prev));

      if (!currentCameraIndex) {
        inputRef.current?.focus();
        setCurrentCameraIndex(-1);
      }

    } else if (searchedCameras.length && isDownArrowPressed) {
      setCurrentCameraIndex((prev) => (prev < searchedCameras.length - 1 ? prev + 1 : prev));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpArrowPressed, isDownArrowPressed, searchedCameras.length]);

  useEffect(() => {
    if (searchedCameras.length && isEscPressed) {
      handleInputReset();
    }
  },[isEscPressed, searchedCameras.length]);

  const onSearchItemClick = useCallback((cameraId: number) => {
    navigate(`${AppRoute.Product}/${cameraId}`);
    setTextValue('');
  }, [navigate]);

  return (
    <div
      className={classNames({'list-opened': textValue.length >= DEFAULT_DROPDOWNS_INPUT_LENGTH && searchedCameras.length}, 'form-search')}
      ref={formRef}
      tabIndex={-1}
    >
      <ReactFocusLock disabled={!textValue}>
        <form data-testid='search-form'>
          <label>
            <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-lens"></use>
            </svg>
            <input
              className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту"
              onChange={handleInputSearch}
              ref={inputRef}
              value={textValue}
            />
          </label>
          <ul className={classNames({'scroller': searchedCameras.length > DEFAULT_DROPDOWNS_COUNT}, 'form-search__select-list')}>
            {searchedCameras.map((camera, i) => {
              const isCurrent = i === currentCameraIndex;
              return (
                <MemoSearchCameraItem
                  camera={camera}
                  isCurrent={isCurrent}
                  key={camera.id}
                  onClick={onSearchItemClick}
                />
              );
            })}
          </ul>
        </form>
        <button className="form-search__reset" type="reset" onClick={handleInputReset}>
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg><span className="visually-hidden">Сбросить поиск</span>
        </button>
      </ReactFocusLock>
    </div>
  );
}

const MemoSearchForm = memo(SearchForm);
export default MemoSearchForm;
