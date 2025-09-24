import { useState, useEffect, useRef, useCallback } from 'react';

type TimerState = 'stopped' | 'preparing' | 'ready' | 'running';

export const useTimer = (settings: any) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>('stopped');
  
  const startTimeRef = useRef<number>(0);
  const prepareTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (!isReady) return null;
    
    setIsRunning(true);
    setIsReady(false);
    setTimerState('running');
    startTimeRef.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      setCurrentTime(Date.now() - startTimeRef.current);
    }, 10);
  }, [isReady]);

  const stopTimer = useCallback(() => {
    if (!isRunning) return null;
    
    const finalTime = Date.now() - startTimeRef.current;
    setIsRunning(false);
    setTimerState('stopped');
    setCurrentTime(finalTime);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    return finalTime;
  }, [isRunning]);

  const resetTimer = useCallback(() => {
    setCurrentTime(0);
    setIsRunning(false);
    setIsReady(false);
    setTimerState('stopped');
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (prepareTimeoutRef.current) {
      clearTimeout(prepareTimeoutRef.current);
      prepareTimeoutRef.current = null;
    }
  }, []);

  const prepareTimer = useCallback(() => {
    if (isRunning) return;
    
    setCurrentTime(0); // Reset display time
    setTimerState('preparing');
    setIsReady(false);
    
    prepareTimeoutRef.current = setTimeout(() => {
      setTimerState('ready');
      setIsReady(true);
    }, 300);
  }, [isRunning]);

  const cancelPrepare = useCallback(() => {
    if (prepareTimeoutRef.current) {
      clearTimeout(prepareTimeoutRef.current);
      prepareTimeoutRef.current = null;
    }
    setTimerState('stopped');
    setIsReady(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (prepareTimeoutRef.current) clearTimeout(prepareTimeoutRef.current);
    };
  }, []);

  return {
    currentTime,
    isRunning,
    isReady,
    timerState,
    startTimer,
    stopTimer,
    resetTimer,
    prepareTimer,
    cancelPrepare
  };
};