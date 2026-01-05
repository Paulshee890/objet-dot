"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { analyzeSaju } from "../../lib/sajuLogic";

// [타입 정의]
interface SajuResult {
  koreanName: string;
  element: string;
  desc: string;
  items: string[];
  color: string;
  direction: string;
}

// [Kakao 타입 정의]
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: unknown) => void;
      };
    } | undefined;
  }
}

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const birthDate = searchParams.get("birthDate");

  const [result, setResult] = useState<SajuResult | null>(null);
  const [loading, setLoading] = useState(true);
  
  // 결제 상태 관리
  const [isPaid, setIsPaid] = useState(false);

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

  const shareToKakao = () => {
    if (typeof window === "undefined" || !window.Kakao) return;

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("YOUR_KAKAO_JAVASCRIPT_KEY"); // [필수] 키값 확인
    }

    const homeUrl = window.location.origin; 
    
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: "Objet Dot | 당신의 공간에 운을 더하다",
        description: "사주 명리학 데이터로 공간의 결핍을 찾아, 당신의 운을 완성하는 오브제를 제안합니다.",
        imageUrl: 'https://objet-dot.vercel.app/og-image.jpg',
        link: { mobileWebUrl: homeUrl, webUrl: homeUrl },
      },
      buttons: [{ title: '나도 내 운세 확인하기', link: { mobileWebUrl: homeUrl, webUrl: homeUrl } }],
    });
  };

  const handlePayment = () => {
    const confirmPayment = confirm("이건 테스트입니다.\n[확인]을 누르면 결제가 완료된 것처럼 화면이 열립니다.");
    if (confirmPayment) {
      setIsPaid(true);
    }
  };

  if (loading || !result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative bg-noise">
        <div className="absolute w-[300px] h-[300px] bg-gold-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="z-10 flex flex-col items-center animate-fade-in-up">
          <div className="w-16 h-16 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-gold-300 font-serif animate-pulse tracking-widest text-sm">운명의 흐름을 읽는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-noise pb-12 text-white relative animate-fade-in">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gold-500/10 to-transparent pointer-events-none" />

      <nav className="relative z-10 px-6 py-6 flex justify-between items-center">
        <button onClick={() => router.push("/")} className="text-gray-400 text-sm hover:text-white transition-colors font-sans flex items-center gap-1">
          <span className="text-lg">←</span> 처음으로
        </button>
        <span className="font-serif text-gold-400 text-xs tracking-[0.2em]">OBJET DOT</span>
      </nav>

      <div className="px-6 pt-2 relative z-10 flex flex-col gap-6">
        {/* 1. 메인 결과 */}
        <section className="animate-fade-in-up">
          <p className="text-gold-400 text-[10px] tracking-widest uppercase text-center mb-3 font-sans font-bold">Your Essential Element</p>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-gold-400/20 rounded-full blur-[60px] group-hover:bg-gold-400/30 transition-all duration-500"></div>
            <h1 className="relative text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 mb-4 mt-2 break-keep">
              {result.koreanName}
              <span className="block text-lg font-sans font-bold text-gold-400 mt-2 tracking-[0.2em] uppercase opacity-80">{result.element} Energy</span>
            </h1>
            <div className="relative bg-black/30 rounded-2xl p-5 border border-white/5 backdrop-blur-md">
              <p className="text-gray-200 text-sm leading-relaxed font-sans break-keep">&quot;{result.desc}&quot;</p>
            </div>
          </div>
        </section>

        {/* 2. 상세 정보 */}
        <section className="grid grid-cols-2 gap-4 animate-fade-in-up delay-100">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:border-gold-400/30 transition-colors group">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold font-sans">Lucky Color</span>
            <div className="w-10 h-10 rounded-full shadow-lg border-2 border-white/10 group-hover:scale-110 transition-transform" style={{ backgroundColor: result.color === '화이트' ? '#F1F5F9' : result.color === '블랙' ? '#18181B' : result.color === '레드' ? '#DC2626' : result.color === '그린' ? '#15803D' : '#FACC15' }}></div>
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
                <div className="w-16 h-16 bg-black/30 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-105 transition-transform shrink-0">🎁</div>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1 font-sans text-lg break-keep">{result.items[0]}</h4>
                  <p className="text-xs text-gray-400 mb-3 font-sans break-keep">부족한 기운을 채워주는 아이템</p>
                  <button className="text-[10px] bg-gold-400/20 hover:bg-gold-400 hover:text-black text-gold-300 px-4 py-2 rounded-full transition-all font-bold font-sans">최저가 확인하기 →</button>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-1 group hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-5 p-4">
                <div className="w-16 h-16 bg-black/30 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-105 transition-transform shrink-0">🖼️</div>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1 font-sans text-lg break-keep">{result.items[1]}</h4>
                  <p className="text-xs text-gray-400 mb-3 font-sans break-keep">재물운을 부르는 배치</p>
                  <button className="text-[10px] bg-gold-400/20 hover:bg-gold-400 hover:text-black text-gold-300 px-4 py-2 rounded-full transition-all font-bold font-sans">스타일링 예시 보기 →</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 유료 리포트 (업그레이드 버전) */}
        <section className="relative mt-4 animate-fade-in-up delay-300">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-300/50 via-gold-500/50 to-gold-300/50 rounded-[2rem] opacity-60 blur-md animate-pulse"></div>
          
          <div className={`relative bg-black/80 rounded-[2rem] overflow-hidden border border-gold-400/50 backdrop-blur-xl transition-all duration-700 ${isPaid ? 'p-0' : ''}`}>
            
            {/* --- A. 잠금 상태 --- */}
            {!isPaid && (
              <>
                <div className="absolute inset-0 p-8 opacity-20 filter blur-[2px] select-none pointer-events-none overflow-hidden">
                  <h4 className="text-xl font-bold mb-6 font-serif text-gray-300 break-keep">2026년 월별 상세 가이드 미리보기</h4>
                  <div className="space-y-4 text-sm font-sans text-gray-500">
                    <p>1월: 침실 방향을...</p>
                    <p>2월: 현관에 거울을...</p>
                    <p>3월: 행운의 색상인...</p>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-black/40 to-black/90">
                  <div className="w-14 h-14 bg-gold-gradient rounded-full flex items-center justify-center text-2xl mb-5 shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-bounce">🔓</div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-3 break-keep leading-tight px-4">
                    <span className="text-gold-400">2026년 대운</span> 시크릿 리포트
                  </h3>
                  <p className="text-gray-300 text-xs mb-8 font-sans break-keep leading-relaxed opacity-80">
                    남들에게는 보이지 않는<br className="md:hidden"/> 당신만의 월별 기회와 위기를 확인하세요.
                  </p>
                  <button 
                    onClick={handlePayment}
                    className="w-full bg-gold-gradient text-black font-bold font-sans py-4 rounded-2xl hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] text-base active:scale-[0.98] flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 leading-none"
                  >
                    <span>지금 바로 잠금 해제</span>
                    <div className="flex items-center gap-1 text-sm">
                       <span className="bg-black/10 px-1.5 py-0.5 rounded text-[10px] line-through opacity-60">5,900원</span>
                       <span>→ 2,900원</span>
                    </div>
                  </button>
                </div>
              </>
            )}

            {/* --- B. 해제 상태 (Content Rich Version) --- */}
            {isPaid && (
              <div className="relative z-10 bg-charcoal animate-fade-in">
                 
                 {/* 1. 리포트 헤더 */}
                 <div className="bg-gradient-to-b from-gold-900/40 to-charcoal p-8 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-2xl">🗝️</span>
                       <h3 className="text-xl font-serif text-gold-400">Premium Secret Report</h3>
                    </div>
                    <p className="text-[11px] text-gray-400 font-sans mb-6">
                       당신의 생년월일시({birthDate})를 기반으로 분석된<br/>2026년 정밀 운세 리포트입니다.
                    </p>

                    {/* 종합 운세 스코어 */}
                    <div className="flex items-end gap-3 mb-4">
                       <div className="text-5xl font-bold font-serif text-white">88<span className="text-sm font-sans text-gray-500 font-normal ml-1">/100</span></div>
                       <div className="text-sm text-gold-400 font-bold mb-2">▲ 상승세</div>
                    </div>
                    
                    {/* 키워드 태그 */}
                    <div className="flex gap-2 flex-wrap">
                       <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white border border-white/10">#재물운상승</span>
                       <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white border border-white/10">#귀인출현</span>
                       <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white border border-white/10">#이동수주의</span>
                    </div>
                 </div>

                 {/* 2. 분야별 상세 분석 (2단 그리드) */}
                 <div className="p-6 grid grid-cols-1 gap-4">
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                       <h4 className="text-gold-400 font-bold text-sm mb-2 flex items-center gap-2">💰 재물운 (Wealth)</h4>
                       <p className="text-xs text-gray-300 leading-relaxed break-keep">
                          상반기보다는 <strong className="text-white">하반기(8월 이후)</strong>에 큰 흐름이 들어옵니다. 무리한 투자는 피하고, 현금 흐름을 확보하는 것이 유리합니다. 지갑을 검은색으로 바꾸면 돈이 새는 것을 막을 수 있습니다.
                       </p>
                    </div>
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                       <h4 className="text-red-300 font-bold text-sm mb-2 flex items-center gap-2">❤️ 애정/인간관계</h4>
                       <p className="text-xs text-gray-300 leading-relaxed break-keep">
                          새로운 인연보다는 <strong className="text-white">오래된 인연</strong>이 귀인이 되어 돌아옵니다. 침실의 머리 방향을 {result.direction}쪽으로 두면 관계가 개선됩니다.
                       </p>
                    </div>
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                       <h4 className="text-blue-300 font-bold text-sm mb-2 flex items-center gap-2">💼 직업/학업</h4>
                       <p className="text-xs text-gray-300 leading-relaxed break-keep">
                          변화보다는 <strong className="text-white">안정</strong>을 택해야 할 시기입니다. 이직을 고려한다면 5월은 피하는 것이 좋습니다. 책상 위에 작은 스투키 화분을 두면 집중력이 올라갑니다.
                       </p>
                    </div>
                 </div>

                 {/* 3. 월별 흐름 (Timeline) */}
                 <div className="px-6 pb-6">
                    <h4 className="text-white font-serif text-md mb-4 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-gold-400 rounded-full"></span> 2026년 흐름
                    </h4>
                    <div className="space-y-3">
                       <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-gold-400 font-bold text-xs w-12 shrink-0">1월-3월<br/>(봄)</div>
                          <div className="text-xs text-gray-400 break-keep">
                             시작의 기운이 좋으나 마무리가 약할 수 있습니다. 계획을 세우되, 실행은 신중히 하세요. <strong className="text-white">행운의 아이템: {result.items && result.items[0]}</strong>
                          </div>
                       </div>
                       <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-red-400 font-bold text-xs w-12 shrink-0">4월-6월<br/>(여름)</div>
                          <div className="text-xs text-gray-400 break-keep">
                             에너지가 과열될 수 있습니다. 감정적인 결정을 피하고, 물가(수변 공원 등)를 자주 찾으세요. 건강 검진을 받기 좋은 시기입니다.
                          </div>
                       </div>
                       <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-white font-bold text-xs w-12 shrink-0">하반기<br/>Key</div>
                          <div className="text-xs text-gray-400 break-keep">
                             그동안의 노력이 결실을 맺습니다. 특히 10월에는 뜻밖의 수익이 생길 수 있으니 기회를 놓치지 마세요.
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* 4. 스페셜 팁 (Warning) */}
                 <div className="mx-6 mb-8 bg-red-900/20 border border-red-500/20 p-4 rounded-xl">
                    <h4 className="text-red-400 font-bold text-xs mb-1">⚠️ 주의사항 (Warning)</h4>
                    <p className="text-[11px] text-red-200/80 leading-relaxed break-keep">
                       올해 집안의 <strong className="text-red-200">북서쪽</strong>에는 붉은 물건을 두지 마세요. 기운이 충돌하여 두통을 유발할 수 있습니다. 깨진 거울이나 그릇은 즉시 버려야 합니다.
                    </p>
                 </div>

                 <button className="w-full border-t border-white/10 text-gray-500 text-xs py-4 hover:bg-white/5 transition-colors">
                    리포트 닫기
                 </button>
              </div>
            )}

          </div>
        </section>

        <div className="flex justify-center pb-8">
          <button onClick={shareToKakao} className="flex items-center gap-2 bg-[#FEE500] text-[#000000] px-6 py-3 rounded-xl font-sans font-bold hover:scale-105 transition-transform">
            <span className="text-xl">💬</span> 친구에게 사이트 추천하기
          </button>
        </div>
        
        <footer className="text-center text-[10px] text-gray-600 pb-8 font-sans animate-fade-in-up delay-500">© 2026 Objet Dot. Design Your Luck.</footer>
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