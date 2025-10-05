import React from 'react';
import { Clock, Zap, AlertCircle } from 'lucide-react';
import { useGeneration } from '../../contexts/GenerationContext';

const ProgressPanel: React.FC = () => {
  const { activeJob } = useGeneration();

  if (!activeJob) {
    return (
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-primary-200 dark:border-gray-700 p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No active generation</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (activeJob.status) {
      case 'processing':
        return <Zap className="h-5 w-5 text-primary-500 animate-pulse" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (activeJob.status) {
      case 'pending':
        return 'Queued';
      case 'processing':
        return 'Generating';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-primary-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-4">
        {getStatusIcon()}
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {getStatusText()}
        </h3>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Model: {activeJob.model}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            "{activeJob.prompt}"
          </p>
        </div>

        {activeJob.status === 'processing' && (
          <div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{Math.round(activeJob.progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${activeJob.progress}%` }}
              />
            </div>
          </div>
        )}

        {activeJob.status === 'failed' && activeJob.errorMessage && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-sm text-red-600 dark:text-red-400">
              {activeJob.errorMessage}
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>Steps: {activeJob.parameters.steps}</p>
          <p>CFG: {activeJob.parameters.guidance}</p>
          <p>Size: {activeJob.parameters.width}×{activeJob.parameters.height}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressPanel;