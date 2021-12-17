import {
  Button,
  Container,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { GrenadesRepository } from "./GrenadesRepository";
import { GrenadeBox } from "./GrenadeBox";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Navigate } from "react-router-dom";
import { AuthService } from "../auth/AuthService";

export const Grenades = () => {
  const [grenades, setGrenades] = useState();
  const [redirectTo, setRedirectTo] = useState();

  useEffect(() => {
    loadData(0, 8);
  }, []);

  const loadData = (page, size) => {
    GrenadesRepository.all(page, size)
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

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

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
        <Container maxWidth="xs">
          <Grid item xs={12} md={12} style={{ paddingTop: "10px" }}>
            <Search>
              <SearchIcon />
            </Search>
          </Grid>
        </Container>
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
              fontFamily: "Monaco, monospace",
              fontSize: "15px",
              color: "#FFFFFF",
              display: "block",
              paddingTop: "7px",
            }}
          >
            Review the newest additions.
          </span>
          <Hidden mdUp>
            <Grid item xs={12} md={6}>
              <Tooltip title="Add new product">
                <Button
                  style={{
                    color: "#1E1F1C",
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
                      backgroundColor: "orange",
                      marginRight: "10px",
                      marginTop: "20px",
                    }}
                  ></AddIcon>
                </Button>
              </Tooltip>
            </Grid>
          </Hidden>
        </Grid>
        <Hidden mdDown>
          <Grid item xs={12} md={12}>
            {AuthService.hasRole("ROLE_ADMINISTRATOR") && (
              <Button
                variant="contained"
                style={{
                  float: "right",
                  backgroundColor: "#D35400",
                  marginRight: "10px",
                }}
                onClick={() => {
                  setRedirectTo(`/grenades/create`);
                }}
              >
                Add new grenade
              </Button>
            )}
          </Grid>
        </Hidden>
      </Grid>

      <Grid
        conatiner
        spacing={2}
        style={{
          backgroundColor: "#f1f2f6",
          height: "132px",
        }}
      >
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Grid container>
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
          </Grid>

          <Grid container spacing={3} style={{ marginTop: "20px" }}>
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
                  count={
                    Math.floor(grenades?.totalElements / grenades?.size) + 1
                  }
                  shape="rounded"
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
      </Grid>
    </>
  );
};
