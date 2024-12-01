import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Roles = ({ onRolesUpdate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile view

  const [openAddModal, setOpenAddModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [currentRole, setCurrentRole] = useState(null);
  const [roleFormData, setRoleFormData] = useState({
    name: "",
    permissions: {
      read: false,
      write: false,
      delete: false,
    },
  });

  // Fetch roles from localStorage on component mount
  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setRoles(storedRoles);
    if (onRolesUpdate) onRolesUpdate(storedRoles);
  }, [onRolesUpdate]);

  const handleOpenAddModal = () => {
    setRoleFormData({
      name: "",
      permissions: {
        read: false,
        write: false,
        delete: false,
      },
    });
    setCurrentRole(null);
    setOpenAddModal(true);
  };

  const handleAddRole = () => {
    let updatedRoles;
    if (currentRole) {
      updatedRoles = roles.map((role) =>
        role.id === currentRole.id ? { ...role, ...roleFormData } : role
      );
    } else {
      updatedRoles = [
        ...roles,
        { id: roles.length + 1, ...roleFormData },
      ];
    }

    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    setOpenAddModal(false);
    if (onRolesUpdate) onRolesUpdate(updatedRoles);
  };

  const handleEditRole = (role) => {
    setCurrentRole(role);
    setRoleFormData(role);
    setOpenAddModal(true);
  };

  const handleDeleteRole = (id) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    if (onRolesUpdate) onRolesUpdate(updatedRoles);
  };

  const handlePermissionChange = (permission) => {
    setRoleFormData({
      ...roleFormData,
      permissions: {
        ...roleFormData.permissions,
        [permission]: !roleFormData.permissions[permission],
      },
    });
  };

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: isMobile ? "100%" : "800px",
        margin: isMobile ? "10px auto" : "20px auto",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{
          marginBottom: "10px",
          fontWeight: "bold",
          textAlign: isMobile ? "center" : "left",
          marginLeft: isMobile ? "-4rem" : "7rem",
        }}
      >
        Role Management
      </Typography>
      <Button
        variant="contained"
        onClick={handleOpenAddModal}
        sx={{
          marginBottom: "20px",
          width: isMobile ? "50%" : "auto", // Full width on mobile
          fontSize: isMobile ? "0.9rem" : "1rem",
          padding: isMobile ? "12px" : "8px 16px",
          marginLeft: isMobile ? "6rem" : "39rem",
          backgroundColor:"lightblue",
          


        }}
      >
        Add New Role
      </Button>

      <Box sx={{marginLeft:"6rem"}}>
        {roles.length === 0 ? (
          <Typography textAlign={isMobile ? "center" : "left"}>
            No roles available. Add a new role to get started!
          </Typography>
        ) : (
          roles.map((role) => (
            <Paper
              key={role.id}
              sx={{
                padding: "15px",
                marginBottom: "10px",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: isMobile ? "center" : "space-between",
                alignItems: isMobile ? "center" : "flex-start",
                gap: isMobile ? "10px" : "0px",
              }}
            >
              <Box textAlign={isMobile ? "center" : "left"}>
                <Typography variant="h6">{role.name}</Typography>
                <Typography>
                  Permissions:{" "}
                  {Object.keys(role.permissions)
                    .filter((perm) => role.permissions[perm])
                    .join(", ") || "None"}
                </Typography>
              </Box>
              <Box display="flex" gap="10px">
                <IconButton
                  onClick={() => handleEditRole(role)}
                  sx={{
                    color: isMobile ? "#007bff" : "inherit",
                    fontSize: isMobile ? "large" : "medium",
                  }}
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteRole(role.id)}
                  sx={{
                    color: isMobile ? "#ff4d4d" : "inherit",
                    fontSize: isMobile ? "large" : "medium",
                  }}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Box>
            </Paper>
          ))
        )}
      </Box>

      {/* Add/Edit Role Modal */}
      <Dialog
  open={openAddModal}
  onClose={() => setOpenAddModal(false)}
  fullWidth={isMobile} // Full width for mobile view
  maxWidth={isMobile ? "xs" : "sm"}
>
  <DialogTitle
    sx={{
      color: "white", // Set font color to white
      backgroundColor: "#333333", // Optional: Background color for contrast
    }}
  >
    {currentRole ? "Edit Role" : "Add New Role"}
  </DialogTitle>
  <DialogContent
    sx={{
      backgroundColor: "#333333", // Optional: Background color for the modal
      color: "white", // Default font color
    }}
  >
    <TextField
      label="Role Name"
      fullWidth
      margin="dense"
      value={roleFormData.name}
      onChange={(e) =>
        setRoleFormData({ ...roleFormData, name: e.target.value })
      }
      InputLabelProps={{
        style: { color: "white" }, // Label color
      }}
      InputProps={{
        style: { color: "white" }, // Input text color
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white", // Border color for input field
          },
          "&:hover fieldset": {
            borderColor: "white", // Border color on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "white", // Border color when focused
          },
        },
      }}
    />
    <Box>
      <Typography
        sx={{
          color: "white", // Permissions label color
          marginBottom: "10px",
        }}
      >
        Permissions:
      </Typography>
      {["read", "write", "delete"].map((perm) => (
        <FormControlLabel
          key={perm}
          control={
            <Checkbox
              checked={roleFormData.permissions[perm]}
              onChange={() => handlePermissionChange(perm)}
              sx={{
                color: "white", // Checkbox color
                "&.Mui-checked": {
                  color: "white", // Checked checkbox color
                },
              }}
            />
          }
          label={perm.charAt(0).toUpperCase() + perm.slice(1)}
          sx={{
            color: "white", // Label color
          }}
        />
      ))}
    </Box>
  </DialogContent>
  <DialogActions
    sx={{
      backgroundColor: "#333333", // Optional: Background color for contrast
    }}
  >
    <Button
      onClick={handleAddRole}
      variant="contained"
      sx={{
        width: isMobile ? "100%" : "auto", // Full width for mobile view
        fontSize: isMobile ? "0.9rem" : "1rem",
        padding: isMobile ? "12px" : "8px 16px",
        backgroundColor: "#007bff",
        "&:hover": { backgroundColor: "#0056b3" },
      }}
    >
      {currentRole ? "Save" : "Add Role"}
    </Button>
    <Button
      onClick={() => setOpenAddModal(false)}
      sx={{
        width: isMobile ? "100%" : "auto", // Full width for mobile view
        fontSize: isMobile ? "0.9rem" : "1rem",
        padding: isMobile ? "12px" : "8px 16px",
        color: "white", // Button text color
        borderColor: "white", // Optional: Border color
        "&:hover": { color: "gray" }, // Hover effect for button
      }}
    >
      Cancel
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default Roles;
