export const MODELS = {
  DREAMSHAPER_V8: 'dreamshaper-v8',
  ANYTHING_V5: 'anything-v5',
  SDXL: 'sdxl',
} as const;

export const MODEL_CONFIGS = {
  [MODELS.DREAMSHAPER_V8]: {
    id: MODELS.DREAMSHAPER_V8,
    name: 'DreamShaper v8',
    description: 'Best for Ghibli-style landscapes and magical scenes',
    vramReq: '6GB',
    bestFor: 'Fantasy art, landscapes',
    huggingFaceId: 'Lykon/dreamshaper-8',
  },
  [MODELS.ANYTHING_V5]: {
    id: MODELS.ANYTHING_V5,
    name: 'Anything v5',
    description: 'Excellent for anime portraits and character art',
    vramReq: '4GB',
    bestFor: 'Anime, portraits',
    huggingFaceId: 'Lykon/anything-v5-pruned',
  },
  [MODELS.SDXL]: {
    id: MODELS.SDXL,
    name: 'Stable Diffusion XL',
    description: 'High-quality renders with exceptional detail',
    vramReq: '12GB',
    bestFor: 'High resolution, detail',
    huggingFaceId: 'stabilityai/stable-diffusion-xl-base-1.0',
  },
} as const;

export const ASPECT_RATIOS = [
  { name: '1:1 Square', width: 512, height: 512 },
  { name: '4:3 Landscape', width: 512, height: 384 },
  { name: '3:4 Portrait', width: 384, height: 512 },
  { name: '16:9 Widescreen', width: 512, height: 288 },
  { name: '9:16 Vertical', width: 288, height: 512 },
  { name: '2:3 Portrait', width: 512, height: 768 },
  { name: '3:2 Landscape', width: 768, height: 512 },
] as const;

export const PRESETS = {
  SPEED: {
    id: 'speed',
    name: 'Speed',
    description: 'Fast generation, good quality',
    parameters: { steps: 12, guidance: 6, width: 512, height: 512 },
  },
  BALANCED: {
    id: 'balanced',
    name: 'Balanced',
    description: 'Good balance of speed and quality',
    parameters: { steps: 20, guidance: 7.5, width: 512, height: 512 },
  },
  QUALITY: {
    id: 'quality',
    name: 'Quality',
    description: 'High quality, slower generation',
    parameters: { steps: 30, guidance: 8, width: 768, height: 768 },
  },
  FAITHFUL: {
    id: 'faithful',
    name: 'Faithful',
    description: 'Closely follows prompt',
    parameters: { steps: 25, guidance: 12, width: 512, height: 512 },
  },
  STYLIZED: {
    id: 'stylized',
    name: 'Stylized',
    description: 'More creative interpretation',
    parameters: { steps: 20, guidance: 4, width: 512, height: 512 },
  },
} as const;

export const SUGGESTED_PROMPTS = [
  "A peaceful Ghibli village with floating islands and cherry blossoms in the sky",
  "Magical forest clearing with glowing mushrooms and friendly forest spirits",
  "Ancient castle on a hill overlooking a vast green valley, Studio Ghibli style",
  "Cozy cottage by a crystal lake with mountains in the background, warm sunset",
  "Flying airship over clouds with a young adventurer looking out the window",
  "Enchanted library with floating books and soft golden light streaming through windows",
  "Mystical garden with giant flowers and tiny fairies dancing in the moonlight",
  "Steampunk city in the clouds with brass gears and emerald steam, whimsical architecture",
] as const;

export const API_ENDPOINTS = {
  BASE_URL: '/api/v1',
  GENERATE_TXT2IMG: '/api/v1/generate/txt2img',
  GENERATE_IMG2IMG: '/api/v1/generate/img2img',
  STATUS: '/api/v1/status',
  MODELS: '/api/v1/models',
  RESULT: '/api/v1/result',
} as const;

export const FILE_CONSTRAINTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
  MIN_DIMENSION: 64,
  MAX_DIMENSION: 2048,
} as const;

export const GENERATION_LIMITS = {
  MIN_STEPS: 1,
  MAX_STEPS: 100,
  MIN_GUIDANCE: 0.5,
  MAX_GUIDANCE: 30,
  MIN_STRENGTH: 0.1,
  MAX_STRENGTH: 1.0,
  TIMEOUT: 300000, // 5 minutes
} as const;