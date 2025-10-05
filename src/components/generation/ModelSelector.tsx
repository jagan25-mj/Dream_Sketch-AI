import React from 'react';
import { Brain, Palette, Crown } from 'lucide-react';

interface Model {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  vramReq: string;
  bestFor: string;
}

const models: Model[] = [
  {
    id: 'dreamshaper-v8',
    name: 'DreamShaper v8',
    description: 'Best for Ghibli-style landscapes and magical scenes',
    icon: <Palette className="h-5 w-5" />,
    vramReq: '6GB',
    bestFor: 'Fantasy art, landscapes',
  },
  {
    id: 'anything-v5',
    name: 'Anything v5',
    description: 'Excellent for anime portraits and character art',
    icon: <Brain className="h-5 w-5" />,
    vramReq: '4GB',
    bestFor: 'Anime, portraits',
  },
  {
    id: 'sdxl',
    name: 'Stable Diffusion XL',
    description: 'High-quality renders with exceptional detail',
    icon: <Crown className="h-5 w-5" />,
    vramReq: '12GB',
    bestFor: 'High resolution, detail',
  },
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        AI Model
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {models.map((model) => (
          <button
            key={model.id}
            type="button"
            onClick={() => onModelChange(model.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedModel === model.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 dark:border-primary-400'
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary-300 dark:hover:border-primary-500'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className={`p-1 rounded ${selectedModel === model.id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>
                {model.icon}
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white">
                {model.name}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
              {model.description}
            </p>
            <div className="flex justify-between items-center text-xs">
              <span className="text-primary-600 dark:text-primary-400 font-medium">
                {model.bestFor}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {model.vramReq} VRAM
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;