import { Box, CircularProgress } from "@mui/material";

import { useAuthContext } from "./authContext";
import HomePage from "../Pages/Home";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loadingDashboard } = useAuthContext();

  if (!user && loadingDashboard) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user && !loadingDashboard) {
    return <HomePage />;
  }

  return children;
};
