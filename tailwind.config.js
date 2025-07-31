/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['iA Writer Mono', 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'Courier New', 'monospace'],
        'duo': ['iA Writer Duo', 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'Courier New', 'monospace'],
        'quattro': ['iA Writer Quattro', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        'sans': ['iA Writer Quattro', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        'matrix-green': '#39FF14',
        'bg-dark': '#111213',
        'fg-light': '#d6d6d6',
        primary: {
          DEFAULT: '#d6d6d6',
          dark: '#111213',
        },
        accent: {
          DEFAULT: '#39FF14',
          hover: '#32e012',
        },
        muted: {
          DEFAULT: '#d6d6d6',
          foreground: 'rgba(214, 214, 214, 0.7)',
        },
        border: {
          DEFAULT: '#374151',
          accent: '#39FF14',
        },
        background: {
          DEFAULT: '#111213',
          secondary: '#1f2937',
        },
      },
      fontSize: {
        'header': '27px',
        'body': '18px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'blink': 'blink 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      backdropBlur: {
        'sm': '4px',
      },
      boxShadow: {
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(57, 255, 20, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(57, 255, 20, 0.1) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode support
}
