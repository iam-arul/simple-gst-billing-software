import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";

export const FormDatePicker = (fieldProps) => {
  const { name, isRequired, ...others } = fieldProps;
  const {
    control,
    formState: { errors },
  } = useFormContext();
  let hasError = errors && errors[name];

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      rules={{
        required: { value: isRequired, message: `${name} is required` },
      }}
      render={({ field: { onChange, value } }) => {
        return (
          <DatePicker
            {...others}
            value={value}
            onChange={onChange}
            slotProps={{
              textField: {
                className: "mandatory",
                InputLabelProps: {
                  shrink: true,
                },
                FormHelperTextProps: {
                  className: "error-text",
                },
                helperText: hasError && errors[name].message,
              },
            }}
          />
        );
      }}
    />
  );
};
