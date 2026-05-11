import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { ToastViewport } from '../shared/toast/ToastViewport';
import { GlobalStyle } from './GlobalStyle';
import { queryClient } from './queryClient';
import { theme } from './theme';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
        <ToastViewport />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
