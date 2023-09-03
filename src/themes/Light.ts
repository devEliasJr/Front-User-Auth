import { createTheme } from "@mui/material";
import { blue, cyan, grey, indigo, purple, red } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: indigo[700],
      contrastText: "#fff",
    },
    secondary: {
      main: purple[700],
      contrastText: "#ffffff",
    },
    background: {
      default: "#EDF2F7",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#353535",
    },
  },
  typography: {
    fontFamily: "Roboto",
    htmlFontSize: 16,
  },
});
