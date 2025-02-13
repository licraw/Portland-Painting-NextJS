import { MutableRefObject, useEffect, useRef } from 'react';

/**
 * A hook that executes a function when the Escape key is pressed.
 *
 * @param callback {Function} - A function that is run after Escape is pressed
 * @return {MutableRefObject} - A ref object that can be assigned to a DOM element
 */
function useEscapeKey<T extends HTMLElement>(callback: () => void): MutableRefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref || !ref.current || !callback) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return (): void => {};
    }
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);

  return ref;
}

export default useEscapeKey;
