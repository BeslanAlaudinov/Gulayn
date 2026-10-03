import type { Metadata, Viewport } from "next";
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

// viewport-fit=cover: страница рисуется под строкой состояния iPhone, а её зону мы сами красим в чёрный.
// theme-color: панель Safari и Chrome на телефоне тоже чёрная, в цвет чёлки (она чёрная в обеих темах).
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#000000",
};

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
        {/* Чёрная полоса под строкой состояния. Safari 26 красит строку состояния в цвет полосы во всю ширину у верхнего края, поэтому на телефоне она не меньше 2px */}
        <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[max(env(safe-area-inset-top),2px)] bg-black sm:h-[env(safe-area-inset-top)]" />
        <MotionProvider>{children}</MotionProvider>
        <LangEffects />
      </body>
    </html>
  );
}
