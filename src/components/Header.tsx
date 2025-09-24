import React from 'react';
import { Settings, Download, Upload } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
  onExport: () => void;
  onImport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick, onExport, onImport }) => {
  return (
    <header className="glass-dark border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-white ui-font">HCTimer</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onImport}
            className="p-3 hover:bg-white/10 rounded-lg transition-all text-gray-300 hover:text-white"
            title="Import"
          >
            <Upload className="w-5 h-5" />
          </button>
          <button
            onClick={onExport}
            className="p-3 hover:bg-white/10 rounded-lg transition-all text-gray-300 hover:text-white"
            title="Export"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={onSettingsClick}
            className="p-3 hover:bg-white/10 rounded-lg transition-all text-gray-300 hover:text-white"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};