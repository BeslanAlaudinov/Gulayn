export type Brand = { name: string; logo: string };

/** Нейросети для бегущей строки на первом экране. */
export const brands: Brand[] = [
  { name: "ChatGPT", logo: "openai" },
  { name: "Claude", logo: "claude" },
  { name: "Gemini", logo: "gemini" },
  { name: "Nano Banana", logo: "nanobanana" },
  { name: "Mistral", logo: "mistral" },
  { name: "Grok", logo: "grok" },
  { name: "DeepSeek", logo: "deepseek" },
  { name: "Qwen", logo: "qwen" },
  { name: "MiniMax", logo: "minimax" },
  { name: "Stable Diffusion", logo: "stability" },
  { name: "Flux", logo: "flux" },
  { name: "Midjourney", logo: "midjourney" },
  { name: "Runway", logo: "runway" },
  { name: "Kling", logo: "kling" },
  { name: "Pika", logo: "pika" },
  { name: "Krea", logo: "krea" },
  { name: "MAI", logo: "microsoft" },
  { name: "Meta Llama", logo: "meta" },
  { name: "Kimi", logo: "kimi" },
  { name: "Recraft", logo: "recraft" },
  { name: "Seedance", logo: "bytedance" },
  { name: "ElevenLabs", logo: "elevenlabs" },
  { name: "Suno", logo: "suno" },
  { name: "GLM", logo: "zhipu" },
  { name: "Google Veo", logo: "google" },
  { name: "Hailuo", logo: "hailuo" },
];

/** Кадры галереи. Тексты к ним в словаре: src/i18n/dict.ts → gallery.items, в том же порядке. */
export const galleryMedia: { image: string; kind: "photo" | "video" }[] = [
  { image: "/images/gallery-waterfall.jpg", kind: "video" },
  { image: "/images/gallery-neon.jpg", kind: "photo" },
  { image: "/images/gallery-studio.jpg", kind: "photo" },
  { image: "/images/gallery-blue.jpg", kind: "photo" },
  { image: "/images/gallery-city.jpg", kind: "photo" },
  { image: "/images/gallery-dunes.jpg", kind: "photo" },
  { image: "/images/gallery-stripe.jpg", kind: "photo" },
];

/* ---------- Калькулятор выгоды: набор и цены с калькулятора gulayn.ru ---------- */
export type Service = { id: string; name: string; price: number; logo: string; on: boolean };

export const services: Service[] = [
  { id: "chatgpt", name: "ChatGPT Plus", price: 1990, logo: "openai", on: true },
  { id: "mj", name: "Midjourney", price: 1090, logo: "midjourney", on: true },
  { id: "runway", name: "Runway", price: 1490, logo: "runway", on: true },
  { id: "eleven", name: "ElevenLabs", price: 590, logo: "elevenlabs", on: true },
  { id: "claude", name: "Claude Pro", price: 1990, logo: "claude", on: false },
  { id: "gemini", name: "Gemini Advanced", price: 1990, logo: "gemini", on: false },
  { id: "suno", name: "Suno", price: 990, logo: "suno", on: false },
  { id: "pplx", name: "Perplexity Pro", price: 1990, logo: "perplexity", on: false },
];

/* ---------- Тарифы: цифры из FAQ gulayn.ru, названия и подписи в словаре ---------- */
export type Plan = {
  id: string;
  price: number;
  tokens: number;
  /** На сколько хватит токенов: сообщений GPT-5.4, изображений, секунд видео. */
  msg: number;
  img?: number;
  vid?: number;
  media: boolean;
  custom: boolean;
  raffle: boolean;
  hot?: boolean;
};

export const personalPlans: Plan[] = [
  { id: "eco", price: 249, tokens: 180, msg: 30, media: false, custom: false, raffle: false },
  { id: "base", price: 399, tokens: 250, msg: 41, img: 125, vid: 40, media: true, custom: false, raffle: false },
  { id: "pro", price: 999, tokens: 750, msg: 125, img: 375, vid: 130, media: true, custom: true, raffle: true, hot: true },
  { id: "max", price: 2499, tokens: 2000, msg: 333, img: 1000, vid: 355, media: true, custom: true, raffle: true },
  { id: "biz", price: 6900, tokens: 6000, msg: 1000, img: 3000, vid: 1070, media: true, custom: true, raffle: true },
  { id: "ultra", price: 49900, tokens: 43000, msg: 7166, img: 21500, vid: 7675, media: true, custom: true, raffle: true },
];

export type TeamPlan = { id: string; price: number; tokens: number; hot?: boolean };

export const teamPlans: TeamPlan[] = [
  { id: "start", price: 4990, tokens: 4300 },
  { id: "acad", price: 14990, tokens: 13000, hot: true },
  { id: "ent", price: 49990, tokens: 42000 },
];
