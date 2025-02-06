/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Enables dark mode based on the "class" strategy
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00fab5", // ✅ Fixed: Directly assigned instead of overriding
        secondary: "#000028", // ✅ Fixed
        border: "hsl(var(--border, 220 13% 91%))",
        input: "hsl(var(--input, 220 13% 91%))",
        ring: "hsl(var(--ring, 220 13% 91%))",
        background: "hsl(var(--background, 0 0% 100%))",
        foreground: "hsl(var(--foreground, 222.2 47.4% 11.2%))",
        primaryForeground: "hsl(var(--primary-foreground, 0 0% 100%))",
        secondaryForeground: "hsl(var(--secondary-foreground, 0 0% 100%))",
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84.2% 60.2%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 100%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 220 13% 91%))",
          foreground: "hsl(var(--muted-foreground, 220 9% 46%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 220 13% 91%))",
          foreground: "hsl(var(--accent-foreground, 220 9% 46%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 0 0% 100%))",
          foreground: "hsl(var(--popover-foreground, 222.2 47.4% 11.2%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 0 0% 100%))",
          foreground: "hsl(var(--card-foreground, 222.2 47.4% 11.2%))",
        },
        siemens: {
          dark: "#000033",
          blue: "#3182ce",
        },
      },
      borderRadius: {
        lg: "12px", // ✅ Use fixed values for better control
        md: "10px",
        sm: "8px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
