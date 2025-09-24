import React from 'react';
import { X } from 'lucide-react';

interface SettingsPanelProps {
  settings: any;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Inspection Time
            </label>
            <select 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              value={settings.inspectionTime}
              onChange={(e) => settings.setInspectionTime(parseInt(e.target.value))}
            >
              <option value={0}>Disabled</option>
              <option value={8}>8 seconds</option>
              <option value={15}>15 seconds</option>
            </select>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.showMilliseconds}
                onChange={(e) => settings.setShowMilliseconds(e.target.checked)}
                className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-300">Show milliseconds</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.hideTime}
                onChange={(e) => settings.setHideTime(e.target.checked)}
                className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-300">Hide time while solving</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.enableSound}
                onChange={(e) => settings.setEnableSound(e.target.checked)}
                className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-300">Enable sound effects</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};