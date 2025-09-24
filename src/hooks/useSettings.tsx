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

  // Load settings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('hctimer-settings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('hctimer-settings', JSON.stringify(settings));
  }, [settings]);

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