"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { analyzeSaju } from "../../lib/sajuLogic";

// 1. 실제 알맹이 컴포넌트 (데이터를 쓰는 부분)
function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const date = searchParams.get("birthDate");
    
    if (!date) {
      // 데이터가 없으면 홈으로 보냄 (단, 빌드 타임에는 실행 안 되게 방어)
      return; 
    }

    setTimeout(() => {
      const data = analyzeSaju(date);
      setResult(data);
      setLoading(false);
    }, 1500);
  }, [searchParams]);

  // 로딩 중일 때 화면
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37] mb-4"></div>
        <p className="text-sm text-gray-400 animate-pulse">사주 명식을 분석 중입니다...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-12">
      {/* 상단 결과 카드 */}
      <section className="bg-gray-800 p-8 rounded-b-3xl shadow-2xl border-b border-gray-700">
        <p className="text-gray-400 text-sm text-center mb-2">당신에게 필요한 기운은</p>
        <h2 className="text-4xl font-serif text-[#D4AF37] text-center mb-6">
          {result.koreanName}
        </h2>
        
        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
          <p className="text-gray-300 leading-relaxed text-center text-sm">
            &quot;{result.desc}&quot;
          </p>
        </div>

        <div className="mt-6 flex justify-between text-sm">
          <div className="text-center w-1/2 border-r border-gray-700">
            <span className="block text-gray-500 mb-1">행운의 컬러</span>
            <span className="text-white font-medium">{result.color}</span>
          </div>
          <div className="text-center w-1/2">
            <span className="block text-gray-500 mb-1">추천 방위</span>
            <span className="text-white font-medium">{result.direction}</span>
          </div>
        </div>
      </section>

      {/* 추천 아이템 */}
      <section className="px-6 py-8">
        <h3 className="text-lg text-white font-serif mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#D4AF37]"></span>
          맞춤 오브제 추천
        </h3>
        
        <div className="grid gap-4">
          <div className="bg-gray-800 rounded-xl overflow-hidden flex border border-gray-700">
            <div className="w-24 h-24 bg-gray-700 flex items-center justify-center text-2xl">
              🎁
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              <h4 className="text-white font-medium mb-1">{result.items[0]}</h4>
              <p className="text-xs text-gray-500 mb-2">나쁜 기운을 막아주는 아이템</p>
              <button className="text-[#D4AF37] text-xs font-bold self-start border border-[#D4AF37] px-3 py-1 rounded hover:bg-[#D4AF37] hover:text-gray-900 transition-colors">
                쿠팡에서 최저가 보기
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl overflow-hidden flex border border-gray-700">
            <div className="w-24 h-24 bg-gray-700 flex items-center justify-center text-2xl">
              🖼️
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              <h4 className="text-white font-medium mb-1">{result.items[1]}</h4>
              <p className="text-xs text-gray-500 mb-2">재물운을 부르는 배치</p>
              <button className="text-[#D4AF37] text-xs font-bold self-start border border-[#D4AF37] px-3 py-1 rounded hover:bg-[#D4AF37] hover:text-gray-900 transition-colors">
                오늘의집에서 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 유료 리포트 */}
      <section className="px-6 mb-8">
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden">
          <div className="absolute inset-0 p-6 opacity-30 blur-[2px] z-0">
            <h4 className="text-gray-300 font-bold mb-2">2026 병오년 상세 가이드</h4>
            <p className="text-gray-500 text-sm">
              1월: 북쪽에 침대를 두면...<br/>
              2월: 현관에 거울을 치워야...<br/>
              3월: 귀인이 찾아오는 방향은...<br/>
              4월: 행운의 색상은...
            </p>
          </div>
          <div className="relative z-10 p-8 flex flex-col items-center justify-center text-center bg-black/40">
            <div className="bg-gray-800 p-3 rounded-full mb-3 shadow-lg">
              🔒
            </div>
            <p className="text-white font-bold text-lg mb-1">2026년 대운 리포트</p>
            <p className="text-gray-300 text-xs mb-6 px-4 leading-relaxed">
              내 사주에 딱 맞는 가구 배치도와<br/>월별 운세 달력을 확인하세요.
            </p>
            <button className="bg-[#D4AF37] text-gray-900 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg shadow-yellow-900/30">
              2,900원에 잠금 해제
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// 2. 껍데기 컴포넌트 (Suspense로 감싸는 역할)
export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>페이지를 불러오는 중...</p>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}