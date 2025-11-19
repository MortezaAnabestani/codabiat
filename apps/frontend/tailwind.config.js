/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FBBF24',
          50: '#FEF9E7',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        dark: {
          DEFAULT: '#000000',
          50: '#F7F7F7',
          100: '#E3E3E3',
          200: '#C8C8C8',
          300: '#A4A4A4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#000000',
        },
      },
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch',
            color: '#000',
            fontFamily: 'Vazirmatn, sans-serif',
            h1: {
              fontWeight: '700',
            },
            h2: {
              fontWeight: '600',
            },
            a: {
              color: '#FBBF24',
              '&:hover': {
                color: '#F59E0B',
              },
            },
            code: {
              backgroundColor: '#F7F7F7',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
