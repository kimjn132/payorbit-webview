export const theme = {
  colors: {
    background: {
      page: '#f7f9fc',
      surface: '#ffffff',
      subtle: '#eef4ff',
    },
    border: {
      default: '#e1e8f2',
      focus: '#3182f6',
    },
    text: {
      primary: '#111827',
      secondary: '#53627a',
      muted: '#8a96a8',
      inverse: '#ffffff',
    },
    action: {
      primary: '#3182f6',
      primaryHover: '#1b64da',
      subtle: '#eef4ff',
      disabled: '#b9c7d8',
    },
    shadow: {
      panel: '0 18px 50px rgba(17, 24, 39, 0.08)',
      focus: '0 0 0 4px rgba(49, 130, 246, 0.12)',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  radii: {
    sm: '12px',
    md: '16px',
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
} as const;
