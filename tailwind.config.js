module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    'src/styles/*.css',
  ],
  theme: {
    fontFamily: {
      sans: ['Segoe UI', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        'primary-color': '#514CDD',
        'secondary-color': '#F8937E',
        'text-primary-color': '#190134',
        'text-secondary-color': '#685879',
        'text-link-color': '#5A69EB',
        'success-color': '#68D8B8',
        'error-color': '#FF713B',
        'warning-color': '#F7C96E',
        'white-color': '#FFFFFF',
      },
      minHeight: {
        '1/2': '50%',
        '2/3': '66.67%',
      },
    },
  },
  plugins: [],
};
