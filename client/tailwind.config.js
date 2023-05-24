/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutral-1": "#333",
        "border-clr-1": "#001E2B",
      },
    },
  },
  plugins: [],
};
