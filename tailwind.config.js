/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Cores base do sistema
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",

                // Primary: Azul Hanami (#5481FA)
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    50: "hsl(var(--primary-50))",
                    100: "hsl(var(--primary-100))",
                    200: "hsl(var(--primary-200))",
                    300: "hsl(var(--primary-300))",
                    400: "hsl(var(--primary-400))",
                    500: "hsl(var(--primary-500))",
                    600: "hsl(var(--primary-600))",
                    700: "hsl(var(--primary-700))",
                    800: "hsl(var(--primary-800))",
                    900: "hsl(var(--primary-900))",
                },

                // Secondary: Azul Marinho (#22307F)
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                    50: "hsl(var(--secondary-50))",
                    100: "hsl(var(--secondary-100))",
                    200: "hsl(var(--secondary-200))",
                    300: "hsl(var(--secondary-300))",
                    400: "hsl(var(--secondary-400))",
                    500: "hsl(var(--secondary-500))",
                    600: "hsl(var(--secondary-600))",
                    700: "hsl(var(--secondary-700))",
                    800: "hsl(var(--secondary-800))",
                    900: "hsl(var(--secondary-900))",
                },

                // Destructive: Vermelho (#FF4D4D)
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },

                // Muted: Cinzas
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },

                // Accent: Variação do Primary
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },

                // Popover
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },

                // Card
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },

                // Cores utilitárias
                success: {
                    DEFAULT: "hsl(var(--success))",
                    foreground: "hsl(var(--success-foreground))",
                },
                warning: {
                    DEFAULT: "hsl(var(--warning))",
                    foreground: "hsl(var(--warning-foreground))",
                },
                info: {
                    DEFAULT: "hsl(var(--info))",
                    foreground: "hsl(var(--info-foreground))",
                },

                // Neutral/Slate: Escala completa
                neutral: {
                    50: "hsl(var(--neutral-50))",
                    100: "hsl(var(--neutral-100))",
                    200: "hsl(var(--neutral-200))",
                    300: "hsl(var(--neutral-300))",
                    400: "hsl(var(--neutral-400))",
                    500: "hsl(var(--neutral-500))",
                    600: "hsl(var(--neutral-600))",
                    700: "hsl(var(--neutral-700))",
                    800: "hsl(var(--neutral-800))",
                    900: "hsl(var(--neutral-900))",
                },
            },

            // Border Radius: 0.75rem (12px) - Suave e moderno
            borderRadius: {
                lg: "var(--radius)",           // 0.75rem (12px)
                md: "calc(var(--radius) - 2px)", // 10px
                sm: "calc(var(--radius) - 4px)", // 8px
            },

            // Tipografia: Poppins
            fontFamily: {
                sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },

            // Font Weights: Poppins disponíveis
            fontWeight: {
                light: '300',
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
                extrabold: '800',
            },

            // Spacing adicional para ritmo relaxado
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '112': '28rem',
                '128': '32rem',
            },

            // Animações suaves
            transitionDuration: {
                '400': '400ms',
            },

            // Box Shadow personalizado
            boxShadow: {
                'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
                'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
                'strong': '0 8px 24px rgba(0, 0, 0, 0.16)',
            },
        },
    },
    plugins: [],
}
