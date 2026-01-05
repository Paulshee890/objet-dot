import type { Metadata } from "next";
import Script from "next/script"; // 스크립트 컴포넌트
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
  openGraph: {
    title: "Objet Dot",
    description: "당신의 운을 완성하는 공간 큐레이션",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* head 태그는 Next.js가 metadata로 알아서 관리하므로 비워둡니다. */}
      <body
        className={`${serif.variable} ${sans.variable} antialiased min-h-screen flex flex-col items-center justify-center bg-[#050505] font-sans selection:bg-[#D4AF37] selection:text-black py-8 md:py-12`}
      >
        <div className="w-full max-w-md min-h-[80vh] md:min-h-screen bg-void shadow-2xl relative border-x border-white/5 rounded-3xl overflow-hidden">
          {children}
        </div>

        {/* [수정] 스크립트를 body 태그 안쪽, 가장 마지막에 배치합니다. */}
        {/* strategy="afterInteractive"는 페이지 로드 직후 스크립트를 실행합니다. */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2txfTZ7OEqHu5/9134SX59"
          crossOrigin="anonymous"
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}