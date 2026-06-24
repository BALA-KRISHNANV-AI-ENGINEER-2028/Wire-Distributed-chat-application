export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07111f',
        midnight: '#0b1b31',
        electric: '#2dd4bf',
        ember: '#f97316'
      },
      boxShadow: {
        glow: '0 24px 80px rgba(45, 212, 191, 0.18)'
      }
    }
  },
  plugins: []
};
