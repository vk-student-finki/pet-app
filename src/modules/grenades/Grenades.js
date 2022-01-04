import {
  Button,
  Container,
  Divider,
  Grid,
  Hidden,
  Pagination,
  Stack,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { GrenadesRepository } from "./GrenadesRepository";
import { GrenadeBox } from "./GrenadeBox";
import AddIcon from "@mui/icons-material/Add";
import { Navigate } from "react-router-dom";
import { AuthService } from "../auth/AuthService";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CountriesRepository } from "../countries/CountriesRepository";
import { ProducersRepository } from "../producers/ProducersRepository";
import { Search } from "@mui/icons-material";

export const Grenades = () => {
  const [grenades, setGrenades] = useState();
  const [redirectTo, setRedirectTo] = useState();
  const [countries, setCountries] = useState();
  const [producers, setProducers] = useState();
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    loadDataCountries(0, 1000);
  }, []);

  useEffect(() => {
    loadDataProducers(0, 1000);
  }, []);

  useEffect(() => {
    loadData(0, 8);
  }, [searchParams]);

  const handleChangeSearchParams = (key, value) => {
    let data = { ...searchParams };
    data[key] = value;
    setSearchParams(data);
  };

  const loadDataCountries = (page, size) => {
    CountriesRepository.all(page, size, searchParams)
      .then((res) => setCountries(res.data))
      .catch((err) => console.log(err));
  };
  const loadDataProducers = (page, size) => {
    ProducersRepository.all(page, size, searchParams)
      .then((res) => setProducers(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadData(0, 8);
  }, []);

  const loadData = (page, size) => {
    let filterParams = { ...searchParams };
    if (filterParams.country) {
      filterParams["country.id"] = filterParams.country.id;
      delete filterParams.country;
    }
    if (filterParams.producer) {
      filterParams["producer.id"] = filterParams.producer.id;
      delete filterParams.producer;
    }
    GrenadesRepository.all(page, size, filterParams)
      .then((res) => {
        setGrenades(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e, value) => {
    loadData(value - 1, 8);
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid
        conatiner
        spacing={2}
        style={{
          backgroundColor: "#1E1F1C",
          height: "200px",
        }}
      >
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <span
            style={{
              fontFamily: "Copperplate, fantasy",
              fontSize: "30px",
              color: "#FFFFFF",
              display: "block",
              paddingTop: "50px",
            }}
          >
            Browse current inventory
          </span>

          <span
            style={{
              // fontFamily: "Monaco, monospace",
              fontFamily: "Trebuchet MS, sans-serif",
              fontSize: "15px",
              fontStyle: "oblique",
              color: "#FFFFFF",
              display: "block",
              paddingTop: "7px",
            }}
          >
            Review the newest additions.
          </span>
          <Hidden mdUp>
            <Grid item xs={12} md={6}>
              {AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                <Button
                  style={{
                    color: "white",
                    float: "right",
                    marginRight: "-10px",
                    marginTop: "-10px",
                  }}
                  onClick={() => {
                    setRedirectTo(`/grenades/create`);
                  }}
                >
                  <AddIcon
                    fullWidth
                    variant="contained"
                    style={{
                      float: "right",
                      backgroundColor: "#D35400",
                      marginRight: "10px",
                      marginTop: "55px",
                    }}
                  ></AddIcon>
                </Button>
              )}
            </Grid>
          </Hidden>
        </Grid>
        <Hidden mdDown>
          <Grid
            item
            xs={12}
            md={12}
            style={{
              marginTop: "5px",
              textAlign: "center",
            }}
          >
            {AuthService.hasRole("ROLE_ADMINISTRATOR") && (
              <Button
                size="medium"
                variant="outlined"
                style={{
                  color: "white",
                  borderColor: "#D35400",
                  backgroundColor: "#D35400",
                  marginTop: "20px",
                }}
                onClick={() => {
                  setRedirectTo(`/grenades/create`);
                }}
              >
                ADD NEW GRENADE
              </Button>
            )}
          </Grid>
        </Hidden>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            backgroundColor: "#f1f2f6",
          }}
        >
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <span
                  style={{
                    fontFamily: "Copperplate, fantasy",
                    fontSize: "30px",
                    color: "#1E1F1C",
                    display: "block",
                    paddingTop: "50px",
                    textTransform: "uppercase",
                  }}
                >
                  Grenades
                </span>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ textAlign: "left", marginTop: "30px" }}
              >
                <span
                  style={{
                    fontFamily: "Copperplate, fantasy",
                    fontSize: "16px",
                    color: "#6c757d",
                    display: "block",
                    textTransform: "uppercase",
                    letterSpacing: ".05rem",
                    marginLeft: "7px",
                    marginBottom: "6px",
                  }}
                >
                  search
                </span>

                <Grid container spacing={2}>
                  <Grid item md={3} xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      placeholder="Search by name"
                      color="warning"
                      size="small"
                      value={searchParams?.name ? searchParams?.name : ""}
                      onChange={(e) => {
                        handleChangeSearchParams("name", e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item md={3} xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      placeholder="Search by description"
                      size="small"
                      color="warning"
                      value={
                        searchParams?.description
                          ? searchParams?.description
                          : ""
                      }
                      onChange={(e) => {
                        handleChangeSearchParams("description", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item md={3} xs={12} style={{ textAlign: "left" }}>
                    <FormControl fullWidth size="small" color="warning">
                      <InputLabel htmlFor="grouped-native-select">
                        Country
                      </InputLabel>
                      <Select
                        onChange={(e) => {
                          handleChangeSearchParams("country", e.target.value);
                        }}
                        id="grouped-native-select"
                        label="Country"
                      >
                        <MenuItem>{""}</MenuItem>
                        {countries?.content?.map((country) => (
                          <MenuItem value={country}> {country.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    md={3}
                    xs={12}
                    style={{ marginBottom: "5px", textAlign: "left" }}
                  >
                    <FormControl fullWidth size="small" color="warning">
                      <InputLabel htmlFor="grouped-native-select2">
                        Producer
                      </InputLabel>
                      <Select
                        onChange={(e) => {
                          handleChangeSearchParams("producer", e.target.value);
                        }}
                        id="grouped-native-select2"
                        label="Producer"
                      >
                        <MenuItem>{""}</MenuItem>
                        {producers?.content?.map((producer) => (
                          <MenuItem value={producer}> {producer.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    style={{ marginBottom: "20px", textAlign: "left" }}
                  >
                    <TextField
                      fullWidth
                      label="Attributes"
                      placeholder="Search by attributes"
                      size="small"
                      color="warning"
                      value={
                        searchParams?.searchByAttributes
                          ? searchParams?.searchByAttributes
                          : ""
                      }
                      style={{ marginTop: "-15px" }}
                      onChange={(e) => {
                        handleChangeSearchParams(
                          "searchByAttributes",
                          e.target.value
                        );
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {grenades?.content?.map((grenade, index) => (
            <GrenadeBox grenade={grenade} />
          ))}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item={12} style={{ marginLeft: "auto", marginRight: "auto" }}>
          {grenades && grenades.number !== undefined && (
            <Stack spacing={2} style={{ marginTop: "20px" }}>
              <Pagination
                color="warning"
                count={Math.floor(grenades?.totalElements / grenades?.size) + 1}
                showFirstButton
                showLastButton
                style={{
                  color: "#D35400",
                }}
                page={grenades.number + 1}
                onChange={handleChange}
              />
            </Stack>
          )}
        </Grid>
      </Grid>
    </>
  );
};
