'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from '@/styles/theme';

const theme = createTheme(themeOptions);

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}