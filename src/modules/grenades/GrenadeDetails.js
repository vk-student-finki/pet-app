import {
  Container,
  Divider,
  Grid,
  Hidden,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import img1 from "../images/411uURaRukL.jpg";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { GrenadesRepository } from "./GrenadesRepository";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthService } from "../auth/AuthService";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export const GrenadeDetails = () => {
  const [grenade, setGrenade] = useState();
  const { id } = useParams();
  const [redirectTo, setRedirectTo] = useState();
  const [selectedGrenade, setSelectedGrenade] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (grenade) => {
    setSelectedGrenade(grenade);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    GrenadesRepository.get(id)
      .then((res) => {
        setGrenade(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <Container maxWidht="xs" style={{ marginTop: "50px" }}>
        <Hidden smDown>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs
              aria-label="breadcrumb"
              style={{
                fontFamily: "Lucida Console, monospace",
                fontSize: "16px",
              }}
            >
              <Link
                underline="hover"
                color="inherit"
                to="/"
                style={{ textDecoration: "none", color: "#878786" }}
              >
                Home
              </Link>
              <Link
                underline="hover"
                color="inherit"
                to="/grenades"
                style={{ textDecoration: "none", color: "#878786" }}
              >
                Grenades
              </Link>
              <Link
                underline="hover"
                to={`/grenades/details/${grenade?.id}`}
                aria-current="page"
                style={{ textDecoration: "none", color: "#D35400" }}
              >
                {grenade?.name}
              </Link>
            </Breadcrumbs>
          </div>
          <Divider></Divider>
          <Grid item xs={12} md={6}>
            <img
              src={img1}
              style={{
                height: "350px",
                width: "300px",
                border: "1px solid #E5E5E5",
                marginTop: "10px",
                borderRadius: "5px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={10}
            item
            sm={5}
            style={{
              textAlign: "center",
              marginTop: "-350px",
              fontFamily: "Monaco, monospace",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            <div style={{ textAlign: "left", marginLeft: "320px" }}>
              {grenade?.name}
            </div>
            <Grid item xs={12} md={12}>
              <Button style={{ color: "#1E1F1C", float: "right" }}>
                {window?.localStorage?.getItem("auth") &&
                  AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                    <DeleteIcon
                      size="large"
                      style={{
                        color: "#FF6000",
                        marginRight: "-420px",
                        marginTop: "-35px",
                      }}
                      onClick={() => handleClickOpen(grenade)}
                    />
                  )}
              </Button>

              <Button style={{ color: "#1E1F1C", float: "right" }}>
                {window?.localStorage?.getItem("auth") &&
                  AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                    <EditIcon
                      size="large"
                      style={{
                        color: "#202020",
                        marginRight: "-490px",
                        marginTop: "-35px",
                      }}
                      onClick={() => {
                        setRedirectTo(`/grenades/edit/${grenade?.id}`);
                      }}
                    />
                  )}
              </Button>
            </Grid>
            <Divider
              style={{ marginTop: "10px", marginLeft: "320px" }}
            ></Divider>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            style={{
              textAlign: "center",
              fontFamily: "Monaco, monospace",
              fontSize: "16px",
              marginTop: "10px",
              color: "#878786",
            }}
          >
            <div style={{ textAlign: "left", marginLeft: "320px" }}>
              {grenade?.description}
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              textAlign: "center",
              fontFamily: "Monaco, monospace",
              fontSize: "16px",
              marginLeft: "-108px",
              marginTop: "40px",
              color: "#878786",
            }}
          >
            <div style={{ textAlign: "left", marginLeft: "427px" }}>
              Product ID: <b>{grenade?.id}</b>
              <br />
              Country of origin: <b>{grenade?.country?.name}</b>
              <br />
              Producer: <b>{grenade?.producer?.name}</b>
              <br />
              <Divider style={{ marginTop: "10px", width: "300px" }}></Divider>
              {grenade?.attributes?.map((attribute) => (
                <span>
                  {attribute.attributeType.name}: <b>{attribute.value}</b>
                  <br />
                </span>
              ))}
              <br />
            </div>
          </Grid>
        </Hidden>

        <Hidden smUp>
          <Grid item xs={12}>
            <ArrowBackIcon
              style={{
                color: "#D35400",
                marginTop: "-45px",
                marginBottom: "30px",
                marginLeft: "-10px",
              }}
              onClick={() => {
                setRedirectTo(`/grenades`);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
            <img
              src={img1}
              style={{
                height: "350px",
                width: "300px",
                border: "1px solid #E5E5E5",
                borderRadius: "5px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: "20px",
                marginTop: "10px",
              }}
            >
              {grenade?.name}
            </div>
            <Grid
              style={{
                textAlign: "center",
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "-15px",
              }}
            >
              <Button
                style={{
                  color: "#1E1F1C",
                }}
              >
                {window?.localStorage?.getItem("auth") &&
                  AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                    <DeleteIcon
                      size="medium"
                      style={{
                        color: "#FF6000",
                        marginRight: "-32px",
                      }}
                      onClick={() => handleClickOpen(grenade)}
                    />
                  )}
              </Button>

              <Button
                style={{
                  color: "#1E1F1C",
                }}
              >
                {window?.localStorage?.getItem("auth") &&
                  AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                    <EditIcon
                      size="medium"
                      style={{
                        color: "#202020",
                        marginLeft: "-32px",
                      }}
                      onClick={() => {
                        setRedirectTo(`/grenades/edit/${grenade?.id}`);
                      }}
                    />
                  )}
              </Button>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: "5px" }}></Divider>
          <Grid
            item
            xs={12}
            md={12}
            style={{
              textAlign: "left",
              fontFamily: "Monaco, monospace",
              fontSize: "16px",
              marginTop: "10px",
              color: "#878786",
            }}
          >
            <div style={{}}>{grenade?.description}</div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              textAlign: "left",
              fontFamily: "Monaco, monospace",
              fontSize: "16px",
              marginTop: "40px",
              color: "#878786",
            }}
          >
            <div style={{}}>
              Product ID: <b>{grenade?.id}</b>
              <br />
              Country of origin: <b>{grenade?.country?.name}</b>
              <br />
              Producer: <b>{grenade?.producer?.name}</b>
              <br />
              {grenade?.attributes?.map((attribute) => (
                <span>
                  {attribute.attributeType.name}: <b>{attribute.value}</b>
                  <br />
                </span>
              ))}
            </div>
          </Grid>
        </Hidden>
      </Container>
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
