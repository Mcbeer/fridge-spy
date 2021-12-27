import React, { MutableRefObject, useEffect } from "react";

export const useClickOutside = (
  elementRef: MutableRefObject<any>,
  handler: (event: any) => void
) => {
  useEffect(
    () => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!elementRef.current || elementRef.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add elementRef and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [elementRef, handler]
  );
};
