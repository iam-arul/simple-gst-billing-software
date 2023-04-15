import React, { Fragment, useState } from "react";
import {
  Grid,
  Box,
  FormControlLabel,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import {
  useForm,
  useFieldArray,
  FormProvider,
  useWatch,
} from "react-hook-form";
import "./billing-form.scss";
import { FormInput } from "../form-input/form-input";
import { ProductForm } from "./product-form/product-form";
import { FormDatePicker } from "../form-datepicker/form-datepicker";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { FormCheckbox } from "../form-checkbox/form-checkbox";
import DraftBill from "../draft-bill/draft-bill";
import { createData, createGstData, generateDraftTableData } from "../../utils/utils";

const BillingForm = () => {
  const methods = useForm({
    defaultValues: {
      items: [{ productName: "", quantity: 0, price: 0, gsnNo: "" }],
      isGst: false,
      hasIgst: false,
      sgst: 0,
      cgst: 0,
      igst: 0,
    },
  });

  let hasIgst = methods.watch("hasIgst");

  const [draftBillDetails, setDraftBillDetails] = useState([
    createData("", "", "", ""),
  ]);

  const handleFormData = (data) => {
    handleProductChange();
  };

  const handleProductChange = () => {
    let productItemsTableData = generateDraftTableData(methods.control._formValues);
    setDraftBillDetails(productItemsTableData);
  };

  const handleGstChange = () => {
    handleProductChange();
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormData)}>
        <Fragment>
          <Box className="billing-form-container">
            <Box px={3} py={2} className="form-content">
              <Typography variant="h6" margin="dense" className="title">
                <ReceiptLongIcon /> Simple GST Billing Software
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={6} sm={6}>
                  <FormDatePicker
                    className="date-picker"
                    name="date"
                    label="Invoice Date"
                    fullWidth
                    margin="dense"
                    isRequired={true}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormInput
                    name="invoiceNo"
                    label="Invoice No"
                    isRequired={true}
                    helperText={
                      methods.formState.errors?.["invoiceNo"]?.message
                    }
                    error={Boolean(methods.errors?.["invoiceNo"])}
                    className="mandatory"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Customer details
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormInput
                    name="billTo"
                    label="Bill To"
                    className="text-area mandatory"
                    isRequired={true}
                    helperText={methods.formState.errors?.["billTo"]?.message}
                    error={Boolean(methods.errors?.["billTo"])}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormInput
                    name="phone number"
                    label="Phone number"
                    className="text-area"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormInput
                    name="address"
                    label="Address"
                    multiline={true}
                    minRows={2}
                    className="text-area"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} mt={4}>
                  <Typography variant="h6" className="gst-header" gutterBottom>
                    GST details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormCheckbox label="Apply IGST?" name="hasIgst" onCheckboxChange={handleGstChange}/>
                </Grid>
                {!hasIgst && (
                  <>
                    <Grid item xs={4} sm={4}>
                      <FormInput onInputChange={handleGstChange} type="number" name="sgst" label="SGST %" />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <FormInput onInputChange={handleGstChange} type="number" name="cgst" label="CGST %" />
                    </Grid>
                  </>
                )}

                {hasIgst && (
                  <Grid item xs={4} sm={4}>
                    <FormInput onInputChange={handleGstChange} type="number" name="igst" label="IGST %" />
                  </Grid>
                )}
                <Grid item xs={12} sm={12}>
                  <FormCheckbox
                    onCheckboxChange={handleGstChange}
                    label="Want to adjust price inside GST?"
                    name="isGst"
                  />
                </Grid>
              </Grid>
              <ProductForm onProductChange={handleProductChange} />
              <Grid container mt={3}>
                <Grid item xs={4} sm={4}>
                  <Button
                    xs={4}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <DraftBill draftData={draftBillDetails} />
          </Box>
        </Fragment>
      </form>
    </FormProvider>
  );
};

export default BillingForm;
