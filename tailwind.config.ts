/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            50: '#f0f9fa',
            100: '#d9f1f2',
            200: '#b7e4e6',
            300: '#86d0d4',
            400: '#4fb2b8',
            500: '#34969c',
            600: '#2d7a81',
            700: '#286369',
            800: '#265257',
            900: '#23464a',
            950: '#112a2d',
          },
        },
        boxShadow: {
          'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'soft-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
          'brand': '0 10px 15px -3px rgba(52, 150, 156, 0.2), 0 4px 6px -2px rgba(52, 150, 156, 0.1)',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-out forwards',
          'slide-up': 'slideUp 0.5s ease-out forwards',
          'float': 'float 3s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-5px)' },
          },
        },
      },
    },
    plugins: [],
  }