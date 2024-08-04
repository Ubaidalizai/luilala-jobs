/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust according to your file structure
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#002244',
        'light-blue': '#4682B4',
        'accent-white': '#FFFFFF',
      },
      
    },
  },
  plugins: [],
};
