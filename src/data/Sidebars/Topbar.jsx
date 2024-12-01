import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is mobile-sized

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      gap={2}
    >
      {/* SEARCH BAR - Hidden for Mobile */}
      {!isMobile && (
        <Box
          display="flex"
          justifyContent="flex-start"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
        
        </Box>
      )}

      {/* ICONS */}
      <Box
        display="flex"
        justifyContent="flex-end"
        flexWrap={isMobile ? "wrap" : "nowrap"}
        gap={isMobile ? 1 : 2}
        width={isMobile ? "100%" : "auto"}
      >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon fontSize="small" />
          ) : (
            <LightModeOutlinedIcon fontSize="small" />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
