import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Pagination,
  Box,
} from "@mui/material";
import HomeLayout from "../../layouts/HomeLayout";
import ButtonUI from "../../components/ButtonUI";
import MessageBox from "../../components/MessageBox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../store/userSlice";
import LoadingSpinner from "../../components/LoadingSpinenr";
import FormModal from "../../components/formComponents/FormModal";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/ButtonUI";

const MyOrders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Set the number of orders per page
  const [totalOrders, setTotalOrders] = useState(0);

  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);

  const fetchOrders = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await axios.get(
        `http://localhost:8089/api/v1/order/get-all-orders`
      );
      if (response.data.data) {
        setOrdersData(response.data.data);
        setTotalOrders(response.data.data); // Total number of orders
      }
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders =
    statusFilter === "All"
      ? ordersData
      : ordersData.filter((order) => order.orderStatus === statusFilter);

  // Calculate the orders to display based on the current page
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1); // Reset to the first page when the filter changes
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCancelClick = (order) => {
    setOrderToCancel(order);
    setOpenCancelModal(true);
  };

  const handleUpdateClick = (order) => {
    setOrderToUpdate(order);
    setNewStatus(order.orderStatus);
    setOpenUpdateModal(true);
  };

  const handleConfirmCancel = () => {
    setOpenCancelModal(false);
    console.log(`Order ${orderToCancel.orderId} has been canceled`);
  };

  const handleSaveUpdate = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await axios.put(
        `http://localhost:8089/api/v1/order/update-order/${orderToUpdate.orderId}`,
        {
          status: newStatus,
          staffId: user.userId,
        }
      );
      console.log(response);

      if (response.data.data) {
        toast.success("Order updated successfully");
        fetchOrders();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOpenUpdateModal(false);
      dispatch(setIsLoading(false));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "text-gray-500";
      case "CONFIRMED":
        return "text-blue-500";
      case "IN_PROGRESS":
        return "text-yellow-500";
      case "OUT FOR DELIVERY":
        return "text-orange-500";
      case "COMPLETED":
        return "text-green-500";
      case "CANCELLED":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <HomeLayout>
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold">My Orders</h2>
          <FormControl>
            <Select
              labelId="order-status-label"
              value={statusFilter}
              onChange={handleStatusChange}
              className="bg-white"
            >
              <MenuItem value="All">All Orders</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="CONFIRMED">Confirmed</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="OUT FOR DELIVERY">Out for Delivery</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
              <MenuItem value="CANCELLED">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </div>

        <TableContainer component={Paper} className="bg-white">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h1 className="font-semibold text-lg">User Name</h1>
                </TableCell>
                <TableCell>
                  <h1 className="font-semibold text-lg">Address</h1>
                </TableCell>
                <TableCell>
                  <h1 className="font-semibold text-lg">Contact</h1>
                </TableCell>
                <TableCell>
                  <h1 className="font-semibold text-lg">Total Price</h1>
                </TableCell>
                <TableCell>
                  <h1 className="font-semibold text-lg">Status</h1>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography>No data available</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>{order.userName}</TableCell>
                    <TableCell>{order.userAddress}</TableCell>
                    <TableCell>{order.userContact}</TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell>
                      <span
                        className={`${getStatusColor(
                          order.orderStatus
                        )} font-semibold`}
                      >
                        {order.orderStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <ButtonUI
                        type={"button"}
                        label={"Cancel Order"}
                        onClick={() => handleCancelClick(order)}
                        styles="bg-red-500 mr-2 text-white px-4 py-2 rounded-full ml-2"
                      />
                      <Button
                        type="button"
                        label="Update Order"
                        onClick={() => handleUpdateClick(order)}
                        styles="bg-blue-500 text-white px-4 py-2 rounded-full"
                      ></Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box my={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(filteredOrders.length / pageSize)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>

        {/* Cancel Confirmation Modal */}
        <MessageBox
          isOpen={openCancelModal}
          closeModal={() => setOpenCancelModal(false)}
          onConfirm={handleConfirmCancel}
          title="Cancel Order"
          message="Are you sure you want to cancel this order?"
        />

        {/* Update Order Modal */}
        <FormModal
          open={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
          title="Update Order"
        >
          <Box
            p={3}
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{
              bgcolor: "background.paper",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Order Details
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              User:{" "}
              <span style={{ fontWeight: "normal" }}>
                {orderToUpdate?.userName}
              </span>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Order Date:{" "}
              <span style={{ fontWeight: "normal" }}>
                {new Date(orderToUpdate?.orderDate).toLocaleDateString()}
              </span>
            </Typography>

            {orderToUpdate?.orderItems.map((item, index) => (
              <Box
                key={index}
                mb={2}
                p={2}
                border={1}
                borderColor="divider"
                borderRadius="4px"
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Meal:{" "}
                  <span style={{ fontWeight: "normal" }}>{item.mealName}</span>
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Quantity:{" "}
                  <span style={{ fontWeight: "normal" }}>{item.qty}</span>
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Amount:{" "}
                  <span style={{ fontWeight: "normal" }}>${item.amount}</span>
                </Typography>
              </Box>
            ))}

            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Total:{" "}
              <span style={{ fontWeight: "normal" }}>
                ${orderToUpdate?.total}
              </span>
            </Typography>

            <FormControl fullWidth margin="normal">
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                displayEmpty
                sx={{ bgcolor: "background.default", borderRadius: "4px" }}
              >
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="CONFIRMED">Confirmed</MenuItem>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="OUT FOR DELIVERY">Out for Delivery</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
                <MenuItem value="CANCELLED">Cancelled</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveUpdate}
              sx={{ alignSelf: "flex-start", mt: 2 }}
            >
              Save
            </Button>
          </Box>
        </FormModal>
      </div>
      <Toaster />
      {isLoading && <LoadingSpinner />}
    </HomeLayout>
  );
};

export default MyOrders;
