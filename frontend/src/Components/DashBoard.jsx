import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { UserButton } from "@clerk/clerk-react";
import SearchBar from "./SearchBar";
import Setting from "./Setting";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryIcon from "@mui/icons-material/Category";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import SiteForm from "./SiteForm";
import DashBoardItem from "./DashBoardItem";
import { useUser, RedirectToSignIn } from '@clerk/clerk-react';
import { useDispatch,useSelector } from "react-redux";
import set_user from "../Redux/Actions/SetUser";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "setting",
    title: "Setting",
    icon: <SettingsIcon />,
  },
  {
    segment: "services",
    title: "Services",
    icon: <CategoryIcon />,
    children: [
      {
        segment: "static_site",
        title: "Static site",
        icon: <WebAssetIcon />,
      },
    ],
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {pathname === "/dashboard" && <DashBoardItem />}
      {pathname === "/setting" && <Setting />}
      {pathname === "/services/static_site" && <SiteForm />}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: "inline", md: "none" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
      />
      <ThemeSwitcher />
    </Stack>
  );
}

function SidebarFooter({ mini }) {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
    >
      {mini ? "© MUI" : `© ${new Date().getFullYear()} Made with love by MUI`}
    </Typography>
  );
}

SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
};

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <CloudCircleIcon fontSize="large" color="primary" />
      <Typography variant="h6">HostStram</Typography>
      <Chip size="small" label="BETA" color="info" />
      <Tooltip title="Connected to production">
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip>
    </Stack>
  );
}

function Logout() {
  return (
    <div className="bg-transparent flex justify-center items-center p-5">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
function CombinedToolbarActions() {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <ToolbarActionsSearch />
      <Logout />
    </Stack>
  );
}
function DashboardLayoutSlots(props) {

  const { isLoaded, isSignedIn, user } = useUser();
  const dispatch=useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        console.log("user => ", user.id,user.fullName,user.emailAddresses);
        console.log("User is logged in");
      } else {
        console.log("User is not logged in");
        navigate("/");
      }
    }
  }, [isLoaded, isSignedIn, user, navigate]);
  const { window } = props;
  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== undefined ? window() : undefined;
  const authentication = React.useMemo(() => {
    return <UserButton afterSignOutUrl="/" />;
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      slots={{ sidebarFooter: <Logout /> }}
    >
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          toolbarActions: CombinedToolbarActions,
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutSlots;
