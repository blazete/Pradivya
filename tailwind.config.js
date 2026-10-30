/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pradivya: {
          primary: '#003366', // Deep Blue
          accent: '#00B3A4',  // Vibrant Teal
          neutral: '#F5F5F5',  // Light Gray
          white: '#FFFFFF',    // White
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero-xl': ['64px', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-lg': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'body-lg': ['20px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-base': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'cta': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      animation: {
        blob: 'blob 10s infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.2)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.8)',
          },
        },
      },
    },
  },
  plugins: [],
};
