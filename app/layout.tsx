import type { Metadata } from "next";
import Script from "next/script"; // [추가] 스크립트 로드용
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
  // [중요] 오픈 그래프 메타 태그 추가 (카카오톡 미리보기용 기본값)
  openGraph: {
    title: "Objet Dot",
    description: "당신의 운을 완성하는 공간 큐레이션",
    images: ["/og-image.jpg"], // public 폴더에 이미지 넣어두시면 좋습니다
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
         {/* [중요] 카카오 SDK 로드 (미리 불러오기) */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2txfTZ7OEqHu5/9134SX59"
          crossOrigin="anonymous"
          strategy="beforeInteractive" 
        />
      </head>
      <body
        className={`${serif.variable} ${sans.variable} antialiased min-h-screen flex flex-col items-center justify-center bg-[#050505] font-sans selection:bg-[#D4AF37] selection:text-black py-8 md:py-12`}
      >
        <div className="w-full max-w-md min-h-[80vh] md:min-h-screen bg-void shadow-2xl relative border-x border-white/5 rounded-3xl overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}