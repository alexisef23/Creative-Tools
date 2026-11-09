import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#06b6d4',
          electric: '#22d3ee',
          blue: '#3b82f6',
          dark: '#09090b',
          surface: '#0f172a',
        },
        anodized: {
          black: '#18181b',
          blue: '#1d4ed8',
          red: '#be123c',
          gold: '#ca8a04',
          emerald: '#047857',
          purple: '#6d28d9',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'aluminum-sheen':
          'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 45%, rgba(0,0,0,0.28) 55%, rgba(255,255,255,0.12) 100%)',
        'laser-glow':
          'radial-gradient(circle at center, rgba(34, 211, 238, 0.22) 0%, rgba(15, 23, 42, 0) 70%)',
      },
      boxShadow: {
        'laser-neon': '0 0 25px -5px rgba(34, 211, 238, 0.45)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
      },
      animation: {
        'laser-scan': 'laserScan 2.8s ease-in-out infinite',
      },
      keyframes: {
        laserScan: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.15' },
          '50%': { transform: 'translateY(100%)', opacity: '0.75' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

