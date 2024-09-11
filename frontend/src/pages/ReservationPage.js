import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Box,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Table,
  TableHead,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextfieldUI from "../components/formComponents/TextInput";
import HomeLayout from "../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/userSlice";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinenr";

// Sample available tables
const tables = [
  { id: 1, name: "Table 1", isAvailable: true },
  { id: 2, name: "Table 2", isAvailable: false },
  { id: 3, name: "Table 3", isAvailable: true },
  { id: 4, name: "Table 4", isAvailable: true },
];

const ReservationPage = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservations, setReservations] = useState([]);

  console.log("this is state " + reservations);

  const { user, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const initialValues = {
    reservationDate: "",
    reservationTime: "",
    tableNumber: "",
    numberOfPeople: 1,
  };

  const validationSchema = Yup.object().shape({
    reservationDate: Yup.string().required("Please select a date"),
    reservationTime: Yup.string().required("Please select a time"),
    numberOfPeople: Yup.string().required("Please add number of people"),
    tableNumber: Yup.string().required("Please select a table"),
  });

  const getAllReservations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8089/api/v1/reservation/get-all-reservations"
      );

      console.log(response.data.data);

      if (response.data) {
        // Dispatch signIn action with the response data
        // dispatch(
        //   signIn({
        //     user: response.data.data,
        //   })
        // );
        setReservations([...reservations, ...response.data.data]);
      }
    } catch (error) {
      toast.error(
        "An error occurred while fetching reservations in. Please try again."
      );

      console.error(error);
    } finally {
      dispatch(setIsLoading(false)); // Stop loading spinner
    }
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    // Convert the reservationDate to a Date object
    const reservationDate = new Date(values.reservationDate);

    // Convert the reservationTime to a Date object
    const reservationTime = new Date(`1970-01-01T${values.reservationTime}:00`);

    // Create the reservation object with separate date and time
    const newReservation = {
      reservationDate, // This is the date
      reservationTime, // This is the time
      tableNumber: values.tableNumber,
      numberOfPeople: values.numberOfPeople,
      status: "PENDING", // Or any other default status
      userId: user.userId,
    };

    console.log("Reservation Details: ", newReservation);

    // Start loading spinner
    dispatch(setIsLoading(true));

    try {
      const response = await axios.post(
        "http://localhost:8089/api/v1/reservation/save",
        newReservation
      );

      console.log(response.data.data);

      if (response.data) {
        toast.success("Reservation successful!");
        // Fetch updated reservations and reset form
        getAllReservations();
        resetForm(); // Reset input fields
        setSelectedTable(null);
      }
    } catch (error) {
      toast.error(
        "An error occurred while saving the reservation. Please try again."
      );
      console.error("Reservation error:", error);
    } finally {
      dispatch(setIsLoading(false)); // Stop loading spinner
    }
  };

  return (
    <HomeLayout>
      <h1 gutterBottom className="text-black text-3xl mb-4">
        Make a Reservation
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, { resetForm });
        }}
      >
        {({ setFieldValue }) => (
          <Form className="bg-white opacity-90 p-8 text-white rounded-lg mb-4">
            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextfieldUI
                name="reservationDate"
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                InputProps={{ style: { color: "#000000" } }}
              />
              <TextfieldUI
                name="reservationTime"
                label="Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                InputProps={{ style: { color: "#000000" } }}
              />
              <TextfieldUI
                name="numberOfPeople"
                label="People"
                type="number"
                InputLabelProps={{ shrink: true }}
                InputProps={{ style: { color: "#000000" } }}
              />
              <TextfieldUI
                name="tableNumber"
                select
                SelectProps={{ native: true, style: { color: "#000000" } }}
                sx={{ color: "#000000" }}
              >
                <option value="">Select a Table</option>
                {tables.map((table) => (
                  <option key={table.id} value={table.name}>
                    {table.name}
                  </option>
                ))}
              </TextfieldUI>
            </div>

            <Box mt={4}>
              <button
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-full transition"
              >
                RESERVE
              </button>
            </Box>
          </Form>
        )}
      </Formik>

      <div className="bg-white opacity-90 px-8 py-3 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 ">Reservations</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Table</TableCell>
                <TableCell>Number of People</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation, index) => (
                <TableRow key={index}>
                  <TableCell>{reservation.reservationDate}</TableCell>
                  <TableCell>
                    {reservation.reservationTime.slice(0, -3)}
                  </TableCell>
                  <TableCell>{reservation.tableNumber}</TableCell>
                  <TableCell>{reservation.numberOfPeople}</TableCell>
                  <TableCell>{reservation.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Toaster position="bottom-right" />
      {isLoading && <LoadingSpinner />}
    </HomeLayout>
  );
};

export default ReservationPage;
