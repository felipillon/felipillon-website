/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            fontFamily: {
                heading: ["Outfit", "sans-serif"],
                body: ["Plus Jakarta Sans", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",

                // ── Brand colors derived from Felipillon logo ──────────────
                // Primary: warm gold — from the logo's warm brown/tan tones
                gold: {
                    DEFAULT: "#C9973A",
                    300: "#E8C07A",
                    400: "#D4A853",
                    500: "#C9973A",
                    600: "#A87A28",
                    700: "#8A6020",
                },
                // Secondary: deep warm brown — from the dark silhouettes
                brown: {
                    DEFAULT: "#3D2314",
                    300: "#8A5A3C",
                    400: "#6B3F27",
                    500: "#3D2314",
                    600: "#2C1810",
                    700: "#1A0E08",
                },
                // Accent: warm cream — from logo background tone
                cream: {
                    DEFAULT: "#F5EFE6",
                    100: "#FAF7F3",
                    200: "#F5EFE6",
                    300: "#EDE3D5",
                },

                // shadcn/ui tokens — unchanged
                card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
                popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
                primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
                secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
                muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
                accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
                destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
            },
            keyframes: {
                "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
                "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};