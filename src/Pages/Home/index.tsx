import { useCallback, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SignInPage from "../SignIn";
import Register from "../Register";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

function Copyright({ site, link }: ICopyrightProps) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" my={2}>
      {"Copyright © "}
      <Link color="inherit" href={link}>
        {site}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function HomePage() {
  const [isRegister, setisRegister] = useState(false);

  const toggleRegister = useCallback(() => {
    setisRegister((state) => {
      const register = state === true ? false : true;
      return register;
    });
  }, []);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {isRegister ? <Register /> : <SignInPage />}
        <Box display={"flex"} justifyContent={"center"}>
          <Button variant="text" onClick={toggleRegister}>
            {!isRegister
              ? "Not have an account yet? Register"
              : "Already have an account? Log in"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
