/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"], // Make sure paths match your project
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      // 1. Add the Animation Here
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      // 2. Add the Keyframes Here
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        safelist: [
          "bg-white/90",
          "backdrop-blur-md",
          "shadow-sm",
          "border-gray-200",
          "opacity-0",
          "opacity-100",
          "pointer-events-none",
          "pointer-events-auto",
          "scale-95",
          "scale-100",
        ],
      },
    },
  },
  plugins: [],
};
