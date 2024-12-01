import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { tokens } from "../../theme";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Extract colors from tokens
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile view
  const navigate = useNavigate(); // For navigation

  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalPermissions, setTotalPermissions] = useState(0);

  // Fetch data from localStorage
  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setRoles(storedRoles);
    setUsers(storedUsers);

    // Calculate total permissions
    const permissionsCount = storedRoles.reduce(
      (acc, role) =>
        acc +
        Object.values(role.permissions || {}).filter((perm) => perm).length,
      0
    );
    setTotalPermissions(permissionsCount);
  }, []);

  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "20px" : "30px", // Adjusted gap for mobile and desktop
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Dashboard Overview
      </Typography>

      {/* Cards Section */}
      <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
        {/* Total Users */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            onClick={() => navigate("/users")} // Link to /users
            sx={{
              background: `${colors.primary[400]}`, // Dynamic color from theme
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              padding: isMobile ? "10px" : "20px", // Smaller padding for mobile
              width: isMobile ? "60%" : "90%", // Adjusted width for desktop
              marginLeft: isMobile ? "6rem" : "6rem",
              cursor: "pointer", // Pointer cursor for clickable cards
              "&:hover": { transform: "scale(1.02)", transition: "0.3s" }, // Hover effect
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
              >
                <PeopleOutlineIcon
                  sx={{
                    fontSize: isMobile ? "2rem" : "3rem",
                    color: "#007bff",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#007bff",
                    fontSize: isMobile ? "1.5rem" : "2rem",
                  }}
                >
                  {users.length}
                </Typography>
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  marginTop: "10px",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                }}
              >
                Total Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Roles */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            onClick={() => navigate("/roles")} // Link to /roles
            sx={{
              background: `${colors.primary[400]}`, // Dynamic color from theme
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              padding: isMobile ? "10px" : "20px", // Smaller padding for mobile
              width: isMobile ? "60%" : "90%", // Adjusted width for desktop
              marginLeft: isMobile ? "6rem" : "4rem", // Center align cards
              cursor: "pointer", // Pointer cursor for clickable cards
              "&:hover": { transform: "scale(1.02)", transition: "0.3s" }, // Hover effect
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
              >
                <LockOutlinedIcon
                  sx={{
                    fontSize: isMobile ? "2rem" : "3rem",
                    color: "#28a745",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#28a745",
                    fontSize: isMobile ? "1.5rem" : "2rem",
                  }}
                >
                  {roles.length}
                </Typography>
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  marginTop: "10px",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                }}
              >
                Total Roles
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Permissions */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            onClick={() => navigate("/roles")} // Link to /roles
            sx={{
              background: `${colors.primary[400]}`, // Dynamic color from theme
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              padding: isMobile ? "10px" : "20px", // Smaller padding for mobile
              width: isMobile ? "60%" : "90%", // Adjusted width for desktop
              marginLeft: isMobile ? "6rem" : "2rem",
              cursor: "pointer", // Pointer cursor for clickable cards
              "&:hover": { transform: "scale(1.02)", transition: "0.3s" }, // Hover effect
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
              >
                <SecurityOutlinedIcon
                  sx={{
                    fontSize: isMobile ? "2rem" : "3rem",
                    color: "#6f42c1",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#6f42c1",
                    fontSize: isMobile ? "1.5rem" : "2rem",
                  }}
                >
                  {totalPermissions}
                </Typography>
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  marginTop: "10px",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                }}
              >
                Total Permissions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
