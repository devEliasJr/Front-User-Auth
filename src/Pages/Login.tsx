import Container from "@mui/material/Container";

import { Button } from "@mui/material";
import { useThemeContext } from "../contexts/themeContext";

export default function Login() {
  const { themeName, toggleTheme } = useThemeContext();
  return (
    <>
      <Container>
        <Button variant="contained" onClick={toggleTheme}>
          {themeName === "dark" ? "Change to: Light" : "Change to: Dark"}
        </Button>
      </Container>
    </>
  );
}
