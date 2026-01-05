"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { analyzeSaju } from "../../lib/sajuLogic";

// ---------------------------------------------------------
// 타입 정의
// ---------------------------------------------------------
interface SajuResult {
  koreanName: string;
  element: string;
  desc: string;
  items: string[];
  color: string;
  direction: string;
}

// ---------------------------------------------------------
// 결과 콘텐츠 컴포넌트
// ---------------------------------------------------------
function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // [핵심 수정] useEffect 의존성 에러 해결을 위해 
  // searchParams 객체 전체가 아니라, 필요한 값(birthDate)만 미리 꺼냅니다.
  const birthDate = searchParams.get("birthDate");
  // const gender = searchParams.get("gender"); // 성별이 필요하면 여기서 꺼내 쓰세요.

  const [result, setResult] = useState<SajuResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 값이 없으면 입력 페이지로 돌려보냄
    if (!birthDate) {
      router.replace("/input"); 
      return;
    }

    // 로딩 연출 (2초)
    const timer = setTimeout(() => {
      const data = analyzeSaju(birthDate);
      setResult(data);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
    
    // [핵심 수정] 의존성 배열에 'birthDate' 문자열만 넣어서 에러를 방지합니다.
  }, [birthDate, router]);

  // --- 로딩 화면 ---
  if (loading || !result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative bg-noise">
        <div className="absolute w-[300px] h-[300px] bg-gold-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="z-10 flex flex-col items-center animate-fade-in-up">
          <div className="w-16 h-16 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-gold-300 font-serif animate-pulse tracking-widest text-sm">
            운명의 흐름을 읽는 중...
          </p>
        </div>
      </div>
    );
  }

  // --- 결과 화면 ---
  return (
    <main className="min-h-screen bg-noise pb-12 text-white relative animate-fade-in">
      {/* 배경 장식 (오로라) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gold-500/10 to-transparent pointer-events-none" />

      {/* 상단 네비게이션 */}
      <nav className="relative z-10 px-6 py-6 flex justify-between items-center">
        <button 
          onClick={() => router.push("/")}
          className="text-gray-400 text-sm hover:text-white transition-colors font-sans flex items-center gap-1"
        >
          <span className="text-lg">←</span> 처음으로
        </button>
        <span className="font-serif text-gold-400 text-xs tracking-[0.2em]">OBJET DOT</span>
      </nav>

      <div className="px-6 pt-2 relative z-10 flex flex-col gap-6">
        
        {/* 1. 메인 결과 카드 (Bento - Large) */}
        <section className="animate-fade-in-up">
          <p className="text-gold-400 text-[10px] tracking-widest uppercase text-center mb-3 font-sans font-bold">Your Essential Element</p>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 text-center shadow-2xl relative overflow-hidden group">
            {/* 카드 내부 빛 효과 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-gold-400/20 rounded-full blur-[60px] group-hover:bg-gold-400/30 transition-all duration-500"></div>
            
            <h1 className="relative text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 mb-4 mt-2">
              {result.koreanName}
              <span className="block text-lg font-sans font-bold text-gold-400 mt-2 tracking-[0.2em] uppercase opacity-80">
                {result.element} Energy
              </span>
            </h1>
            
            <div className="relative bg-black/30 rounded-2xl p-5 border border-white/5 backdrop-blur-md">
              <p className="text-gray-200 text-sm leading-relaxed font-sans break-keep">
                &quot;{result.desc}&quot;
              </p>
            </div>
          </div>
        </section>

        {/* 2. 상세 정보 그리드 (Bento - 2 Columns) */}
        <section className="grid grid-cols-2 gap-4 animate-fade-in-up delay-100">
          {/* 행운의 컬러 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:border-gold-400/30 transition-colors group">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold font-sans">Lucky Color</span>
            <div className="w-10 h-10 rounded-full shadow-lg border-2 border-white/10 group-hover:scale-110 transition-transform" 
                 style={{ backgroundColor: result.color === '화이트' ? '#F1F5F9' : result.color === '블랙' ? '#18181B' : result.color === '레드' ? '#DC2626' : result.color === '그린' ? '#15803D' : '#FACC15' }}></div>
            <span className="text-white font-bold font-sans">{result.color}</span>
          </div>
          
          {/* 행운의 방향 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:border-gold-400/30 transition-colors group">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold font-sans">Direction</span>
            <span className="text-3xl group-hover:scale-110 transition-transform">🧭</span>
            <span className="text-white font-bold font-sans">{result.direction}</span>
          </div>
        </section>

        {/* 3. 추천 오브제 리스트 */}
        <section className="animate-fade-in-up delay-200">
          <h3 className="text-md font-serif text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full"></span>
            공간 처방전
          </h3>
          
          <div className="space-y-3">
            {/* 아이템 1 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-1 group hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-5 p-4">
                <div className="w-16 h-16 bg-black/30 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-105 transition-transform">
                  🎁
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1 font-sans text-lg">{result.items[0]}</h4>
                  <p className="text-xs text-gray-400 mb-3 font-sans">부족한 기운을 채워주는 아이템</p>
                  <button className="text-[10px] bg-gold-400/20 hover:bg-gold-400 hover:text-black text-gold-300 px-4 py-2 rounded-full transition-all font-bold font-sans">
                    최저가 확인하기 →
                  </button>
                </div>
              </div>
            </div>

            {/* 아이템 2 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-1 group hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-5 p-4">
                <div className="w-16 h-16 bg-black/30 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-105 transition-transform">
                  🖼️
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1 font-sans text-lg">{result.items[1]}</h4>
                  <p className="text-xs text-gray-400 mb-3 font-sans">재물운을 부르는 배치</p>
                  <button className="text-[10px] bg-gold-400/20 hover:bg-gold-400 hover:text-black text-gold-300 px-4 py-2 rounded-full transition-all font-bold font-sans">
                    스타일링 예시 보기 →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 유료 리포트 (프리미엄 락) */}
        <section className="relative mt-4 animate-fade-in-up delay-300">
          {/* 테두리 그라데이션 */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold-300/50 via-gold-500/50 to-gold-300/50 rounded-[2rem] opacity-60 blur-md animate-pulse"></div>
          
          <div className="relative bg-black/60 rounded-[2rem] overflow-hidden border border-gold-400/50 backdrop-blur-xl">
            
            {/* 배경 흐림 처리된 텍스트 (미끼) */}
            <div className="p-8 opacity-30 filter blur-[3px] select-none pointer-events-none">
              <h4 className="text-xl font-bold mb-6 font-serif text-gray-300">2026년 월별 상세 가이드</h4>
              <div className="space-y-4 text-sm font-sans text-gray-500">
                <p className="flex gap-2"><span className="text-gold-400">1월:</span> 침실 방향을 동쪽으로 바꾸면 귀인이...</p>
                <p className="flex gap-2"><span className="text-gold-400">2월:</span> 현관에 있는 거울을 치워야 재물이...</p>
                <p className="flex gap-2"><span className="text-gold-400">3월:</span> 행운의 색상인 블루 계열 옷을 입고...</p>
                <p className="flex gap-2"><span className="text-gold-400">4월:</span> 중요한 계약은 오후 2시에 진행하면...</p>
              </div>
            </div>

            {/* 잠금 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80 flex flex-col items-center justify-center p-8 text-center z-10">
              <div className="w-14 h-14 bg-gold-gradient rounded-full flex items-center justify-center text-2xl mb-4 shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-bounce">
                🔓
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">
                <span className="text-gold-400">2026년 대운</span> 시크릿 리포트
              </h3>
              
              {/* 한 줄로 깔끔하게 정리된 문구 */}
              <p className="text-gray-300 text-xs mb-8 font-sans">
                남들에게는 보이지 않는 당신만의 월별 기회와 위기를 확인하세요.
              </p>
              
              <button className="w-full bg-gold-gradient text-black font-bold font-sans py-4 rounded-2xl hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] text-base active:scale-[0.98] flex items-center justify-center gap-2">
                <span>지금 바로 잠금 해제</span>
                <span className="bg-black/20 px-2 py-0.5 rounded text-xs line-through opacity-70">5,900원</span>
                <span className="text-sm">→ 2,900원</span>
              </button>
            </div>
          </div>
        </section>
        
        <footer className="mt-6 text-center text-[10px] text-gray-600 pb-8 font-sans animate-fade-in-up delay-500">
          © 2026 Objet Dot. Design Your Luck.
        </footer>
      </div>
    </main>
  );
}

// ---------------------------------------------------------
// 메인 페이지 컴포넌트 (Suspense 래핑)
// ---------------------------------------------------------
export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center bg-noise">
        <div className="w-12 h-12 border-4 border-gold-400 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#D4AF37]"></div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}