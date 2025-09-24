import React from 'react';
import { Settings, Download, Upload } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  onSettingsClick: () => void;
  onExport: () => void;
  onImport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick, onExport, onImport }) => {
  return (
    <header className="glass-dark border-b sticky top-0 z-40" style={{ borderColor: 'var(--border-color)' }}>
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold ui-font" style={{ color: 'var(--text-primary)' }}>HCTimer</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
          <div className="flex items-center space-x-2">
            <button
              onClick={onImport}
              className="p-3 hover:bg-white/10 rounded-lg transition-all"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              title="Import"
            >
              <Upload className="w-5 h-5" />
            </button>
            <button
              onClick={onExport}
              className="p-3 hover:bg-white/10 rounded-lg transition-all"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              title="Export"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onSettingsClick}
              className="p-3 hover:bg-white/10 rounded-lg transition-all"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};