import { useState, useEffect, useCallback } from 'react';

interface Time {
  id: string;
  time: number;
  scramble: string;
  timestamp: number;
  penalty?: 'DNF' | '+2';
}

interface Session {
  times: Time[];
}

export const useSession = (event: string) => {
  const [sessions, setSessions] = useState<Record<string, Session>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  
  const currentSession = sessions[event] || { times: [] };

  // Load sessions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hctimer-sessions');
      if (stored) {
        const parsedSessions = JSON.parse(stored);
        setSessions(parsedSessions);
      }
    } catch (error) {
      console.error('Failed to load sessions from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save sessions to localStorage whenever they change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('hctimer-sessions', JSON.stringify(sessions));
      } catch (error) {
        console.error('Failed to save sessions to localStorage:', error);
      }
    }
  }, [sessions, isLoaded]);

  const addTime = useCallback((time: number, scramble: string) => {
    const newTime: Time = {
      id: Date.now().toString(),
      time,
      scramble,
      timestamp: Date.now()
    };

    setSessions(prev => ({
      ...prev,
      [event]: {
        times: [...(prev[event]?.times || []), newTime]
      }
    }));
  }, [event]);

  const deleteTime = useCallback((id: string) => {
    setSessions(prev => ({
      ...prev,
      [event]: {
        times: prev[event]?.times.filter(t => t.id !== id) || []
      }
    }));
  }, [event]);

  const clearSession = useCallback(() => {
    setSessions(prev => ({
      ...prev,
      [event]: { times: [] }
    }));
  }, [event]);

  const getStats = useCallback(() => {
    const times = currentSession.times.map(t => t.time).sort((a, b) => a - b);
    const count = times.length;

    if (count === 0) {
      return { count: 0 };
    }

    const best = Math.min(...times);
    const worst = Math.max(...times);
    const mean = times.reduce((sum, time) => sum + time, 0) / count;

    // Calculate averages (removing best and worst)
    const calculateAverage = (arr: number[]) => {
      if (arr.length < 3) return undefined;
      const sorted = [...arr].sort((a, b) => a - b);
      const trimmed = sorted.slice(1, -1);
      return trimmed.reduce((sum, time) => sum + time, 0) / trimmed.length;
    };

    const recentTimes = currentSession.times.slice(-100).map(t => t.time);
    const ao5 = recentTimes.length >= 5 ? calculateAverage(recentTimes.slice(-5)) : undefined;
    const ao12 = recentTimes.length >= 12 ? calculateAverage(recentTimes.slice(-12)) : undefined;
    const ao100 = recentTimes.length >= 100 ? calculateAverage(recentTimes) : undefined;

    return {
      count,
      best,
      worst,
      mean,
      ao5,
      ao12,
      ao100
    };
  }, [currentSession]);

  return {
    session: currentSession,
    addTime,
    deleteTime,
    clearSession,
    getStats
  };
};