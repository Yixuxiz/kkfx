/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Noto Serif SC', 'SimSun', 'serif'],
        'sans': ['Noto Sans SC', 'PingFang SC', 'sans-serif'],
      },
      colors: {
        'bg-primary': '#FAFAF8',
        'text-primary': '#1A1A1A',
        'text-secondary': '#666666',
        'text-muted': '#999999',
      },
    },
  },
  plugins: [],
}
