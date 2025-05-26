import { useCallback, useEffect, useRef } from "react";

import useOrientation from "./useOrientation";

/**
 * Custom hook to handle keyboard navigation in a grid layout
 * Supports arrow key navigation with different column counts based on orientation
 *
 * @param totalItems - Total number of items in the grid
 * @returns Object containing the grid ref to attach to the container
 */
export const useKeyboardNavigation = (totalItems: number) => {
  // Get current orientation to determine number of columns
  const { isLandscape } = useOrientation();

  // Track the currently focused item index
  const currentFocusIndex = useRef<number>(-1);

  // Ref to access the grid container DOM element
  const gridRef = useRef<HTMLDivElement>(null);

  /**
   * Calculate the next focus index based on the current index and key pressed
   * Handles wrapping around edges and respects grid layout
   *
   * @param currentIndex - Current focused item index
   * @param key - Arrow key pressed
   * @returns Next index to focus
   */
  const getNextFocusIndex = useCallback(
    (currentIndex: number, key: string): number => {
      // Determine number of columns based on orientation
      const columnsPerRow = isLandscape ? 5 : 3;

      switch (key) {
        case "ArrowRight": {
          // Move right if not at the end
          return currentIndex < totalItems - 1
            ? currentIndex + 1
            : currentIndex;
        }
        case "ArrowLeft": {
          // Move left if not at the start
          return currentIndex > 0 ? currentIndex - 1 : currentIndex;
        }
        case "ArrowDown": {
          // Move down one row if possible
          const nextRowIndex = currentIndex + columnsPerRow;
          return nextRowIndex < totalItems ? nextRowIndex : currentIndex;
        }
        case "ArrowUp": {
          // Move up one row if possible
          const prevRowIndex = currentIndex - columnsPerRow;
          return prevRowIndex >= 0 ? prevRowIndex : currentIndex;
        }
        default: {
          return currentIndex;
        }
      }
    },
    [isLandscape, totalItems]
  );

  /**
   * Handle keyboard events for navigation
   * Prevents default arrow key behavior to avoid page scrolling
   * Updates focus to the next item based on arrow key pressed
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Only handle arrow keys
      if (
        !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        return;
      }

      // Prevent default arrow key behavior (page scrolling)
      e.preventDefault();

      // Calculate next focus index
      const nextIndex = getNextFocusIndex(currentFocusIndex.current, e.key);

      // Update focus if index changed
      if (nextIndex !== currentFocusIndex.current) {
        currentFocusIndex.current = nextIndex;
        // Find all focusable elements in the grid
        const elements = gridRef.current?.querySelectorAll('[role="button"]');
        if (elements && elements[nextIndex]) {
          // Focus the next element
          (elements[nextIndex] as HTMLElement).focus();
        }
      }
    },
    [getNextFocusIndex]
  );

  // Add and remove keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return { gridRef };
};
