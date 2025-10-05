import React, { useState } from 'react';
import { Search, Filter, Download, Share2, Heart, Eye, Grid3x3 as Grid3X3, Grid2x2 as Grid2X2 } from 'lucide-react';
import { useGeneration } from '../contexts/GenerationContext';

const Gallery: React.FC = () => {
  const { jobs } = useGeneration();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  const completedJobs = jobs.filter(job => job.status === 'completed' && job.resultUrl);

  const filteredJobs = completedJobs.filter(job => {
    const matchesSearch = job.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModel = selectedModel === 'all' || job.model === selectedModel;
    return matchesSearch && matchesModel;
  });

  const models = ['all', ...Array.from(new Set(completedJobs.map(job => job.model)))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Gallery
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore your AI-generated artwork and discover the magic you've created
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-primary-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Model Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-[120px]"
            >
              {models.map((model) => (
                <option key={model} value={model}>
                  {model === 'all' ? 'All Models' : model}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'masonry'
                  ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Grid2X2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'result' : 'results'} found
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total generations: {completedJobs.length}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-primary-200 dark:border-gray-700 p-12 text-center">
          <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No images found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {completedJobs.length === 0 
              ? "Start generating some amazing artwork!" 
              : "Try adjusting your search filters"}
          </p>
        </div>
      ) : (
        <div className={`grid gap-4 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredJobs.map((job) => (
            <div key={job.id} className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Image */}
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={job.resultUrl}
                  alt={job.prompt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Actions */}
                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2 leading-relaxed">
                  "{job.prompt}"
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full">
                    {job.model}
                  </span>
                  <span>{job.createdAt.toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                  <span>{job.parameters.width}×{job.parameters.height}</span>
                  <span>{job.parameters.steps} steps</span>
                  <span>CFG {job.parameters.guidance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;