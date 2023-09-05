import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomizedSwitches from "../../components/switchTheme";
import { useMutation } from "react-query";
import { createUser } from "../../hooks/useUserActions";

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

export default function Register() {
  const { mutate, error, isError, isLoading } = useMutation({
    mutationFn: createUser,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };

    if (!userData.name || !userData.email || !userData.password) {
      return;
    }

    mutate(userData);

    if (!isError && !isLoading) {
      window.location.reload();
      alert("Created successfully");
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
        Register
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
        />
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
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyright site="Elias Dev" link="https://mui.com/" />
      </Box>
      <Box m={"0 auto"} p={4}>
        <CustomizedSwitches />
      </Box>
      {isError && <Alert severity="error">{(error as Error).message}</Alert>}
    </Box>
  );
}