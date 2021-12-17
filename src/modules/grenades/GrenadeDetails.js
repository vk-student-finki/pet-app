import { Container, Divider, Grid, Hidden } from "@mui/material";
import img1 from "../images/411uURaRukL.jpg";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { GrenadesRepository } from "./GrenadesRepository";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export const GrenadeDetails = () => {
  const [grenade, setGrenade] = useState();
  const { id } = useParams();
  const [redirectTo, setRedirectTo] = useState();

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
              marginTop: "50px",
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
              }}
            >
              {grenade?.name}
            </div>
          </Grid>
          <Divider style={{ marginTop: "10px" }}></Divider>
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
    </>
  );
};
