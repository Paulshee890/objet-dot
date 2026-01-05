import Link from "next/link";

export default function Home() {
  return (
    // 전체 화면 컨테이너 (노이즈 질감 배경 적용)
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center bg-noise overflow-hidden">
      
      {/* 1. 배경 장식 요소 (은은하게 빛나는 달/원) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 2. 상단 작은 태그 */}
      <div className="relative z-10 animate-fade-in-up delay-0">
        <span className="inline-block px-3 py-1 mb-6 text-[10px] tracking-[0.3em] text-gold-300 border border-gold-500/30 rounded-full uppercase bg-black/30 backdrop-blur-sm">
          Oriental Modernism
        </span>
      </div>

      {/* 3. 메인 타이틀 (황금빛 그라데이션 효과) */}
      <h1 className="relative z-10 font-serif text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up delay-100">
        <span className="text-gold">Objet Dot.</span>
      </h1>

      {/* 4. 서브 카피 */}
      <p className="relative z-10 font-serif text-lg md:text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in-up delay-200">
        흐름을 바꾸는<br />
        작은 점 하나.
      </p>

      {/* 5. 설명 텍스트 */}
      <p className="relative z-10 text-sm text-gray-500 mb-12 max-w-xs mx-auto leading-relaxed animate-fade-in-up delay-300">
        공간의 밸런스를 맞추는 데이터.<br />
        당신의 사주에 부족한 기운을 찾아<br />
        가장 세련된 오브제로 채워드립니다.
      </p>

      {/* 6. 시작하기 버튼 (숨쉬는 애니메이션) */}
      <div className="relative z-10 animate-fade-in-up delay-500">
        <Link
          href="/input"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-serif font-bold text-black transition-all duration-300 bg-gold-400 rounded-full hover:scale-105 hover:bg-gold-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
        >
          {/* 버튼 안쪽 텍스트 */}
          <span className="mr-2">내 부족한 오행 분석하기</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
          
          {/* 버튼 뒤에서 퍼지는 파동 효과 (Ping) */}
          <span className="absolute w-full h-full rounded-full bg-gold-400 opacity-30 animate-ping group-hover:opacity-10"></span>
        </Link>
        
        <p className="mt-4 text-[10px] text-gray-600">
          * 별도 가입 없이 30초 만에 완료됩니다.
        </p>
      </div>

      {/* 하단 장식 텍스트 */}
      <div className="absolute bottom-8 text-[10px] text-gray-700 tracking-widest uppercase">
        Design Your Luck
      </div>
    </main>
  );
}