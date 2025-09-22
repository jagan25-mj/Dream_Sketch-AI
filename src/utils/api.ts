import { GenerationRequest, GenerationResponse, SystemStatus } from '../types';
import { API_ENDPOINTS } from './constants';

class APIClient {
  private baseURL: string;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async generateTxt2Img(request: GenerationRequest): Promise<GenerationResponse> {
    return this.request<GenerationResponse>(API_ENDPOINTS.GENERATE_TXT2IMG, {
      method: 'POST',
      body: JSON.stringify({
        model: request.model,
        prompt: request.prompt,
        negative_prompt: request.negativePrompt,
        steps: request.parameters.steps,
        guidance: request.parameters.guidance,
        width: request.parameters.width,
        height: request.parameters.height,
        seed: request.parameters.seed,
        upscale: request.parameters.upscale,
        upscale_factor: request.parameters.upscaleFactor,
      }),
    });
  }

  async generateImg2Img(request: GenerationRequest): Promise<GenerationResponse> {
    const formData = new FormData();
    formData.append('model', request.model);
    formData.append('prompt', request.prompt);
    if (request.negativePrompt) {
      formData.append('negative_prompt', request.negativePrompt);
    }
    formData.append('steps', request.parameters.steps.toString());
    formData.append('guidance', request.parameters.guidance.toString());
    formData.append('strength', request.parameters.strength?.toString() || '0.75');
    if (request.parameters.seed) {
      formData.append('seed', request.parameters.seed.toString());
    }
    if (request.image) {
      formData.append('image', request.image);
    }
    formData.append('upscale', request.parameters.upscale?.toString() || 'false');
    if (request.parameters.upscaleFactor) {
      formData.append('upscale_factor', request.parameters.upscaleFactor.toString());
    }

    const response = await fetch(`${this.baseURL}${API_ENDPOINTS.GENERATE_IMG2IMG}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async getStatus(): Promise<SystemStatus> {
    return this.request<SystemStatus>(API_ENDPOINTS.STATUS);
  }

  async getModels(): Promise<any[]> {
    return this.request<any[]>(API_ENDPOINTS.MODELS);
  }

  async getResult(id: string): Promise<GenerationResponse> {
    return this.request<GenerationResponse>(`${API_ENDPOINTS.RESULT}/${id}`);
  }
}

// Create a singleton instance
export const apiClient = new APIClient();

// Mock API for development
export class MockAPIClient extends APIClient {
  private jobsMap = new Map<string, GenerationResponse>();

  async generateTxt2Img(request: GenerationRequest): Promise<GenerationResponse> {
    const id = Math.random().toString(36).substr(2, 9);
    const response: GenerationResponse = {
      id,
      status: 'pending',
      progress: 0,
    };

    this.jobsMap.set(id, response);
    this.simulateGeneration(id);
    return response;
  }

  async generateImg2Img(request: GenerationRequest): Promise<GenerationResponse> {
    return this.generateTxt2Img(request); // Same simulation for demo
  }

  private simulateGeneration(id: string) {
    const job = this.jobsMap.get(id);
    if (!job) return;

    setTimeout(() => {
      if (this.jobsMap.has(id)) {
        this.jobsMap.set(id, { ...job, status: 'processing' });
      }

      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
          
          setTimeout(() => {
            if (this.jobsMap.has(id)) {
              this.jobsMap.set(id, {
                ...job,
                status: 'completed',
                progress: 100,
                resultUrl: `https://picsum.photos/seed/${id}/512/512`,
              });
            }
          }, 500);
        }
        
        if (this.jobsMap.has(id)) {
          this.jobsMap.set(id, { ...job, progress: Math.min(progress, 100) });
        }
      }, 200);
    }, 1000);
  }

  async getStatus(): Promise<SystemStatus> {
    return {
      status: 'healthy',
      gpu: {
        available: true,
        name: 'NVIDIA RTX 4090',
        memory: { total: 24576, used: 8192, free: 16384 }
      },
      models: {
        loaded: ['dreamshaper-v8'],
        available: ['dreamshaper-v8', 'anything-v5', 'sdxl']
      },
      queue: { pending: 0, processing: 1 }
    };
  }

  async getModels(): Promise<any[]> {
    return [
      { id: 'dreamshaper-v8', name: 'DreamShaper v8', vramReq: '6GB' },
      { id: 'anything-v5', name: 'Anything v5', vramReq: '4GB' },
      { id: 'sdxl', name: 'Stable Diffusion XL', vramReq: '12GB' },
    ];
  }

  async getResult(id: string): Promise<GenerationResponse> {
    const job = this.jobsMap.get(id);
    if (!job) {
      throw new Error('Job not found');
    }
    return job;
  }
}

// Use mock API in development
export const api = process.env.NODE_ENV === 'development' ? new MockAPIClient() : apiClient;