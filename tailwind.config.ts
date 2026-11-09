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
          cyan: '#009FE3',
          electric: '#00AEEF',
          magenta: '#E5007D',
          lime: '#8CC63F',
          amber: '#F39200',
          violet: '#662483',
          dark: '#0B0D13',
          surface: '#11141E',
        },
        anodized: {
          black: '#18181b',
          blue: '#0077b6',
          red: '#be123c',
          gold: '#ca8a04',
          emerald: '#047857',
          purple: '#662483',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'aluminum-sheen':
          'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 45%, rgba(0,0,0,0.28) 55%, rgba(255,255,255,0.12) 100%)',
        'laser-glow':
          'radial-gradient(circle at center, rgba(0, 159, 227, 0.22) 0%, rgba(229, 0, 125, 0.12) 45%, rgba(11, 13, 19, 0) 75%)',
        'creative-spectrum':
          'linear-gradient(90deg, #662483 0%, #E5007D 30%, #009FE3 68%, #8CC63F 100%)',
      },
      boxShadow: {
        'laser-neon':
          '0 0 26px -4px rgba(0, 159, 227, 0.48), 0 0 18px -6px rgba(229, 0, 125, 0.35)',
        'magenta-neon': '0 0 24px -4px rgba(229, 0, 125, 0.45)',
        'lime-neon': '0 0 24px -4px rgba(140, 198, 63, 0.4)',
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
