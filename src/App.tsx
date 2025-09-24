import React, { useState, useEffect, useCallback } from 'react';
import { TimerDisplay } from './components/TimerDisplay';
import { ScrambleDisplay } from './components/ScrambleDisplay';
import { SessionStats } from './components/SessionStats';
import { TimesList } from './components/TimesList';
import { EventSelector } from './components/EventSelector';
import { SettingsPanel } from './components/SettingsPanel';
import { Header } from './components/Header';
import { useTimer } from './hooks/useTimer';
import { useScramble } from './hooks/useScramble';
import { useSession } from './hooks/useSession';
import { useSettings } from './hooks/useSettings';
import { useKeyboard } from './hooks/useKeyboard';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [currentEvent, setCurrentEvent] = useState('333');
  
  const settings = useSettings();
  const { currentTime, isRunning, isReady, timerState, startTimer, stopTimer, resetTimer, prepareTimer, cancelPrepare } = useTimer(settings);
  const { scramble, generateScramble } = useScramble(currentEvent);
  const { session, addTime, deleteTime, clearSession, getStats } = useSession(currentEvent);

  // Generate initial scramble
  useEffect(() => {
    generateScramble();
  }, [currentEvent, generateScramble]);

  // Handle timer completion
  const handleTimerComplete = useCallback((time: number) => {
    addTime(time, scramble);
    generateScramble();
  }, [addTime, scramble, generateScramble]);

  // Keyboard controls
  useKeyboard({
    onSpaceDown: () => {
      if (isRunning) {
        const finalTime = stopTimer();
        if (finalTime) {
          handleTimerComplete(finalTime);
        }
      } else if (timerState === 'preparing' || timerState === 'ready') {
        // Cancel preparation if space is pressed again
        cancelPrepare();
      }
    },
    onSpaceHold: () => {
      if (!isRunning && timerState === 'stopped') {
        // Start preparing after holding space for 300ms
        prepareTimer();
      }
    },
    onSpaceUp: () => {
      if (isReady && !isRunning && timerState === 'ready') {
        startTimer();
      }
    }
  });

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        onSettingsClick={() => setShowSettings(true)}
        onExport={() => {/* TODO: Implement export */}}
        onImport={() => {/* TODO: Implement import */}}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Event Selector & Stats */}
          <div className="space-y-6">
            <EventSelector 
              currentEvent={currentEvent}
              onEventChange={setCurrentEvent}
            />
            <SessionStats stats={stats} />
          </div>

          {/* Center Column - Timer & Scramble */}
          <div className="lg:col-span-1 space-y-6">
            <ScrambleDisplay scramble={scramble} />
            <TimerDisplay 
              time={currentTime}
              isRunning={isRunning}
              isReady={isReady}
              timerState={timerState}
              settings={settings}
            />
            <div className="text-center text-sm text-gray-400">
              Hold SPACE to prepare, release to start
            </div>
          </div>

          {/* Right Column - Times List */}
          <div>
            <TimesList 
              times={session.times}
              onDeleteTime={deleteTime}
              onClearSession={clearSession}
            />
          </div>
        </div>
      </div>

      {showSettings && (
        <SettingsPanel 
          settings={settings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;