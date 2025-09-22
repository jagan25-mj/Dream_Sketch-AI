import { GenerationParameters } from '../types';
import { FILE_CONSTRAINTS, GENERATION_LIMITS } from './constants';

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validatePrompt(prompt: string): void {
  if (!prompt.trim()) {
    throw new ValidationError('Prompt is required', 'prompt');
  }

  if (prompt.length > 1000) {
    throw new ValidationError('Prompt must be less than 1000 characters', 'prompt');
  }

  // Check for potentially harmful content
  const blockedTerms = ['explicit', 'nsfw', 'violence'];
  const lowerPrompt = prompt.toLowerCase();
  for (const term of blockedTerms) {
    if (lowerPrompt.includes(term)) {
      throw new ValidationError(`Prompt contains blocked term: ${term}`, 'prompt');
    }
  }
}

export function validateParameters(params: GenerationParameters): void {
  if (params.steps < GENERATION_LIMITS.MIN_STEPS || params.steps > GENERATION_LIMITS.MAX_STEPS) {
    throw new ValidationError(
      `Steps must be between ${GENERATION_LIMITS.MIN_STEPS} and ${GENERATION_LIMITS.MAX_STEPS}`,
      'steps'
    );
  }

  if (params.guidance < GENERATION_LIMITS.MIN_GUIDANCE || params.guidance > GENERATION_LIMITS.MAX_GUIDANCE) {
    throw new ValidationError(
      `CFG Scale must be between ${GENERATION_LIMITS.MIN_GUIDANCE} and ${GENERATION_LIMITS.MAX_GUIDANCE}`,
      'guidance'
    );
  }

  if (params.width % 8 !== 0 || params.height % 8 !== 0) {
    throw new ValidationError('Width and height must be divisible by 8', 'dimensions');
  }

  if (params.width < 64 || params.height < 64 || params.width > 2048 || params.height > 2048) {
    throw new ValidationError('Dimensions must be between 64x64 and 2048x2048', 'dimensions');
  }

  if (params.strength !== undefined) {
    if (params.strength < GENERATION_LIMITS.MIN_STRENGTH || params.strength > GENERATION_LIMITS.MAX_STRENGTH) {
      throw new ValidationError(
        `Strength must be between ${GENERATION_LIMITS.MIN_STRENGTH} and ${GENERATION_LIMITS.MAX_STRENGTH}`,
        'strength'
      );
    }
  }

  if (params.seed !== undefined) {
    if (params.seed < 0 || params.seed > 2147483647) {
      throw new ValidationError('Seed must be between 0 and 2147483647', 'seed');
    }
  }
}

export function validateImageFile(file: File): void {
  if (!FILE_CONSTRAINTS.SUPPORTED_FORMATS.includes(file.type)) {
    throw new ValidationError(
      `Unsupported file format. Supported formats: ${FILE_CONSTRAINTS.SUPPORTED_FORMATS.join(', ')}`,
      'file'
    );
  }

  if (file.size > FILE_CONSTRAINTS.MAX_FILE_SIZE) {
    const maxSizeMB = FILE_CONSTRAINTS.MAX_FILE_SIZE / (1024 * 1024);
    throw new ValidationError(`File size must be less than ${maxSizeMB}MB`, 'file');
  }
}

export async function validateImageDimensions(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      
      if (img.width < FILE_CONSTRAINTS.MIN_DIMENSION || img.height < FILE_CONSTRAINTS.MIN_DIMENSION) {
        reject(new ValidationError(
          `Image dimensions must be at least ${FILE_CONSTRAINTS.MIN_DIMENSION}x${FILE_CONSTRAINTS.MIN_DIMENSION}`,
          'dimensions'
        ));
      } else if (img.width > FILE_CONSTRAINTS.MAX_DIMENSION || img.height > FILE_CONSTRAINTS.MAX_DIMENSION) {
        reject(new ValidationError(
          `Image dimensions must not exceed ${FILE_CONSTRAINTS.MAX_DIMENSION}x${FILE_CONSTRAINTS.MAX_DIMENSION}`,
          'dimensions'
        ));
      } else {
        resolve();
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new ValidationError('Invalid image file', 'file'));
    };

    img.src = url;
  });
}

export function sanitizePrompt(prompt: string): string {
  return prompt
    .trim()
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Truncate to max length
}

export function validateModel(model: string): void {
  const validModels = ['dreamshaper-v8', 'anything-v5', 'sdxl'];
  if (!validModels.includes(model)) {
    throw new ValidationError(`Invalid model. Must be one of: ${validModels.join(', ')}`, 'model');
  }
}