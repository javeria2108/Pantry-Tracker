
import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
    palette: {
        primary: {
          main: '#77BA99', 
        },
        secondary: {
          main: '#F5A9B8', 
        },
        error: {
          main: '#FF0000',
        },
        warning: {
          main: '#FFA500', 
        },
        info: {
          main: '#7FDBFF',
        },
        success: {
          main: '#8BC34A', 
        },
        background: {
          default: '#FFFFFF', 
          paper: '#F5F5F5', 
        },
      },
      typography: {
        fontFamily: 'Arial, sans-serif',
        h1: {
          fontWeight: 300,
          fontSize: '4rem'
        },
        button: {
          textTransform: 'none',
        },
      },
};