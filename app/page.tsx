import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col justify-between bg-noise overflow-hidden">
      
      {/* 1. 배경 아트워크 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-gradient-to-b from-charcoal to-transparent rounded-full opacity-60 blur-3xl" />
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gold-500/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* 2. 상단 브랜드 영역 */}
      <header className="relative z-10 p-6 pt-12 text-center">
        <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] text-gray-300 uppercase">
            Oriental Modernism
          </span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-serif font-bold text-white leading-tight tracking-tight animate-fade-in-up delay-100">
          Objet<br />
          <span className="text-gold">Dot.</span>
        </h1>
      </header>

      {/* 3. 중앙 메시지 */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <p className="font-serif text-xl md:text-2xl text-gray-200 leading-relaxed opacity-90 animate-fade-in-up">
          흐름을 바꾸는<br />
          작은 점 하나.
        </p>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold-400/0 via-gold-400/50 to-gold-400/0 my-8 animate-pulse" />
        <p className="text-xs text-gray-500 max-w-[240px] leading-relaxed animate-fade-in-up">
          사주 명리학 데이터로 공간의 결핍을 찾아<br />
          당신의 운을 완성하는 오브제를 제안합니다.
        </p>
      </section>

      {/* 4. 하단 액션바 */}
      <footer className="relative z-20 p-6 pb-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl animate-fade-in-up">
          <Link
            href="/input"
            className="group relative flex items-center justify-between bg-gold-gradient px-6 py-4 rounded-xl transition-transform active:scale-[0.98]"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-gold-900 font-bold tracking-widest uppercase mb-0.5">Start Analysis</span>
              <span className="text-black font-serif font-bold text-lg">내 부족한 오행 찾기</span>
            </div>
            
            <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <span className="text-black text-xl">→</span>
            </div>
          </Link>
          
          <p className="text-center text-[10px] text-gray-500 mt-3">
            * 별도 가입 없이 30초 만에 완료됩니다.
          </p>
        </div>
      </footer>
    </main>
  );
}