import { useEffect, useRef, useState } from "react";

/**
 * Reusable hook for lazy-loading and binding Fancybox on a container element.
 *
 * - Uses IntersectionObserver to defer loading Fancybox JS/CSS until the
 *   container is within 200 px of the viewport.
 * - Calls `Fancybox.bind()` with the given selector & options once visible.
 * - Cleans up by unbinding and closing Fancybox on unmount.
 * - Prevents double-initialisation via an internal flag.
 */
export function useFancybox(
  selector,
  options = {},
) {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const initialised = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || initialised.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || initialised.current) return;
        initialised.current = true;

        Promise.all([
          import("@fancyapps/ui").then(({ Fancybox }) => {
            Fancybox.bind(selector, { ...options });
          }),
          import("@fancyapps/ui/dist/fancybox/fancybox.css"),
        ]).then(() => {
          setReady(true);
        });

        observer.disconnect();
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();

      import("@fancyapps/ui").then(({ Fancybox }) => {
        Fancybox.unbind(selector);
        Fancybox.close();
      });
    };
  }, [selector]);

  return { ref: containerRef, ready };
}
