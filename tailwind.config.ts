import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        "mic_pulse": {
          "0%, 100%": {
            transform: "scale(1,1)",
            opacity: "1"
          },
          "50%": {
            transform: "scale(1.3, 1.3)",
            opacity: "0"
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        "mic_pulse": "mic_pulse 1s infinite",
      }
    },

  },
  plugins: [],
}
export default config
