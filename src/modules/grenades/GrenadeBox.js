import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import img1 from "../images/411uURaRukL.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, Navigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const GrenadeBox = ({ grenade }) => {
  const [redirectTo, setRedirectTo] = useState();

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid item xs={12} md={3}>
        <Card style={{ border: "5px solid white", height: "390px" }}>
          <Link
            to={`/grenades/details/${grenade.id}`}
            style={{ textDecoration: "none", color: "#1E1F1C" }}
          >
            <CardMedia
              style={{ height: "270px" }}
              component="img"
              alt="green iguana"
              height="140"
              image={img1}
            />
          </Link>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{
                fontFamily: "Monaco, monospace",
                fontSize: "18px",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {grenade.name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {grenade.description}
            </Typography>
          </CardContent>
          <CardActions style={{ float: "right" }}>
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
                  marginRight: "-35px",
                  marginTop: "-5px",
                }}
              />
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};
