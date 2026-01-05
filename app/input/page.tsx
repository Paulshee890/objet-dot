"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InputPage() {
  const router = useRouter();

  // 사용자 입력값을 저장하는 상태(State)
  const [formData, setFormData] = useState({
    birthDate: "",
    birthTime: "",
    gender: "male",
    concern: "money", // 기본값: 재물운
  });

  // 입력값이 바뀔 때마다 상태 업데이트
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 결과 보기 버튼 클릭 시 실행
  const handleSubmit = () => {
    if (!formData.birthDate) {
      alert("생년월일을 입력해주세요.");
      return;
    }
    // 정보를 URL에 담아서 결과 페이지로 이동 (예: /result?date=1983-03-18&...)
    const query = new URLSearchParams(formData).toString();
    router.push(`/result?${query}`);
  };

  return (
    <main className="flex flex-col min-h-screen p-6 gap-8">
      {/* 뒤로가기 헤더 */}
      <header className="flex items-center pt-2">
        <button onClick={() => router.back()} className="text-gray-400 text-sm hover:text-white">
          ← 뒤로가기
        </button>
      </header>

      <div className="space-y-2">
        <h2 className="text-2xl font-serif text-[#D4AF37]">정보 입력</h2>
        <p className="text-gray-400 text-sm">
          정확한 사주 분석을 위해<br />
          태어난 시간까지 입력해주시면 좋습니다.
        </p>
      </div>

      {/* 입력 폼 영역 */}
      <div className="flex flex-col gap-6">
        
        {/* 1. 생년월일 */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">생년월일 (양력)</label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleChange("birthDate", e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:border-[#D4AF37] outline-none transition-colors"
          />
        </div>

        {/* 2. 태어난 시간 */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">태어난 시간</label>
          <input
            type="time"
            value={formData.birthTime}
            onChange={(e) => handleChange("birthTime", e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:border-[#D4AF37] outline-none transition-colors"
          />
          <p className="text-xs text-gray-500">* 모르면 비워두셔도 됩니다.</p>
        </div>

        {/* 3. 성별 */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">성별</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleChange("gender", "male")}
              className={`p-4 rounded-lg border transition-all ${
                formData.gender === "male"
                  ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                  : "border-gray-700 bg-gray-800 text-gray-400"
              }`}
            >
              남성
            </button>
            <button
              onClick={() => handleChange("gender", "female")}
              className={`p-4 rounded-lg border transition-all ${
                formData.gender === "female"
                  ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                  : "border-gray-700 bg-gray-800 text-gray-400"
              }`}
            >
              여성
            </button>
          </div>
        </div>

        {/* 4. 요즘 가장 큰 고민 (풍수 추천의 기준이 됨) */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">상승시키고 싶은 운</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "money", label: "💰 재물운" },
              { id: "love", label: "❤️ 연애운" },
              { id: "health", label: "💪 건강운" },
              { id: "career", label: "🏆 명예/승진" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleChange("concern", item.id)}
                className={`p-4 rounded-lg border text-sm transition-all ${
                  formData.concern === item.id
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] font-bold"
                    : "border-gray-700 bg-gray-800 text-gray-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 하단 버튼 */}
      <div className="pt-8 pb-10">
        <button
          onClick={handleSubmit}
          className="w-full bg-[#D4AF37] text-gray-900 font-bold py-4 rounded-xl hover:bg-[#b5952f] transition-colors"
        >
          내 공간 처방받기
        </button>
      </div>
    </main>
  );
}