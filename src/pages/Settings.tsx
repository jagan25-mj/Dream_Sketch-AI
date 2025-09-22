import React, { useState } from 'react';
import { Settings as SettingsIcon, Cpu as Gpu, HardDrive, Palette, Shield, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    defaultModel: 'dreamshaper-v8',
    defaultSteps: 20,
    defaultGuidance: 7.5,
    autoUpscale: false,
    saveMetadata: true,
    enableGPU: true,
    maxConcurrentJobs: 1,
    imageFormat: 'jpg',
    imageQuality: 90,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Settings
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Customize your DreamSketch AI experience
        </p>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-emerald-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Appearance
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Theme
              </label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Choose your preferred color scheme
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-lg font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/70 transition-colors duration-200"
            >
              {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
            </button>
          </div>
        </div>
      </div>

      {/* Generation Defaults */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-emerald-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <SettingsIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Generation Defaults
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Model
            </label>
            <select
              value={settings.defaultModel}
              onChange={(e) => handleSettingChange('defaultModel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="dreamshaper-v8">DreamShaper v8</option>
              <option value="anything-v5">Anything v5</option>
              <option value="sdxl">Stable Diffusion XL</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Steps: {settings.defaultSteps}
            </label>
            <input
              type="range"
              min="10"
              max="50"
              value={settings.defaultSteps}
              onChange={(e) => handleSettingChange('defaultSteps', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default CFG Scale: {settings.defaultGuidance}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={settings.defaultGuidance}
              onChange={(e) => handleSettingChange('defaultGuidance', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Auto Upscale
              </label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Automatically upscale all generations
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoUpscale}
                onChange={(e) => handleSettingChange('autoUpscale', e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                settings.autoUpscale ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  settings.autoUpscale ? 'translate-x-5' : 'translate-x-0'
                } mt-0.5 ml-0.5`} />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Performance Settings */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-emerald-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Gpu className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Performance
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable GPU Acceleration
              </label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Use CUDA for faster generation (requires compatible GPU)
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableGPU}
                onChange={(e) => handleSettingChange('enableGPU', e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                settings.enableGPU ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  settings.enableGPU ? 'translate-x-5' : 'translate-x-0'
                } mt-0.5 ml-0.5`} />
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Max Concurrent Jobs: {settings.maxConcurrentJobs}
            </label>
            <input
              type="range"
              min="1"
              max="4"
              value={settings.maxConcurrentJobs}
              onChange={(e) => handleSettingChange('maxConcurrentJobs', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Higher values use more VRAM but allow parallel generation
            </p>
          </div>
        </div>
      </div>

      {/* Output Settings */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-emerald-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <HardDrive className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Output Settings
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image Format
            </label>
            <select
              value={settings.imageFormat}
              onChange={(e) => handleSettingChange('imageFormat', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="jpg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image Quality: {settings.imageQuality}%
            </label>
            <input
              type="range"
              min="60"
              max="100"
              value={settings.imageQuality}
              onChange={(e) => handleSettingChange('imageQuality', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Save Generation Metadata
              </label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Embed generation parameters in image files
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.saveMetadata}
                onChange={(e) => handleSettingChange('saveMetadata', e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                settings.saveMetadata ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  settings.saveMetadata ? 'translate-x-5' : 'translate-x-0'
                } mt-0.5 ml-0.5`} />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-emerald-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Actions
          </h3>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/70 transition-colors duration-200">
            <Download className="h-5 w-5" />
            <span>Export Settings</span>
          </button>

          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
            <Shield className="h-5 w-5" />
            <span>Reset to Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;