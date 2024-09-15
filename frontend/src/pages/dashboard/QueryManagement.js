import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextfieldUI from "../../components/formComponents/TextInput";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../store/userSlice";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinenr";
import Button from "../../components/ButtonUI"; // Assuming you have a button component
import MessageBox from "../../components/MessageBox"; // Assuming MessageBox is in this path
import { useNavigate } from "react-router";

const QueryPage = () => {
  const initialValues = {
    querySubject: "",
    queryResponse: "",
    queryDate: new Date().toISOString().split("T")[0],
  };

  const { user, isLoading } = useSelector((state) => state.user);
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null); // Track the selected query
  const [isFormDisabled, setIsFormDisabled] = useState(true); // Disable form until update
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Track delete confirmation
  const [queryToDelete, setQueryToDelete] = useState(null); // Track query to be deleted
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    querySubject: Yup.string().required("Please enter a query subject"),
    queryResponse: Yup.string().required("Please enter a response"),
  });

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getAllQueries = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await axios.get(
        `http://localhost:8089/api/v1/query/get-all-queries`
      );
      if (response.data.data) {
        setQueries([...response.data.data]);
      }
    } catch (error) {
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    getAllQueries();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const newQuery = {
      queryId: values.queryId,
      queryResponseDate: new Date().toISOString().split("T")[0],
      queryResponse: values.queryResponse,
      queryStatus: values.status,
      responderId: user.userId,
    };

    console.log("values", newQuery);

    dispatch(setIsLoading(true));

    try {
      const response = await axios.put(
        "http://localhost:8089/api/v1/query/response-query",
        newQuery
      );

      console.log("response", response);
      if (response.data) {
        toast.success("Query added successfully!");
      }
      setTimeout(() => {
        navigate(0);
      }, 1500);
    } catch (error) {
      toast.error("An error occurred while saving the query.");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleResponseClick = (query) => {
    const newQuery = {
      queryDate: new Date().toISOString().split("T")[0],
      querySubject: query.querySubject,
      status: "RESPONDED",
      userId: user.userId,
      queryId: query.queryId,
    };
    setSelectedQuery(newQuery);
    setIsFormDisabled(false);
  };

  const handleDeleteClick = (query) => {
    setQueryToDelete(query);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!queryToDelete) return;
    dispatch(setIsLoading(true));

    try {
      await axios.delete(
        `http://localhost:8089/api/v1/query/delete-query/${queryToDelete.queryId}`
      );
      toast.success("Query deleted successfully!");
      setIsDeleteModalOpen(false);
      getAllQueries(); // Refresh the query list
    } catch (error) {
      toast.error("Failed to delete query.");
    } finally {
      dispatch(setIsLoading(false));
      setQueryToDelete(null);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-black mb-4">Respond to Queries</h1>
      <Formik
        initialValues={selectedQuery || initialValues}
        enableReinitialize={true}
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
              InputProps={{
                style: { color: "#000000" },
                disabled: isFormDisabled, // Disable unless updating/adding
              }}
            />
            <TextfieldUI
              name="queryResponse"
              label="Query Response"
              multiline
              rows={4}
              InputProps={{ style: { color: "#000000" } }}
            />
            <TextfieldUI
              name="queryDate"
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              disabled
              InputProps={{
                style: { color: "#000000" },
                disabled: true,
              }}
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-full transition"
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
                <TableCell>Customer</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Query Subject</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            {queries.length === 0 && (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography>No data available</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
            <TableBody>
              {queries.map((query) => (
                <TableRow key={query.queryId}>
                  <TableCell>{formatDate(query.queryDate)}</TableCell>
                  <TableCell>{query.userName}</TableCell>
                  <TableCell>{query.userContact}</TableCell>
                  <TableCell>{query.querySubject}</TableCell>
                  <TableCell>{query.queryText}</TableCell>
                  <TableCell>{query.queryStatus}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleResponseClick(query)}
                      label="Respond"
                      styles="bg-blue-500 text-white px-4 py-2 rounded-full"
                    />

                    <Button
                      onClick={() => handleDeleteClick(query)}
                      label="Delete"
                      styles="bg-red-500 text-white px-4 py-2 rounded-full ml-2"
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
        title="Delete Query"
        message="Are you sure you want to delete this query?"
        closeModal={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default QueryPage;
