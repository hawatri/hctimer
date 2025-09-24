import { useState, useCallback, useEffect } from 'react';
import { generateScrambleForEvent } from '../utils/scrambleGenerator';

export const useScramble = (event: string) => {
  const [scrambles, setScrambles] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const currentScramble = scrambles[currentIndex] || '';

  const generateScramble = useCallback(() => {
    const newScramble = generateScrambleForEvent(event);
    setScrambles(prev => [...prev, newScramble]);
    setCurrentIndex(prev => prev + 1);
  }, [event]);

  const nextScramble = useCallback(() => {
    if (currentIndex < scrambles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Generate new scramble if at the end
      generateScramble();
    }
  }, [currentIndex, scrambles.length, generateScramble]);

  const previousScramble = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  // Reset scrambles when event changes
  useEffect(() => {
    setScrambles([]);
    setCurrentIndex(-1);
  }, [event]);

  const canGoPrevious = currentIndex > 0;
  const canGoNext = true; // Can always go next (generates new if needed)

  return {
    scramble: currentScramble,
    generateScramble,
    nextScramble,
    previousScramble,
    canGoPrevious,
    canGoNext
  };
};