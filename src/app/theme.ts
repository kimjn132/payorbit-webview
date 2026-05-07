export const theme = {
  colors: {
    background: {
      page: '#f6f8fb',
      surface: '#ffffff',
      subtle: '#eef2f7',
    },
    border: {
      default: '#d9e2ec',
      focus: '#2563eb',
    },
    text: {
      primary: '#172033',
      secondary: '#5f6f86',
      muted: '#8a97aa',
    },
    action: {
      primary: '#2563eb',
      primaryHover: '#1d4ed8',
      disabled: '#a9b8cc',
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
    sm: '6px',
    md: '8px',
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
} as const;
