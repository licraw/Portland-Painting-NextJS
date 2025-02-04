import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', "Arial", "sans-serif"],
      },
      fontSize: {
        '36px': ['36px', { lineHeight: '1.2' }],
        '72px': ['72px', { lineHeight: '1.1' }],
      },
    },
  },
  plugins: [],
} satisfies Config;
