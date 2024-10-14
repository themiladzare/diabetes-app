/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: {
          light: '#007BFF',
          DEFAULT: '#0056b3',
        },
        primaryGreen: {
          light: '#28A745',
          DEFAULT: '#19692C',
        },
        primaryYellow: '#FFC107',
        primaryRed: {
          light: '#DC3545',
          DEFAULT: '#A71D2A',
        },
        neutralGray: '#6C757D',
      },
    },
  },
  plugins: [],
};
