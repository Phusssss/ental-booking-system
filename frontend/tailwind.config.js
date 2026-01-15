/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Turquoise palette from Kigen.design
        primary: {
          50: '#b9fef0',
          100: '#3df9df',
          200: '#35dbc4',
          300: '#2fc8b3',
          400: '#24ad9b',
          500: '#098a7b',
          600: '#00685b',
          700: '#004c42',
          800: '#00332c',
          900: '#001c19',
          950: '#000f0c',
        },
        // Accent - Deeper turquoise for contrast
        accent: {
          50: '#b9fef0',
          100: '#3df9df',
          200: '#35dbc4',
          300: '#2fc8b3',
          400: '#24ad9b',
          500: '#00685b',
          600: '#004c42',
          700: '#00332c',
          800: '#001c19',
          900: '#000f0c',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'large': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
