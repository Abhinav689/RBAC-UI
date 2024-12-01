import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Form = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [openModal, setOpenModal] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false); // New state for table visibility
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  // Fetch roles and users from localStorage
  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setRoles(storedRoles);
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
    setFilteredUsers(storedUsers); // Initialize filtered users
    setIsTableVisible(storedUsers.length > 0); // Show table if there are users
  }, []);

  // Filter and sort users
  useEffect(() => {
    let filtered = users;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "All") {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    // Sort by name
    filtered = filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    setFilteredUsers(filtered);
  }, [users, searchQuery, statusFilter, sortOrder]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);
  const toggleSortOrder = () =>
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsTableVisible(updatedUsers.length > 0); // Hide table if no users remain
  };

  const handleOpenModal = () => {
    setNewUser({ name: "", email: "", role: "", status: "Active" });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSaveUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      const updatedUsers = [
        ...users,
        { ...newUser, id: users.length + 1 },
      ];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setFilteredUsers(updatedUsers);
      setOpenModal(false);
      setIsTableVisible(true); // Show table after adding a user
    } else {
      alert("Please fill all fields before adding a user!");
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "900px",
        margin: "20px auto",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <Typography
        variant="h3"
        sx={{
          textAlign: isMobile ? "center" : "left",
          marginBottom: "20px",
          fontWeight: "bold",
          marginLeft: isMobile ? "0" : "6rem",
        }}
      >
        Users
      </Typography>

      {/* Filters and Add Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: isMobile ? 4 : 2,
          marginBottom: "20px",
          marginLeft: "6rem",
        }}
      >
        <TextField
          label="Search by name"
          size="small"
          fullWidth={isMobile}
          sx={{ width: isMobile ? "50%" : "auto" }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <TextField
          label="Filter by status"
          select
          size="small"
          fullWidth={isMobile}
          sx={{ width: isMobile ? "50%" : "20%", marginLeft: isMobile ? "0" : "-15rem" }}
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={{
            backgroundColor: "#007bff",
            color: "white",
            "&:hover": { backgroundColor: "#0056b3" },
          }}
        >
          + Add New User
        </Button>
      </Box>

      {/* Table */}
      {isTableVisible && (
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            overflowX: "auto",
            marginLeft: "6rem",
          }}
        >
          <Table
            sx={{
              "& td, & th": {
                border: "1px solid white", // White borders for cells
                color: "white", // White text
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>
                  Name {sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {roles.find((role) => role.id === parseInt(user.role))?.name || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: user.status === "Active" ? "green" : "red",
                        color: "white",
                      }}
                    >
                      {user.status}
                    </Button>
                  </TableCell>
                  <TableCell sx={{ borderColor: "white" }}>
                    <IconButton>
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal for Adding User */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#333",
            "& .MuiTextField-root": {
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
            },
          }}
        >
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            label="Role"
            fullWidth
            margin="dense"
            select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Status"
            fullWidth
            margin="dense"
            select
            value={newUser.status}
            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleCloseModal} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Form;
