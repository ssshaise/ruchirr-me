/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include index.html
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in src
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
        // Add the 'Outfit' font family here if you want it globally available
        fontFamily: {
            sans: ['Outfit', 'sans-serif'], // Set Outfit as default sans font
        },
    },
  },
  plugins: [],
}
