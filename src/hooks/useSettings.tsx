import { useState, useEffect } from 'react';

interface Settings {
  inspectionTime: number;
  showMilliseconds: boolean;
  hideTime: boolean;
  enableSound: boolean;
}

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    inspectionTime: 15,
    showMilliseconds: true,
    hideTime: false,
    enableSound: true
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hctimer-settings');
      if (stored) {
        const parsedSettings = JSON.parse(stored);
        setSettings(parsedSettings);
      }
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save settings to localStorage (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('hctimer-settings', JSON.stringify(settings));
      } catch (error) {
        console.error('Failed to save settings to localStorage:', error);
      }
    }
  }, [settings, isLoaded]);

  const updateSetting = (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return {
    ...settings,
    setInspectionTime: (value: number) => updateSetting('inspectionTime', value),
    setShowMilliseconds: (value: boolean) => updateSetting('showMilliseconds', value),
    setHideTime: (value: boolean) => updateSetting('hideTime', value),
    setEnableSound: (value: boolean) => updateSetting('enableSound', value)
  };
};