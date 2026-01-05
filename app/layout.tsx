import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased min-h-screen flex justify-center bg-black">
        {/* PC에서 봐도 모바일 화면처럼 가운데 정렬되게 만드는 틀 */}
        <div className="w-full max-w-md bg-gray-900 min-h-screen shadow-2xl border-x border-gray-800">
          {children}
        </div>
      </body>
    </html>
  );
}