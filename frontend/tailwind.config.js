/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "rgba(0, 0, 0, 0.5)",
        gray: "#ebebeb",
        hover: "#00000029",
        dark: "rgba(0, 0, 0, 0.85)",
      },
    },
  },
  plugins: [],
};
