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
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinenr";
import Button from "../../components/ButtonUI";

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllReservations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8089/api/v1/reservation/get-all-reservations`
      );
      if (response.data) {
        setReservations(response.data.data);
      }
    } catch (error) {
      toast.error(
        "An error occurred while fetching reservations. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-black mb-4">
        Reservation Management
      </h1>

      <div className="bg-white opacity-90 px-8 py-3 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Reservations</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reservation ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Room Number</TableCell>
                <TableCell>Reservation Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            {reservations.length === 0 && (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No reservations found
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.reservationId}>
                  <TableCell>{reservation.reservationId}</TableCell>
                  <TableCell>{reservation.customerName}</TableCell>
                  <TableCell>{reservation.roomNumber}</TableCell>
                  <TableCell>{reservation.reservationDate}</TableCell>
                  <TableCell>{reservation.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Toaster position="bottom-right" />
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default ReservationManagement;
