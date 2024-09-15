import React, { useState } from "react";
import Button from "../components/ButtonUI";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextfieldUI from "../components/formComponents/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinenr";
import HomeLayout from "../layouts/HomeLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signIn, setIsLoading } from "../store/userSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.user);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (values) => {
    dispatch(setIsLoading(true)); // Start loading spinner

    try {
      const response = await axios.post(
        "http://localhost:8089/api/v1/user/login",
        values
      );

      console.log(response.data);

      if (response.data) {
        // Dispatch signIn action with the response data
        dispatch(
          signIn({
            user: response.data.data,
          })
        );

        // Show success message
        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      // Show error message
      toast.error("An error occurred while logging in. Please try again.");

      // Log error details for debugging
      console.error("Login error:", error);
    } finally {
      dispatch(setIsLoading(false)); // Stop loading spinner
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-opacity-60">
        <div className="max-w-md w-full bg-white  p-8 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900 ">
            Welcome to ABC Restaurant
          </h2>
          <p className="text-center text-sm text-gray-900 mb-6">
            Sign in to your account to enjoy delicious dishes
          </p>

          <Formik
            initialValues={{
              userEmail: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              userEmail: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
              password: Yup.string().required("Password is required"),
              // .min(6, "Password must be at least 6 characters")
              // .matches(
              //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
              //   "Password must contain at least one letter, one number, and one special character"
              // ),
            })}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form className="space-y-6">
              <div className="flex flex-col gap-5">
                <div className="gap-3">
                  <p className="font-semibold text-gray-700">Email*</p>
                  <TextfieldUI name="userEmail" />
                </div>
                <div className="gap-3">
                  <p className="font-semibold text-gray-700 ">Password*</p>
                  <TextfieldUI
                    type={showPassword ? "text" : "password"}
                    name="password"
                    icon={
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="focus:outline-none"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="dark:text-white" />
                        ) : (
                          <FaEye className="dark:text-white" />
                        )}
                      </button>
                    }
                  />
                </div>
                {/* <Link
                  to="/forgot-password"
                  className="underline dark:text-sky-200 text-blue-600 -mt-3 text-sm"
                >
                  Forgot password?
                </Link> */}
              </div>

              <Button
                label="Sign In"
                type="submit"
                styles="w-full sm:text-lg py-2.5 2xl:py-3 px-4 border bg-yellow-600 border-transparent text-sm font-medium rounded-full text-white bg-slate-950  focus:outline-none mt-8"
              />
            </Form>
          </Formik>

          <div className="flex flex-col items-center mt-6 text-gray-600 ">
            <p>
              Don't have an account?
              <Link
                to="/sign-up"
                replace
                className="text-sky-500 underline font-semibold ml-2"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <Toaster position="bottom-right" />
        {isLoading && <LoadingSpinner />}
      </div>
    </HomeLayout>
  );
};

export default LoginPage;
