import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col justify-between bg-noise overflow-hidden selection:bg-gold-400 selection:text-black">
      
      {/* 1. 배경 아트워크 (살아 움직이는 오리엔탈 무드) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-gradient-to-b from-charcoal to-transparent rounded-full opacity-60 blur-3xl" />
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gold-500/10 rounded-full blur-[100px] animate-pulse duration-[4000ms]" />
      </div>

      {/* 2. 상단 브랜드 영역 */}
      <header className="relative z-10 p-6 pt-16 text-center">
        {/* 작은 태그 */}
        <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full mb-10 animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] text-gray-300 uppercase font-sans">
            Oriental Modernism
          </span>
        </div>
        
        {/* 메인 타이틀 (한 줄로 변경) */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white tracking-tight animate-fade-in-up delay-100 whitespace-nowrap">
          Objet <span className="text-gold">Dot.</span>
        </h1>
      </header>

      {/* 3. 중앙 메시지 */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <p className="font-serif text-xl md:text-2xl text-gray-200 leading-relaxed opacity-90 animate-fade-in-up delay-200">
          흐름을 바꾸는<br />
          작은 점 하나.
        </p>
        
        {/* 장식용 라인 */}
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold-400/0 via-gold-400/50 to-gold-400/0 my-8 animate-pulse" />
        
        <p className="text-xs text-gray-500 max-w-[260px] leading-relaxed animate-fade-in-up delay-300 font-sans">
          사주 데이터로 공간의 결핍을 찾아<br />
          당신의 운을 완성하는 오브제를 제안합니다.
        </p>
      </section>

      {/* 4. 하단 액션바 */}
      <footer className="relative z-20 p-6 pb-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl animate-fade-in-up delay-500">
          <Link
            href="/input"
            className="group relative flex items-center justify-between bg-gold-gradient px-6 py-5 rounded-xl transition-transform active:scale-[0.98]"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-gold-900 font-bold tracking-widest uppercase mb-0.5 font-sans">
                Start Curation
              </span>
              {/* 버튼 문구 변경: 가치 중심 */}
              <span className="text-black font-sans font-bold text-lg">
                나의 오브제 찾기
              </span>
            </div>
            
            <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <span className="text-black text-xl">→</span>
            </div>
            
            {/* 버튼 내부 광택 효과 */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20 pointer-events-none" />
          </Link>
          
          <p className="text-center text-[10px] text-gray-500 mt-3 font-sans">
            * 별도 가입 없이 30초 만에 완료됩니다.
          </p>
        </div>
      </footer>
    </main>
  );
}