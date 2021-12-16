import { Container, Divider, Grid } from "@mui/material";
import img1 from "../images/411uURaRukL.jpg";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { GrenadesRepository } from "./GrenadesRepository";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export const GrenadeDetails = () => {
  const [grenade, setGrenade] = useState();
  const { id } = useParams();

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
      <Container maxWidht="xs" style={{ marginTop: "50px" }}>
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
              Products
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
          <Divider style={{ marginTop: "10px", marginLeft: "320px" }}></Divider>
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
          </div>
        </Grid>
      </Container>
    </>
  );
};
