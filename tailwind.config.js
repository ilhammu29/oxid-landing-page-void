/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
      },
      colors: {
        cosmic: {
          bg: '#07060B',
          surface: '#0F0918',
          card: '#160E24',
          text: '#F5F1FA',
          muted: '#A59BB6',
          magenta: '#E83EFF',
          violet: '#9B5CFF',
          energy: '#FF3D72',
          cyan: '#38E1FF',
          border: 'rgba(226, 205, 255, 0.13)',
        }
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float-particle': 'floatParticle 6s ease-in-out infinite alternate',
        'portal-spin': 'portalSpin 30s linear infinite',
        'petal-drift-1': 'petalDrift1 12s ease-in-out infinite',
        'petal-drift-2': 'petalDrift2 9s ease-in-out infinite',
        'petal-drift-3': 'petalDrift3 15s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.7', filter: 'drop-shadow(0 0 15px rgba(232, 62, 255, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 28px rgba(232, 62, 255, 0.8))' }
        },
        floatParticle: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '100%': { transform: 'translateY(-16px) rotate(12deg)' }
        },
        portalSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        petalDrift1: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.2' },
          '50%': { opacity: '0.85', transform: 'translate(-40px, 35px) rotate(45deg)' },
          '100%': { transform: 'translate(-80px, 90px) rotate(90deg)', opacity: '0' }
        },
        petalDrift2: {
          '0%': { transform: 'translate(0, 0) rotate(20deg)', opacity: '0' },
          '40%': { opacity: '0.9', transform: 'translate(50px, 45px) rotate(80deg)' },
          '100%': { transform: 'translate(90px, 120px) rotate(140deg)', opacity: '0' }
        },
        petalDrift3: {
          '0%': { transform: 'translate(0, 0) rotate(-15deg)', opacity: '0.3' },
          '60%': { opacity: '0.75', transform: 'translate(-60px, 60px) rotate(-65deg)' },
          '100%': { transform: 'translate(-110px, 140px) rotate(-120deg)', opacity: '0' }
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.015)' },
        }
      }
    },
  },
  plugins: [],
}
