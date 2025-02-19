/**
 * Title: Common Select Field with Validation
 * Description: A reusable select field component integrated with Formik for form validation and Material UI's `TextField`. It supports the selection of options and validation error handling.
 * Author: Kaji Hasibur Rahman
 * Date: 2024-10-21
 *
 * @param {object} props - The properties for the select field component.
 * @param {unknown} [props.value] - The initial value of the select field (optional).
 * @param {string} [props.label] - The label for the select field (optional).
 * @param {boolean} [props.native] - If true, uses a native select element (optional).
 * @param {ReactNode} props.children - The options or items to display inside the select dropdown.
 * @param {string} props.name - The name of the field, used by Formik for form handling.
 * @param {boolean} [props.fullWidth] - If true, the select field will take up the full width of its container (optional).
 * @param {string} [props.className] - The custom class name for the select field (optional).
 * @param {SxProps} [props.sx] - Custom styling for the select field (optional).
 *
 * @returns {JSX.Element} The rendered select field component with validation.
 */
"use client"; // Indicates a Next.js client-side rendered component.
import { TextField, SxProps } from "@mui/material";
import { useField } from "formik";
import { at } from "lodash";
import React, { ReactNode } from "react";

// Define the interface for the props of the component
interface SelectFieldProps {
  value?: unknown;
  label?: string;
  placeholder?: string;
  native?: boolean;
  children: ReactNode;
  name: string;
  fullWidth?: boolean;
  className?: string;
  sx?: SxProps;
}

function SelectField(props: SelectFieldProps) {
  const { placeholder, label, sx, ...rest } = props;
  const [field, meta] = useField(props.name);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, "touched", "error");
  const isError = Boolean(touched && error);

  return (
    <TextField
      className="profileInputStyle"
      {...rest}
      fullWidth
      variant="outlined"
      {...field}
      value={selectedValue ? selectedValue : props.value}
      select
      label={label}
      error={isError}
      helperText={isError && error ? error : ""}
      sx={sx}
      placeholder={placeholder}
    >
      {props.children}
    </TextField>
  );
}

export default SelectField;
