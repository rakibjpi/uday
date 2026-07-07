import { useState, useCallback } from "react";

// ============================================================================
// HOOK FOR EASY INTEGRATION
// ============================================================================
interface UseBackgroundSettingsReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useBackgroundSettings(): UseBackgroundSettingsReturn {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
