/**
 * Title: Home
 * Description: Description of the component
 * Author: Kaji Hasibur Rahman
 * Date: 2025-01-03
 */

import Grid from "@mui/material/Grid2";
import { Fragment } from "react";
import ReservationForm from "@/_components/reservation-form/form";

const Form = async () => {
  return (
    <Fragment>
      <Grid className="reservation-form-page">
        <ReservationForm />
      </Grid>
    </Fragment>
  );
};

export default Form;
