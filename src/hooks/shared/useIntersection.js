import { useEffect } from "react";

/**
 * Whenever the triggerRef appears in the view,
 * execute the callback function.
 * @param {HTMLElement} containerRef
 * @param {HTMLElement} triggerRef
 * @param {function} callback
 */
function useIntersection(containerRef, triggerRef, callback) {
  useEffect(() => {
    if (!containerRef.current || !triggerRef.current) return;
    const options = {
      root: containerRef.current,
      threshold: 1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the entry is visible
        if (
          entry.intersectionRatio > 0 &&
          entry.target.dataset.loading !== true
        ) {
          entry.target.dataset.loading = true;
          callback();
          setTimeout(() => {
            entry.target.dataset.loading = false;
          }, 2000);
        }
      });
    }, options);

    setTimeout(() => {
      observer.observe(triggerRef.current);
    }, 1000);

    return () => {
      if (triggerRef?.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, [containerRef, triggerRef, callback]);
}

export default useIntersection;
