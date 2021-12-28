import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Hidden,
  Slide,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import img1 from "../images/411uURaRukL.jpg";
import { Link, Navigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { AuthService } from "../auth/AuthService";
import { SETTINGS } from "../common/Settings";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const GrenadeBox = ({ grenade }) => {
  const [redirectTo, setRedirectTo] = useState();
  const [selectedGrenade, setSelectedGrenade] = useState();
  const [attachments, setAttachments] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (grenade) => {
    setSelectedGrenade(grenade);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid item xs={12} md={3} sm={4}>
        <Card
          style={{
            border: "5px solid white",
            borderRadius: "10px",
            height: "400px",
          }}
        >
          <Link
            to={`/grenades/details/${grenade.id}`}
            style={{ textDecoration: "none", color: "#1E1F1C" }}
          >
            {grenade &&
              grenade.pictures &&
              grenade.pictures.map((picture, index) =>
                index == 0 ? (
                  <CardMedia
                    style={{ height: "270px" }}
                    component="img"
                    alt={picture.name}
                    // height="140"
                    src={`${SETTINGS.API_BASE_URL}grenades/downloadGrenadeImage/${picture.id}`}
                  />
                ) : (
                  ""
                )
              )}
          </Link>
          <Link
            to={`/grenades/details/${grenade.id}`}
            style={{ textDecoration: "none", color: "#1E1F1C" }}
          >
            <CardContent style={{ height: "50px" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{
                  fontFamily: "Monaco, monospace",
                  fontSize: "17px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {grenade.name}
              </Typography>
            </CardContent>
          </Link>

          <Hidden smDown>
            <CardActions style={{ float: "right" }}>
              <Button size="small" style={{ color: "#1E1F1C" }}>
                {window?.localStorage?.getItem("auth") &&
                  AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                    <DeleteIcon
                      style={{
                        color: "#FF6000",
                        marginRight: "145px",
                      }}
                      onClick={() => handleClickOpen(grenade)}
                    />
                  )}
              </Button>

              <Button
                size="small"
                style={{ color: "#1E1F1C" }}
                onClick={() => {
                  setRedirectTo(`/grenades/details/${grenade.id}`);
                }}
              >
                <InfoOutlinedIcon
                  style={{
                    color: "#FF6000",
                    marginRight: "-30px",
                  }}
                />
              </Button>
            </CardActions>
          </Hidden>
          <Hidden smUp>
            <CardActions>
              <Grid container>
                <Grid item md={12}>
                  <Button
                    size="small"
                    style={{ color: "#1E1F1C", justifyContent: "start" }}
                  >
                    {window?.localStorage?.getItem("auth") &&
                      AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                        <DeleteIcon
                          style={{
                            color: "#FF6000",
                          }}
                          onClick={() => handleClickOpen(grenade)}
                        />
                      )}
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item md={12}></Grid>
              </Grid>
              <Button
                size="small"
                float="right"
                style={{
                  color: "#1E1F1C",
                }}
                onClick={() => {
                  setRedirectTo(`/grenades/details/${grenade.id}`);
                }}
              >
                <InfoOutlinedIcon
                  style={{
                    color: "#FF6000",
                    marginRight: "-40px",
                  }}
                />
              </Button>
            </CardActions>
          </Hidden>
        </Card>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
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
          Are you sure you want to delete this grenade? This action
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
              setRedirectTo(`/grenades/delete/${selectedGrenade?.id}`);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
