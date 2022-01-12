import {
  Alert,
  Avatar,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { CreateGrenadeValidator } from "./GrenadeValidator";
import { GrenadesRepository } from "./GrenadesRepository";
import { ProducersRepository } from "../producers/ProducersRepository";
import { AttributeTypeRepository } from "../attributeTypes/AttributeTypeRepository";
import { CountriesRepository } from "../countries/CountriesRepository";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

export const CreateGrenade = () => {
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [producers, setProducers] = useState();
  const [attributeValues, setAttributeValues] = useState();
  const [countries, setCountries] = useState();
  const [grenade, setGrenade] = useState({
    name: "",
    description: "",
    attributes: [],
  });
  const navigate = useNavigate();

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
  const loadDataProducers = (page, size) => {
    ProducersRepository.all(page, size)
      .then((res) => setProducers(res.data))
      .catch((err) => console.log(err));
  };
  const [attributeTypes, setAttributeTypes] = useState();

  useEffect(() => {
    loadDataAttrubuteType(0, 1000);
  }, []);

  const loadDataAttrubuteType = (page, size) => {
    AttributeTypeRepository.all(page, size)
      .then((res) => {
        let values = [];
        res.data.content.forEach((key) => {
          values[key.id + "_"] = null;
        });
        setAttributeValues(values);
        setAttributeTypes(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeAttributeValue = (key, value) => {
    let data = { ...attributeValues };
    data[key] = value;
    setAttributeValues(data);
    console.log(data);
  };

  const handleChangeGrenadeData = (name, value) => {
    let data = { ...grenade };
    data[name] = value;
    setGrenade(data);
    console.log(data);
  };

  const handleSubmit = () => {
    let attributes = [];
    for (var key in attributeValues) {
      attributes.push({
        attributeType: {
          id: key.substring(0, key.length - 1),
        },
        value: attributeValues[key],
      });
    }
    console.log(attributes);
    let formData = { ...grenade };
    formData.attributes = attributes;
    let valid = CreateGrenadeValidator.isValidSync(formData);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      CreateGrenadeValidator.validate(formData, { abortEarly: false }).catch(
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
    GrenadesRepository.create(formData)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Grenade added!");
        console.log("grenade added");
        navigate(`/grenades/edit/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
        setGlobalFormError(err);
      });
  };

  const handleChangeProducer = (e) => {
    console.log(e.target.value);
    handleChangeGrenadeData("producer", e.target.value);
  };
  const handleChangeCountry = (e) => {
    console.log(e.target.value);
    handleChangeGrenadeData("country", e.target.value);
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          // flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "#D35400" }}>
          <AddIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ textAlign: "center", fontFamily: "Copperplate, fantasy" }}
        >
          Add new grenade
        </Typography>
      </Box>

      <Container maxWidth="xs" style={{ float: "left" }}>
        <Grid item xs={12} style={{ marginTop: "40px" }}>
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
            placeholder="Description"
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
          <FormControl color="warning" fullWidth style={{ marginTop: "8px" }}>
            <InputLabel id="demo-country-select-label">Country</InputLabel>
            <Select
              label="Country"
              labelId="demo-country-select-label"
              id="demo-country-select"
              value={grenade?.country}
              onChange={handleChangeCountry}
            >
              <MenuItem> / </MenuItem>
              {countries?.content.map((country) => (
                <MenuItem value={country}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
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
              value={grenade?.producer}
              onChange={handleChangeProducer}
            >
              <MenuItem> / </MenuItem>
              {producers?.content?.map((producer) => (
                <MenuItem value={producer}>{producer.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Container>
      {/* ////////////////////////////////////MD/////////////////////////////////////// */}
      <Hidden mdDown>
        <Container style={{ float: "left", width: "700px" }}>
          <Grid style={{ marginTop: "33px" }}></Grid>
          {attributeTypes?.content?.map((attributeType) => (
            <Grid item xs={12}>
              <TextField
                label={attributeType.name}
                size="small"
                value={
                  attributeValues[attributeType?.id + "_"]
                    ? attributeValues[attributeType?.id + "_"]
                    : ""
                }
                onChange={(e) =>
                  handleChangeAttributeValue(
                    attributeType?.id + "_",
                    e.target.value
                  )
                }
                variant="outlined"
                color="warning"
                fullWidth
                style={{ marginTop: "8px" }}
              />
            </Grid>
          ))}

          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              type="submit"
              style={{ backgroundColor: "#17202A ", float: "right" }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Grid>
        </Container>
      </Hidden>
      {/* ////////////////////////////////////MOBILE///////////////////////////////////////////////////////////////////// */}
      <Hidden mdUp>
        <Divider></Divider>
        <Container maxWidth="xs">
          {attributeTypes?.content?.map((attributeType) => (
            <Grid item xs={12}>
              <TextField
                label={attributeType.name}
                size="small"
                value={
                  attributeValues[attributeType?.id + "_"]
                    ? attributeValues[attributeType?.id + "_"]
                    : ""
                }
                onChange={(e) =>
                  handleChangeAttributeValue(
                    attributeType?.id + "_",
                    e.target.value
                  )
                }
                variant="outlined"
                color="warning"
                fullWidth
                style={{ marginTop: "8px" }}
              />
            </Grid>
          ))}
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              type="submit"
              style={{ backgroundColor: "#17202A ", float: "right" }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              Create
            </Button>
          </Grid>
        </Container>
      </Hidden>
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
        <>
          <Container style={{ marginTop: "20px", marginBottom: "-30px" }}>
            <Alert variant="filled" severity="error">
              {globalFormError?.response?.data?.message}
            </Alert>
          </Container>
        </>
      )}
    </>
  );
};
