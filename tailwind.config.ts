import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. 브랜드 컬러 팔레트 정의
      colors: {
        void: "#050505", // 아주 깊은 검정
        charcoal: "#1C1F26", // 차콜 그레이
        gold: {
          300: "#FDE68A", // 라이트 골드 (하이라이트)
          400: "#D4AF37", // 메인 골드 (Objet Gold)
          500: "#B4942E", // 다크 골드 (그림자)
          600: "#8A6D1F", // 딥 골드
        },
      },
      // 2. 폰트 변수 연결
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      // 3. 커스텀 배경 이미지
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FDE68A 0%, #D4AF37 50%, #B4942E 100%)",
      },
      // 4. 누락되었던 애니메이션 정의 (핵심!)
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "shine": "shine 3s linear infinite",
        "spin-slow": "spin 3s linear infinite", // 천천히 도는 로딩
      },
    },
  },
  plugins: [],
};
export default config;