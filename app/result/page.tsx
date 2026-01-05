"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { analyzeSaju } from "../../lib/sajuLogic";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const date = searchParams.get("birthDate");
    
    if (!date) {
      // 데이터가 없으면 입력 페이지로 리다이렉트
      return; 
    }

    // 로딩 연출을 위해 약간의 지연 시간 추가
    setTimeout(() => {
      const data = analyzeSaju(date);
      setResult(data);
      setLoading(false);
    }, 2000);
  }, [searchParams]);

  // --- 로딩 화면 (신비로운 연출) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-noise flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute w-[300px] h-[300px] bg-gold-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="z-10 flex flex-col items-center">
          <div className="w-16 h-16 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-gold-300 font-serif animate-pulse tracking-widest text-sm">
            운명의 흐름을 읽는 중...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-noise pb-12 text-white relative">
      {/* 배경 장식 (오로라 효과) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gold-500/10 to-transparent pointer-events-none" />

      {/* 상단 네비게이션 (뒤로가기) */}
      <nav className="relative z-10 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => router.push("/")}
          className="text-gray-400 text-sm hover:text-white transition-colors"
        >
          ← 다시 분석하기
        </button>
        <span className="font-serif text-gold-400 text-sm tracking-widest">OBJET DOT</span>
      </nav>

      <div className="px-6 pt-4 relative z-10">
        
        {/* 1. 메인 결과 카드 (Bento - Large) */}
        <section className="mb-6">
          <p className="text-gray-400 text-xs mb-2 text-center">당신에게 가장 필요한 기운</p>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden group">
            {/* 카드 내부 빛 효과 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold-400/20 rounded-full blur-[50px] group-hover:bg-gold-400/30 transition-all duration-500"></div>
            
            <h1 className="relative text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-6 mt-2">
              {result.koreanName}
              <span className="block text-lg font-sans font-normal text-gold-400 mt-2 tracking-widest uppercase opacity-80">
                {result.element} Energy
              </span>
            </h1>
            
            <div className="relative bg-black/20 rounded-xl p-4 border border-white/5">
              <p className="text-gray-300 text-sm leading-relaxed font-light break-keep">
                &quot;{result.desc}&quot;
              </p>
            </div>
          </div>
        </section>

        {/* 2. 상세 정보 그리드 (Bento - Grid) */}
        <section className="grid grid-cols-2 gap-4 mb-8">
          {/* 행운의 컬러 */}
          <div className="bg-charcoal/50 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center hover:border-gold-500/30 transition-colors">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Lucky Color</span>
            <div className="w-8 h-8 rounded-full shadow-lg mb-2" style={{ backgroundColor: result.color === '화이트' ? '#eee' : result.color === '블랙' ? '#333' : result.color === '레드' ? '#d32f2f' : result.color === '그린' ? '#2e7d32' : '#fbc02d' }}></div>
            <span className="text-white font-medium">{result.color}</span>
          </div>
          
          {/* 행운의 방향 */}
          <div className="bg-charcoal/50 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center hover:border-gold-500/30 transition-colors">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Direction</span>
            <span className="text-2xl mb-1">🧭</span>
            <span className="text-white font-medium">{result.direction}</span>
          </div>
        </section>

        {/* 3. 추천 오브제 리스트 */}
        <section className="mb-10">
          <h3 className="text-lg font-serif text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gold-400 rounded-full"></span>
            공간 처방전
          </h3>
          
          <div className="space-y-4">
            {/* 아이템 1 */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-1 p-[1px]">
              <div className="bg-gray-900 rounded-2xl p-4 flex items-center gap-4 h-full">
                <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center text-3xl shadow-inner">
                  🎁
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1">{result.items[0]}</h4>
                  <p className="text-xs text-gray-500 mb-3">나쁜 기운을 막아주는 아이템</p>
                  <button className="text-[10px] bg-white/10 hover:bg-gold-400 hover:text-black text-white px-3 py-1.5 rounded transition-all">
                    최저가 확인하기 →
                  </button>
                </div>
              </div>
            </div>

            {/* 아이템 2 */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-[1px]">
              <div className="bg-gray-900 rounded-2xl p-4 flex items-center gap-4 h-full">
                <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center text-3xl shadow-inner">
                  🖼️
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1">{result.items[1]}</h4>
                  <p className="text-xs text-gray-500 mb-3">재물운을 부르는 배치</p>
                  <button className="text-[10px] bg-white/10 hover:bg-gold-400 hover:text-black text-white px-3 py-1.5 rounded transition-all">
                    스타일링 예시 보기 →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 유료 리포트 (프리미엄 락) */}
        <section className="relative mt-8">
          {/* 테두리 그라데이션 */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 rounded-2xl opacity-30 blur-sm"></div>
          
          <div className="relative bg-black rounded-2xl overflow-hidden border border-gold-500/30">
            
            {/* 배경 흐림 처리된 텍스트 */}
            <div className="p-6 opacity-20 filter blur-[2px] select-none">
              <h4 className="text-xl font-bold mb-4">2026년 월별 상세 가이드</h4>
              <div className="space-y-2 text-sm">
                <p>1월: 침실 방향을 동쪽으로 바꾸면 귀인이...</p>
                <p>2월: 현관에 있는 거울을 치워야 재물이...</p>
                <p>3월: 행운의 색상인 블루 계열 옷을 입고...</p>
                <p>4월: 중요한 계약은 오후 2시에 진행하면...</p>
              </div>
            </div>

            {/* 잠금 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[1px]">
              <div className="w-12 h-12 bg-gold-400 rounded-full flex items-center justify-center text-xl mb-3 shadow-[0_0_15px_rgba(212,175,55,0.5)] animate-bounce">
                🔓
              </div>
              <h3 className="text-xl font-serif text-white mb-1">
                <span className="text-gold-400">2026년 대운</span> 시크릿 리포트
              </h3>
              <p className="text-gray-400 text-xs mb-6 max-w-[200px] leading-relaxed">
                남들에게는 보이지 않는<br/>
                당신만의 월별 기회와 위기를 확인하세요.
              </p>
              
              <button className="w-full bg-gold-gradient text-black font-bold py-3.5 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-gold-900/20 text-sm">
                2,900원에 전체 잠금 해제
              </button>
            </div>
          </div>
        </section>
        
        <footer className="mt-12 text-center text-[10px] text-gray-700 pb-4">
          © 2026 Objet Dot. All rights reserved.
        </footer>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}