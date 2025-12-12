import { useEffect, useRef, useState } from "react";

/**
 * useCssReady hook
 * Returns a ref and a boolean `isReady` that becomes true
 * when the element has been mounted and CSS/layout applied.
 */
export function useCssReady<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // Wait for next browser repaint to ensure CSS is applied
    const id = requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  return { ref, isReady };
}