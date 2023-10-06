import { memo, useEffect, useRef } from 'react';
import { Camera } from '../../types/camera';
import { KeyCode } from '../../const';

type SearchCameraItemProps = {
  camera: Camera;
  isCurrent: boolean;
  onClick: (cameraId: number) => void;
};

function SearchCameraItem({camera, isCurrent, onClick}: SearchCameraItemProps): JSX.Element {
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

const MemoSearchCameraItem = memo(SearchCameraItem);
export default MemoSearchCameraItem;
