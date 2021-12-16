import React, { useEffect, useState } from "react";
import { ProducersRepository } from "./ProducersRepository";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { AuthService } from "../auth/AuthService";
import img1 from "../images/error.png";

export const Producers = () => {
  const [producers, setProducers] = useState();
  const [redirectTo, setRedirectTo] = useState();

  useEffect(() => {
    loadData(0, 9);
  }, []);
  const loadData = (page, size) => {
    ProducersRepository.all(page, size)
      .then((res) => {
        setProducers(res.data);
        console.log();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e, value) => {
    loadData(value - 1, 9);
  };
  return (
    <>
      {" "}
      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <h1 style={{ fontFamily: "Helvetica, sans-serif", color: "#1F393C" }}>
            PRODUCERS
          </h1>
        </Grid>
        {AuthService.hasRole("ROLE_ADMINISTRATOR") && (
          <Grid item xs={12} md={3}>
            <Button
              size="medium"
              variant="outlined"
              fullWidth
              style={{
                color: "#D9D9D9",
                borderColor: "#D9D9D9",
                backgroundColor: "#17202A",
                marginTop: "20px",
              }}
              onClick={() => {
                setRedirectTo(`/producers/create`);
              }}
            >
              NEW PRODUCER
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2}>
        {producers?.content?.map((producer, index) => (
          <Grid item xs={12} md={4}>
            <Card raised={true} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="producer picture"
                height="140"
                image={img1}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {producer.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}></Grid>
        <Container maxWidth="xs">
          {producers && producers.number !== undefined && (
            <Stack spacing={2} style={{ marginTop: "20px" }}>
              <Pagination
                count={Math.floor(producers.totalElements / producers.size) + 1}
                shape="rounded"
                showFirstButton
                showLastButton
                style={{ color: "#D35400" }}
                page={producers.number + 1}
                onChange={handleChange}
              />
            </Stack>
          )}
        </Container>
      </Grid>
    </>
  );
};
