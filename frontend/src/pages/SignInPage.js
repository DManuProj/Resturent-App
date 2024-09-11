import React, { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import TextInput from "../components/formComponents/TextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ButtonUI";
import TextfieldUI from "../components/formComponents/TextInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 5) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 20;
    return score;
  };

  const getProgressBarColor = (score) => {
    if (score === 0) return "transparent";
    if (score < 20) return "bg-red-500";
    if (score < 40) return "bg-red-500";
    if (score < 60) return "bg-red-500";
    if (score <= 80) return "bg-yellow-500";
    return "bg-green-500";
  };
  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-opacity-60">
        <div className="max-w-md w-full bg-white  p-8 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900 ">
            Welcome to ABC Restaurant
          </h2>
          <p className="text-center text-sm text-black dark:text-gray-300 mb-6">
            Register here to your account to enjoy delicious dishes
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
            {({ setFieldValue, values }) => {
              return (
                <Form className="max-w-md w-full mt-8 space-y-6">
                  <div className="flex flex-col rounded-md shadow-sm -space-y-px gap-4 mb-8">
                    <div className="w-full flex gap-4">
                      <div>
                        <p>First Name*</p>
                        <TextfieldUI name="firstName" />
                      </div>
                      <div>
                        <p>Last Name*</p>
                        <TextfieldUI name="lastName" />
                      </div>
                    </div>

                    <div>
                      <p>Contact Number*</p>
                      <TextfieldUI type="number" name="contact number" />
                    </div>

                    <div>
                      <p>Address*</p>
                      <TextfieldUI name="address" />
                    </div>

                    <div>
                      <p>Email*</p>
                      <TextfieldUI name="email" />
                    </div>

                    <div className="relative">
                      <p>Password*</p>
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
                      {/* <div className="w-full h-2 mt-1 rounded-lg overflow-hidden">
                        <div
                          className={`h-full ${getProgressBarColor(
                            getPasswordStrength(values.password)
                          )}`}
                          style={{
                            width: `${getPasswordStrength(values.password)}%`,
                          }}
                        ></div>
                      </div> */}
                    </div>

                    <div className=" mt-5">
                      <Button
                        label="Create Account"
                        type="submit"
                        styles="w-full sm:text-lg py-2.5 2xl:py-3 px-4 border bg-yellow-600 border-transparent text-sm font-medium rounded-full text-white bg-slate-950  focus:outline-none mt-8"
                      />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>

          <div className="flex flex-col items-center mt-3 text-gray-600 ">
            <p className="-mt-3">
              Already have an account?
              <Link
                to="/log-in"
                replace
                className="dark:text-sky-500 mt-3 underline font-semibold ml-2"
              >
                Log In
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

export default SignInPage;
