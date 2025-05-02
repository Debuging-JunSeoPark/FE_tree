// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        PThin: ["Pretendard-Thin"],
        PExtraLight: ["Pretendard-ExtraLight"],
        PLight: ["Pretendard-Light"],
        PRegular: ["Pretendard-Regular"],
        PMedium: ["Pretendard-Medium"],
        PSemiBold: ["Pretendard-SemiBold"],
        PBold: ["Pretendard-Bold"],
        PExtraBold: ["Pretendard-ExtraBold"],
        PBlack: ["Pretendard-Black"],
      },
    },
  },
  plugins: [],
};

export default config;
