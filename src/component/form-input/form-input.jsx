import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import "./form-input.scss";
import { useDebounce, useFirstMountState, useUpdateEffect } from "react-use";
import { useState } from "react";

export const FormInput = (fieldProps) => {
  const { name, label, onInputChange, isRequired, ...others } = fieldProps;
  const { control } = useFormContext();
  const [inputChange, setInputChange] = useState("");
  const isFirstMount = useFirstMountState();

  useDebounce(
    () => {
      if(!isFirstMount) {
        onInputChange && onInputChange();
      }
    },
    1000,
    [inputChange]
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: { value: isRequired, message: `${label} is required` },
      }}
      render={({ field: { onChange, value } }) => (
        <>
          <TextField
            {...others}
            label={label}
            InputLabelProps={{ shrink: true, className: "input-label" }}
            fullWidth
            onChange={(e) => {
              onChange(e);
              setInputChange(e.target.value);
            }}
            value={value || ""}
            margin="dense"
            FormHelperTextProps={{ className: "error-text" }}
          />
        </>
      )}
    />
  );
};
