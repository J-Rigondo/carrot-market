module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  variants: {
    extend: {
      backgroundColor: ['first', 'last'],
    },
  },
};
