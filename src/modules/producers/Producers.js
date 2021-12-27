import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Pagination,
  Slide,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { AuthService } from "../auth/AuthService";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProducersRepository } from "./ProducersRepository";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Producers = () => {
  const [producers, setProducers] = useState();
  const [redirectTo, setRedirectTo] = useState();
  const [selectedProducer, setSelectedProducer] = useState();
  const [searchParams, setSearchParams] = useState({});

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (producer) => {
    setSelectedProducer(producer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadData(0, 10);
  }, []);

  useEffect(() => {
    loadData(0, 10);
  }, [searchParams]);

  const handleChangeSearchParams = (key, value) => {
    let data = { ...searchParams };
    data[key] = value;
    setSearchParams(data);
  };

  const loadData = (page, size) => {
    let filterParams = { ...searchParams };
    ProducersRepository.all(page, size, filterParams)
      .then((res) => {
        setProducers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e, value) => {
    loadData(value - 1, 10);
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}

      <Grid
        conatiner
        spacing={2}
        style={{
          backgroundColor: "#f1f2f6",
          height: "200px",
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
                Producers
              </span>
            </Grid>

            <Grid container>
              <Hidden mdDown>
                <Grid
                  item
                  xs={12}
                  md={2.5}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "-20px",
                  }}
                >
                  <Button
                    size="medium"
                    variant="outlined"
                    fullWidth
                    style={{
                      color: "white",
                      borderColor: "white",
                      backgroundColor: "#D35400",
                      marginTop: "20px",
                    }}
                    onClick={() => {
                      setRedirectTo(`/producers/create`);
                    }}
                  >
                    ADD NEW PRODUCER
                  </Button>
                </Grid>
              </Hidden>

              <Hidden mdUp>
                <Grid item xs={12} md={12}>
                  {AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                    <Button
                      style={{
                        color: "white",
                        float: "right",
                        marginRight: "-10px",
                        marginTop: "-10px",
                      }}
                      onClick={() => {
                        setRedirectTo(`/producers/create`);
                      }}
                    >
                      <AddIcon
                        fullWidth
                        variant="contained"
                        style={{
                          float: "right",
                          backgroundColor: "#D35400",
                          marginRight: "25px",
                          marginTop: "20px",
                        }}
                      ></AddIcon>
                    </Button>
                  )}
                </Grid>
              </Hidden>
            </Grid>
            <Grid item md={4.5}></Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Producer"
                size="small"
                color="warning"
                value={searchParams?.name ? searchParams?.name : ""}
                onChange={(e) => {
                  handleChangeSearchParams("name", e.target.value);
                }}
                style={{ marginTop: "10px" }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            {producers?.content?.map((producer, index) => (
              <TableRow
                style={{
                  cursor: "pointer",
                  backgroundColor: index % 2 === 0 ? "#F4F6F6" : "transparent",
                  whiteSpace: "nowrap",
                }}
              >
                <Hidden smDown>
                  <TableCell
                    style={{
                      fontFamily: "Helvetica, sans-serif",
                      color: "#1F393C",
                      fontSize: "18px",
                      width: "900px",
                    }}
                  >
                    {producer.name}
                  </TableCell>

                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>

                  <TableCell style={{}}>
                    <DeleteIcon
                      fontSize="large"
                      style={{
                        cursor: "pointer",
                        color: "#D35400",
                        float: "right",
                      }}
                      onClick={() => handleClickOpen(producer)}
                    ></DeleteIcon>
                  </TableCell>
                </Hidden>

                <Hidden smUp>
                  <TableCell
                    style={{
                      fontFamily: "Helvetica, sans-serif",
                      color: "#1F393C",
                      fontSize: "16px",
                      cursor: "pointer",
                      width: "400px",
                      whiteSpace: "normal",
                    }}
                  >
                    {producer.name}
                  </TableCell>

                  <TableCell width="100px" style={{}}>
                    <DeleteIcon
                      fontSize="large"
                      style={{
                        cursor: "pointer",
                        color: "#D35400",
                        float: "right",
                      }}
                    ></DeleteIcon>
                  </TableCell>
                </Hidden>
              </TableRow>
            ))}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item={12} style={{ marginLeft: "auto", marginRight: "auto" }}>
            {producers && producers.number !== undefined && (
              <Stack spacing={2} style={{ marginTop: "20px" }}>
                <Pagination
                  count={
                    Math.floor(producers?.totalElements / producers?.size) + 1
                  }
                  shape="rounded"
                  showFirstButton
                  showLastButton
                  style={{
                    color: "#D35400",
                  }}
                  page={producers.number + 1}
                  onChange={handleChange}
                />
              </Stack>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        // aria-describedby="alert-dialog-slide-description"
      >
        <HighlightOffIcon
          style={{
            color: "#F15E5E",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "70px",
            marginTop: "10px",
          }}
        />
        <DialogTitle
          style={{
            fontWeight: "bold",
            fontFamily: "Monaco, monospace",
          }}
        >
          {"Confirm delete"}
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          Are you sure you want to delete this producer? This action
          <br /> cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            size="large"
            style={{
              backgroundColor: "#C1C1C1",
              color: "white",
              border: "#C1C1C1",
            }}
          >
            Cancel
          </Button>
          <Button
            size="large"
            style={{
              backgroundColor: "#F15E5E",
              color: "white",
            }}
            onClick={() => {
              setRedirectTo(`/producers/delete/${selectedProducer?.id}`);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
