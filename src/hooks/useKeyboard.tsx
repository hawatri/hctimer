import { useEffect, useRef } from 'react';

interface UseKeyboardProps {
  onSpaceDown: () => void;
  onSpaceUp: () => void;
  onSpaceHold?: () => void;
}

export const useKeyboard = ({ onSpaceDown, onSpaceUp, onSpaceHold }: UseKeyboardProps) => {
  const isSpacePressed = useRef(false);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const preventScrollRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isSpacePressed.current) {
        e.preventDefault();
        preventScrollRef.current = true;
        isSpacePressed.current = true;
        onSpaceDown();
        
        // Start hold timer for preparation
        if (onSpaceHold) {
          holdTimeoutRef.current = setTimeout(() => {
            onSpaceHold();
          }, 300);
        }
      } else if (e.code === 'Space' && preventScrollRef.current) {
        // Prevent default for repeated space events while holding
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isSpacePressed.current) {
        e.preventDefault();
        isSpacePressed.current = false;
        preventScrollRef.current = false;
        
        // Clear hold timer
        if (holdTimeoutRef.current) {
          clearTimeout(holdTimeoutRef.current);
          holdTimeoutRef.current = null;
        }
        
        onSpaceUp();
      }
    };

    // Prevent space from scrolling the page
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keypress', handleKeyPress);
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }
    };
  }, [onSpaceDown, onSpaceUp, onSpaceHold]);
};