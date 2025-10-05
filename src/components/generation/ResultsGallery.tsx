import React from 'react';
import { Download, RotateCcw, Copy, Trash2, Clock } from 'lucide-react';
import { useGeneration } from '../../contexts/GenerationContext';

const ResultsGallery: React.FC = () => {
  const { jobs } = useGeneration();

  const completedJobs = jobs.filter(job => job.status === 'completed' && job.resultUrl);

  if (completedJobs.length === 0) {
    return (
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-primary-200 dark:border-gray-700 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Results</h3>
        <div className="text-center text-gray-500 dark:text-gray-400">
          <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No completed generations yet</p>
        </div>
      </div>
    );
  }

  const handleDownload = (job: any) => {
    if (job.resultUrl) {
      const link = document.createElement('a');
      link.href = job.resultUrl;
      link.download = `dreamsketch-${job.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-primary-200 dark:border-gray-700 p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Results</h3>
      
      <div className="space-y-4">
        {completedJobs.slice(0, 5).map((job) => (
          <div key={job.id} className="group">
            <div className="aspect-square rounded-lg overflow-hidden mb-2 relative bg-gray-100 dark:bg-gray-700">
              <img
                src={job.resultUrl}
                alt={job.prompt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownload(job)}
                    className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleCopyPrompt(job.prompt)}
                    className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
                    title="Copy prompt"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                "{job.prompt}"
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{job.model}</span>
                <span>{job.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {completedJobs.length > 5 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200">
            View All Results ({completedJobs.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsGallery;