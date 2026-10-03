import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LangEffects } from "@/components/lang-effects";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

// Тема и язык ставятся до первой отрисовки. Параметры адреса (?theme=light, ?lang=en) важнее сохранённых:
// так удобно делиться ссылкой на нужную версию.
const bootScript = `try{var p=new URLSearchParams(location.search),r=document.documentElement;var t=p.get("theme")||localStorage.getItem("gulayn-theme");if(t==="light")r.dataset.theme="light";var l=p.get("lang")||localStorage.getItem("gulayn-lang");if(l==="en")r.lang="en"}catch(e){}`;

export const metadata: Metadata = {
  title: "Gulayn — все нейросети в одной подписке",
  description:
    "GPT, Claude, Gemini, Midjourney, Kling, Suno и ещё 200+ моделей для текста, картинок, видео и звука в одном аккаунте.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${geist.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh">
        <MotionProvider>{children}</MotionProvider>
        <LangEffects />
      </body>
    </html>
  );
}
