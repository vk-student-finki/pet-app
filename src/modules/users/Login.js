import {
  Button,
  CardContent,
  Grid,
  Hidden,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CardActions from "@mui/material/CardActions";

export const Login = () => {
  return (
    <>
      <Grid container spacing={2} style={{ marginLeft: "10px" }}>
        <Grid xs={0} md={3}></Grid>
        <Grid xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1 style={{ textAlign: "center" }}>Login</h1>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username or email"
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                size="small"
                variant="outlined"
                type="password"
                fullWidth
              />
            </Grid>
            <Hidden smDown={true}>
              <Grid item md={4}></Grid>
            </Hidden>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                style={{
                  backgroundColor: "#17202A",
                  color: "#D9D9D9",
                  borderColor: "#17202A",
                  marginTop: "10px",
                }}
              >
                Log In
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
