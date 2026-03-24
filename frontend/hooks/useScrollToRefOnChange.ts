import { useEffect, useRef } from 'react';

/**
 * Hook to scroll to a specific element when a dependency changes
 * Useful for pagination - scrolls to content area when page changes
 * 
 * @param dependency - The value to watch for changes (e.g., currentPage)
 * @param delay - Optional delay before scrolling in milliseconds
 * @returns ref - React ref to attach to the element you want to scroll to
 * 
 * @example
 * const contentRef = useScrollToRefOnChange(currentPage);
 * <div ref={contentRef}>Your content here</div>
 */
export function useScrollToRefOnChange(dependency: any, delay: number = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, delay);
      return () => clearTimeout(timer);
    } else {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [dependency, delay]);

  return ref;
}
