/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'background-light': '#fefefe',
                'background-dark': '#1f2937',
                'text-light': '#1a1a1a',
                'text-dark': '#f5f5f5',
            },
        },
    },
    plugins: [],
  }