import type { Metadata } from "next";
import { Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import Script from "next/script"; // [중요] 이게 꼭 있어야 합니다!
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
  openGraph: {
    title: "Objet Dot - 나만의 행운 오브제 찾기",
    description: "2026년 당신에게 부족한 기운을 채워줄 아이템을 확인해보세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${serif.variable} ${sans.variable} antialiased min-h-screen flex flex-col items-center justify-center bg-[#050505] font-sans selection:bg-[#D4AF37] selection:text-black py-8 md:py-12`}
      >
        {/* [수정 완료] 
            1. strategy="afterInteractive" : 페이지 열리자마자 바로 로드
            2. integrity 제거 : 로딩 에러 원인 차단 
        */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          strategy="afterInteractive" 
        />

        <div className="w-full max-w-md min-h-[80vh] md:min-h-screen bg-void shadow-2xl relative border-x border-white/5 rounded-3xl overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}