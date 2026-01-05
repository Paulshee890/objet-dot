"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { analyzeSaju } from "../../lib/sajuLogic";

// [핵심 수정] 타입스크립트에게 "window 안에 Kakao가 있다"고 알려주는 부분
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

// 타입 정의
interface SajuResult {
  koreanName: string;
  element: string;
  desc: string;
  items: string[];
  color: string;
  direction: string;
}

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const birthDate = searchParams.get("birthDate");

  const [result, setResult] = useState<SajuResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!birthDate) {
      router.replace("/input"); 
      return;
    }

    const timer = setTimeout(() => {
      const data = analyzeSaju(birthDate);
      setResult(data);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [birthDate, router]);

  // [카카오톡 공유 기능]
  const shareKakao = () => {
    // 1. 카카오 SDK 로드 확인
    if (!window.Kakao) {
      alert("카카오톡 SDK가 아직 로딩되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 2. 초기화 (스크린샷에 있던 정확한 키 적용됨)
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('5541daed53e80a7fd5abcbd6f5bf526f'); 
    }

    // 3. 공유 메시지 발송
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `[Objet Dot] ${result?.koreanName}의 부족한 기운은?`,
        description: `나에게 필요한 행운의 아이템: ${result?.items.join(", ")}`,
        imageUrl: 'https://objet-dot.vercel.app/og-image.png',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '결과 확인하기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

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

  return (
    <main className="min-h-screen bg-noise pb-12 text-white relative animate-fade-in">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gold-500/10 to-transparent pointer-events-none" />

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
        {/* 1. 메인 결과 카드 */}
        <section className="animate-fade-in-up">
          <p className="text-gold-400 text-[10px] tracking-widest uppercase text-center mb-3 font-sans font-bold">Your Essential Element</p>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-gold-400/20 rounded-full blur-[60px] group-hover:bg-gold-400/30 transition-all duration-500"></div>
            <h1 className="relative text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 mb-4 mt-2 break-keep">
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

        {/* 2. 상세 정보 그리드 */}
        <section className="grid grid-cols-2 gap-4 animate-fade-in-up delay-100">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:border-gold-400/30 transition-colors group">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold font-sans">Lucky Color</span>
            <div className="w-10 h-10 rounded-full shadow-lg border-2 border-white/10 group-hover:scale-110 transition-transform" 
                 style={{ backgroundColor: result.color === '화이트' ? '#F1F5F9' : result.color === '블랙' ? '#18181B' : result.color === '레드' ? '#DC2626' : result.color === '그린' ? '#15803D' : '#FACC15' }}></div>
            <span className="text-white font-bold font-sans break-keep text-center">{result.color}</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:border-gold-400/30 transition-colors group">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold font-sans">Direction</span>
            <span className="text-3xl group-hover:scale-110 transition-transform">🧭</span>
            <span className="text-white font-bold font-sans break-keep text-center">{result.direction}</span>
          </div>
        </section>

        {/* 3. 공간 처방전 */}
        <section className="animate-fade-in-up delay-200">
          <h3 className="text-md font-serif text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full"></span>
            공간 처방전
          </h3>
          <div className="space-y-3">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-1 group hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-5 p-4">
                <div className="w-16 h-16 bg-black/30 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-105 transition-transform shrink-0">
                  🎁
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1 font-sans text-lg break-keep">{result.items[0]}</h4>
                  <p className="text-xs text-gray-400 mb-3 font-sans break-keep">부족한 기운을 채워주는 아이템</p>
                  <button className="text-[10px] bg-gold-400/20 hover:bg-gold-400 hover:text-black text-gold-300 px-4 py-2 rounded-full transition-all font-bold font-sans">
                    최저가 확인하기 →
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-1 group hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-5 p-4">
                <div className="w-16 h-16 bg-black/30 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-105 transition-transform shrink-0">
                  🖼️
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1 font-sans text-lg break-keep">{result.items[1]}</h4>
                  <p className="text-xs text-gray-400 mb-3 font-sans break-keep">재물운을 부르는 배치</p>
                  <button className="text-[10px] bg-gold-400/20 hover:bg-gold-400 hover:text-black text-gold-300 px-4 py-2 rounded-full transition-all font-bold font-sans">
                    스타일링 예시 보기 →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 카카오톡 공유 버튼 */}
        <section className="animate-fade-in-up delay-200">
           <button 
             onClick={shareKakao}
             className="w-full bg-[#FEE500] hover:bg-[#FDD835] text-[#3c1e1e] font-sans font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg active:scale-[0.98]"
           >
             <span className="text-xl">💬</span> 
             <span>카카오톡으로 친구에게 공유하기</span>
           </button>
        </section>

        {/* 5. 유료 리포트 (Z Flip 대응 완료) */}
        <section className="relative mt-4 animate-fade-in-up delay-300">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-300/50 via-gold-500/50 to-gold-300/50 rounded-[2rem] opacity-60 blur-md animate-pulse"></div>
          <div className="relative bg-black/80 rounded-[2rem] overflow-hidden border border-gold-400/50 backdrop-blur-xl">
            <div className="absolute inset-0 p-8 opacity-20 filter blur-[2px] select-none pointer-events-none overflow-hidden">
              <h4 className="text-xl font-bold mb-6 font-serif text-gray-300 break-keep">2026년 월별 상세 가이드 미리보기</h4>
              <div className="space-y-4 text-sm font-sans text-gray-500">
                <p>1월: 침실 방향을 동쪽으로...</p>
                <p>2월: 현관에 거울을...</p>
                <p>3월: 행운의 색상인...</p>
                <p>4월: 중요한 계약은...</p>
                <p>5월: 남쪽으로 머리를...</p>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-black/40 to-black/90">
              <div className="w-14 h-14 bg-gold-gradient rounded-full flex items-center justify-center text-2xl mb-5 shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-bounce">
                🔓
              </div>
              
              <h3 className="text-lg md:text-2xl font-serif text-white mb-3 break-keep leading-tight px-4">
                <span className="text-gold-400">2026년 대운</span> 시크릿 리포트
              </h3>
              <p className="text-gray-300 text-xs mb-8 font-sans break-keep leading-relaxed opacity-80 px-2">
                남들에게는 보이지 않는<br className="md:hidden"/> 당신만의 월별 기회와 위기를 확인하세요.
              </p>
              
              <button className="w-full bg-gold-gradient text-black font-bold font-sans py-4 rounded-2xl hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] text-base active:scale-[0.98] flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 leading-none">
                <span>지금 바로 잠금 해제</span>
                <div className="flex items-center gap-1 text-sm">
                   <span className="bg-black/10 px-1.5 py-0.5 rounded text-[10px] line-through opacity-60">5,900원</span>
                   <span>→ 2,900원</span>
                </div>
              </button>
            </div>
          </div>
        </section>
        
        <footer className="mt-8 text-center text-[10px] text-gray-600 pb-8 font-sans animate-fade-in-up delay-500">
          © 2026 Objet Dot. Design Your Luck.
        </footer>
      </div>
    </main>
  );
}

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