import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import { uploadFile } from "../../util/index";
import { toast, Toaster } from "react-hot-toast";
import FileInput from "../../components/formComponents/FileUpload"; // Adjust the path as needed
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinenr";
import Button from "../../components/ButtonUI";
import { useNavigate } from "react-router";

const MealsManagement = () => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [meals, setMeals] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(0);
  const [editMeal, setEditMeal] = useState(null); // State for the meal being edited
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage] = useState(5); // Number of rows per page
  const [imageUrl, setImageUrl] = useState("");

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      uploadFile(setFileURL, file, setIsFileUploaded);
    } else {
      setFileURL("");
    }
  }, [file]);

  console.log("editmails", editMeal);
  console.log("editmails2", editMeal?.mealImage);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8089/api/v1/meal/get-meals"
        );
        setMeals(response.data.data || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
        toast.error("Failed to fetch meals");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const FORM_VALIDATION = Yup.object().shape({
    mealName: Yup.string().required("Meal Name is required"),
    mealCategory: Yup.string().required("Meal Category is required"),
    mealQty: Yup.number()
      .required("Meal Quantity is required")
      .positive()
      .integer(),
    mealPrice: Yup.number().required("Meal Price is required").positive(),
    mealImage: Yup.mixed()
      .required("Meal Image is required")
      .test("fileFormat", "Unsupported Format", (value) => {
        if (typeof value === "string") {
          return true;
        }
        return (
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
        );
      }),
  });

  const handleSubmit = async (values) => {
    const newdata = { ...values, mealImage: fileURL, userId: user.userId };
    try {
      setIsLoading(true);
      if (editMeal) {
        // Update existing meal
        const response = await axios.put(
          `http://localhost:8089/api/v1/meal/update-meal/${editMeal.mealId}`,
          newdata
        );

        toast.success("Meal updated successfully");
        setTimeout(() => {
          navigate(0);
          setMeals(
            meals.map((meal) =>
              meal.id === editMeal.id ? response.data.data : meal
            )
          );
        }, 1200);
      } else {
        // Add new meal
        const response = await axios.post(
          "http://localhost:8089/api/v1/meal/create-meal",
          newdata
        );
        setMeals([...meals, response.data.data]);
        toast.success("Meal added successfully");
        setTimeout(() => {
          navigate(0);
        }, 1200);
      }
      setEditMeal(null); // Reset edit state
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (mealId) => {
    if (window.confirm("Are you sure you want to delete this meal?")) {
      try {
        setIsLoading(true);
        await axios.delete(
          `http://localhost:8089/api/v1/meal/delete-meal/${mealId}`
        );
        setMeals(meals.filter((meal) => meal.id !== mealId));
        toast.success("Meal deleted successfully");
      } catch (error) {
        console.error("Error in handleDelete:", error);
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = (meal) => {
    setEditMeal(meal);
    setFileURL(meal.mealImage); // Set the current image URL
    setImageUrl(meal.mealImage);
  };

  // Pagination logic
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedMeals = meals.slice(
    (currentPage - 1) * rowsPerPage,
    (currentPage - 1) * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-8">
      <Formik
        initialValues={{
          mealName: editMeal?.mealName || "",
          mealCategory: editMeal?.mealCategory || "",
          mealQty: editMeal?.mealQty || "",
          mealPrice: editMeal?.mealPrice || "",
          mealImage: editMeal?.mealImage || "",
        }}
        validationSchema={FORM_VALIDATION}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="bg-white p-8">
            <div className="mb-4">
              <Field
                name="mealName"
                label="Meal Name"
                fullWidth
                variant="outlined"
                margin="normal"
                as={TextField}
              />
            </div>
            <div className="mb-4">
              <TextField
                select
                name="mealCategory"
                label="Meal Category"
                fullWidth
                variant="outlined"
                margin="normal"
                onChange={(e) => setFieldValue("mealCategory", e.target.value)}
                value={values.mealCategory}
              >
                <MenuItem value="JUICE">Juice</MenuItem>
                <MenuItem value="CAKE">Cake</MenuItem>
                <MenuItem value="FRIED_RICE">Fried Rice</MenuItem>
                <MenuItem value="NOODLES">Noodles</MenuItem>
              </TextField>
            </div>
            <div className="mb-4">
              <Field
                name="mealQty"
                label="Meal Quantity"
                type="number"
                fullWidth
                variant="outlined"
                margin="normal"
                as={TextField}
              />
            </div>
            <div className="mb-4">
              <Field
                name="mealPrice"
                label="Meal Price"
                type="number"
                fullWidth
                variant="outlined"
                margin="normal"
                as={TextField}
              />
            </div>
            <div className="mb-4">
              <FileInput
                name="mealImage"
                setFieldValue={setFieldValue}
                setFile={setFile}
                fileURL={fileURL}
                isFileUploaded={isFileUploaded}
                setIsFileUploaded={setIsFileUploaded}
                previewURL={editMeal?.mealImage}
              />
            </div>
            <Button
              label={editMeal ? "Update Meal" : "Add Meal"}
              type="submit"
              styles={
                "bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-full transition"
              }
            ></Button>
          </Form>
        )}
      </Formik>

      <TableContainer component={Paper} className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Meal Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMeals.map((meal) => (
              <TableRow key={meal.mealId}>
                <TableCell>{meal.mealName}</TableCell>
                <TableCell>{meal.mealCategory}</TableCell>
                <TableCell>{meal.mealQty}</TableCell>
                <TableCell>Rs {meal.mealPrice}</TableCell>
                <TableCell>
                  <img
                    src={meal.mealImage}
                    alt={meal.mealName}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    label={"Edit"}
                    styles="bg-blue-500 text-white px-4 py-2 rounded-full"
                    onClick={() => handleEdit(meal)}
                  ></Button>
                  <Button
                    label={"Delete"}
                    color="secondary"
                    onClick={() => handleDelete(meal.mealId)}
                    styles="bg-red-500 text-white px-4 py-2 rounded-full ml-2"
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(meals.length / rowsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        className="mt-4"
      />

      {isLoading && <LoadingSpinner />}
      <Toaster />
    </div>
  );
};

export default MealsManagement;
