import {
  Button,
  Box,
  Grid,
  TextField,
  makeStyles,
  Typography,
} from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInput } from "../../form-input/form-input";
import "./product.form.scss";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const ProductForm = ({ onProductChange }) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const add = () => {
    append({ productName: "", quantity: "", price: "", gsnNo: "" });
  };

  const items = watch("items");

  return (
    <>
      <Typography variant="h6" className="product-header" gutterBottom>
        Product details
      </Typography>
      {fields.map((item, index) => (
        <Grid className="product-container" container spacing={2} key={item.id}>
          <Grid item xs={4} sm={4}>
            <FormInput
              onInputChange={onProductChange}
              name={`items.${index}.productName`}
              label="Product Name"
              className="mandatory"
              isRequired={true}
              helperText={
                errors?.items && errors?.items[index]?.productName?.message
              }
              error={Boolean(errors?.[`items.${index}.productName`])}
            />
          </Grid>

          <Grid item xs={3} sm={3}>
            <FormInput
              onInputChange={onProductChange}
              name={`items.${index}.quantity`}
              type="number"
              className="mandatory"
              label="Quantity"
              isRequired={true}
              helperText={
                errors?.items && errors?.items[index]?.quantity?.message
              }
              error={Boolean(errors?.[`items.${index}.quantity`])}
            />
          </Grid>
          <Grid item xs={2} sm={2}>
            <FormInput
              onInputChange={onProductChange}
              name={`items.${index}.price`}
              label="Price"
              type="number"
              className="mandatory"
              isRequired={true}
              helperText={errors?.items && errors?.items[index]?.price?.message}
              error={Boolean(errors?.[`items.${index}.price`])}
            />
          </Grid>
          <Grid item xs={1} sm={1}>
            <FormInput name={`items.${index}.gsnNo`} label="GSN No" />
          </Grid>
          <Grid item xs={1} sm={1}>
            <Button
              id="remove-btn"
              type="button"
              variant="contained"
              color="info"
              onClick={() => {
                add();
                onProductChange();
              }}
            >
              <AddCircleOutlineIcon />
            </Button>
          </Grid>
          {items.length > 1 && (
            <Grid item xs={1} sm={1}>
              <Button
                id="remove-btn"
                type="button"
                variant="contained"
                color="error"
                onClick={() => {
                  remove(index);
                  onProductChange();
                }}
              >
                <RemoveCircleOutlineIcon />
              </Button>
            </Grid>
          )}
        </Grid>
      ))}
    </>
  );
};
