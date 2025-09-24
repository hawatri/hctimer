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
import { ThemeProvider } from './hooks/useTheme';

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const [showSettings, setShowSettings] = useState(false);
  const [currentEvent, setCurrentEvent] = useState('333');
  
  const settings = useSettings();
  const { currentTime, isRunning, isReady, timerState, startTimer, stopTimer, resetTimer, prepareTimer, cancelPrepare } = useTimer(settings);
  const { scramble, generateScramble, nextScramble, previousScramble, canGoNext, canGoPrevious } = useScramble(currentEvent);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <Header 
        onSettingsClick={() => setShowSettings(true)}
        onExport={() => {/* TODO: Implement export */}}
        onImport={() => {/* TODO: Implement import */}}
      />

      <div className="container mx-auto px-6 py-6">
        {/* Top section - Event Selector */}
        <div className="mb-8">
          <EventSelector 
            currentEvent={currentEvent}
            onEventChange={setCurrentEvent}
          />
        </div>

        {/* Main timer section */}
        <div className="text-center mb-10">
          <div className="mb-6">
            <ScrambleDisplay 
              scramble={scramble}
              onNextScramble={nextScramble}
              onPreviousScramble={previousScramble}
              canGoNext={canGoNext}
              canGoPrevious={canGoPrevious}
            />
          </div>
          <div className="mb-6">
            <TimerDisplay 
              time={currentTime}
              isRunning={isRunning}
              isReady={isReady}
              timerState={timerState}
              settings={settings}
            />
          </div>
          <div className="text-center text-base text-gray-400 mb-8 ui-font">
            Hold SPACE to prepare, release to start
          </div>
        </div>

        {/* Bottom section - Stats and Times side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <SessionStats stats={stats} />
          </div>
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