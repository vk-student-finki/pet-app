import { Alert, Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ProducersRepository } from "./ProducersRepository";
import { useDispatch } from "react-redux";

export const ProducerDelete = ({}) => {
  const { id } = useParams();
  const [deleteError, setDeleteError] = useState(false);
  const [producerError, setProducerError] = useState();

  useEffect(() => {
    deleteThisProducer(id);
  }, []);

  const deleteThisProducer = (id) => {
    setDeleteError(false);
    setProducerError(null);
    ProducersRepository.deleteProducer(id)
      .then((res) => {
        console.log(res.data);
        setDeleteError(false);
      })
      .catch((err) => {
        setDeleteError(true);
        // console.log(err.message);
        setProducerError(err);
        console.log(producerError?.response?.data?.message);
      });
  };

  const [redirectTo, setRedirectTo] = useState();
  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push></Navigate>}
      {!deleteError && (
        <Container maxWidth="xs" style={{ textAlign: "center" }}>
          <h2>The producer was successfully deleted!</h2>
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
                setRedirectTo(`/producers`);
              }}
            >
              Back to Producers
            </Button>
          </Grid>
        </Container>
      )}
      {deleteError && (
        <Container maxWidth="xs" style={{ textAlign: "center" }}>
          <h2>The producer can not be deleted!</h2>
          <ErrorOutlineIcon
            sx={{ fontSize: 40 }}
            style={{ color: "#D35400", marginBottom: "20px" }}
          />
          {producerError && (
            <Grid item xs={12} style={{ marginBottom: "10px" }}>
              <Alert severity="error">
                {producerError?.response?.data?.message}
              </Alert>
            </Grid>
          )}
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
                setRedirectTo(`/producers`);
              }}
            >
              Back to Producers
            </Button>
          </Grid>
        </Container>
      )}
    </>
  );
};
