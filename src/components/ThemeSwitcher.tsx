import React from 'react';
import { Sun, Moon, Eye } from 'lucide-react';
import { useTheme, Theme } from '../hooks/useTheme';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes: { key: Theme; icon: React.ReactNode; label: string }[] = [
    { key: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
    { key: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { key: 'high-contrast', icon: <Eye className="w-4 h-4" />, label: 'High Contrast' },
  ];

  return (
    <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-lg p-1">
      {themes.map(({ key, icon, label }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ui-font ${
            theme === key
              ? 'bg-white/20 text-white shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title={label}
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};