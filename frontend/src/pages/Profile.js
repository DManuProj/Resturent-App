import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextfieldUI from "../components/formComponents/TextInput";
import HomeLayout from "../layouts/HomeLayout";
import axios from "axios";
import { setIsLoading, signIn } from "../store/userSlice";
import LoadingSpinner from "../components/LoadingSpinenr";

const ProfilePage = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  console.log("user", user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  // Default initial values to avoid uncontrolled input warnings
  const defaultInitialValues = {
    userName: "",
    userEmail: "",
    userContact: "",
    userAddress: "",
  };

  useEffect(() => {
    if (user) {
      setInitialValues({
        userName: user.userName || "",
        userEmail: user.userEmail || "",
        userContact: user.userContact || "",
        userAddress: user.userAddress || "",
      });
    }
  }, [user]);

  const FORM_VALIDATION = Yup.object().shape({
    userEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    userName: Yup.string().required("Name is required"),
    userAddress: Yup.string().required("Address is required"),
    userContact: Yup.string().required("Contact is required"),
  });

  const handleSubmit = async (values) => {
    dispatch(setIsLoading(true));

    const userData = {
      ...values,
      userType: user.userType,
      userId: user.userId,
    };

    console.log("values", userData);
    try {
      const response = await axios.put(
        `http://localhost:8089/api/v1/user/update-user/${user.userId}`,
        userData
      );

      console.log(response);
      if (response.data) {
        dispatch(
          signIn({
            user: response.data.data,
          })
        );
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <HomeLayout>
      <div className="h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-md w-full space-y-6">
          <div className="flex justify-center items-center w-full py-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              User Profile
            </h2>
          </div>

          <Formik
            initialValues={initialValues || defaultInitialValues} // Use default values as fallback
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize
          >
            {({ dirty }) => {
              return (
                <Form className="max-w-md bg-white p-5 rounded-xl w-full mt-8 space-y-6">
                  <div className="flex flex-col rounded-md shadow-sm -space-y-px gap-6 mb-8">
                    <div>
                      <p>First Name*</p>
                      <TextfieldUI name="userName" />
                    </div>
                    <div>
                      <p>Email*</p>
                      <TextfieldUI name="userEmail" />
                    </div>

                    <div>
                      <p>Contact*</p>
                      <TextfieldUI name="userContact" />
                    </div>

                    <div>
                      <p>Address*</p>
                      {/* Additional height and padding for the address field */}
                      <TextfieldUI
                        name="userAddress"
                        multiline
                        rows={4}
                        className="resize-none" // Prevent resizing if needed
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full sm:text-lg py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-yellow-600 hover:bg-yellow-700 hover:shadow-lg focus:outline-none mt-8 ${
                      !dirty ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!dirty}
                  >
                    Update Profile
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <Toaster position="bottom-right" />
      {isLoading && <LoadingSpinner />}
    </HomeLayout>
  );
};

export default ProfilePage;
