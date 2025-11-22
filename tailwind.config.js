/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                celo: {
                    green: '#35D07F',
                    dark: '#0B0B0B',
                },
                circle: {
                    blue: '#2775CA',
                },
                xmtp: {
                    yellow: '#FFD166',
                }
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'card': '0px 2px 8px rgba(0, 0, 0, 0.08)',
                'card-hover': '0px 4px 16px rgba(0, 0, 0, 0.12)',
            }
        },
    },
    plugins: [],
}