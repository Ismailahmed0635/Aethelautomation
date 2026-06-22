/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aethel: {
          orange: "#E8711A",
          "orange-light": "#FF8C3A",
          amber: "#FFB347",
          black: "#1A1A1A",
          "off-white": "#F9F6F1",
          "warm-gray": "#E8E4DF",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
      },
      boxShadow: {
        brutal: "6px 6px 0px #1A1A1A",
        "brutal-sm": "4px 4px 0px #1A1A1A",
        "brutal-lg": "8px 8px 0px #1A1A1A",
        "brutal-hover": "3px 3px 0px #1A1A1A",
        "brutal-orange": "6px 6px 0px #E8711A",
      },
      borderWidth: {
        3: "3px",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "float-slow": "float-slow 4s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
