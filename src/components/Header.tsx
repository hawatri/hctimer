import React from 'react';
import { Settings, Download, Upload } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
  onExport: () => void;
  onImport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick, onExport, onImport }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-white">HCTimer</h1>
          <span className="text-sm text-gray-400">Speedcubing Timer</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onImport}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Import Session"
          >
            <Upload className="w-5 h-5" />
          </button>
          <button
            onClick={onExport}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Export Session"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={onSettingsClick}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};