import {
  Alert,
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { CreateProducerValidator } from "./ProducerValidator";
import { ProducersRepository } from "./ProducersRepository";

export const CreateProducer = () => {
  const [producer, setProducer] = useState({});
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = () => {
    let valid = CreateProducerValidator.isValidSync(producer);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      CreateProducerValidator.validate(producer, { abortEarly: false }).catch(
        (err) => {
          console.log(err.inner);
          err.inner.forEach((validationError) => {
            validationErrors[validationError.path] = {};
            validationErrors[validationError.path] = validationError.message;
          });
          console.log(validationErrors);
          setFormFieldErrors(validationErrors);
          return;
        }
      );
      return;
    }

    setGlobalFormError(null);
    setSuccessMessage(null);
    ProducersRepository.create(producer)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Producer is added successfully");
      })
      .catch((err) => {
        console.log(err);
        setGlobalFormError(err);
      });
  };
  const handleChangeProducerData = (name, value) => {
    let data = { ...producer };
    data[name] = value;
    setProducer(data);
    console.log(data);
  };
  return (
    <>
      {successMessage && (
        <>
          <Grid style={{ marginTop: "20px", marginBottom: "-10px" }}>
            <Alert severity="success">{successMessage}</Alert>
          </Grid>
        </>
      )}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#D35400" }}>
          <AddIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ textAlign: "center", fontFamily: "Copperplate, fantasy" }}
        >
          Add new producer
        </Typography>
      </Box>
      <Container maxWidth="xs">
        {globalFormError && (
          <Grid item xs={12}>
            <Alert severity="error" style={{ marginTop: "5px" }}>
              {globalFormError?.response?.data?.message}
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <TextField
            label="Name"
            size="small"
            variant="outlined"
            color="warning"
            autoFocus
            value={producer?.name ? producer?.name : ""}
            onChange={(e) => handleChangeProducerData("name", e.target.value)}
            error={formFieldErrors?.name}
            helperText={formFieldErrors?.name}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
            style={{ backgroundColor: "#17202A " }}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            Create
          </Button>
        </Grid>
      </Container>
    </>
  );
};
