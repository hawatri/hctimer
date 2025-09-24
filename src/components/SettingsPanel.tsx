import React from 'react';
import { X } from 'lucide-react';

interface SettingsPanelProps {
  settings: any;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass rounded-2xl p-8 w-full max-w-lg mx-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold ui-font" style={{ color: 'var(--text-primary)' }}>Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-base font-medium mb-3 ui-font" style={{ color: 'var(--text-secondary)' }}>
              Inspection Time
            </label>
            <select 
              className="w-full glass rounded-xl px-4 py-3 ui-font text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              style={{ 
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)'
              }}
              value={settings.inspectionTime}
              onChange={(e) => settings.setInspectionTime(parseInt(e.target.value))}
            >
              <option value={0}>Disabled</option>
              <option value={8}>8 seconds</option>
              <option value={15}>15 seconds</option>
            </select>
          </div>

          <div>
            <label className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={settings.showMilliseconds}
                onChange={(e) => settings.setShowMilliseconds(e.target.checked)}
                className="rounded glass text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0 w-5 h-5"
                style={{ borderColor: 'var(--border-color)' }}
              />
              <span className="ui-font text-base" style={{ color: 'var(--text-secondary)' }}>Show milliseconds</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={settings.hideTime}
                onChange={(e) => settings.setHideTime(e.target.checked)}
                className="rounded glass text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0 w-5 h-5"
                style={{ borderColor: 'var(--border-color)' }}
              />
              <span className="ui-font text-base" style={{ color: 'var(--text-secondary)' }}>Hide time while solving</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={settings.enableSound}
                onChange={(e) => settings.setEnableSound(e.target.checked)}
                className="rounded glass text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0 w-5 h-5"
                style={{ borderColor: 'var(--border-color)' }}
              />
              <span className="ui-font text-base" style={{ color: 'var(--text-secondary)' }}>Enable sound effects</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};