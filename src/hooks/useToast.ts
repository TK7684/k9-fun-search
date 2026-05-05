import { useState, useCallback, useRef } from 'react';

export interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  undoable: boolean;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const undoCallbackRef = useRef<(() => void) | null>(null);

  const dismiss = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    undoCallbackRef.current = null;
    setToast(null);
  }, []);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'success') => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      undoCallbackRef.current = null;

      setToast({ message, type, undoable: false });
      timeoutRef.current = setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const showToastWithUndo = useCallback(
    (message: string, undo: () => void) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      undoCallbackRef.current = undo;
      setToast({ message, type: 'error', undoable: true });

      timeoutRef.current = setTimeout(() => {
        setToast(null);
        undoCallbackRef.current = null;
      }, 5000);
    },
    [],
  );

  const performUndo = useCallback(() => {
    if (undoCallbackRef.current) {
      undoCallbackRef.current();
      undoCallbackRef.current = null;
    }
    dismiss();
  }, [dismiss]);

  return { toast, showToast, showToastWithUndo, performUndo, dismiss };
}
