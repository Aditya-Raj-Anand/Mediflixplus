/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      colors: {
        primary: '#5F6FFF',
        secondary: '#A3B2FF',
        background: '#F5F7FA',
        surface: '#FFFFFF',
        text: '#1F2937',
        muted: '#6B7280',
        danger: '#EF4444',
        success: '#10B981',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
