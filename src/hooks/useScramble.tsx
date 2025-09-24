import { useState, useCallback } from 'react';
import { generateScrambleForEvent } from '../utils/scrambleGenerator';

export const useScramble = (event: string) => {
  const [scramble, setScramble] = useState('');

  const generateScramble = useCallback(() => {
    const newScramble = generateScrambleForEvent(event);
    setScramble(newScramble);
  }, [event]);

  return {
    scramble,
    generateScramble
  };
};