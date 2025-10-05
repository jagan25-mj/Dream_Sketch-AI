import React from 'react';
import { Wand2 } from 'lucide-react';

const suggestedPrompts = [
  "A peaceful Ghibli village with floating islands and cherry blossoms in the sky",
  "Magical forest clearing with glowing mushrooms and friendly forest spirits",
  "Ancient castle on a hill overlooking a vast green valley, Studio Ghibli style",
  "Cozy cottage by a crystal lake with mountains in the background, warm sunset",
  "Flying airship over clouds with a young adventurer looking out the window"
];

interface SuggestedPromptsProps {
  onPromptSelect?: (prompt: string) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onPromptSelect }) => {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-primary-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Wand2 className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Suggested Prompts
        </h3>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Click on any prompt to get started with your magical creations
      </p>

      <div className="grid grid-cols-1 gap-2">
        {suggestedPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptSelect?.(prompt)}
            className="text-left p-3 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 border border-primary-200 dark:border-primary-800 rounded-lg transition-all duration-200 group"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white">
              "{prompt}"
            </p>
          </button>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          💡 Tip: Add details like "soft lighting", "detailed", or "masterpiece" to enhance your results
        </p>
      </div>
    </div>
  );
};

export default SuggestedPrompts;