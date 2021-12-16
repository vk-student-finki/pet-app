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
import { Link } from "react-router-dom";

export const GrenadeBox = ({ grenade }) => {
  const [redirectTo, setRedirectTo] = useState();

  return (
    <Grid item xs={12} md={3}>
      <Card style={{ border: "5px solid white", height: "430px" }}>
        <CardMedia
          style={{ height: "270px" }}
          component="img"
          alt="green iguana"
          height="140"
          image={img1}
        />
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
            <Link
              to={`/grenades/details/${grenade.id}`}
              style={{ textDecoration: "none", color: "#1E1F1C" }}
            >
              {grenade.name}
            </Link>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {grenade.description}
          </Typography>
        </CardContent>
        <CardActions style={{ float: "right" }}>
          <Button size="small" style={{ color: "#1E1F1C" }}>
            <ShoppingCartIcon
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
  );
};
