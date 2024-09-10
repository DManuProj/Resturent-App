import React, { useState } from "react";
import Button from "../components/ButtonUI";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextfieldUI from "../components/formComponents/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinenr";
import { useSelector } from "react-redux";
import HomeLayout from "../layouts/HomeLayout";

const LoginPage = () => {
  //   const { isLoading } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-opacity-60">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome to Foodie's Haven
          </h2>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
            Sign in to your account to enjoy delicious dishes
          </p>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
              password: Yup.string().required("Password is required"),
            })}
            // onSubmit={(values) => handleSubmit(values)}
          >
            <Form className="space-y-6">
              <div className="flex flex-col gap-5">
                <div className="gap-3">
                  <p className="font-semibold text-gray-700 dark:text-gray-200">
                    Email*
                  </p>
                  <TextfieldUI name="email" />
                </div>
                <div className="gap-3">
                  <p className="font-semibold text-gray-700 dark:text-gray-200">
                    Password*
                  </p>
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
                <Link
                  to="/forgot-password"
                  className="underline dark:text-sky-200 text-blue-600 -mt-3 text-sm"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                label="Sign In"
                type="submit"
                styles="w-full sm:text-lg py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-slate-950 dark:bg-sky-500 hover:bg-sky-700 focus:outline-none mt-8"
              />
            </Form>
          </Formik>

          <div className="flex flex-col items-center mt-6 text-gray-600 dark:text-gray-300">
            <p>
              Don't have an account?
              <Link
                to="/sign-up"
                replace
                className="dark:text-sky-500 underline font-semibold ml-2"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <Toaster position="bottom-right" />
        {/* {isLoading && <LoadingSpinner />} */}
      </div>
    </HomeLayout>
  );
};

export default LoginPage;
