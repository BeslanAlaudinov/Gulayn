import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

// Тема из адреса (?theme=light) важнее сохранённой, это удобно для ссылок на светлую версию
const themeScript = `try{var q=new URLSearchParams(location.search).get("theme");var t=q||localStorage.getItem("gulayn-theme");if(t==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export const metadata: Metadata = {
  title: "Gulayn — все нейросети в одной подписке",
  description:
    "GPT, Claude, Gemini, Midjourney, Kling, Suno и ещё 200+ моделей для текста, картинок, видео и звука в одном аккаунте.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${geist.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Тема ставится до первой отрисовки, чтобы светлая не мигала тёмной */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
