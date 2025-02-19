/**
 * Title: Common Input Field with Validation
 * Description: A reusable input field component integrated with Formik for form validation and Material UI's TextField. It supports various props for customization, including error handling and validation messages.
 * Author: Kaji Hasibur Rahman
 * Date: 2024-10-21
 *
 * @param {object} props - The properties for the input field component.
 * @param {string} props.name - The name of the field, used by Formik for form handling.
 * @param {string} [props.label] - The label for the input field (optional).
 * @param {string} [props.type] - The type of the input field (e.g., "text", "password").
 * @param {string} [props.errorText] - The custom error message to display (optional).
 * @param {string} [props.placeholder] - The placeholder text for the input field (optional).
 * @param {boolean} [props.multiline] - If true, makes the input field multiline (optional).
 * @param {number} [props.rows] - The number of rows for multiline inputs (optional).
 * @param {boolean} [props.fullWidth] - If true, the input field will take up the full width of its container (optional).
 * @param {string} [props.className] - The custom class name for the input field (optional).
 * @param {SxProps} [props.sx] - Custom styling for the input field (optional).
 * @param {string} [props.autoComplete] - The autoComplete attribute for the input field (optional).
 * @param {boolean} [props.disabled] - If true, disables the input field (optional).
 * @param {object} [props.slotProps] - Slot props for additional customization of the TextField (optional).
 *
 * @returns {JSX.Element} The rendered input field component.
 */
"use client"; // Indicates a Next.js client-side rendered component.
import { TextField, SxProps, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import { at } from "lodash";
import React from "react";

// Define the interface for the props of the component
interface InputFieldProps {
  name: string;
  label?: string;
  type?: string;
  errorText?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  className?: string;
  sx?: SxProps;
  autoComplete?: string;
  disabled?: boolean;
  slotProps?: TextFieldProps["slotProps"];
}

export default function InputField(props: InputFieldProps) {
  const { errorText, sx, slotProps, autoComplete, multiline, rows, ...rest } =
    props;
  const [field, meta] = useField(props.name);

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error as string;
    }
    return "";
  }

  return (
    <TextField
      variant="outlined"
      error={Boolean(meta.touched && meta.error)}
      helperText={_renderHelperText() || errorText}
      {...field}
      {...rest}
      sx={sx}
      autoComplete={autoComplete}
      multiline={multiline}
      rows={rows}
      slotProps={slotProps}
    />
  );
}
