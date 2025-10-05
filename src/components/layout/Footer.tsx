import React from 'react';
import { Heart, Github, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-t border-primary-200 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              DreamSketch AI
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Create stunning Ghibli-style artwork using state-of-the-art AI models. 
              Transform your imagination into beautiful visual art with our intuitive interface.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2">
                  <Github className="h-4 w-4" />
                  <span>Source Code</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Model Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
              Powered By
            </h4>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <p>• React + TypeScript</p>
              <p>• Django + PostgreSQL</p>
              <p>• PyTorch + Hugging Face</p>
              <p>• Stable Diffusion Models</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for the AI art community</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
            © 2024 DreamSketch AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;