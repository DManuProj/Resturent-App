import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../store/userSlice";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinenr";
import Button from "../../components/ButtonUI";
import MessageBox from "../../components/MessageBox";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const UserManagement = () => {
  const { isLoading } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userType, setUserType] = useState("All"); // Filter selection
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const dispatch = useDispatch();

  const getAllUsers = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await axios.get(
        `http://localhost:8089/api/v1/user/get-all-users`
      );
      if (response.data) {
        setUsers(response.data.data);
        setFilteredUsers(response.data.data); // Set initial filtered data
      }
    } catch (error) {
      toast.error("An error occurred while fetching users. Please try again.");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Handle filter change
  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    setUserType(selectedType);

    if (selectedType === "All") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => user.userType === selectedType);
      setFilteredUsers(filtered);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    dispatch(setIsLoading(true));
    try {
      await axios.delete(
        `http://localhost:8089/api/v1/user/delete-user/${userToDelete.userId}`
      );
      toast.success("User deleted successfully!");
      setIsDeleteModalOpen(false);
      getAllUsers(); // Refresh the user list
    } catch (error) {
      toast.error("Failed to delete user.");
    } finally {
      dispatch(setIsLoading(false));
      setUserToDelete(null);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-black mb-4">User Management</h1>

      <Box display="flex" justifyContent="flex-end" mb={4}>
        <TextField
          select
          label="Filter by User Type"
          value={userType}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="All">All Users</MenuItem>
          <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
          <MenuItem value="STAFF">STAFF</MenuItem>
          <MenuItem value="ADMIN">ADMIN</MenuItem>
        </TextField>
      </Box>

      <div className="bg-white opacity-90 px-8 py-3 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>User Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            {filteredUsers.length === 0 && (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.userContact}</TableCell>
                  <TableCell>{user.userAddress}</TableCell>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.userType}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteClick(user)}
                      label="Delete"
                      styles="bg-red-500 text-white px-4 py-2 rounded-full"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Toaster position="bottom-right" />
      {isLoading && <LoadingSpinner />}

      <MessageBox
        isOpen={isDeleteModalOpen}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        closeModal={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default UserManagement;
