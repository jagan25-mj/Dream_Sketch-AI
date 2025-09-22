import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface GenerationJob {
  id: string;
  model: string;
  mode: 'txt2img' | 'img2img';
  prompt: string;
  negativePrompt?: string;
  parameters: {
    steps: number;
    guidance: number;
    width: number;
    height: number;
    seed?: number;
    strength?: number;
    upscale?: boolean;
    upscaleFactor?: number;
  };
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  resultUrl?: string;
  errorMessage?: string;
  createdAt: Date;
}

interface GenerationContextType {
  jobs: GenerationJob[];
  activeJob: GenerationJob | null;
  addJob: (job: Omit<GenerationJob, 'id' | 'status' | 'progress' | 'createdAt'>) => void;
  updateJob: (id: string, updates: Partial<GenerationJob>) => void;
  clearJobs: () => void;
}

const GenerationContext = createContext<GenerationContextType | undefined>(undefined);

export const useGeneration = () => {
  const context = useContext(GenerationContext);
  if (!context) {
    throw new Error('useGeneration must be used within a GenerationProvider');
  }
  return context;
};

interface GenerationProviderProps {
  children: ReactNode;
}

export const GenerationProvider: React.FC<GenerationProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<GenerationJob[]>([]);
  const [activeJob, setActiveJob] = useState<GenerationJob | null>(null);

  const addJob = (jobData: Omit<GenerationJob, 'id' | 'status' | 'progress' | 'createdAt'>) => {
    const newJob: GenerationJob = {
      ...jobData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      progress: 0,
      createdAt: new Date(),
    };

    setJobs(prev => [newJob, ...prev]);
    setActiveJob(newJob);

    // Simulate processing
    setTimeout(() => {
      setActiveJob(current => current ? { ...current, status: 'processing' } : null);
      updateJob(newJob.id, { status: 'processing' });

      // Simulate progress updates
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
          
          // Simulate completion with mock image
          setTimeout(() => {
            updateJob(newJob.id, { 
              status: 'completed', 
              progress: 100,
              resultUrl: `https://picsum.photos/seed/${newJob.id}/512/512`
            });
            setActiveJob(null);
          }, 500);
        }
        updateJob(newJob.id, { progress: Math.min(progress, 100) });
      }, 200);
    }, 1000);
  };

  const updateJob = (id: string, updates: Partial<GenerationJob>) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, ...updates } : job
    ));
  };

  const clearJobs = () => {
    setJobs([]);
    setActiveJob(null);
  };

  return (
    <GenerationContext.Provider value={{
      jobs,
      activeJob,
      addJob,
      updateJob,
      clearJobs,
    }}>
      {children}
    </GenerationContext.Provider>
  );
};