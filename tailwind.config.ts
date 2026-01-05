import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 깊이감 있는 배경색 (완전 블랙 아님)
        void: "#0F1115", 
        // 고급스러운 다크 그레이
        charcoal: "#1C1F26",
        // 브랜드 컬러: 오리엔탈 골드
        gold: {
          300: "#FDE68A", // 밝은 금색 (하이라이트)
          400: "#D4AF37", // 기본 금색
          500: "#B4942E", // 어두운 금색 (그림자)
        },
      },
      fontFamily: {
        // 우리가 가져온 폰트 적용
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        // 빛이 흐르는 듯한 골드 그라데이션
        "gold-gradient": "linear-gradient(135deg, #FDE68A 0%, #D4AF37 50%, #B4942E 100%)",
        // 신비로운 배경 그라데이션
        "mystic-gradient": "radial-gradient(circle at top, #1C1F26 0%, #0F1115 100%)",
      },
    },
  },
  plugins: [],
};
export default config;