import { useRef, useEffect, useCallback } from 'react';

export default function useIsMounted() {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);

  return useCallback(() => ref.current, [ref]);
}

// Example for apply
// const isMounted = useIsMounted();
//
// useEffect(() => {
// ...
// 	if (isMounted()) {
// 		setImg(data);
// 		setPreloader(!preloader);
// 	}
// ...
// }, [])