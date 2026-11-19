import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: '#059669', light: '#d1fae5', dark: '#047857' },
        surface: { DEFAULT: '#ffffff', secondary: '#f9fafb' },
        border: '#e5e7eb',
        ink: { DEFAULT: '#111827', muted: '#6b7280' },
      },
    },
  },
  plugins: [],
};
export default config;
