import { Grid } from "@mui/material";
import React from "react";

export const Home = ({}) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ background: "#f1f2f6", height: "150px" }}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Grid container>
              <Grid item xs={12}>
                <span
                  style={{
                    fontFamily: "Copperplate, fantasy",
                    fontSize: "30px",
                    color: "#1e1f1c",
                    display: "block",
                    paddingTop: "50px",
                    textTransform: "uppercase",
                  }}
                >
                  Welcome
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
