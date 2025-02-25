"use client";
import { createTheme } from "@mui/material/styles";

// Define the light theme
export const lightTheme = createTheme({
  typography: {
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
  },
  palette: {
    mode: "light",
    text: {
      primary: "#121212",
    },
    primary: {
      main: "#2885fd",
    },
    secondary: {
      main: "#ff7aac",
    },
    info: {
      main: "#121212",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
      },
    },
  },
});
