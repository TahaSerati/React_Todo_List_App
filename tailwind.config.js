/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
        success: '#28a745',
      },
      screens: {
        // sm: '350px',
      },
    },
  },
  plugins: [],
}
