
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#0066FF',
					foreground: 'hsl(var(--primary-foreground))',
					50: '#E6F0FF',
					100: '#CCE0FF',
					200: '#99C2FF',
					300: '#66A3FF',
					400: '#3385FF',
					500: '#0066FF',
					600: '#0052CC',
					700: '#003D99',
					800: '#002966',
					900: '#001433',
				},
				secondary: {
					DEFAULT: '#00C08B',
					foreground: 'hsl(var(--secondary-foreground))',
					50: '#E6FAF5',
					100: '#CCF5EB',
					200: '#99EBD7',
					300: '#66E0C3',
					400: '#33D6AF',
					500: '#00C08B',
					600: '#009A6F',
					700: '#007353',
					800: '#004D38',
					900: '#00261C',
				},
				destructive: {
					DEFAULT: '#FF4D4F',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				warning: {
					DEFAULT: '#FAAD14',
					foreground: '#FFFFFF'
				},
				success: {
					DEFAULT: '#52C41A',
					foreground: '#FFFFFF'
				}
			},
			boxShadow: {
				'soft': '0 4px 10px rgba(0, 0, 0, 0.05)',
				'soft-lg': '0 10px 25px rgba(0, 0, 0, 0.06)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
