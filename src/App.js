import logo from "./logo.svg";
import "./App.scss";
import BillingForm from "./component/form/billing-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledEngineProvider } from "@mui/material";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BillingForm />
      </LocalizationProvider>
    </StyledEngineProvider>
  );
}

export default App;
