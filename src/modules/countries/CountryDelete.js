import { Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CountriesRepository } from "./CountriesRepository";

export const CountryDelete = ({}) => {
  const { id } = useParams();
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    deleteThisCountry(id);
  }, []);

  const deleteThisCountry = (id) => {
    setDeleteError(false);
    CountriesRepository.deleteCountry(id)
      .then((res) => {
        console.log(res.data);
        setDeleteError(false);
      })
      .catch((err) => {
        setDeleteError(true);
        console.log(err.data);
      });
  };

  const [redirectTo, setRedirectTo] = useState();
  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push></Navigate>}
      {!deleteError && (
        <Container maxWidth="xs" style={{ textAlign: "center" }}>
          <h2>The country was successfully deleted!</h2>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 40 }}
            style={{ color: "#D35400", marginBottom: "20px" }}
          />
          <Grid xs={12}>
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
                setRedirectTo(`/countries`);
              }}
            >
              Back to Countries
            </Button>
          </Grid>
        </Container>
      )}
      {deleteError && (
        <Container maxWidth="xs" style={{ textAlign: "center" }}>
          <h2>The country can not be deleted!</h2>
          <ErrorOutlineIcon
            sx={{ fontSize: 40 }}
            style={{ color: "#D35400", marginBottom: "20px" }}
          />
          <Grid xs={12}>
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
                setRedirectTo(`/countries`);
              }}
            >
              Back to Countries
            </Button>
          </Grid>
        </Container>
      )}
    </>
  );
};
