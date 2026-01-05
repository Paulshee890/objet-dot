import type { Metadata } from "next";
import { Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// 1. 폰트 가져오기 (우아한 명조체)
const serif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "700"], // 얇은거, 굵은거
  variable: "--font-serif", // 변수 이름
});

// 2. 폰트 가져오기 (깔끔한 고딕체)
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
        {/* 모바일 뷰포트 제한 및 그림자 효과 */}
        <div className="w-full max-w-md min-h-screen bg-[#0F1115] shadow-2xl relative overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}