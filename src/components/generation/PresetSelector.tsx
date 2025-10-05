import React from 'react';
import { Zap, Scale, Crown, Target, Paintbrush } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  parameters: {
    steps: number;
    guidance: number;
    width: number;
    height: number;
  };
}

const presets: Preset[] = [
  {
    id: 'speed',
    name: 'Speed',
    description: 'Fast generation, good quality',
    icon: <Zap className="h-4 w-4" />,
    parameters: { steps: 12, guidance: 6, width: 512, height: 512 },
  },
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Good balance of speed and quality',
    icon: <Scale className="h-4 w-4" />,
    parameters: { steps: 20, guidance: 7.5, width: 512, height: 512 },
  },
  {
    id: 'quality',
    name: 'Quality',
    description: 'High quality, slower generation',
    icon: <Crown className="h-4 w-4" />,
    parameters: { steps: 30, guidance: 8, width: 768, height: 768 },
  },
  {
    id: 'faithful',
    name: 'Faithful',
    description: 'Closely follows prompt',
    icon: <Target className="h-4 w-4" />,
    parameters: { steps: 25, guidance: 12, width: 512, height: 512 },
  },
  {
    id: 'stylized',
    name: 'Stylized',
    description: 'More creative interpretation',
    icon: <Paintbrush className="h-4 w-4" />,
    parameters: { steps: 20, guidance: 4, width: 512, height: 512 },
  },
];

interface PresetSelectorProps {
  onPresetSelect: (parameters: any) => void;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({ onPresetSelect }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Quick Presets
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onPresetSelect(preset.parameters)}
            className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 group"
          >
            <div className="text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-200 mb-1">
              {preset.icon}
            </div>
            <span className="text-xs font-medium text-gray-900 dark:text-white">
              {preset.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight">
              {preset.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetSelector;