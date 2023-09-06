import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "../../contexts/authContext";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomizedSwitches from "../../components/switchTheme";
import { Copyright } from "../../components/copyrightElement";

export default function SignInPage() {
  const { signIn, error } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const { email, password } = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (!email && !password) {
      return;
    }

    const res = await signIn(email, password);
    const ApiSucesslogin = JSON.stringify(res);
    if (ApiSucesslogin) {
      navigate("/dashboard");
    }
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="primary"
        >
          Sign In
        </Button>

        <Copyright site="Elias Dev" link="https://eliasdev.tech/" />
      </Box>
      <Box m={"0 auto"} p={4}>
        <CustomizedSwitches />
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}
