import { useCallback, useEffect, useState } from 'react';

type UseKeyPressProps = {
  targetKey: KeyboardEvent['key'];
}

function useKeyPress({ targetKey }: UseKeyPressProps): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  const handlePressDown = useCallback(
    ({ key }: { key: string }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    },
    [targetKey],
  );

  const handlePressUp = useCallback(
    ({ key }: { key: string }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey],
  );

  useEffect(() => {
    window.addEventListener('keydown', handlePressDown);
    window.addEventListener('keyup', handlePressUp);

    return () => {
      window.removeEventListener('keydown', handlePressDown);
      window.removeEventListener('keyup', handlePressUp);
    };
  }, [handlePressDown, handlePressUp]);

  return keyPressed;
}

export default useKeyPress;
