import React from 'react';
import { RotateCcw, ArrowUp } from 'lucide-react';

interface ParameterControlsProps {
  parameters: {
    steps: number;
    guidance: number;
    width: number;
    height: number;
    seed?: number;
    strength: number;
    upscale: boolean;
    upscaleFactor: number;
  };
  onParametersChange: (parameters: any) => void;
  mode: 'txt2img' | 'img2img';
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  parameters,
  onParametersChange,
  mode,
}) => {
  const updateParameter = (key: string, value: any) => {
    onParametersChange({ ...parameters, [key]: value });
  };

  const generateRandomSeed = () => {
    updateParameter('seed', Math.floor(Math.random() * 1000000));
  };

  const aspectRatios = [
    { name: '1:1', width: 512, height: 512 },
    { name: '4:3', width: 512, height: 384 },
    { name: '3:4', width: 384, height: 512 },
    { name: '16:9', width: 512, height: 288 },
    { name: '9:16', width: 288, height: 512 },
  ];

  return (
    <div className="space-y-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Steps and Guidance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Steps: {parameters.steps}
          </label>
          <input
            type="range"
            min="10"
            max="50"
            value={parameters.steps}
            onChange={(e) => updateParameter('steps', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Fast</span>
            <span>Quality</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            CFG Scale: {parameters.guidance}
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="0.5"
            value={parameters.guidance}
            onChange={(e) => updateParameter('guidance', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Creative</span>
            <span>Strict</span>
          </div>
        </div>
      </div>

      {/* Aspect Ratio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Aspect Ratio
        </label>
        <div className="flex space-x-2">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio.name}
              type="button"
              onClick={() => {
                updateParameter('width', ratio.width);
                updateParameter('height', ratio.height);
              }}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                parameters.width === ratio.width && parameters.height === ratio.height
                  ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500'
              }`}
            >
              {ratio.name}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Current: {parameters.width} × {parameters.height}
        </p>
      </div>

      {/* Strength (for img2img) */}
      {mode === 'img2img' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Strength: {parameters.strength}
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={parameters.strength}
            onChange={(e) => updateParameter('strength', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Conservative</span>
            <span>Creative</span>
          </div>
        </div>
      )}

      {/* Seed */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Seed
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={parameters.seed || ''}
            onChange={(e) => updateParameter('seed', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="Random"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={generateRandomSeed}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            title="Generate random seed"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Upscaling */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Upscale Result
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Enhance resolution using Real-ESRGAN
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={parameters.upscale}
              onChange={(e) => updateParameter('upscale', e.target.checked)}
              className="sr-only"
            />
            <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
              parameters.upscale ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                parameters.upscale ? 'translate-x-5' : 'translate-x-0'
              } mt-0.5 ml-0.5`} />
            </div>
          </label>
          {parameters.upscale && (
            <select
              value={parameters.upscaleFactor}
              onChange={(e) => updateParameter('upscaleFactor', parseInt(e.target.value))}
              className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value={2}>2×</option>
              <option value={4}>4×</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParameterControls;