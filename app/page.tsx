import Link from "next/link"; // 1. 상단에 이거 추가

export default function Home() {
  return (
    <main className="flex flex-col h-full">
      {/* ... (헤더와 메인 문구는 그대로 둠) ... */}
      
      <header className="p-6 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-2xl font-serif text-[#D4AF37] tracking-wider">Objet Dot.</h1>
        <span className="text-xs text-gray-500 border border-gray-700 px-2 py-1 rounded-full">BETA</span>
      </header>

      <section className="flex-1 px-6 py-12 flex flex-col justify-center gap-8">
        <div className="space-y-4">
          <p className="text-[#D4AF37] text-sm tracking-[0.2em] uppercase font-medium">Oriental Modernism</p>
          <h2 className="text-4xl font-serif leading-tight text-white">
            흐름을 바꾸는 <br/>
            <span className="italic text-gray-400">작은 점 하나.</span>
          </h2>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-gray-700 pl-4">
          공간의 밸런스를 맞추는 데이터.<br/>
          당신의 사주에 부족한 기운을 찾아<br/>
          가장 세련된 오브제로 채워드립니다.
        </p>

        <div className="pt-8">
          {/* 2. 버튼을 Link로 감싸서 페이지 이동 기능 추가 */}
          <Link href="/input">
            <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B5952F] text-gray-900 font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-yellow-900/20 active:scale-95">
              내 부족한 오행 분석하기 →
            </button>
          </Link>
          <p className="text-center text-xs text-gray-600 mt-4">
            * 별도 가입 없이 30초 만에 완료됩니다.
          </p>
        </div>
      </section>

      <div className="h-32 bg-gradient-to-t from-gray-800/50 to-transparent flex items-end justify-center pb-6">
        <span className="text-gray-700 text-xs tracking-widest">DESIGN YOUR LUCK</span>
      </div>
    </main>
  );
}