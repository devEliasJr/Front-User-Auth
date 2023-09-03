import { createTheme } from "@mui/material";
import { red, grey, green } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: red[800],
      contrastText: "#ffffff",
    },
    secondary: {
      main: green[500],
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
    htmlFontSize: 16,

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