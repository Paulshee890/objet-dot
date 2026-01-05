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
    // [수정] h-full 제거. 자연스러운 문서 높이 사용.
    <html lang="ko">
      <body
        // [수정] h-full 제거. flex 정렬 방식 변경.
        // py-8 md:py-12: PC 화면에서 위아래 여백을 주어 답답하지 않게 함.
        className={`${serif.variable} ${sans.variable} antialiased min-h-screen flex flex-col items-center justify-center bg-[#050505] font-sans selection:bg-[#D4AF37] selection:text-black py-8 md:py-12`}
      >
        {/* [수정 핵심] 
          h-full 및 overflow 관련 속성 제거. 
          대신 min-h-screen을 주어 내용이 적어도 화면을 꽉 채우고, 
          많으면 자연스럽게 늘어나게 함.
        */}
        <div className="w-full max-w-md min-h-[80vh] md:min-h-screen bg-void shadow-2xl relative border-x border-white/5 rounded-3xl overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}