import { memo, useEffect, useRef } from 'react';
import { Camera } from '../../types/camera';
import { KeyCode } from '../../const';

type SearchListItemProps = {
  camera: Camera;
  isCurrent: boolean;
  onClick: (cameraId: number) => void;
};

function SearchListItem({camera, isCurrent, onClick}: SearchListItemProps): JSX.Element {
  const cameraItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isCurrent) {
      cameraItemRef.current?.focus();
    }
  }, [isCurrent]);

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === KeyCode.Enter) {
      evt.preventDefault();
      onClick(camera.id);
    }
  };

  return (
    <li
      className="form-search__select-item"
      tabIndex={isCurrent ? -1 : 0}
      key={camera.id}
      ref={cameraItemRef}
      onClick={() => onClick(camera.id)}
      onKeyDown={handleKeyDown}
      data-testid="search-item"
    >
      {camera.name}
    </li>
  );
}

const MemoSearchListItem = memo(SearchListItem);
export default MemoSearchListItem;
