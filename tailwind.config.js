/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-pink': 'inset -12px -8px 40px #FFE5E5',
        'inner-orange': 'inset -12px -8px 40px #FDFFC2',
        'inner-green': 'inset -12px -8px 40px #C6EBC5',
      },
    },
  },
  plugins: [],
}

