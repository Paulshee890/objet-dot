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
      // ⚠️ 실제 서비스 시 본인의 JavaScript 키로 교체 필요
      window.Kakao.init("5541daed53e80a7fd5abcbd6f5bf526f"); 
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

  const openShopSearch = (keyword: string) => {
    const url = `https://search.shopping.naver.com/search/all?query=${encodeURIComponent(keyword)}`;
    window.open(url, '_blank');
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
    <main className="min-h-screen bg-noise pb-12 text-white relative animate-fade-in text-sans">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gold-500/10 to-transparent pointer-events-none" />

      {/* 상단 네비게이션 */}
      <nav className="relative z-10 px-6 py-6 flex justify-between items-center">
        <button onClick={() => router.push("/")} className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-1">
          <span className="text-lg">←</span> 처음으로
        </button>
        <span className="font-serif text-gold-400 text-xs tracking-[0.2em]">OBJET DOT</span>
      </nav>

      <div className="px-6 pt-2 relative z-10 flex flex-col gap-6">
        
        {/* 1. 메인 결과 */}
        <section className="animate-fade-in-up">
          <p className="text-gold-400 text-[10px] tracking-widest uppercase text-center mb-3 font-bold">Your Essential Element</p>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-gold-400/20 rounded-full blur-[60px] group-hover:bg-gold-400/30 transition-all duration-500"></div>
            <h1 className="relative text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 mb-4 mt-2 break-keep">
              {result.koreanName}
              <span className="block text-lg font-sans font-bold text-gold-400 mt-2 tracking-[0.2em] uppercase opacity-80">{result.element} Energy</span>
            </h1>
            <div className="relative bg-black/30 rounded-2xl p-5 border border-white/5 backdrop-blur-md">
              <p className="text-gray-200 text-sm leading-relaxed break-keep font-sans">&quot;{result.desc}&quot;</p>
            </div>
          </div>
        </section>

        {/* 2. 상세 정보 */}
        <section className="grid grid-cols-2 gap-4 animate-fade-in-up delay-100">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:border-gold-400/30 transition-colors group">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Lucky Color</span>
            <div className="w-10 h-10 rounded-full shadow-lg border-2 border-white/10 group-hover:scale-110 transition-transform" style={{ backgroundColor: result.color === '화이트' ? '#F1F5F9' : result.color === '블랙' ? '#18181B' : result.color === '레드' ? '#DC2626' : result.color === '그린' ? '#15803D' : '#FACC15' }}></div>
            <span className="text-white font-bold break-keep text-center">{result.color}</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:border-gold-400/30 transition-colors group">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Direction</span>
            <span className="text-3xl group-hover:scale-110 transition-transform">🧭</span>
            <span className="text-white font-bold break-keep text-center">{result.direction}</span>
          </div>
        </section>

        {/* 3. 공간 처방전 (Basic) */}
        <section className="animate-fade-in-up delay-200">
          <h3 className="text-md font-serif text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full"></span>
            공간 처방전 (Basic)
          </h3>
          <div className="space-y-3">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-1 group hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-5 p-4">
                <div className="w-16 h-16 bg-black/30 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-105 transition-transform shrink-0">🎁</div>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1 text-lg break-keep">{result.items[0]}</h4>
                  <p className="text-xs text-gray-400 mb-3 break-keep">부족한 기운을 채워주는 아이템</p>
                  <button onClick={() => openShopSearch(result.items[0])} className="text-[10px] bg-gold-400/20 hover:bg-gold-400 hover:text-black text-gold-300 px-4 py-2 rounded-full transition-all font-bold">최저가 확인하기 →</button>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-1 group hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-5 p-4">
                <div className="w-16 h-16 bg-black/30 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-105 transition-transform shrink-0">🖼️</div>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1 text-lg break-keep">{result.items[1]}</h4>
                  <p className="text-xs text-gray-400 mb-3 break-keep">재물운을 부르는 배치</p>
                  <button onClick={() => openShopSearch(result.items[1])} className="text-[10px] bg-gold-400/20 hover:bg-gold-400 hover:text-black text-gold-300 px-4 py-2 rounded-full transition-all font-bold">스타일링 예시 보기 →</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 유료 리포트 (Premium) */}
        <section className="relative mt-4 animate-fade-in-up delay-300">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-300/50 via-gold-500/50 to-gold-300/50 rounded-[2rem] opacity-60 blur-md animate-pulse"></div>
          
          <div className={`relative bg-black/80 rounded-[2rem] overflow-hidden border border-gold-400/50 backdrop-blur-xl transition-all duration-700`}>
            
            {/* --- A. 잠금 상태 --- */}
            {!isPaid && (
              <>
                <div className="absolute inset-0 p-8 opacity-20 filter blur-[2px] select-none pointer-events-none overflow-hidden font-sans">
                  <h4 className="text-xl font-bold mb-6 font-serif text-gray-300 break-keep">2026년 월별 상세 가이드 미리보기</h4>
                  <div className="space-y-4 text-sm text-gray-500">
                    <p>1월: 침실 방향을 동쪽으로 바꾸면...</p>
                    <p>2월: 현관에 거울을 새로 배치하여...</p>
                    <p>3월: 행운의 색상인 블루 계열을...</p>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-black/40 to-black/90">
                  <div className="w-14 h-14 bg-gold-gradient rounded-full flex items-center justify-center text-2xl mb-5 shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-bounce">🔓</div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-3 break-keep leading-tight px-4">
                    <span className="text-gold-400">2026년 대운</span> 시크릿 리포트
                  </h3>
                  <p className="text-gray-300 text-xs mb-8 break-keep leading-relaxed opacity-80">
                    남들에게는 보이지 않는<br className="md:hidden"/> 당신만의 월별 기회와 위기를 확인하세요.
                  </p>
                  <button 
                    onClick={handlePayment}
                    className="w-full bg-gold-gradient text-black font-bold py-4 rounded-2xl hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] text-base active:scale-[0.98] flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 leading-none"
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

            {/* --- B. 해제 상태 (수정: 리포트 닫기 버튼 삭제됨) --- */}
            {isPaid && (
              <div className="relative z-10 bg-charcoal animate-fade-in-up font-sans">
                 
                 {/* 리포트 헤더 */}
                 <div className="bg-gradient-to-b from-gold-900/40 to-charcoal p-8 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-2xl">🗝️</span>
                       <h3 className="text-xl font-serif text-gold-400">Premium Secret Report</h3>
                    </div>
                    
                    <div className="flex items-end gap-3 mb-4 mt-6">
                       <div className="text-5xl font-bold font-serif text-white">88<span className="text-sm text-gray-500 font-normal ml-1">/100</span></div>
                       <div className="text-sm text-gold-400 font-bold mb-2">▲ 상승세</div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                       <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white border border-white/10">#재물운상승</span>
                       <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white border border-white/10">#귀인출현</span>
                    </div>
                 </div>

                 {/* 분야별 상세 분석 */}
                 <div className="p-6 grid grid-cols-1 gap-6">
                    
                    {/* 💰 재물운 */}
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                       <h4 className="text-gold-400 font-bold text-sm mb-2 flex items-center gap-2">💰 재물운 (Wealth)</h4>
                       <p className="text-xs text-gray-300 leading-relaxed break-keep mb-4">
                          상반기보다는 하반기(8월 이후)에 큰 흐름이 들어옵니다. 무리한 투자는 피하고 현금 흐름을 확보하세요.
                       </p>
                       <div className="bg-black/30 rounded-xl p-3 flex items-start gap-4 border border-gold-400/20 shadow-inner relative">
                          <div className="text-3xl filter drop-shadow-[0_0_5px_rgba(212,175,55,0.5)] pt-1">🖤</div>
                          <div className="flex-1">
                             <div className="text-[10px] text-gold-400 font-bold tracking-widest mb-1">✨ KEY OBJET</div>
                             <div className="text-white font-bold mb-1">검은색 가죽 지갑</div>
                             <div className="text-[10px] text-gray-400 leading-tight mb-3">
                               검은색(水)의 기운이 충동적인 지출(火)을 눌러주어 재물이 새는 것을 막아줍니다.
                             </div>
                             <button 
                                onClick={() => openShopSearch("검은색 가죽 지갑")}
                                className="w-full bg-gold-400/10 hover:bg-gold-400 hover:text-black border border-gold-400/30 text-gold-400 text-[10px] py-2 rounded-lg transition-colors font-bold"
                             >
                                🛍️ 추천 아이템 구매하기
                             </button>
                          </div>
                       </div>
                    </div>

                    {/* ❤️ 애정/인간관계 */}
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                       <h4 className="text-red-300 font-bold text-sm mb-2 flex items-center gap-2">❤️ 애정/인간관계</h4>
                       <p className="text-xs text-gray-300 leading-relaxed break-keep mb-4">
                          새로운 인연보다는 오래된 인연이 귀인이 됩니다. 침실 분위기를 따뜻하게 바꾸면 관계가 개선됩니다.
                       </p>
                       <div className="bg-black/30 rounded-xl p-3 flex items-start gap-4 border border-red-400/20 shadow-inner relative">
                          <div className="text-3xl filter drop-shadow-[0_0_5px_rgba(248,113,113,0.5)] pt-1">💡</div>
                          <div className="flex-1">
                             <div className="text-[10px] text-red-300 font-bold tracking-widest mb-1">✨ KEY OBJET</div>
                             <div className="text-white font-bold mb-1">웜톤 무드등</div>
                             <div className="text-[10px] text-gray-400 leading-tight mb-3">
                               따뜻한 빛은 공간의 온도를 높여 차가운 기운을 녹이고 친밀감을 형성합니다.
                             </div>
                             <button 
                                onClick={() => openShopSearch("웜톤 무드등")}
                                className="w-full bg-red-400/10 hover:bg-red-400 hover:text-black border border-red-400/30 text-red-300 text-[10px] py-2 rounded-lg transition-colors font-bold"
                             >
                                🛍️ 추천 아이템 구매하기
                             </button>
                          </div>
                       </div>
                    </div>

                    {/* 💼 직업/학업 */}
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                       <h4 className="text-blue-300 font-bold text-sm mb-2 flex items-center gap-2">💼 직업/학업</h4>
                       <p className="text-xs text-gray-300 leading-relaxed break-keep mb-4">
                          변화보다는 안정을 택해야 할 시기입니다. 책상 위를 정리하여 집중력을 높이는 것이 중요합니다.
                       </p>
                       <div className="bg-black/30 rounded-xl p-3 flex items-start gap-4 border border-blue-400/20 shadow-inner relative">
                          <div className="text-3xl filter drop-shadow-[0_0_5px_rgba(96,165,250,0.5)] pt-1">🪴</div>
                          <div className="flex-1">
                             <div className="text-[10px] text-blue-300 font-bold tracking-widest mb-1">✨ KEY OBJET</div>
                             <div className="text-white font-bold mb-1">소형 스투키 화분</div>
                             <div className="text-[10px] text-gray-400 leading-tight mb-3">
                               곧게 자라는 식물의 목(木) 기운이 성장을 돕고 머리를 맑게 합니다.
                             </div>
                             <button 
                                onClick={() => openShopSearch("소형 스투키 화분")}
                                className="w-full bg-blue-400/10 hover:bg-blue-400 hover:text-black border border-blue-400/30 text-blue-300 text-[10px] py-2 rounded-lg transition-colors font-bold"
                             >
                                🛍️ 추천 아이템 구매하기
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* 월별 흐름 */}
                 <div className="px-6 pb-10 border-b border-white/5">
                    <h4 className="text-white font-serif text-md mb-4 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-gold-400 rounded-full"></span> 2026년 흐름
                    </h4>
                    <div className="space-y-3">
                       <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 items-center">
                          <div className="text-gold-400 font-bold text-xs w-12 shrink-0">1월-3월</div>
                          <div className="text-xs text-gray-400 break-keep">
                             시작의 기운이 좋으나 마무리가 약합니다. <strong className="text-white">👉 {result.items && result.items[0]} 휴대 추천</strong>
                          </div>
                       </div>
                       <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 items-center">
                          <div className="text-red-400 font-bold text-xs w-12 shrink-0">4월-6월</div>
                          <div className="text-xs text-gray-400 break-keep">
                             에너지가 과열될 수 있으니 시원한 블루 계열 소품을 가까이 하세요.
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* 맺음말 */}
                 <div className="p-8 text-center bg-gradient-to-t from-black/50 to-transparent">
                    <p className="text-xs text-gray-500 italic font-serif">
                       &quot;작은 오브제가 당신의 공간을 바꾸고,<br/>바뀐 공간이 당신의 운명을 완성합니다.&quot;
                    </p>
                 </div>
              </div>
            )}

          </div>
        </section>

        {/* 하단 공유 섹션 */}
        <div className="flex justify-center pb-8 mt-4">
          <button onClick={shareToKakao} className="flex items-center gap-2 bg-[#FEE500] text-[#000000] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
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