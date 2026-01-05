"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// 시간 옵션 데이터
const timeOptions = [
  { value: "", label: "시간 모름 / 무관" },
  { value: "00", label: "자시 (23:30 ~ 01:29)" },
  { value: "02", label: "축시 (01:30 ~ 03:29)" },
  { value: "04", label: "인시 (03:30 ~ 05:29)" },
  { value: "06", label: "묘시 (05:30 ~ 07:29)" },
  { value: "08", label: "진시 (07:30 ~ 09:29)" },
  { value: "10", label: "사시 (09:30 ~ 11:29)" },
  { value: "12", label: "오시 (11:30 ~ 13:29)" },
  { value: "14", label: "미시 (13:30 ~ 15:29)" },
  { value: "16", label: "신시 (15:30 ~ 17:29)" },
  { value: "18", label: "유시 (17:30 ~ 19:29)" },
  { value: "20", label: "술시 (19:30 ~ 21:29)" },
  { value: "22", label: "해시 (21:30 ~ 23:29)" },
];

export default function InputPage() {
  const router = useRouter();
  
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [gender, setGender] = useState("male");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 선택된 시간의 라벨
  const selectedTimeLabel = timeOptions.find(t => t.value === time)?.label || "태어난 시간을 선택하세요";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!year || !month || !day) {
      alert("생년월일을 모두 입력해주세요.");
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      const birthDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      router.push(`/result?birthDate=${birthDate}&gender=${gender}`);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-noise flex flex-col relative overflow-hidden">
      
      {/* 네비게이션 */}
      <nav className="flex justify-between items-center p-6 relative z-10">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white transition-colors p-2 -ml-2">
          <span className="text-xl">←</span>
        </button>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_10px_#D4AF37]"></div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
        </div>
      </nav>

      {/* 로딩 오버레이 */}
      {isAnalyzing && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in px-6 text-center">
          <div className="relative mb-10">
            <div className="w-32 h-32 border border-gold-400/20 rounded-full animate-ping absolute inset-0"></div>
            <div className="w-32 h-32 border border-gold-400/40 rounded-full animate-pulse absolute inset-0 delay-300"></div>
            <div className="w-32 h-32 border-t-2 border-gold-400 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-3xl font-serif text-transparent bg-clip-text bg-gold-gradient mb-4 animate-fade-in-up">
            명식(命式) 산출 중
          </h2>
          <p className="text-gray-400 text-sm font-sans font-light leading-relaxed animate-fade-in-up delay-100">
            생년월일시의 기운을 조합하여<br/>당신만의 오행 지도를 그리고 있습니다.
          </p>
        </div>
      )}

      {/* 메인 폼 */}
      <div className={`flex-1 flex flex-col p-6 pt-2 pb-10 transition-all duration-700 ${isAnalyzing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}>
        
        <div className="mb-10 animate-fade-in-up">
          {/* 제목은 감성적인 Serif(명조) 유지 */}
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
            당신의 <span className="text-gold italic">시작</span>을<br/>
            알려주세요.
          </h1>
          {/* 설명은 가독성 좋은 Sans(고딕)으로 변경 */}
          <p className="text-gray-500 text-sm font-sans">정확한 분석을 위해 양력 생년월일을 입력해주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 animate-fade-in-up delay-100">
          
          {/* 1. 생년월일 (숫자는 깔끔한 Sans 폰트로 변경) */}
          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
            <label className="block text-[10px] text-gold-400 tracking-widest uppercase mb-6 font-bold font-sans">Date of Birth</label>
            <div className="flex items-end justify-between gap-2">
              <div className="flex-1 text-center">
                <input 
                  type="number" placeholder="1990" value={year} onChange={(e) => setYear(e.target.value)} 
                  className="w-full bg-transparent border-b-2 border-white/10 text-center text-3xl text-white font-sans font-bold py-2 focus:border-gold-400 outline-none transition-colors placeholder:text-gray-800" 
                />
                <span className="block text-[10px] text-gray-600 mt-2 uppercase font-sans">Year</span>
              </div>
              <span className="text-2xl text-gray-700 pb-8 font-sans">/</span>
              <div className="w-20 text-center">
                <input 
                  type="number" placeholder="01" value={month} onChange={(e) => setMonth(e.target.value)} 
                  className="w-full bg-transparent border-b-2 border-white/10 text-center text-3xl text-white font-sans font-bold py-2 focus:border-gold-400 outline-none transition-colors placeholder:text-gray-800" 
                />
                <span className="block text-[10px] text-gray-600 mt-2 uppercase font-sans">Month</span>
              </div>
              <span className="text-2xl text-gray-700 pb-8 font-sans">/</span>
              <div className="w-20 text-center">
                <input 
                  type="number" placeholder="01" value={day} onChange={(e) => setDay(e.target.value)} 
                  className="w-full bg-transparent border-b-2 border-white/10 text-center text-3xl text-white font-sans font-bold py-2 focus:border-gold-400 outline-none transition-colors placeholder:text-gray-800" 
                />
                <span className="block text-[10px] text-gray-600 mt-2 uppercase font-sans">Day</span>
              </div>
            </div>
          </section>

          {/* 2. 시간 선택 (텍스트는 깔끔한 Sans 폰트) */}
          <section className="relative group">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex items-center justify-between transition-colors group-hover:border-gold-400/50">
              <div>
                <label className="block text-[10px] text-gold-400 tracking-widest uppercase mb-1 font-bold font-sans">Time of Birth</label>
                {/* 선택된 값은 고딕체로 명확하게 */}
                <div className={`text-lg font-sans ${time ? 'text-white font-bold' : 'text-gray-500'}`}>
                  {selectedTimeLabel}
                </div>
              </div>
              <div className="text-gold-400 text-xl">▼</div>
            </div>
            <select 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
              {timeOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-charcoal text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </section>

          {/* 3. 성별 선택 (라벨은 Sans 폰트) */}
          <section className="grid grid-cols-2 gap-4 flex-1 min-h-[140px]">
            <button
              type="button"
              onClick={() => setGender("male")}
              className={`relative rounded-3xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${
                gender === "male" 
                  ? "bg-gold-gradient border-transparent shadow-[0_0_20px_rgba(212,175,55,0.3)]" 
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <span className={`text-4xl ${gender === "male" ? "scale-110" : "grayscale opacity-50"} transition-transform`}>
                👨
              </span>
              <span className={`text-sm font-bold font-sans tracking-widest uppercase ${gender === "male" ? "text-black" : "text-gray-500"}`}>
                Man
              </span>
              {gender === "male" && <div className="absolute top-4 right-4 text-black text-lg">✔</div>}
            </button>

            <button
              type="button"
              onClick={() => setGender("female")}
              className={`relative rounded-3xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${
                gender === "female" 
                  ? "bg-gold-gradient border-transparent shadow-[0_0_20px_rgba(212,175,55,0.3)]" 
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <span className={`text-4xl ${gender === "female" ? "scale-110" : "grayscale opacity-50"} transition-transform`}>
                👩
              </span>
              <span className={`text-sm font-bold font-sans tracking-widest uppercase ${gender === "female" ? "text-black" : "text-gray-500"}`}>
                Woman
              </span>
               {gender === "female" && <div className="absolute top-4 right-4 text-black text-lg">✔</div>}
            </button>
          </section>

          {/* 4. 완료 버튼 (디자인 수정: 골드 그라데이션 + 검은색 텍스트 + 고딕체) */}
          <button
            type="submit"
            className="w-full bg-gold-gradient text-black font-sans font-bold text-xl py-5 rounded-3xl shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all active:scale-[0.98] mt-4"
          >
            분석 결과 확인하기
          </button>
          
        </form>
      </div>
    </main>
  );
}