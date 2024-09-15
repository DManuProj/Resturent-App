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
} from "@mui/material";
import HomeLayout from "../layouts/HomeLayout";
import ButtonUI from "../components/ButtonUI";
import MessageBox from "../components/MessageBox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/userSlice";
import LoadingSpinner from "../components/LoadingSpinenr";

const MyOrders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const { user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8089/api/v1/order/get-all-orders/${user.userId}`
        );

        if (response.data.data) {
          setOrdersData(response.data.data); // Adjust to the correct path if necessary
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchOrders();
  }, [dispatch, user.userId]);

  console.log("order", ordersData);

  const [statusFilter, setStatusFilter] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const filteredOrders =
    statusFilter === "All"
      ? ordersData
      : ordersData.filter((order) => order.orderStatus === statusFilter);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleCancelClick = (order) => {
    setOrderToCancel(order);
    setOpenModal(true);
  };

  const handleConfirmCancel = () => {
    setOpenModal(false);
    console.log(`Order ${orderToCancel.orderId} has been canceled`); // Use orderId to identify the order
  };

  // Function to apply color based on status
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
                  <h1 className="font-semibold text-lg">Order Date</h1>
                </TableCell>
                <TableCell>
                  <h1 className="font-semibold text-lg">Meal Name</h1>
                </TableCell>
                <TableCell>
                  <h1 className="font-semibold text-lg">Quantity</h1>
                </TableCell>
                <TableCell>
                  <h1 className="font-semibold text-lg">Amount</h1>
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
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography>No data available</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <>
                    {order.mealItems.map((meal, index) => (
                      <TableRow
                        key={`${order.orderDate}-${meal.mealName}-${index}`}
                        className="border-none"
                      >
                        {index === 0 && (
                          <TableCell rowSpan={order.mealItems.length}>
                            {new Date(order.orderDate).toLocaleDateString()}{" "}
                            {/* Format date */}
                          </TableCell>
                        )}
                        <TableCell>{meal.mealName}</TableCell>
                        <TableCell>{meal.qty}</TableCell>
                        <TableCell>${meal.amount}</TableCell>

                        {index === 0 && (
                          <TableCell rowSpan={order.mealItems.length}>
                            ${order.total}
                          </TableCell>
                        )}
                        {index === 0 && (
                          <TableCell rowSpan={order.mealItems.length}>
                            <span
                              className={`${getStatusColor(
                                order.orderStatus
                              )} font-semibold`}
                            >
                              {order.orderStatus}
                            </span>
                          </TableCell>
                        )}
                        {index === 0 && (
                          <TableCell rowSpan={order.mealItems.length}>
                            <ButtonUI
                              type={"button"}
                              label={"Cancel Order"}
                              onClick={() => handleCancelClick(order)}
                              styles="bg-red-600 text-white px-3 py-2 rounded-lg shadow-md"
                            >
                              Cancel Order
                            </ButtonUI>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Confirmation Modal */}
        <MessageBox
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          onConfirm={handleConfirmCancel}
          title="Cancel Order"
          message="Are you sure you want to cancel this order?"
        />
      </div>
      {isLoading && <LoadingSpinner />}
    </HomeLayout>
  );
};

export default MyOrders;
