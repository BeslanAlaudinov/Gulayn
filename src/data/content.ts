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

/** Примеры промптов, которые печатаются в промпт-баре. */
export const heroPrompts = [
  { model: "GPT-5.6", text: "Перепиши письмо клиенту мягче, но сохрани сроки" },
  { model: "Midjourney", text: "Обложка для подкаста о путешествиях, тёплый свет, плёнка" },
  { model: "Kling", text: "Пятисекундный ролик: волна накрывает берег на закате" },
  { model: "Suno", text: "Лёгкий инди-трек для рекламы кофейни, 30 секунд" },
  { model: "Claude", text: "Разбери договор и выпиши риски по пунктам" },
];

export type Segment = { tag?: "subj" | "light" | "cam" | "mood"; text: string };

export type GalleryItem = {
  title: string;
  type: "Фото" | "Видео";
  image: string;
  tip: { lead: string; text: string };
  segments: Segment[];
};

/** Галерея «Как слова становятся кадром»: промпт разбит на смысловые части. */
export const gallery: GalleryItem[] = [
  {
    title: "Водопад в движении",
    type: "Видео",
    image: "/images/gallery-waterfall.jpg",
    tip: { lead: "Совет.", text: "Для видео опишите движение камеры отдельно: «медленный наезд», «облёт», «статичный кадр»." },
    segments: [
      { tag: "cam", text: "Вертикальный кинематографичный ролик" },
      { text: ": " },
      { tag: "subj", text: "высокий водопад в тумане" },
      { text: ", " },
      { tag: "mood", text: "мокрый базальт, живая водяная пыль" },
      { text: " и " },
      { tag: "cam", text: "медленный наезд камеры" },
      { text: "." },
    ],
  },
  {
    title: "Неоновый портрет",
    type: "Фото",
    image: "/images/gallery-neon.jpg",
    tip: { lead: "Совет.", text: "Два контрастных цвета света сразу задают настроение: красный и кобальтовый, тёплый и холодный." },
    segments: [
      { tag: "cam", text: "Крупный кинопортрет" },
      { text: " " },
      { tag: "light", text: "в красном и кобальтовом свете" },
      { text: ", " },
      { tag: "mood", text: "влажный блеск глаз" },
      { text: ", " },
      { tag: "subj", text: "тёмный фон" },
      { text: ", " },
      { tag: "mood", text: "фактура кожи" },
      { text: " и " },
      { tag: "mood", text: "модный кадр" },
      { text: "." },
    ],
  },
  {
    title: "Мягкая студия",
    type: "Фото",
    image: "/images/gallery-studio.jpg",
    tip: { lead: "Совет.", text: "Слова «редакционный» и «плёночный» быстро задают стиль журнальной съёмки." },
    segments: [
      { tag: "subj", text: "Редакционный фэшн-портрет" },
      { text: " " },
      { tag: "light", text: "с мягким боковым светом" },
      { text: ", " },
      { tag: "cam", text: "объёмным силуэтом" },
      { text: ", " },
      { tag: "subj", text: "серой студией" },
      { text: " и " },
      { tag: "mood", text: "плёночным контрастом" },
      { text: "." },
    ],
  },
  {
    title: "Синий крупный план",
    type: "Фото",
    image: "/images/gallery-blue.jpg",
    tip: { lead: "Совет.", text: "«Мягкая глубина» просит размыть фон, так лицо остаётся главным." },
    segments: [
      { tag: "cam", text: "Плотный" },
      { text: " " },
      { tag: "subj", text: "beauty-портрет" },
      { text: " " },
      { tag: "light", text: "в электрическом синем свете" },
      { text: ", " },
      { tag: "cam", text: "мягкая глубина" },
      { text: ", " },
      { tag: "light", text: "живые блики на коже" },
      { text: " и " },
      { tag: "mood", text: "воротник, уходящий в тень" },
      { text: "." },
    ],
  },
  {
    title: "Пульс города",
    type: "Фото",
    image: "/images/gallery-city.jpg",
    tip: { lead: "Совет.", text: "Глагол в промпте («текут») добавляет кадру движение даже на фото." },
    segments: [
      { tag: "cam", text: "Вертикальный вид" },
      { text: " " },
      { tag: "subj", text: "ночного города" },
      { text: " " },
      { tag: "cam", text: "с крыши" },
      { text: ": " },
      { tag: "cam", text: "световые следы машин текут по проспекту" },
      { text: ", " },
      { tag: "light", text: "тёплые окна и холодное синее небо" },
      { text: "." },
    ],
  },
  {
    title: "Тихие дюны",
    type: "Фото",
    image: "/images/gallery-dunes.jpg",
    tip: { lead: "Совет.", text: "Чем меньше предметов в описании, тем спокойнее кадр. Минимализм тоже надо назвать словами." },
    segments: [
      { tag: "mood", text: "Минималистичная" },
      { text: " " },
      { tag: "subj", text: "пустыня с тихими гребнями песка" },
      { text: ", " },
      { tag: "light", text: "приглушённым утренним небом" },
      { text: ", " },
      { tag: "mood", text: "зернистой фактурой" },
      { text: " и " },
      { tag: "mood", text: "кинопаузой" },
      { text: "." },
    ],
  },
  {
    title: "Полоса света",
    type: "Фото",
    image: "/images/gallery-stripe.jpg",
    tip: { lead: "Совет.", text: "Один источник света и глубокая тень дают драму. Уточните, где именно лежит свет." },
    segments: [
      { tag: "subj", text: "Интимный портрет из темноты" },
      { text: ": " },
      { tag: "light", text: "одна тёплая полоса света на лице" },
      { text: ", " },
      { tag: "mood", text: "сдержанный цвет" },
      { text: " и " },
      { tag: "light", text: "глубокая кинематографичная тень" },
      { text: "." },
    ],
  },
];

export const promptTags = [
  { key: "subj", label: "Сюжет", color: "bg-tag-subj" },
  { key: "light", label: "Свет", color: "bg-tag-light" },
  { key: "cam", label: "Ракурс и движение", color: "bg-tag-cam" },
  { key: "mood", label: "Атмосфера и фактура", color: "bg-tag-mood" },
] as const;

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

/* ---------- Тарифы: из FAQ gulayn.ru ---------- */
export type Plan = {
  id: string;
  name: string;
  note: string;
  price: number;
  tokens: number;
  msg: string;
  img?: string;
  vid?: string;
  media: boolean;
  custom: boolean;
  raffle: boolean;
  hot?: boolean;
};

export const personalPlans: Plan[] = [
  { id: "eco", name: "Эконом", note: "Только текстовый чат", price: 249, tokens: 180, msg: "~30", media: false, custom: false, raffle: false },
  { id: "base", name: "Базовый", note: "Для личного использования", price: 399, tokens: 250, msg: "~41", img: "125", vid: "40", media: true, custom: false, raffle: false },
  { id: "pro", name: "Про", note: "Для активной работы", price: 999, tokens: 750, msg: "~125", img: "375", vid: "130", media: true, custom: true, raffle: true, hot: true },
  { id: "max", name: "Макс", note: "Для плотной работы", price: 2499, tokens: 2000, msg: "~333", img: "1 000", vid: "355", media: true, custom: true, raffle: true },
  { id: "biz", name: "Бизнес", note: "Для студий и ежедневного производства", price: 6900, tokens: 6000, msg: "~1 000", img: "3 000", vid: "1 070", media: true, custom: true, raffle: true },
  { id: "ultra", name: "Ultra Elite", note: "Максимальный объём для агентств", price: 49900, tokens: 43000, msg: "~7 166", img: "21 500", vid: "7 675", media: true, custom: true, raffle: true },
];

export type TeamPlan = { id: string; name: string; note: string; price: number; tokens: number; hot?: boolean };

export const teamPlans: TeamPlan[] = [
  { id: "start", name: "Команда Старт", note: "Для небольшой команды", price: 4990, tokens: 4300 },
  { id: "acad", name: "Академия", note: "Для учебных заведений", price: 14990, tokens: 13000, hot: true },
  { id: "ent", name: "Энтерпрайз", note: "Для крупных компаний", price: 49990, tokens: 42000 },
];

/* ---------- Частые вопросы: из FAQ gulayn.ru ---------- */
export const faqGroups = ["Начало работы", "Токены и оплата", "Команды и розыгрыш", "Данные и поддержка"] as const;

export type Faq = { group: number; q: string; a: string };

export const faq: Faq[] = [
  { group: 0, q: "Что такое Gulayn?", a: "Сервис, где одна подписка открывает 30+ топовых нейросетей для текста, изображений, видео и аудио. Не нужно заводить и оплачивать десятки отдельных сервисов: всё в одном окне, с общим балансом токенов." },
  { group: 0, q: "Какие модели доступны?", a: "Текст: GPT-5.6, Claude, Gemini 3, Grok, DeepSeek, Qwen, MiniMax, Mistral, Kimi, GLM. Картинки: GPT Image, Nano Banana, FLUX, Kling, Qwen Image. Видео: Veo, Runway, Kling, MiniMax Hailuo, Pika. Аудио: ElevenLabs, Suno, Gemini TTS, MiniMax. Каталог регулярно пополняется." },
  { group: 0, q: "Есть ли бесплатный доступ?", a: "Да. Каждый новый аккаунт получает 180 бесплатных токенов, карта для регистрации не нужна." },
  { group: 0, q: "Как переключаться между моделями?", a: "В один клик прямо в чате. Можно начать с одной модели и продолжить другой, история и контекст сохраняются." },
  { group: 0, q: "Что такое Креатив-студия и Кодинг?", a: "В Креатив-студии есть SwitchX: замена фона в видео и фото по AI-маске. Кодинг — это агенты Claude Code и Codex, которые работают с вашим проектом в изолированной песочнице: загрузите ZIP, опишите задачу и получите готовый diff." },
  { group: 1, q: "Что такое токены?", a: "Внутренняя валюта сервиса. Каждый запрос списывает токены по цене модели, и цена всегда показана рядом с ней. С подпиской чат на 26 быстрых моделях не тарифицируется. Сообщение GPT-5.4 стоит от 5 токенов, изображение от 2, пять секунд видео от 28." },
  { group: 1, q: "Можно ли докупить токены?", a: "Да, в личном кабинете. Готовые пакеты на 200, 550 и 1 300 токенов доступны при любой подписке. Свой объём от 100 до 20 000 токенов можно купить на тарифах «Про» и выше. Без подписки докупки нет." },
  { group: 1, q: "Сгорают ли неизрасходованные токены?", a: "Нет. Пока подписка активна, остаток сохраняется и суммируется при продлении. Если подписка закончилась, у вас есть три дня, чтобы продлить её без потери остатка." },
  { group: 1, q: "Как оплатить?", a: "Банковской картой через ЮKassa или криптовалютой через Cryptomus. Данные карты сервис не хранит, их обрабатывает платёжный провайдер." },
  { group: 1, q: "Что, если генерация не удалась?", a: "Токены не списываются: вы платите только за полученный результат. Если что-то пошло не так, напишите в поддержку." },
  { group: 1, q: "Сколько стоит год?", a: "Годовая подписка стоит как 10 месяцев, то есть два месяца в подарок." },
  { group: 2, q: "Что за розыгрыш iPhone?", a: "Среди подписчиков «Про» и выше разыгрываем iPhone 17 Pro Max и ещё 19 денежных призов. Билеты начисляются автоматически: чем дороже подписка, тем больше билетов, до пяти. Свои билеты видно в личном кабинете." },
  { group: 2, q: "Есть тарифы для команд?", a: "Да, для команд и учебных заведений: общий пул токенов, места и приглашения по ссылке. Управление в личном кабинете владельца." },
  { group: 3, q: "Мои данные в безопасности?", a: "Переписка хранится в защищённой инфраструктуре, не используется для обучения моделей и не продаётся. История чатов хранится 120 дней с последнего изменения, потом удаляется автоматически." },
  { group: 3, q: "Как связаться с поддержкой?", a: "Telegram @gulayn_bot, канал @gulayn_ai или почта support@gulayn.ru." },
];
