
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
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				lg: '2rem',
				xl: '2rem',
				'2xl': '2rem',
			},
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Poppins', 'sans-serif']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				'touch': 'var(--touch-target-min)',
				'touch-lg': 'var(--touch-target-comfortable)',
				'mobile': 'var(--mobile-padding)',
				'mobile-sm': 'var(--mobile-margin)',
				'mobile-xs': 'var(--mobile-gap)',
			},
			minHeight: {
				'touch': 'var(--touch-target-min)',
				'touch-lg': 'var(--touch-target-comfortable)',
			},
			minWidth: {
				'touch': 'var(--touch-target-min)',
				'touch-lg': 'var(--touch-target-comfortable)',
			},
			fontSize: {
				'mobile-xs': ['0.75rem', { lineHeight: '1.2' }],
				'mobile-sm': ['0.875rem', { lineHeight: '1.3' }],
				'mobile-base': ['1rem', { lineHeight: '1.4' }],
				'mobile-lg': ['1.125rem', { lineHeight: '1.4' }],
				'mobile-xl': ['1.25rem', { lineHeight: '1.3' }],
				'mobile-2xl': ['1.5rem', { lineHeight: '1.2' }],
				'mobile-3xl': ['1.875rem', { lineHeight: '1.1' }],
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
				'mobile-fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(8px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'mobile-slide-up': {
					'0%': {
						transform: 'translateY(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'mobile-scale': {
					'0%': {
						transform: 'scale(0.95) translateY(8px)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1) translateY(0)',
						opacity: '1'
					}
				},
				'mobile-bounce': {
					'0%': {
						transform: 'scale(0.9)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.05)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        },
        'ripple': {
          '0%': {
            transform: 'scale(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(1.5)',
            opacity: '0'
          }
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'mobile-fade-in': 'mobile-fade-in 0.3s ease-out',
				'mobile-slide-up': 'mobile-slide-up 0.4s ease-out',
				'mobile-scale': 'mobile-scale 0.2s ease-out',
				'mobile-bounce': 'mobile-bounce 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'ripple': 'ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite'
			},
			screens: {
				'xs': '375px',
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
				'mobile-sm': { 'max': '374px' },
				'mobile-md': { 'min': '375px', 'max': '413px' },
				'mobile-lg': { 'min': '414px', 'max': '767px' },
				'tablet': { 'min': '768px', 'max': '1023px' },
				'desktop': { 'min': '1024px' },
				'landscape': { 'raw': '(orientation: landscape)' },
				'portrait': { 'raw': '(orientation: portrait)' },
			},
			zIndex: {
				'modal': '50',
				'overlay': '40',
				'dropdown': '30',
				'header': '20',
				'sidebar': '15',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
