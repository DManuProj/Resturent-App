import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextfieldUI from "../components/formComponents/TextInput";
import HomeLayout from "../layouts/HomeLayout";
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
import { setIsLoading } from "../store/userSlice";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinenr";

const QueryPage = () => {
  const initialValues = {
    querySubject: "",
    queryText: "",
    queryDate: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
  };
  const { user, isLoading } = useSelector((state) => state.user);
  const [queries, setQueries] = useState([]);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    querySubject: Yup.string().required("Please enter a query subject"),
    queryText: Yup.string().required("Please enter a description"),
  });

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = d.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getAllQueries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8089/api/v1/query/get-submit-query-by-id/${user.userId}`
      );

      console.log(response.data.data);

      if (response.data) {
        // Dispatch signIn action with the response data
        // dispatch(
        //   signIn({
        //     user: response.data.data,
        //   })
        // );
        setQueries([...response.data.data]);
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
    getAllQueries();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    // Convert the reservationDate to a Date object
    // const queryNewDate = new Date(values.queryDate);

    // Create the reservation object with separate date and time
    const newQuery = {
      queryDate: values.queryDate, // This is the date
      queryText: values.queryText,
      querySubject: values.querySubject,
      status: "PENDING", // Or any other default status
      userId: user.userId,
    };

    console.log("Reservation Details: ", newQuery);

    dispatch(setIsLoading(true)); // Start loading spinner

    try {
      const response = await axios.post(
        "http://localhost:8089/api/v1/query/create-query",
        newQuery
      );

      console.log(response.data.data);

      if (response.data.data) {
        toast.success("Query added successful!");
        getAllQueries();
        resetForm();
      }
    } catch (error) {
      toast.error(
        "An error occurred while saving the reservation. Please try again."
      );
      console.error("Reservation error:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <HomeLayout>
      <h1 className="text-3xl font-bold text-black mb-4">Add a Query</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, { resetForm });
        }}
      >
        <Form className="bg-white p-8 rounded-lg shadow-md mb-4">
          <div className="grid grid-cols-1 gap-6">
            <TextfieldUI
              name="querySubject"
              label="Query Subject"
              InputProps={{ style: { color: "#000000" } }} // Set text color to black
            />
            <TextfieldUI
              name="queryText"
              label="Description"
              multiline
              rows={4}
              InputProps={{ style: { color: "#000000" } }} // Set text color to black
            />
            <TextfieldUI
              name="queryDate"
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              disabled
              InputProps={{
                style: { color: "#000000" }, // Set text color to black
                disabled: true,
              }}
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white  py-2 px-4 rounded-full transition"
            >
              Submit Query
            </button>
          </div>
        </Form>
      </Formik>
      <div className="bg-white opacity-90 px-8 py-3 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Queries</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Query Subject</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Query Response</TableCell>
                <TableCell>Response Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.map((query, index) => (
                <TableRow key={query.queryId}>
                  <TableCell>{formatDate(query.queryDate)}</TableCell>
                  <TableCell>{query.querySubject}</TableCell>
                  <TableCell>{query.queryText}</TableCell>
                  <TableCell>{query.queryResponse}</TableCell>
                  <TableCell>{formatDate(query.queryResponseDate)}</TableCell>
                  <TableCell>{query.queryStatus}</TableCell>
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

export default QueryPage;
