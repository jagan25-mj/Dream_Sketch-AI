import React, { useState } from 'react';
import { Upload, Wand2, Image as ImageIcon, Settings, Sparkles } from 'lucide-react';
import { useGeneration } from '../../contexts/GenerationContext';
import ModelSelector from './ModelSelector';
import ParameterControls from './ParameterControls';
import PresetSelector from './PresetSelector';

const GenerationForm: React.FC = () => {
  const { addJob, activeJob } = useGeneration();
  const [mode, setMode] = useState<'txt2img' | 'img2img'>('txt2img');
  const [model, setModel] = useState('dreamshaper-v8');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [parameters, setParameters] = useState({
    steps: 20,
    guidance: 7.5,
    width: 512,
    height: 512,
    seed: undefined as number | undefined,
    strength: 0.75,
    upscale: false,
    upscaleFactor: 2,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    addJob({
      model,
      mode,
      prompt: prompt.trim(),
      negativePrompt: negativePrompt.trim() || undefined,
      parameters: {
        ...parameters,
        seed: parameters.seed || Math.floor(Math.random() * 1000000),
      },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setMode('img2img');
    }
  };

  const isGenerating = activeJob?.status === 'processing';

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-emerald-200 dark:border-gray-700 p-6 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mode Selector */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setMode('txt2img')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              mode === 'txt2img'
                ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-300 dark:border-emerald-600'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Wand2 className="h-5 w-5" />
            <span>Text to Image</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('img2img')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              mode === 'img2img'
                ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-300 dark:border-emerald-600'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <ImageIcon className="h-5 w-5" />
            <span>Image to Image</span>
          </button>
        </div>

        {/* Model Selection */}
        <ModelSelector selectedModel={model} onModelChange={setModel} />

        {/* Image Upload (for img2img mode) */}
        {mode === 'img2img' && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Source Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-emerald-300 dark:border-emerald-600 rounded-xl cursor-pointer bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors duration-200"
              >
                <Upload className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {uploadedImage ? uploadedImage.name : 'Click to upload or drag & drop'}
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Prompt */}
        <div className="space-y-3">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A magical forest clearing with floating lanterns, Studio Ghibli style..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            rows={3}
            required
          />
        </div>

        {/* Negative Prompt */}
        <div className="space-y-3">
          <label htmlFor="negative-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Negative Prompt (Optional)
          </label>
          <textarea
            id="negative-prompt"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder="blurry, low quality, distorted..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            rows={2}
          />
        </div>

        {/* Quick Presets */}
        <PresetSelector onPresetSelect={(preset) => setParameters({ ...parameters, ...preset })} />

        {/* Advanced Settings Toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200"
        >
          <Settings className="h-4 w-4" />
          <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Settings</span>
        </button>

        {/* Parameter Controls */}
        {showAdvanced && (
          <ParameterControls
            parameters={parameters}
            onParametersChange={setParameters}
            mode={mode}
          />
        )}

        {/* Generate Button */}
        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className="w-full flex items-center justify-center space-x-2 py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <Sparkles className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Generating...' : 'Generate Image'}</span>
        </button>
      </form>
    </div>
  );
};

export default GenerationForm;