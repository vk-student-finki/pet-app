import {
  Alert,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { GrenadesRepository } from "./GrenadesRepository";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ProducersRepository } from "../producers/ProducersRepository";
import { CountriesRepository } from "../countries/CountriesRepository";
import EditIcon from "@mui/icons-material/Edit";
import { UpdateGrenadeValidator } from "./GrenadeValidator";

export const UpdateGrenade = ({}) => {
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [grenade, setGrenade] = useState({});
  const { id } = useParams();
  const [redirectTo, setRedirectTo] = useState();
  const [countries, setCountries] = useState();
  const [producers, setProducers] = useState();

  useEffect(() => {
    loadById(id);
  }, []);

  const loadById = (id) => {
    GrenadesRepository.get(id)
      .then((res) => {
        setGrenade(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    let valid = UpdateGrenadeValidator.isValidSync(grenade);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      UpdateGrenadeValidator.validate(grenade, { abortEarly: false }).catch(
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
    GrenadesRepository.updateGrenade(grenade)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Grenade is updated successfully");
      })
      .catch((err) => {
        console.log(err);
        setGlobalFormError(err);
      });
  };

  const handleChangeGrenadeData = (name, value) => {
    let data = { ...grenade };
    data[name] = value;
    setGrenade(data);
    console.log(data);
  };

  useEffect(() => {
    loadDataCountries(0, 1000);
  }, []);

  useEffect(() => {
    loadDataProducers(0, 1000);
  }, []);

  const loadDataCountries = (page, size) => {
    CountriesRepository.all(page, size)
      .then((res) => setCountries(res.data))
      .catch((err) => console.log(err));
  };

  const handleChangeCountry = (e) => {
    console.log(e.target.value);
    handleChangeGrenadeData(
      "country",
      countries.content.filter((c) => c.id === e.target.value)[0]
    );
  };

  const loadDataProducers = (page, size) => {
    ProducersRepository.all(page, size)
      .then((res) => setProducers(res.data))
      .catch((err) => console.log(err));
  };

  const handleChangeProducer = (e) => {
    console.log(e.target.value);
    handleChangeGrenadeData("producer", e.target.value);
  };

  return (
    <>
      {successMessage && (
        <>
          <Container style={{ marginTop: "20px", marginBottom: "-30px" }}>
            <Alert variant="filled" severity="success">
              {successMessage}
            </Alert>
          </Container>
        </>
      )}
      {globalFormError && (
        <Grid item xs={12} style={{ marginBottom: "10px" }}>
          <Alert severity="error">
            {globalFormError?.response?.data?.message}
          </Alert>
        </Grid>
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
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ fontWeight: "bold" }}>
          Edit Grenade
        </Typography>
      </Box>
      <Container maxWidth="xs" style={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            size="small"
            variant="outlined"
            color="warning"
            autoFocus
            fullWidth
            value={grenade?.name ? grenade?.name : ""}
            onChange={(e) => handleChangeGrenadeData("name", e.target.value)}
            error={formFieldErrors?.name}
            helperText={formFieldErrors?.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            size="small"
            variant="outlined"
            color="warning"
            multiline
            rows={4}
            fullWidth
            value={grenade?.description ? grenade?.description : ""}
            onChange={(e) =>
              handleChangeGrenadeData("description", e.target.value)
            }
            error={formFieldErrors?.description}
            helperText={formFieldErrors?.description}
            style={{ marginTop: "8px" }}
          />
        </Grid>
        <Grid item xs={12}>
          {countries?.content && (
            <FormControl color="warning" fullWidth style={{ marginTop: "8px" }}>
              <InputLabel id="demo-country-select-label">Country</InputLabel>
              <Select
                label="Country"
                labelId="demo-country-select-label"
                id="demo-country-select"
                value={grenade?.country?.id ? grenade?.country?.id : ""}
                onChange={handleChangeCountry}
                error={formFieldErrors?.description}
                helperText={formFieldErrors?.description}
              >
                <MenuItem> / </MenuItem>
                {countries?.content.map((country) => (
                  <MenuItem value={country?.id}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
        <Grid item xs={12}>
          {producers?.content && (
            <FormControl
              color="warning"
              fullWidth
              style={{ marginTop: "8px", marginBottom: "8px" }}
            >
              <InputLabel id="demo-producer-select-label">Producer</InputLabel>

              <Select
                label="Producer"
                labelId="demo-producer-select-label"
                id="demo-producer-select"
                value={grenade?.producer?.id ? grenade?.producer?.id : ""}
                onChange={handleChangeProducer}
              >
                <MenuItem> / </MenuItem>
                {producers?.content?.map((producer) => (
                  <MenuItem value={producer?.id}>{producer.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Grid item xs={12}>
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
              Update
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
