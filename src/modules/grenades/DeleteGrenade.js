import { Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { GrenadesRepository } from "./GrenadesRepository";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const DeleteGrenade = ({}) => {
  const { id } = useParams();
  const [redirectTo, setRedirectTo] = useState();
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    deleteThisGrenade(id);
  }, []);

  const deleteThisGrenade = (id) => {
    GrenadesRepository.deleteGrenade(id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push></Navigate>}
      {!deleteError && (
        <Container maxWidth="xs" style={{ textAlign: "center" }}>
          <h2>The grenade was successfully deleted!</h2>
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
                setRedirectTo(`/grenades`);
              }}
            >
              Back to Grenades
            </Button>
          </Grid>
        </Container>
      )}
      {deleteError && (
        <Container maxWidth="xs" style={{ textAlign: "center" }}>
          <h2>The grenade can not be deleted!</h2>
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
                setRedirectTo(`/grenades`);
              }}
            >
              Back to Grenades
            </Button>
          </Grid>
        </Container>
      )}
    </>
  );
};
