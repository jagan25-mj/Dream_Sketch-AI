export const MODELS = {
  SDXL_TURBO: 'sdxl-turbo',
  SDXL_BASE: 'sdxl-base-1.0',
  PLAYGROUND: 'playground-v2.5',
  REALVISXL: 'realvisxl-v4',
  JUGGERNAUT: 'juggernaut-xl-v9',
  ANIMAGINE: 'animagine-xl-3.1',
} as const;

export const MODEL_CONFIGS = {
  [MODELS.SDXL_TURBO]: {
    id: MODELS.SDXL_TURBO,
    name: 'SDXL Turbo',
    description: 'Ultra-fast SDXL model (1-4 steps)',
    vramReq: '8GB',
    bestFor: 'Speed, iteration',
    huggingFaceId: 'stabilityai/sdxl-turbo',
  },
  [MODELS.SDXL_BASE]: {
    id: MODELS.SDXL_BASE,
    name: 'SDXL Base 1.0',
    description: 'Latest SDXL base model for high-quality images',
    vramReq: '12GB',
    bestFor: 'High quality, versatile',
    huggingFaceId: 'stabilityai/stable-diffusion-xl-base-1.0',
  },
  [MODELS.PLAYGROUND]: {
    id: MODELS.PLAYGROUND,
    name: 'Playground v2.5',
    description: 'Superior aesthetic quality',
    vramReq: '12GB',
    bestFor: 'Aesthetic, artistic',
    huggingFaceId: 'playgroundai/playground-v2.5-1024px-aesthetic',
  },
  [MODELS.REALVISXL]: {
    id: MODELS.REALVISXL,
    name: 'RealVisXL v4',
    description: 'Photorealistic SDXL model',
    vramReq: '12GB',
    bestFor: 'Photorealism, portraits',
    huggingFaceId: 'SG161222/RealVisXL_V4.0',
  },
  [MODELS.JUGGERNAUT]: {
    id: MODELS.JUGGERNAUT,
    name: 'Juggernaut XL v9',
    description: 'Versatile SDXL model for various styles',
    vramReq: '12GB',
    bestFor: 'Versatile, all-purpose',
    huggingFaceId: 'RunDiffusion/Juggernaut-XL-v9',
  },
  [MODELS.ANIMAGINE]: {
    id: MODELS.ANIMAGINE,
    name: 'Animagine XL 3.1',
    description: 'Anime-style SDXL model',
    vramReq: '12GB',
    bestFor: 'Anime, manga style',
    huggingFaceId: 'cagliostrolab/animagine-xl-3.1',
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
  TURBO: {
    id: 'turbo',
    name: 'Turbo',
    description: 'Ultra-fast with SDXL Turbo (1-4 steps)',
    parameters: { steps: 4, guidance: 1.5, width: 512, height: 512 },
  },
  SPEED: {
    id: 'speed',
    name: 'Speed',
    description: 'Fast generation, good quality',
    parameters: { steps: 15, guidance: 5, width: 512, height: 512 },
  },
  BALANCED: {
    id: 'balanced',
    name: 'Balanced',
    description: 'Good balance of speed and quality',
    parameters: { steps: 30, guidance: 7.5, width: 1024, height: 1024 },
  },
  QUALITY: {
    id: 'quality',
    name: 'Quality',
    description: 'High quality, slower generation',
    parameters: { steps: 40, guidance: 8, width: 1024, height: 1024 },
  },
  FAITHFUL: {
    id: 'faithful',
    name: 'Faithful',
    description: 'Closely follows prompt',
    parameters: { steps: 35, guidance: 12, width: 1024, height: 1024 },
  },
  STYLIZED: {
    id: 'stylized',
    name: 'Stylized',
    description: 'More creative interpretation',
    parameters: { steps: 30, guidance: 4, width: 1024, height: 1024 },
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
  "Steampunk city in the clouds with brass gears and primary steam, whimsical architecture",
] as const;

export const API_ENDPOINTS = {
  BASE_URL: 'http://localhost:8000/api',
  GENERATE_TXT2IMG: 'http://localhost:8000/api/txt2img/',
  GENERATE_IMG2IMG: 'http://localhost:8000/api/img2img/',
  STATUS: 'http://localhost:8000/api/status/',
  MODELS: 'http://localhost:8000/api/models/',
  RESULT: 'http://localhost:8000/api/results/',
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