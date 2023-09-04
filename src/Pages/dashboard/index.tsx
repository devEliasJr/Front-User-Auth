import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PositionedMenu from "../../components/buttonMenu";
import { useAuthContext } from "../../contexts/authContext";
import CustomizedSwitches from "../../components/switchTheme";
import { useQuery } from "react-query";
import { getUsers } from "../../hooks/useUserActions";
import DashboardCard from "../../components/dashboardCard";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const {
    data: getUsersFromData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["usersdata"],
    queryFn: getUsers,
  });

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { user, signOut } = useAuthContext();
  const theme = useTheme();

  const mdDown = useMediaQuery(theme.breakpoints.up("md"));

  const drawer = (
    <div>
      {!mdDown ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          py={2}
          gap={2}
        >
          <Typography variant="button" textAlign={"center"}>
            {user && user.name}
          </Typography>
          <Button variant="outlined" size="small" onClick={signOut}>
            Logout
          </Button>
        </Box>
      ) : (
        <Toolbar />
      )}

      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" flexGrow={1}>
            Dashboard Plataform
          </Typography>

          <Box display={mdDown ? "flex" : "none"}>
            <CustomizedSwitches />
            <PositionedMenu name={user && user.name} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Box maxWidth={"1500px"} m={"0 auto"} p={2}>
          <Typography variant="h4" py={2}>
            Users List
          </Typography>
          <Grid container spacing={2}>
            {isLoading && <p>Loading...</p>}
            {isError ? (
              <p>{(error as Error).message}</p>
            ) : (
              getUsersFromData?.map((user) => (
                <Grid item key={user.id} xs={12} sm={12} md={6} lg={4}>
                  <DashboardCard name={user.name} email={user.email} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
