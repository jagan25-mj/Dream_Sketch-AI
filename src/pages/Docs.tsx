import React from 'react';
import { Book, Code, Server, Cpu, ExternalLink, Download } from 'lucide-react';

const Docs: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Documentation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Everything you need to know about DreamSketch AI
        </p>
      </div>

      {/* Quick Start */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-emerald-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Book className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quick Start Guide</h2>
        </div>

        <div className="prose prose-emerald dark:prose-invert max-w-none">
          <h3>Getting Started</h3>
          <ol className="space-y-2">
            <li>Choose your generation mode (Text-to-Image or Image-to-Image)</li>
            <li>Select an AI model that fits your artistic style</li>
            <li>Write a descriptive prompt for your desired image</li>
            <li>Adjust parameters or use quick presets</li>
            <li>Click "Generate Image" and watch the magic happen!</li>
          </ol>

          <h3>Tips for Better Results</h3>
          <ul className="space-y-1">
            <li>Be specific and descriptive in your prompts</li>
            <li>Use style keywords like "Studio Ghibli", "detailed", "masterpiece"</li>
            <li>Experiment with negative prompts to avoid unwanted elements</li>
            <li>Try different CFG scales: lower for creativity, higher for prompt adherence</li>
            <li>Use seeds to reproduce and refine favorite generations</li>
          </ul>
        </div>
      </div>

      {/* Models */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-emerald-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Cpu className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Models</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
                DreamShaper v8
              </h3>
              <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                Perfect for Ghibli-style landscapes and magical scenes
              </p>
              <ul className="text-xs text-emerald-600 dark:text-emerald-400 space-y-1">
                <li>• Best for: Fantasy art, landscapes, magical scenes</li>
                <li>• VRAM: 6GB recommended</li>
                <li>• Specialty: Painterly, dreamy aesthetics</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                Anything v5
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
                Excellent for anime portraits and character art
              </p>
              <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                <li>• Best for: Anime, portraits, characters</li>
                <li>• VRAM: 4GB recommended</li>
                <li>• Specialty: Clean anime aesthetics</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                Stable Diffusion XL
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-400 mb-2">
                High-quality renders with exceptional detail
              </p>
              <ul className="text-xs text-purple-600 dark:text-purple-400 space-y-1">
                <li>• Best for: High resolution, detailed artwork</li>
                <li>• VRAM: 12GB recommended</li>
                <li>• Specialty: Photo-realistic detail</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Parameters Guide */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-emerald-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Code className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Parameters Guide</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Steps</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Number of denoising iterations
              </p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• 10-15: Fast, lower quality</li>
                <li>• 20-25: Balanced quality/speed</li>
                <li>• 30-50: High quality, slower</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">CFG Scale</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                How closely to follow the prompt
              </p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• 1-5: Very creative, loose interpretation</li>
                <li>• 6-10: Balanced creativity and adherence</li>
                <li>• 11-20: Strict prompt following</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Strength (img2img)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                How much to change the input image
              </p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• 0.1-0.4: Conservative changes</li>
                <li>• 0.5-0.7: Balanced transformation</li>
                <li>• 0.8-1.0: Major changes, creative</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Seed</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Controls randomness. Same seed + parameters = same result. 
                Use to reproduce or refine favorite generations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Installation Guide */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-emerald-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Server className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Installation & Setup</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Prerequisites</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Python 3.10 or 3.11 (3.12+ not recommended)</li>
              <li>• Node.js 18+ for frontend development</li>
              <li>• NVIDIA GPU with 6GB+ VRAM (optional but recommended)</li>
              <li>• CUDA 11.8+ for GPU acceleration</li>
              <li>• Docker & Docker Compose (for containerized deployment)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-6">Quick Setup</h3>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-800 dark:text-gray-200">
{`# Clone repository
git clone <repository-url>
cd dreamsketch-ai

# Run setup script
./setup.sh  # Linux/macOS
setup.bat   # Windows

# Start with Docker
docker-compose up`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Project Structure</h3>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-800 dark:text-gray-200">
{`dreamsketch-ai/
├── frontend/          # React app
├── backend/          # Django API
├── ml/              # ML models & inference
├── docker/          # Docker configs
├── docs/            # Documentation
├── tests/           # Test suites
├── scripts/         # Setup & utility scripts
└── docker-compose.yml`}
              </pre>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-4">Environment Setup</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Copy <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.env.example</code> to <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.env</code></li>
              <li>• Configure database settings</li>
              <li>• Set Hugging Face token for model downloads</li>
              <li>• Adjust CUDA settings for your GPU</li>
            </ul>
          </div>
        </div>
      </div>

      {/* API Reference */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-emerald-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">API Reference</h2>
          </div>
          <a
            href="#"
            className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200"
          >
            <span>Full API Docs</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded text-xs font-medium">POST</span>
              <code className="text-sm font-mono">/api/v1/generate/txt2img</code>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Generate image from text prompt</p>
            <details className="cursor-pointer">
              <summary className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
                View example payload
              </summary>
              <div className="mt-2 bg-gray-100 dark:bg-gray-800 rounded p-3 font-mono text-xs overflow-x-auto">
                <pre>{`{
  "model": "dreamshaper-v8",
  "prompt": "A magical forest clearing...",
  "negative_prompt": "blurry, low quality",
  "steps": 20,
  "guidance": 7.5,
  "width": 512,
  "height": 512,
  "seed": 42,
  "upscale": false
}`}</pre>
              </div>
            </details>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded text-xs font-medium">POST</span>
              <code className="text-sm font-mono">/api/v1/generate/img2img</code>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Transform existing image with text prompt</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded text-xs font-medium">GET</span>
              <code className="text-sm font-mono">/api/v1/status</code>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Check system health and GPU availability</p>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-emerald-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Additional Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="#" className="flex items-center space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors duration-200">
            <Download className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h3 className="font-medium text-emerald-800 dark:text-emerald-300">Model Downloads</h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">Pre-trained models & weights</p>
            </div>
          </a>

          <a href="#" className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200">
            <Book className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="font-medium text-blue-800 dark:text-blue-300">Tutorials</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400">Step-by-step guides</p>
            </div>
          </a>

          <a href="#" className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200">
            <ExternalLink className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <div>
              <h3 className="font-medium text-purple-800 dark:text-purple-300">Community</h3>
              <p className="text-xs text-purple-600 dark:text-purple-400">Discord & GitHub</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Docs;