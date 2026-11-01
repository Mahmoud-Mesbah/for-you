/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wine: {
          950: '#1d0508',
          900: '#2c070c',
          800: '#3d0a12',
          700: '#5a0f1b',
          600: '#7a1424',
        },
        gold: {
          200: '#f1dca6',
          300: '#e6c277',
          400: '#d4a35a',
          500: '#b9843b',
        },
        ivory: {
          50: '#fbf3df',
          100: '#f3e4c4',
          200: '#e9d3a8',
        },
      },
      fontFamily: {
        script: ['"Pinyon Script"', '"Cormorant Garamond"', 'serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        hand: ['Caveat', 'cursive'],
        arabic: ['Cairo', 'Tahoma', 'sans-serif'],
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '0' },
          '15%': { opacity: '0.55' },
          '100%': { transform: 'translateY(-110vh) scale(1.1)', opacity: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(0.7)' },
          '50%': { opacity: '0.9', transform: 'scale(1.1)' },
        },
        pulseSeal: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
        eq: {
          '0%, 100%': { transform: 'scaleY(0.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        floatUp: 'floatUp linear infinite',
        twinkle: 'twinkle ease-in-out infinite',
        pulseSeal: 'pulseSeal 2.6s ease-in-out infinite',
        eq: 'eq 0.9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
