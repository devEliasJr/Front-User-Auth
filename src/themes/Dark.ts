import { createTheme } from "@mui/material";
import { red, grey } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: red[700], // Vermelho escuro como cor principal
      dark: red[800],
      light: red[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: grey[500], // Cinza como cor secundária
      dark: grey[700],
      light: grey[300],
      contrastText: "#ffffff",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#ffffff",
      secondary: grey[500],
    },
    action: {
      active: "#ffffff",
      hover: "#303134",
      disabled: grey[600],
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ffffff",
            },
            "&:hover fieldset": {
              borderColor: "#ffffff",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffffff",
            },
          },
        },
      },
    },
  },
});