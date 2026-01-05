import type { Metadata } from "next";
import { Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const serif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

const sans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Objet Dot | 당신의 공간에 운을 더하다",
  description: "사주 명리학 기반 풍수지리 인테리어 큐레이션 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${serif.variable} ${sans.variable} antialiased min-h-screen flex justify-center bg-[#050505] font-sans selection:bg-[#D4AF37] selection:text-black`}
      >
        <div className="w-full max-w-md min-h-screen bg-void shadow-2xl relative overflow-hidden border-x border-white/5">
          {children}
        </div>
      </body>
    </html>
  );
}