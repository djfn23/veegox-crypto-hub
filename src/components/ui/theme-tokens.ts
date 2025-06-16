
export const themeTokens = {
  colors: {
    // Semantic colors that adapt to theme
    background: {
      primary: 'hsl(var(--background))',
      secondary: 'hsl(var(--card))',
      muted: 'hsl(var(--muted))',
    },
    foreground: {
      primary: 'hsl(var(--foreground))',
      secondary: 'hsl(var(--muted-foreground))',
      accent: 'hsl(var(--accent-foreground))',
    },
    brand: {
      primary: 'hsl(var(--primary))',
      secondary: 'hsl(var(--secondary))',
      accent: 'hsl(var(--accent))',
    },
    status: {
      success: 'hsl(142 71% 45%)',
      error: 'hsl(var(--destructive))',
      warning: 'hsl(38 92% 50%)',
      info: 'hsl(var(--primary))',
    },
    gradient: {
      primary: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
      background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)',
      glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    },
  },
  spacing: {
    responsive: {
      xs: 'clamp(0.25rem, 2vw, 0.5rem)',
      sm: 'clamp(0.5rem, 3vw, 1rem)',
      md: 'clamp(1rem, 4vw, 1.5rem)',
      lg: 'clamp(1.5rem, 5vw, 2rem)',
      xl: 'clamp(2rem, 6vw, 3rem)',
    },
    container: {
      mobile: '1rem',
      tablet: '1.5rem',
      desktop: '2rem',
    },
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      heading: ['Poppins', 'sans-serif'],
    },
    responsive: {
      h1: 'clamp(1.5rem, 4vw, 3rem)',
      h2: 'clamp(1.25rem, 3vw, 2.25rem)',
      h3: 'clamp(1.125rem, 2.5vw, 1.875rem)',
      body: 'clamp(0.875rem, 2vw, 1rem)',
      caption: 'clamp(0.75rem, 1.5vw, 0.875rem)',
    },
  },
  effects: {
    glass: {
      light: 'backdrop-blur-md bg-white/80 border-white/20 shadow-lg',
      dark: 'backdrop-blur-md bg-slate-900/80 border-white/10 shadow-xl',
    },
    shadow: {
      light: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
      dark: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -2px rgb(0 0 0 / 0.1)',
    },
  },
  zIndex: {
    dropdown: 60,
    modal: 70,
    overlay: 80,
    toast: 90,
    tooltip: 100,
  },
} as const;
