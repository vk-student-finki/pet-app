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
  ImageList,
  ImageListItem,
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
import { SETTINGS } from "../common/Settings";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
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
      <Container style={{ marginTop: "50px" }}>
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={5} style={{ marginTop: "15px" }}>
              <ImageList
                style={{
                  width: "100%",
                  height: "400px",
                  // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                  transform: "translateZ(0)",
                }}
                rowHeight={200}
                gap={1}
              >
                {grenade &&
                  grenade.pictures &&
                  grenade.pictures.map((picture, index) => {
                    const cols = picture ? 2 : 1;
                    const rows = picture ? 2 : 1;
                    return (
                      <ImageListItem
                        key={`${SETTINGS.API_BASE_URL}grenades/downloadGrenadeImage/${picture.id}`}
                        cols={cols}
                        rows={rows}
                        style={{ marginTop: "5px" }}
                      >
                        <img
                          {...srcset(
                            `${SETTINGS.API_BASE_URL}grenades/downloadGrenadeImage/${picture.id}`,
                            200,
                            250,
                            rows,
                            cols
                          )}
                          loading="lazy"
                          alt={picture.name}
                        />
                      </ImageListItem>
                    );
                  })}
              </ImageList>
            </Grid>
            <Grid item md={7} xs={12}>
              <Grid
                item
                xs={12}
                md={12}
                item
                sm={5}
                style={{
                  textAlign: "center",
                  fontFamily: "Monaco, monospace",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    textAlign: "left",
                  }}
                >
                  {grenade?.name}
                </div>
                <Grid item xs={12} md={12}>
                  <Button
                    style={{
                      color: "#1E1F1C",
                      float: "right",
                      marginLeft: "-25px",
                    }}
                  >
                    {window?.localStorage?.getItem("auth") &&
                      AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                        <DeleteIcon
                          size="large"
                          style={{
                            color: "#FF6000",
                          }}
                          onClick={() => handleClickOpen(grenade)}
                        />
                      )}
                  </Button>

                  <Button
                    style={{
                      color: "#1E1F1C",
                      float: "right",
                    }}
                  >
                    {window?.localStorage?.getItem("auth") &&
                      AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                        <EditIcon
                          size="large"
                          style={{
                            color: "#202020",
                          }}
                          onClick={() => {
                            setRedirectTo(`/grenades/edit/${grenade?.id}`);
                          }}
                        />
                      )}
                  </Button>
                </Grid>
                <Divider
                  style={{
                    marginTop: "10px",
                    width: "640px",
                  }}
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
                <div style={{ textAlign: "left" }}>{grenade?.description}</div>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                style={{
                  textAlign: "center",
                  fontFamily: "Monaco, monospace",
                  fontSize: "16px",

                  marginTop: "40px",
                  color: "#878786",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  Product ID: <b>{grenade?.id}</b>
                  <br />
                  Country of origin: <b>{grenade?.country?.name}</b>
                  <br />
                  Producer: <b>{grenade?.producer?.name}</b>
                  <br />
                  <Divider
                    style={{ marginTop: "10px", width: "300px" }}
                  ></Divider>
                  {grenade?.attributes?.map((attribute) => (
                    <span>
                      {attribute.attributeType.name}: <b>{attribute.value}</b>
                      <br />
                    </span>
                  ))}
                  <br />
                </div>
              </Grid>
            </Grid>
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
          <Grid item xs={12} md={6} style={{ marginTop: "-20px" }}>
            {grenade &&
              grenade.pictures &&
              grenade.pictures.map((picture, index) => (
                <img
                  src={`${SETTINGS.API_BASE_URL}grenades/downloadGrenadeImage/${picture.id}`}
                  style={{
                    height: "300px",
                    width: "100%",
                    objectFit: "cover",
                    border: "1px solid #E5E5E5",
                    marginTop: "10px",
                    borderRadius: "5px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                ></img>
              ))}
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
              textAlign: "justify",
              textJustify: "inter-word",
              display: "block",
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
            <div>
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
