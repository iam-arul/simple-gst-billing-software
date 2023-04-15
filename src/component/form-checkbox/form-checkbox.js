import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const FormCheckbox = (fieldProps) => {
    const { name, label, onCheckboxChange, ...others } = fieldProps;
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <FormControlLabel
                    {...others}
                    value={value}
                    label={label}
                    onChange={(e) => {
                        onChange(e);
                        onCheckboxChange && onCheckboxChange();
                    }}
                    control={<Checkbox />}
                />
            )}
        />
    );
};
