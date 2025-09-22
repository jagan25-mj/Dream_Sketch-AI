import React from 'react';
import GenerationForm from '../components/generation/GenerationForm';
import ProgressPanel from '../components/generation/ProgressPanel';
import ResultsGallery from '../components/generation/ResultsGallery';
import SuggestedPrompts from '../components/generation/SuggestedPrompts';

const Home: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Generation Panel */}
      <div className="lg:col-span-2 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Create Magical Art with AI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your imagination into stunning Ghibli-style artwork using our advanced AI models. 
            Perfect for artists, storytellers, and dreamers.
          </p>
        </div>

        <GenerationForm />
        <SuggestedPrompts />
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <ProgressPanel />
        <ResultsGallery />
      </div>
    </div>
  );
};

export default Home;