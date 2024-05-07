/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "rgba(0, 0, 0, 0.5)",
        gray: "rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
