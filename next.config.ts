import type { NextConfig } from "next";

// На GitHub Pages сайт открывается по адресу /<репозиторий>/. Префикс приходит из workflow,
// локально он пустой.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Статическая сборка в папку out: бэкенда нет, всё работает в браузере.
  output: "export",
  basePath,
  // Оптимизация картинок требует сервер, на GitHub Pages его нет.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
