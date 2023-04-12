import { useEffect } from 'react';

export function useOutsideAlerter(ref: any, callback: Function) {
  useEffect(() => {

    // callback function when clicked outside
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref]);
}
