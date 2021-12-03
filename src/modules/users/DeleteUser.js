import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export const DeleteUser = (props) => {
  const [redirectTo, setRedirectTo] = useState();
  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push></Navigate>}
      <h1>The user was successfully deleted!</h1>
      <Grid xs={4}>
        <Button
          variant="outlined"
          size="large"
          style={{
            backgroundColor: "#17202A",
            color: "#D9D9D9",
            borderColor: "#17202A",
          }}
          size="medium"
          fullWidth
          onClick={() => {
            setRedirectTo(`/users`);
          }}
        >
          Back to Users
        </Button>
      </Grid>
    </>
  );
};
