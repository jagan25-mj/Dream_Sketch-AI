export interface GenerationParameters {
  steps: number;
  guidance: number;
  width: number;
  height: number;
  seed?: number;
  strength?: number;
  upscale?: boolean;
  upscaleFactor?: number;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  vramReq: string;
  bestFor: string;
  type: 'base' | 'lora' | 'controlnet';
}

export interface GenerationRequest {
  model: string;
  mode: 'txt2img' | 'img2img';
  prompt: string;
  negativePrompt?: string;
  parameters: GenerationParameters;
  image?: File;
}

export interface GenerationResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  resultUrl?: string;
  errorMessage?: string;
  metadata?: {
    model: string;
    prompt: string;
    parameters: GenerationParameters;
    processingTime?: number;
    memoryUsed?: number;
  };
}

export interface SystemStatus {
  status: 'healthy' | 'degraded' | 'error';
  gpu: {
    available: boolean;
    name?: string;
    memory?: {
      total: number;
      used: number;
      free: number;
    };
  };
  models: {
    loaded: string[];
    available: string[];
  };
  queue: {
    pending: number;
    processing: number;
  };
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  icon: string;
  parameters: Partial<GenerationParameters>;
}

export type Theme = 'light' | 'dark';
export type ViewMode = 'grid' | 'masonry' | 'list';
export type SortMode = 'newest' | 'oldest' | 'popular' | 'model';
export type FilterMode = 'all' | 'txt2img' | 'img2img' | 'upscaled';