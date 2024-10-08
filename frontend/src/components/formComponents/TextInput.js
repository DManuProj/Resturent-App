import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { useField } from "formik";
import { useSelector } from "react-redux";

const TextfieldUI = ({ name, icon, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    size: "small",
    sx: {
      color: "white",
      "& .MuiOutlinedInput-input": {
        color: "black",
        caretColor: "black",
        "&::placeholder": {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "black",
        },
        // "&:hover fieldset": {
        //   borderColor: "yellow",
        // },
        "&.Mui-focused fieldset": {
          borderColor: "#fde047",
        },
      },
      "& .MuiInputLabel-root": {
        color: "black",
      },
    },
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
    <TextField
      {...configTextfield}
      InputProps={{
        endAdornment: icon ? (
          <InputAdornment position="end">{icon}</InputAdornment>
        ) : null,
      }}
    />
  );
};

export default TextfieldUI;
